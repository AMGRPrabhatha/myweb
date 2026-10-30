export default function WhatsAppButton({ number }: { number: string }) {
  const digits = number.replace(/\D/g, '');

  if (!digits) return null;

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] active:scale-95"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="h-8 w-8 fill-current">
        <path d="M16 .5A15.5 15.5 0 0 0 2.6 23.8L.5 31.5l7.9-2.1A15.5 15.5 0 1 0 16 .5Zm0 28.2a12.6 12.6 0 0 1-6.4-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A12.7 12.7 0 1 1 16 28.7Zm7-9.5c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.9c-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.3s1.4 3.8 1.6 4c.2.2 2.8 4.3 6.8 6 1 .4 1.8.7 2.5.9 1 .3 2 .2 2.8.2.9-.1 2.3-1 2.6-2 .3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5Z" />
      </svg>
    </a>
  );
}
