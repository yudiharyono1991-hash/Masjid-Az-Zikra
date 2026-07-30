export interface AlMatsuratItem {
  id: string;
  arabic: string;
  latin: string;
  translation: string;
  count: number;
  type: 'pagi' | 'petang' | 'keduanya';
  title?: string;
}

export const AL_MATSURAT_DATA: AlMatsuratItem[] = [
  {
    id: 'm1',
    title: 'Membaca Ayat Kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: 'Allahu laa ilaaha illaa huwal hayyul qoyyuum, laa ta\'khudzuhuu sinatuw walaa nauum, lahuu maa fis samaawaati wa maa fil ardh, man dzalladzii yasyfa\'u \'indahuu illaa bi idznih, ya\'lamu maa baina aidiihim wamaa kholfahum, wa laa yuhiithuuna bisyai-im min \'ilmihii illaa bimaa syaa-a, wasi\'a kursiyyuhus samaawaati wal ardh, wa laa ya-uuduhuu hifzhuhumaa wahuwal \'aliyyul \'azhiim.',
    translation: 'Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafa\'at di sisi Allah tanpa izin-Nya? Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar.',
    count: 1,
    type: 'keduanya'
  },
  {
    id: 'm2',
    title: 'Membaca Surat Al-Ikhlas',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ. اللَّهُ الصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    latin: 'Qul huwallahu ahad. Allahus shomad. Lam yalid walam yuulad. Walam yakul lahuu kufuwan ahad.',
    translation: 'Katakanlah: "Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan. Dan tidak ada seorangpun yang setara dengan Dia".',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm3',
    title: 'Membaca Surat Al-Falaq',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ. مِن شَرِّ مَا خَلَقَ. وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ. وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ. وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin: 'Qul a\'uudzu birobbil falaq. Min syarri maa kholaq. Wamin syarri ghoosiqin idzaa waqob. Wamin syarrin naffaatsaati fil \'uqod. Wamin syarri haasidin idzaa hasad.',
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan Yang Menguasai subuh. Dari kejahatan makhluk-Nya. Dan dari kejahatan malam apabila telah gelap gulita. Dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul. Dan dari kejahatan pendengki bila ia dengki".',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm4',
    title: 'Membaca Surat An-Nas',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ. مَلِكِ النَّاسِ. إِلَٰهِ النَّاسِ. مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ. الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ. مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Qul a\'uudzu birobbin naas. Malikin naas. Ilaahin naas. Min syarril waswaasil khonnaas. Alladzii yuwaswisu fii shuduurin naas. Minal jinnati wan naas.',
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi. Yang membisikkan (kejahatan) ke dalam dada manusia. Dari (golongan) jin dan manusia".',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm5',
    title: 'Sayyidul Istighfar',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: 'Allahumma anta robbii laa ilaaha illaa anta, kholaqtanii wa anaa \'abduka wa anaa \'alaa \'ahdika wa wa\'dika mas-tatho\'tu, a\'uudzubika min syarri maa shona\'tu, abuu-u laka bini\'matika \'alayya wa abuu-u laka bidzanbii faghfirlii fa-innahuu laa yaghfirudz dzunuuba illaa anta.',
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan yang berhak disembah kecuali Engkau. Engkaulah yang menciptakanku dan aku adalah hamba-Mu. Aku akan setia pada perjanjianku dengan-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku. Sesungguhnya tiada yang mengampuni dosa-dosa kecuali Engkau.',
    count: 1,
    type: 'keduanya'
  }
];
