import { MessageCircle, Facebook } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

      {/* WhatsApp */}
      <a
        href="https://wa.me/66862697138"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <MessageCircle size={24} />
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/61588477663667"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <Facebook size={24} />
      </a>

    </div>
  );
}