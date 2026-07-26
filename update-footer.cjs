const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Add isDark prop
content = content.replace(
  'openCatalogPdf?: () => void;',
  'openCatalogPdf?: () => void;\n  isDark?: boolean;'
);
content = content.replace(
  'openCatalogPdf\n}) => {',
  'openCatalogPdf,\n  isDark = false\n}) => {'
);

// Container
content = content.replace(
  'className="bg-[#022C22] text-white border-t border-emerald-900 pt-16 pb-12"',
  'className={`pt-16 pb-12 border-t transition-colors ${isDark ? "bg-[#022C22] text-white border-emerald-900" : "bg-stone-50 text-emerald-900 border-emerald-200"}`}'
);

// Logo isDark
content = content.replace(
  '<AzzikraBrandLogo variant="navbar" isDark={true} />',
  '<AzzikraBrandLogo variant="navbar" isDark={isDark} />'
);

// Text colors
content = content.replace(
  /className="text-xs text-emerald-300 leading-relaxed font-sans"/g,
  'className={`text-xs leading-relaxed font-sans transition-colors ${isDark ? "text-emerald-300" : "text-emerald-700"}`}'
);

content = content.replace(
  /className="pt-2 text-xs text-emerald-300 space-y-1\.5 font-mono"/g,
  'className={`pt-2 text-xs space-y-1.5 font-mono transition-colors ${isDark ? "text-emerald-300" : "text-emerald-700"}`}'
);

content = content.replace(
  /className="text-sm font-mono font-bold uppercase tracking-wider text-white"/g,
  'className={`text-sm font-mono font-bold uppercase tracking-wider transition-colors ${isDark ? "text-white" : "text-emerald-950"}`}'
);

content = content.replace(
  /className="space-y-2 text-xs text-emerald-300 font-medium"/g,
  'className={`space-y-2 text-xs font-medium transition-colors ${isDark ? "text-emerald-300" : "text-emerald-700"}`}'
);

// Buttons
content = content.replace(
  /className="text-emerald-300 hover:text-white transition-colors cursor-pointer w-full text-left flex items-center gap-2 group"/g,
  'className={`transition-colors cursor-pointer w-full text-left flex items-center gap-2 group ${isDark ? "text-emerald-300 hover:text-white" : "text-emerald-700 hover:text-emerald-950"}`}'
);

content = content.replace(
  /className="w-3\.5 h-3\.5 text-emerald-500 group-hover:text-amber-400 transition-colors"/g,
  'className={`w-3.5 h-3.5 transition-colors ${isDark ? "text-emerald-500 group-hover:text-amber-400" : "text-emerald-600 group-hover:text-emerald-900"}`}'
);

content = content.replace(
  /className="text-emerald-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 group"/g,
  'className={`transition-colors cursor-pointer inline-flex items-center gap-2 group ${isDark ? "text-emerald-300 hover:text-white" : "text-emerald-700 hover:text-emerald-950"}`}'
);

// Action Buttons
content = content.replace(
  /className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider py-2\.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-emerald-400\/30"/g,
  'className={`w-full font-mono font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border ${isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/30" : "bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600/30"}`}'
);

content = content.replace(
  /className="w-full bg-emerald-950\/90 hover:bg-emerald-900 text-amber-300 border border-amber-500\/40 font-bold py-2\.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"/g,
  'className={`w-full font-bold py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md border ${isDark ? "bg-emerald-950/90 hover:bg-emerald-900 text-amber-300 border-amber-500/40" : "bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-300"}`}'
);

// Bottom bar
content = content.replace(
  /className="pt-8 border-t border-emerald-800\/50 flex flex-col md:flex-row items-center justify-between gap-4 text-\[10px\] text-emerald-400 font-mono"/g,
  'className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono transition-colors ${isDark ? "border-emerald-800/50 text-emerald-400" : "border-emerald-200 text-emerald-600"}`}'
);

fs.writeFileSync('src/components/Footer.tsx', content);
console.log('Update footer complete.');
