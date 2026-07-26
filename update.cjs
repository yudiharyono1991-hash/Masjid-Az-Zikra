const fs = require('fs');
let content = fs.readFileSync('src/components/ProgramCardsSection.tsx', 'utf8');

content = content.replace(
  'className="py-16 bg-emerald-900/50 text-emerald-100 border-b border-emerald-800"',
  'className={`py-16 border-b transition-colors ${isDark ? "bg-emerald-950 text-emerald-100 border-emerald-800" : "bg-stone-50 text-emerald-900 border-emerald-200"}`}'
);

content = content.replace(
  'className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-8 border-b border-emerald-800/50"',
  'className={`text-center max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-8 border-b transition-colors ${isDark ? "border-emerald-800/50" : "border-emerald-200"}`}'
);

content = content.replace(
  'className="text-2xl sm:text-5xl lg:text-6xl font-serif text-white leading-snug sm:leading-[1.15] tracking-tight drop-shadow-lg"',
  'className={`text-2xl sm:text-5xl lg:text-6xl font-serif leading-snug sm:leading-[1.15] tracking-tight drop-shadow-lg transition-colors ${isDark ? "text-white" : "text-emerald-950"}`}'
);

content = content.replace(
  'className="text-emerald-100 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans px-2"',
  'className={`text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans px-2 transition-colors ${isDark ? "text-emerald-100" : "text-emerald-700"}`}'
);

content = content.replace(
  'className="text-2xl sm:text-3xl font-serif text-white"',
  'className={`text-2xl sm:text-3xl font-serif transition-colors ${isDark ? "text-white" : "text-emerald-950"}`}'
);

content = content.replace(
  'className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-800"',
  'className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl border transition-colors ${isDark ? "bg-emerald-950/80 border-emerald-800" : "bg-white border-emerald-200 shadow-sm"}`}'
);

content = content.replace(
  /className="w-full bg-emerald-900 border border-emerald-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-sm text-white outline-none"/g,
  'className={`w-full border rounded-xl pl-9 pr-3 py-2 text-sm outline-none transition-colors ${isDark ? "bg-emerald-900 border-emerald-800 focus:border-amber-400 text-white" : "bg-stone-50 border-emerald-200 focus:border-emerald-500 text-emerald-900"}`}'
);

content = content.replace(
  /className="w-full sm:w-auto bg-emerald-900 border border-emerald-800 focus:border-amber-400 rounded-xl px-4 py-2 text-sm text-white outline-none cursor-pointer appearance-none"/g,
  'className={`w-full sm:w-auto border rounded-xl px-4 py-2 text-sm outline-none cursor-pointer appearance-none transition-colors ${isDark ? "bg-emerald-900 border-emerald-800 focus:border-amber-400 text-white" : "bg-stone-50 border-emerald-200 focus:border-emerald-500 text-emerald-900"}`}'
);

content = content.replace(
  /className="bg-emerald-900\/90 border border-emerald-800 rounded-2xl overflow-hidden hover:border-emerald-400\/60 transition-all flex flex-col group shadow-md"/g,
  'className={`border rounded-2xl overflow-hidden transition-all flex flex-col group shadow-md ${isDark ? "bg-emerald-900/90 border-emerald-800 hover:border-emerald-400/60" : "bg-white border-emerald-200 hover:border-emerald-400 hover:shadow-lg"}`}'
);

content = content.replace(
  /className="text-lg font-serif font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors line-clamp-2 cursor-pointer"/g,
  'className={`text-lg font-serif font-bold mt-1 transition-colors line-clamp-2 cursor-pointer ${isDark ? "text-white group-hover:text-emerald-300" : "text-emerald-950 group-hover:text-emerald-600"}`}'
);

content = content.replace(
  /className="text-emerald-300 text-xs mt-2 line-clamp-3 leading-relaxed"/g,
  'className={`text-xs mt-2 line-clamp-3 leading-relaxed ${isDark ? "text-emerald-300" : "text-emerald-700"}`}'
);

content = content.replace(
  /className="text-white font-bold font-mono text-sm"/g,
  'className={`font-bold font-mono text-sm ${isDark ? "text-white" : "text-emerald-950"}`}'
);

content = content.replace(
  /className="text-emerald-300 font-mono text-xs font-bold"/g,
  'className={`font-mono text-xs font-bold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}'
);

content = content.replace(
  /className="flex items-center justify-between text-xs text-emerald-300 pt-1"/g,
  'className={`flex items-center justify-between text-xs pt-1 ${isDark ? "text-emerald-300" : "text-emerald-700"}`}'
);

content = content.replace(
  /className="bg-emerald-950\/80 rounded-2xl p-3\.5 sm:p-6 border border-emerald-800\/80 shadow-md relative overflow-hidden group hover:border-amber-400\/50 transition-all"/g,
  'className={`rounded-2xl p-3.5 sm:p-6 border shadow-md relative overflow-hidden group transition-all ${isDark ? "bg-emerald-950/80 border-emerald-800/80 hover:border-amber-400/50" : "bg-white border-emerald-200 hover:border-emerald-400"}`}'
);

content = content.replace(
  /className="text-base xs:text-xl sm:text-3xl font-serif font-black text-white tracking-tight truncate"/g,
  'className={`text-base xs:text-xl sm:text-3xl font-serif font-black tracking-tight truncate ${isDark ? "text-white" : "text-emerald-950"}`}'
);

fs.writeFileSync('src/components/ProgramCardsSection.tsx', content);
console.log('Update complete.');
