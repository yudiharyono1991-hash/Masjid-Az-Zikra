import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight } from 'lucide-react';
import { PetugasJadwal } from '../types';

interface KalenderKegiatanSectionProps {
  petugasList: PetugasJadwal[];
  isDark?: boolean;
}

export const KalenderKegiatanSection: React.FC<KalenderKegiatanSectionProps> = ({
  petugasList = [],
  isDark = false
}) => {
  // Use current dates for the calendar, or just mock a static layout for the UI design requested
  const daysInMonth = 31;
  const firstDayOffset = 3; // e.g. Wednesday

  const renderCalendar = () => {
    return (
      <div className={`p-6 rounded-3xl shadow-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Juli 2026
          </h3>
          <div className="flex gap-2">
            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['MG', 'SN', 'SL', 'RB', 'KM', 'JM', 'SB'].map(day => (
            <div key={day} className="text-xs font-bold text-slate-400 py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === 15; // Example active day
            const hasEvent = [5, 7, 11, 12, 19, 26].includes(day);

            return (
              <button
                key={day}
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-colors
                  ${isToday ? 'bg-blue-600 text-white shadow-md font-bold' : ''}
                  ${hasEvent && !isToday ? (isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700') : ''}
                  ${!isToday && !hasEvent ? (isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100') : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] sm:text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full border border-slate-300"></div> Tersedia</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-100 border border-blue-300"></div> Ada Event</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Hari Ini</div>
        </div>
      </div>
    );
  };

  return (
    <section className={`min-h-screen ${isDark ? 'bg-[#0a1128]' : 'bg-slate-50'}`}>
      
      {/* Blue Header Section */}
      <div className="bg-[#1e3a8a] text-white py-16 sm:py-24 text-center px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4">
          Agenda & Program
        </h1>
        <p className="text-blue-200 text-sm sm:text-base max-w-2xl mx-auto">
          Ikuti kegiatan kajian, sosial, dan pendidikan di Masjid Tazkia.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 sm:-mt-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Calendar Side */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            {renderCalendar()}
          </div>

          {/* Agenda List Side */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className={`text-xl font-bold font-serif mb-6 ${isDark ? 'text-white' : 'text-[#1e3a8a]'}`}>
              Agenda Mendatang
            </h2>

            <div className="space-y-4">
              {petugasList.filter(p => p.khatibJumat).map((agenda, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-xl border border-blue-100 flex flex-col overflow-hidden shadow-sm">
                      <div className="bg-blue-600 text-white text-[10px] font-bold text-center py-1.5 uppercase tracking-wider">
                        Jumat
                      </div>
                      <div className="flex-1 bg-blue-50/50 flex flex-col items-center justify-center p-1">
                        <span className="text-2xl font-bold text-blue-900 leading-none">
                          {agenda.date.split('-')[2] || '??'}
                        </span>
                        <span className="text-xs font-semibold text-blue-700">
                          {agenda.date.split('-')[1] || '??'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <h3 className={`font-bold text-lg leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Shalat Jum'at Masjid Tazkia | {agenda.khatibJumat}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{agenda.timeJumat || '12:00 WIB'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>Masjid Tazkia Sentul City</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2">
                          Detail & Daftar
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

              {petugasList.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  Belum ada agenda yang dijadwalkan.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
