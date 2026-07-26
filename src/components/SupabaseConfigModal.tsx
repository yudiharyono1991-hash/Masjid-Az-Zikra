import React, { useState } from 'react';
import { Database, Check, Key, Link as LinkIcon, X, Server, Copy, Shield } from 'lucide-react';
import { generateSupabaseSQLSchema } from '../lib/store';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  currentKey: string;
  onSave: (url: string, key: string) => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
  currentKey,
  onSave
}) => {
  const [url, setUrl] = useState(currentUrl);
  const [key, setKey] = useState(currentKey);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(url.trim(), key.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(generateSupabaseSQLSchema());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1329] border border-amber-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative text-slate-100 my-8">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-white">
                Pengaturan Database Supabase
              </h3>
              <p className="text-xs text-slate-400">
                Konfigurasi URL & Anon Key Supabase untuk sync data
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Shield className="w-4 h-4" />
              <span>Status Penyimpanan Data:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Aplikasi ini secara otomatis menyimpan data di <strong>Local Persistence Engine</strong>. Jika Anda telah membuat proyek Supabase di dashboard Supabase, masukkan URL dan Anon Key di bawah ini.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />
                Supabase Project URL:
              </label>
              <input
                type="text"
                placeholder="https://xyzcompany.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                Supabase Anon / Public Key:
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>
          </div>

          {/* SQL Exporter Button */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleCopySchema}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'SQL Schema Tersalin!' : 'Salin SQL Schema Supabase'}</span>
            </button>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              {saved ? <Check className="w-4 h-4" /> : <Server className="w-4 h-4" />}
              <span>{saved ? 'Tersimpan!' : 'Simpan Kredensial'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
