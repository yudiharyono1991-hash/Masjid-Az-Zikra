import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

interface AzZikraAiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AzZikraAiAssistantModal: React.FC<AzZikraAiAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [
        {
          text: "Assalamu'alaikum warahmatullah. Saya adalah **Az-Zikra AI Syariah Assistant**. \n\nAda yang bisa saya bantu mengenai perhitungan ZISWAF, hukum Fiqh ibadah/keuangan, jadwal Zikir Akbar, Sejarah Masjid, atau program keumatan di Masjid Az-Zikra Sentul?"
        }
      ]
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgText = input.trim();
    setInput('');

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', parts: [{ text: userMsgText }] }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          history: messages.slice(-6)
        })
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages(prev => [
          ...prev,
          { role: 'model', parts: [{ text: data.reply }] }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            parts: [
              {
                text: `Maaf, ${data.error || 'tidak dapat menghubungi AI Assistant.'} Mohon pastikan GEMINI_API_KEY telah terpasang di Secrets Panel.`
              }
            ]
          }
        ]);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          parts: [{ text: 'Maaf, terjadi kesalahan koneksi jaringan saat memproses pertanyaan Anda.' }]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-emerald-950/70 backdrop-blur-sm">
      <div className="bg-[#022C22] border border-amber-500/40 rounded-3xl w-full max-w-lg h-[85vh] flex flex-col shadow-2xl overflow-hidden relative text-emerald-100 my-auto">
        {/* Header Bar */}
        <div className="bg-[#064E3B] px-6 py-4 border-b border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shadow">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif text-white">
                Az-Zikra AI Syariah Assistant
              </h3>
              <p className="text-[11px] text-amber-300 font-medium">
                Kecerdasan Buatan Konsultasi ZISWAF & Fiqh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-emerald-950/90">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs leading-relaxed ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'model' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] space-y-2 ${
                  m.role === 'user'
                    ? 'bg-amber-400 text-emerald-950 font-bold rounded-tr-none'
                    : 'bg-emerald-900/90 border border-emerald-800 text-white rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.parts[0].text}</div>
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white border border-emerald-700 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-emerald-900 p-3 rounded-2xl border border-emerald-800 w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI sedang memikirkan jawaban Syariah...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Form Footer */}
        <form onSubmit={handleSend} className="p-4 bg-[#064E3B] border-t border-emerald-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Tanyakan seputar ZISWAF, Fiqh, atau Layanan Az-Zikra..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-emerald-950 border border-emerald-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white outline-none placeholder-emerald-300/50"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-emerald-950 p-2.5 rounded-xl transition-all cursor-pointer shadow-md font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
