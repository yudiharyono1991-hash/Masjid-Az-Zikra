const fs = require('fs');
let code = fs.readFileSync('src/components/DigitalIbadahModal.tsx', 'utf8');

// 1. Remove doa from Sub Tabs Navigation
code = code.replace("{ id: 'doa', label: 'Doa & Hadis Pilihan', icon: Sparkles }", "");
// Fix dangling comma if any
code = code.replace(/,\s*\]/, ']');

// 2. Change Quran tab label
code = code.replace(/label:\s*"Al-Qur\\'an Digital Masjid Tazkia"/g, 'label: "Al-Qur\\'an Tazkia"');

// 3. Replace Quran render block (from {/* 1. AL-QUR'AN DIGITAL WITH AUDIO ENGINE */} to {/* 2. JADWAL SHALAT & ADZAN */})
code = code.replace(
  /\{\/\* 1\. AL-QUR'AN DIGITAL WITH AUDIO ENGINE \*\/\}[\s\S]*?(?=\{\/\* 2\. JADWAL SHALAT & ADZAN \*\/})/m,
  `{/* 1. AL-QUR'AN DIGITAL (EXTERNAL IFRAME) */}
          {activeSubTab === 'quran' && (
            <div className="bg-slate-50 text-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-[75vh]">
              <iframe src="https://quran.tazkia.ac.id/" className="w-full h-full" style={{ border: 0 }} title="Al-Quran Tazkia" />
            </div>
          )}

          `
);

// 4. Remove Doa render block
code = code.replace(
  /\{\/\* 4\. DOA & HADIS \*\/\}[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*\);\s*};\s*$)/m,
  ''
);

// 5. Remove unused state variables to prevent ESLint build failures
code = code.replace(/const \[selectedSurahNumber[\s\S]*?const \[autoScrollEnabled.*?;\n/m, '');
code = code.replace(/const \[doaCategory[\s\S]*?const \[doaSearch.*?;\n/m, '');
code = code.replace(/const filteredSurahs[\s\S]*?const currentAyahs.*?;\n/m, '');
code = code.replace(/const filteredDoa[\s\S]*?return matchSearch.*?;\n\s*\}\);\n/m, '');
code = code.replace(/const ayahRefs[\s\S]*?const audioRef.*?;\n/m, '');

// 6. Remove useEffects related to old Quran audio
code = code.replace(/useEffect\(\(\) => \{\n\s*let isMounted[\s\S]*?handleError\);[\s\S]*?\}\n\s*\}, \[isPlayingAudio, activeAyahIndex, currentAyahs\]\);\n/m, '');

// 7. Remove toggleAudioPlayer and handlePlaySpecificAyah
code = code.replace(/const toggleAudioPlayer[\s\S]*?setIsPlayingAudio\(true\);\n\s*\};\n/m, '');

fs.writeFileSync('src/components/DigitalIbadahModal.tsx', code);
console.log('Done refactoring tabs and UI');
