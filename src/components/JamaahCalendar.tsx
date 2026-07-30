import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon, Info } from 'lucide-react';
import { JamaahCalendarNote } from '../types';

interface JamaahCalendarProps {
  notes: JamaahCalendarNote[];
  onAddNote: (note: Omit<JamaahCalendarNote, 'id'>) => void;
  onRemoveNote: (id: string) => void;
  jamaahId: string;
}

// Data statis libur nasional Indonesia 2026 (sebagian contoh)
const HOLIDAYS_2026: Record<string, string> = {
  '2026-01-01': 'Tahun Baru Masehi',
  '2026-02-14': 'Tahun Baru Imlek',
  '2026-03-03': 'Hari Raya Idul Fitri 1447 H (Estimasi)',
  '2026-03-04': 'Cuti Bersama Idul Fitri',
  '2026-03-20': 'Hari Raya Nyepi',
  '2026-04-03': 'Wafat Isa Al Masih',
  '2026-05-01': 'Hari Buruh Internasional',
  '2026-05-14': 'Kenaikan Isa Al Masih',
  '2026-05-24': 'Hari Raya Waisak',
  '2026-05-26': 'Hari Raya Idul Adha 1447 H (Estimasi)',
  '2026-06-16': 'Tahun Baru Islam 1448 H',
  '2026-08-17': 'Hari Kemerdekaan RI',
  '2026-08-25': 'Maulid Nabi Muhammad SAW',
  '2026-12-25': 'Hari Raya Natal'
};

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export const JamaahCalendar: React.FC<JamaahCalendarProps> = ({ notes, onAddNote, onRemoveNote, jamaahId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteType, setNewNoteType] = useState<'puasa' | 'kajian' | 'pribadi' | 'lainnya'>('pribadi');

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust so Monday is 0
  };

  const toISODate = (date: Date) => {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
  };

  const getHijriDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-u-ca-islamic', {day: 'numeric', month: 'short'}).format(date);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const handleAddNote = () => {
    if (!selectedDate || !newNoteTitle.trim()) return;
    onAddNote({
      jamaahId,
      date: toISODate(selectedDate),
      title: newNoteTitle,
      type: newNoteType
    });
    setNewNoteTitle('');
    setShowNoteForm(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
        <h3 className="font-bold font-serif flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-amber-400" />
          Kalender Pintar
        </h3>
        <div className="flex items-center gap-4">
          <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-full transition"><ChevronLeft className="w-5 h-5" /></button>
          <span className="font-bold text-sm min-w-[100px] text-center">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-full transition"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
          {DAYS.map((day, idx) => (
            <div key={day} className={`text-xs font-bold ${idx >= 5 ? 'text-rose-500' : 'text-blue-900'}`}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-16 sm:h-20 bg-gray-50/50 rounded-xl" />;
            
            const dateStr = toISODate(date);
            const isToday = dateStr === toISODate(new Date());
            const isSelected = selectedDate && dateStr === toISODate(selectedDate);
            const holiday = HOLIDAYS_2026[dateStr];
            const isSunday = date.getDay() === 0;
            const dayNotes = notes.filter(n => n.date === dateStr && n.jamaahId === jamaahId);
            
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(date)}
                className={`h-16 sm:h-24 relative p-1 sm:p-2 border rounded-xl flex flex-col items-start transition-all ${
                  isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                  : isToday ? 'border-amber-400 bg-amber-50' 
                  : 'border-gray-100 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex justify-between w-full items-start">
                  <span className={`text-sm sm:text-base font-bold ${holiday || isSunday ? 'text-rose-600' : isToday ? 'text-amber-600' : 'text-slate-700'}`}>
                    {date.getDate()}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-emerald-600 font-mono mt-1 hidden sm:block">
                    {getHijriDate(date)}
                  </span>
                </div>
                
                <div className="flex-1 w-full mt-1 overflow-hidden flex flex-col gap-0.5">
                  {holiday && (
                    <div className="text-[7px] sm:text-[9px] bg-rose-100 text-rose-700 px-1 py-0.5 rounded truncate font-bold w-full text-left" title={holiday}>
                      {holiday}
                    </div>
                  )}
                  {dayNotes.map(n => (
                    <div key={n.id} className="text-[7px] sm:text-[9px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded truncate w-full text-left flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      {n.title}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <div className="mt-6 border-t border-gray-100 pt-6 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg text-blue-950 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                  {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h4>
                <p className="text-sm text-emerald-600 font-mono mt-1">{getHijriDate(selectedDate)}</p>
                {HOLIDAYS_2026[toISODate(selectedDate)] && (
                  <p className="text-sm text-rose-600 font-bold mt-1 flex items-center gap-1">
                    <Info className="w-4 h-4" /> Libur: {HOLIDAYS_2026[toISODate(selectedDate)]}
                  </p>
                )}
              </div>
              <button 
                onClick={() => setShowNoteForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition"
              >
                <Plus className="w-4 h-4" /> Catatan
              </button>
            </div>

            {showNoteForm && (
              <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100 flex flex-col gap-3">
                <input 
                  type="text" 
                  value={newNoteTitle}
                  onChange={e => setNewNoteTitle(e.target.value)}
                  placeholder="Misal: Puasa Ayyamul Bidh / Kajian Fiqih"
                  className="w-full text-sm p-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2 text-sm">
                  <label className="flex items-center gap-1"><input type="radio" checked={newNoteType === 'pribadi'} onChange={() => setNewNoteType('pribadi')} /> Pribadi</label>
                  <label className="flex items-center gap-1"><input type="radio" checked={newNoteType === 'puasa'} onChange={() => setNewNoteType('puasa')} /> Puasa</label>
                  <label className="flex items-center gap-1"><input type="radio" checked={newNoteType === 'kajian'} onChange={() => setNewNoteType('kajian')} /> Kajian</label>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={() => setShowNoteForm(false)} className="text-xs text-gray-500 px-3 py-1 hover:bg-gray-200 rounded-lg">Batal</button>
                  <button onClick={handleAddNote} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 font-bold">Simpan</button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {notes.filter(n => n.date === toISODate(selectedDate) && n.jamaahId === jamaahId).length === 0 ? (
                <p className="text-sm text-gray-400 italic text-center py-4">Belum ada catatan pada tanggal ini.</p>
              ) : (
                notes.filter(n => n.date === toISODate(selectedDate) && n.jamaahId === jamaahId).map(n => (
                  <div key={n.id} className="flex justify-between items-center bg-gray-50 border border-gray-100 p-3 rounded-lg">
                    <div>
                      <h5 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${n.type === 'puasa' ? 'bg-amber-500' : n.type === 'kajian' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                        {n.title}
                      </h5>
                      <span className="text-xs text-gray-500 uppercase mt-1 inline-block bg-gray-200 px-1.5 py-0.5 rounded">{n.type}</span>
                    </div>
                    <button onClick={() => onRemoveNote(n.id)} className="text-gray-400 hover:text-rose-500 p-1 bg-white rounded-md shadow-sm border border-gray-200">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
