import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';
import { JamaahFeedback } from '../types';

interface ChatDkmProps {
  jamaahId: string;
  jamaahName: string;
  feedbacks: JamaahFeedback[];
  onSendMessage: (feedback: Omit<JamaahFeedback, 'id' | 'createdAt' | 'status'>) => void;
}

export const ChatDkm: React.FC<ChatDkmProps> = ({ jamaahId, jamaahName, feedbacks, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const myFeedbacks = feedbacks.filter(f => f.senderId === jamaahId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage({
      senderId: jamaahId,
      senderName: jamaahName,
      message: message.trim()
    });
    setMessage('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-[500px]">
      <div className="bg-blue-900 text-white p-4 flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-full">
          <MessageCircle className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="font-bold font-serif">Layanan / Chat DKM</h3>
          <p className="text-[10px] text-blue-200">Kirim masukan, pertanyaan, atau testimoni</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {myFeedbacks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-sm text-center px-8">Belum ada pesan. Silakan kirimkan pertanyaan atau masukan Anda di sini.</p>
          </div>
        ) : (
          myFeedbacks.map(f => (
            <div key={f.id} className="space-y-2">
              {/* Pesan Saya */}
              <div className="flex flex-col items-end">
                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                  <p className="text-sm">{f.message}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                  <span>{new Date(f.createdAt).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</span>
                  {f.status === 'replied' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Clock className="w-3 h-3" />}
                </div>
              </div>

              {/* Balasan DKM */}
              {f.reply && (
                <div className="flex flex-col items-start mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">DKM</span>
                    </div>
                    <span className="text-xs font-bold text-gray-700">Pengurus Masjid</span>
                  </div>
                  <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
                    <p className="text-sm">{f.reply}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 pl-7">
                    {f.repliedAt ? new Date(f.repliedAt).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }) : ''}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik pesan Anda..."
          className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={!message.trim()}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-blue-950 p-3 rounded-xl transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
