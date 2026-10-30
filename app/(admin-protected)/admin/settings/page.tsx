import { requireAdmin } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { updateSettingsAction } from '@/lib/actions';
import { Settings, Save, ShieldAlert, Check } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await db.getSettings();

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Public Site & Contact Settings
        </h1>
        <p className="text-xs sm:text-sm text-ink-600 mt-1">
          Manage verified public business details, response commitments, and official social media profile links.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-warm-200/60 border border-warm-300 text-xs text-ink-600 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-cobalt flex-shrink-0 mt-0.5" />
        <span>
          <strong>Security Notice:</strong> In accordance with technical specification requirements, sensitive credentials, API tokens, and service role keys are stored exclusively in hosting environment variables (.env) and are never persisted in public site settings.
        </span>
      </div>

      <form
        action={async (formData: FormData) => {
          'use server';
          await requireAdmin();
          await updateSettingsAction({
            agencyName: formData.get('agencyName')?.toString() || settings.agencyName,
            tagline: formData.get('tagline')?.toString() || settings.tagline,
            businessEmail: formData.get('businessEmail')?.toString() || settings.businessEmail,
            phone: formData.get('phone')?.toString() || settings.phone,
            whatsappNumber: formData.get('whatsappNumber')?.toString() || settings.whatsappNumber,
            responseExpectation: formData.get('responseExpectation')?.toString() || settings.responseExpectation,
            officeLocation: formData.get('officeLocation')?.toString() || settings.officeLocation,
            facebookUrl: formData.get('facebookUrl')?.toString() || settings.facebookUrl,
            instagramUrl: formData.get('instagramUrl')?.toString() || settings.instagramUrl,
            tiktokUrl: formData.get('tiktokUrl')?.toString() || settings.tiktokUrl,
            linkedinUrl: formData.get('linkedinUrl')?.toString() || settings.linkedinUrl,
          });
        }}
        className="bg-white p-8 rounded-2xl border border-warm-300 shadow-sm space-y-6 text-xs text-ink-700"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-bold text-ink mb-1.5">Agency Name</label>
            <input
              type="text"
              name="agencyName"
              defaultValue={settings.agencyName}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">Public Tagline</label>
            <input
              type="text"
              name="tagline"
              defaultValue={settings.tagline}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block font-bold text-ink mb-1.5">Verified Public Email</label>
            <input
              type="email"
              name="businessEmail"
              defaultValue={settings.businessEmail}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">Phone Number</label>
            <input
              type="text"
              name="phone"
              defaultValue={settings.phone}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">WhatsApp Number (e.g. +1555...)</label>
            <input
              type="text"
              name="whatsappNumber"
              defaultValue={settings.whatsappNumber}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-bold text-ink mb-1.5">Response Time Target</label>
            <input
              type="text"
              name="responseExpectation"
              defaultValue={settings.responseExpectation}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">Office / Base Location</label>
            <input
              type="text"
              name="officeLocation"
              defaultValue={settings.officeLocation}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-warm-200 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400">
            Official Social Profile Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-bold text-ink mb-1.5">Instagram URL</label>
              <input
                type="url"
                name="instagramUrl"
                defaultValue={settings.instagramUrl}
                className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-ink mb-1.5">TikTok URL</label>
              <input
                type="url"
                name="tiktokUrl"
                defaultValue={settings.tiktokUrl}
                className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-ink mb-1.5">LinkedIn Company URL</label>
              <input
                type="url"
                name="linkedinUrl"
                defaultValue={settings.linkedinUrl}
                className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-ink mb-1.5">Facebook URL</label>
              <input
                type="url"
                name="facebookUrl"
                defaultValue={settings.facebookUrl}
                className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-600 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Public Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
