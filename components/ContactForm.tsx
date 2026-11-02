'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { submitEnquiry, EnquiryFormState } from '@/lib/actions';
import { CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { Plan, ServiceInterest } from '@/lib/types';
import { POPULAR_COUNTRIES, ALL_COUNTRIES, CountryCode } from '@/lib/countries';

interface ContactFormProps {
  plans?: Plan[];
}

export default function ContactForm({ plans = [] }: ContactFormProps) {
  const searchParams = useSearchParams();
  const preselectedPlanSlug = searchParams.get('plan') || '';
  const preselectedServiceParam = searchParams.get('service') || '';

  const getInitialService = (): ServiceInterest => {
    if (preselectedServiceParam === 'website') return 'website';
    if (preselectedServiceParam === 'social') return 'social';
    if (preselectedServiceParam === 'both') return 'both';
    if (preselectedPlanSlug.includes('website')) return 'website';
    if (preselectedPlanSlug.includes('social')) return 'social';
    return 'both';
  };

  const matchedPlan = plans.find((p) => p.slug === preselectedPlanSlug || p.id === preselectedPlanSlug);

  const defaultCountry = ALL_COUNTRIES.find((c) => c.iso === 'LK') || POPULAR_COUNTRIES[0];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(defaultCountry);
  const [phoneNum, setPhoneNum] = useState('');
  const [serviceInterest] = useState<ServiceInterest>(getInitialService());
  const [submissionKey, setSubmissionKey] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<EnquiryFormState | null>(null);

  useEffect(() => {
    setSubmissionKey(`req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    // Concatenate First Name & Last Name into 'name' for backend validation
    const combinedName = `${firstName} ${lastName}`.trim();
    if (combinedName) {
      formData.set('name', combinedName);
    }

    // Format phone number with country code if provided
    if (phoneNum.trim()) {
      formData.set('phone', `${selectedCountry.code} ${phoneNum.trim()}`);
    } else {
      formData.set('phone', '');
    }

    // Ensure service interest is set
    formData.set('serviceInterest', serviceInterest);

    startTransition(async () => {
      const res = await submitEnquiry(state, formData);
      setState(res);
      if (res.success) {
        setSubmissionKey(`req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
      }
    });
  };

  // Success Confirmation Screen
  if (state?.success) {
    return (
      <div className="py-8 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h4 className="text-2xl font-black text-ink tracking-tight">
            Proposal Request Received!
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
            {state.message}
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setState(null);
              setFirstName('');
              setLastName('');
              setPhoneNum('');
            }}
            className="px-8 py-3 rounded-full bg-slate-100 text-ink font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 text-left w-full">
      {/* Hidden Fields for Security & Backend compatibility */}
      <input type="hidden" name="hp_field" value="" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="submissionKey" value={submissionKey} />
      <input type="hidden" name="selectedPlanId" value={matchedPlan ? matchedPlan.id : ''} />
      <input type="hidden" name="source" value="Start a Project - NinjaPromo Exact Clean Form" />
      <input type="hidden" name="serviceInterest" value={serviceInterest} />

      {/* Global Error Banner */}
      {state?.errors && Object.keys(state.errors).length > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Please check your details:</div>
            <p className="mt-0.5">{state.message}</p>
          </div>
        </div>
      )}

      {/* 1. First Name* (Exact Clean Underline Row) */}
      <div className="space-y-1">
        <input
          type="text"
          id="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name*"
          className={`w-full py-2.5 px-0 border-b text-sm sm:text-base text-ink placeholder:text-slate-400 focus:outline-none transition-colors bg-transparent ${
            state?.errors?.name ? 'border-rose-400' : 'border-slate-200 focus:border-[#5B47FB]'
          }`}
        />
        {state?.errors?.name && (
          <p className="text-[11px] text-rose-600 font-medium">{state.errors.name}</p>
        )}
      </div>

      {/* 2. Last Name (Exact Clean Underline Row) */}
      <div className="space-y-1">
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full py-2.5 px-0 border-b border-slate-200 text-sm sm:text-base text-ink placeholder:text-slate-400 focus:outline-none focus:border-[#5B47FB] bg-transparent transition-colors"
        />
      </div>

      {/* 3. Work Email* (Exact Clean Underline Row) */}
      <div className="space-y-1">
        <input
          type="email"
          id="email"
          name="email"
          required
          defaultValue={state?.inputValues?.email || ''}
          placeholder="Work Email*"
          className={`w-full py-2.5 px-0 border-b text-sm sm:text-base text-ink placeholder:text-slate-400 focus:outline-none transition-colors bg-transparent ${
            state?.errors?.email ? 'border-rose-400' : 'border-slate-200 focus:border-[#5B47FB]'
          }`}
        />
        {state?.errors?.email && (
          <p className="text-[11px] text-rose-600 font-medium">{state.errors.email}</p>
        )}
      </div>

      {/* 4. Phone with Country Dropdown + (optional) right label (Exact NinjaPromo Row) */}
      <div className="space-y-1">
        <div className="flex items-center border-b border-slate-200 py-2.5 focus-within:border-[#5B47FB] transition-colors gap-2">
          {/* Flag & code selector */}
          <div className="relative flex items-center gap-1 shrink-0 cursor-pointer pr-1">
            <span className="text-base select-none">{selectedCountry.flag}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700 ml-1 select-none">
              {selectedCountry.code}
            </span>
            <select
              aria-label="Country Code"
              value={`${selectedCountry.code}|${selectedCountry.name}`}
              onChange={(e) => {
                const [, name] = e.target.value.split('|');
                const found = ALL_COUNTRIES.find((c) => c.name === name) || POPULAR_COUNTRIES.find((c) => c.name === name);
                if (found) setSelectedCountry(found);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            >
              <optgroup label="Popular Countries">
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={`pop-${c.iso || c.name}`} value={`${c.code}|${c.name}`} className="text-ink bg-white">
                    {c.flag} {c.code} ({c.name})
                  </option>
                ))}
              </optgroup>
              <optgroup label="All Countries (A-Z)">
                {ALL_COUNTRIES.map((c) => (
                  <option key={`all-${c.iso || c.name}`} value={`${c.code}|${c.name}`} className="text-ink bg-white">
                    {c.flag} {c.code} ({c.name})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <input
            type="tel"
            id="phoneInput"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            placeholder=""
            className="w-full text-sm sm:text-base text-ink placeholder:text-slate-400 focus:outline-none bg-transparent"
          />

          <span className="text-xs text-slate-400 shrink-0 select-none pr-1">
            (optional)
          </span>
        </div>
        {state?.errors?.phone && (
          <p className="text-[11px] text-rose-600 font-medium">{state.errors.phone}</p>
        )}
      </div>

      {/* 5. What are you trying to solve? (Exact Clean Underline Row) */}
      <div className="space-y-1">
        <textarea
          id="projectBrief"
          name="projectBrief"
          required
          rows={2}
          defaultValue={state?.inputValues?.projectBrief || ''}
          placeholder="What are you trying to solve?"
          className={`w-full py-2.5 px-0 border-b text-sm sm:text-base text-ink placeholder:text-slate-400 focus:outline-none transition-colors bg-transparent resize-none leading-relaxed ${
            state?.errors?.projectBrief ? 'border-rose-400' : 'border-slate-200 focus:border-[#5B47FB]'
          }`}
        />
        {state?.errors?.projectBrief && (
          <p className="text-[11px] text-rose-600 font-medium">{state.errors.projectBrief}</p>
        )}
      </div>

      {/* 6. Book a Call Button (Exact NinjaPromo Purple Gradient Pill) */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 px-8 rounded-full brand-gradient-button text-ink font-bold text-base tracking-tight transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Booking Call...</span>
            </div>
          ) : (
            <span>Book a call</span>
          )}
        </button>
      </div>

      {/* 7. Privacy Disclaimer (Exact NinjaPromo Text) */}
      <p className="text-[11px] sm:text-xs text-slate-400 text-center leading-relaxed pt-1">
        By clicking, you agree to receive communications from Design1X in accordance with our{' '}
        <Link href="/privacy" className="underline hover:text-ink font-medium">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
