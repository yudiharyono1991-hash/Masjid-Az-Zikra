export interface AlMatsuratItem {
  id: string;
  arabic: string;
  latin: string;
  translation: string;
  count: number;
  type: 'pagi' | 'petang' | 'keduanya';
  title?: string;
  reference?: string;
}

export const AL_MATSURAT_DATA: AlMatsuratItem[] = [
  {
    id: 'm-alfatihah',
    title: 'Surat Al-Fatihah',
    reference: 'QS. Al-Fatihah: 1-7',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَٰنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    latin: 'Bismillahir-rahmanir-rahim. Alhamdu lillahi rabbil-\'alamin. Ar-rahmanir-rahim. Maliki yaumid-din. Iyyaka na\'budu wa iyyaka nasta\'in. Ihdinas-siratal-mustaqim. Siratal-lazina an\'amta \'alaihim, ghairil-maghdubi \'alaihim wa lad-dallin.',
    translation: 'Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam. Maha Pemurah lagi Maha Penyayang. Yang menguasai di Hari Pembalasan. Hanya Engkaulah yang kami sembah, dan hanya kepada Engkaulah kami meminta pertolongan. Tunjukilah kami jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat.',
    count: 1,
    type: 'keduanya'
  },
  {
    id: 'm-al-baqarah-1-5',
    title: 'Awal Surat Al-Baqarah',
    reference: 'QS. Al-Baqarah: 1-5',
    arabic: 'الم. ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ. الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ. وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ. أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
    latin: 'Alif laaam miiim. Dzaalikal kitaabu laa raiba fiihi hudal lilmuttaqiin. Alladziina yu\'minuuna bil ghaibi wayuqiimuunash shalaata wamimmaa razaqnaahum yunfiquun. Walladziina yu\'minuuna bimaa unzila ilaika wamaa unzila min qablika wabil aakhirati hum yuuqinuun. Ulaa-ika \'alaa hudam mir rabbihim wa ulaa-ika humul muflihuun.',
    translation: 'Alif laam miim. Kitab (Al Quran) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertaqwa, (yaitu) mereka yang beriman kepada yang ghaib, yang mendirikan shalat, dan menafkahkan sebahagian rezeki yang Kami anugerahkan kepada mereka. Dan mereka yang beriman kepada Kitab (Al Quran) yang telah diturunkan kepadamu dan Kitab-kitab yang telah diturunkan sebelummu, serta mereka yakin akan adanya (kehidupan) akhirat. Mereka itulah yang tetap mendapat petunjuk dari Tuhan mereka, dan merekalah orang-orang yang beruntung.',
    count: 1,
    type: 'keduanya'
  },
  {
    id: 'm-ayat-kursi',
    title: 'Ayat Kursi',
    reference: 'QS. Al-Baqarah: 255',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: 'Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta\'khudzuhuu sinatuw walaa nauum, lahuu maa fis samaawaati wamaa fil ardh, man dzalladzii yasyfa\'u \'indahuu illaa biidznih, ya\'lamu maa baina aidiihim wamaa khalfahum, walaa yuhiithuuna bisyai-im min \'ilmihii illaa bimaa syaa-a, wasi\'a kursiyyuhus samaawaati wal ardh, walaa ya-uuduhuu hifzhuhumaa wahuwal \'aliyyul \'azhiim.',
    translation: 'Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafa\'at di sisi Allah tanpa izin-Nya? Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar.',
    count: 1,
    type: 'keduanya'
  },
  {
    id: 'm-al-baqarah-284',
    title: 'Akhir Surat Al-Baqarah',
    reference: 'QS. Al-Baqarah: 284-286',
    arabic: 'لِّلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ وَإِن تُبْدُوا مَا فِي أَنفُسِكُمْ أَوْ تُخْفُوهُ يُحَاسِبْكُم بِهِ اللَّهُ ۖ فَيَغْفِرُ لِمَن يَشَاءُ وَيُعَذِّبُ مَن يَشَاءُ ۗ وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    latin: 'Lillahi maa fis samaawaati wamaa fil ardh. Wa in tubduu maa fii anfusikum au tukhfuuhu yuhaasibkum bihillah. Fayaghfiru liman yasyaa-u wa yu\'adzdzibu man yasyaa-u. Wallahu \'alaa kulli syai-in qadiir. Aamanar rasuulu bimaa unzila ilaihi mir rabbihi wal mu\'minuun. Kullun aamana billahi wa malaa-ikatihii wa kutubihii wa rusulihii, laa nufarriqu baina ahadim mir rusulih. Wa qaaluu sami\'naa wa atha\'naa, ghufraanaka rabbanaa wa ilaikal mashiir. Laa yukallifullahu nafsan illaa wus\'ahaa. Lahaa maa kasabat wa \'alaihaa maktasabat. Rabbanaa laa tu-aakhidznaa in nasiinaa au akhtha\'naa. Rabbanaa walaa tahmil \'alainaa ishran kamaa hamaltahuu \'alalladziina min qablinaa. Rabbanaa walaa tuhammilnaa maa laa thaaqata lanaa bihi. Wa\'fu \'annaa waghfirlanaa warhamnaa, anta maulaanaa fanshurnaa \'alal qaumil kaafiriin.',
    translation: 'Kepunyaan Allah-lah segala apa yang ada di langit dan apa yang ada di bumi. Dan jika kamu melahirkan apa yang ada di dalam hatimu atau kamu menyembunyikannya, niscaya Allah akan membuat perhitungan dengan kamu tentang perbuatanmu itu. Maka Allah mengampuni siapa yang dikehendaki-Nya dan menyiksa siapa yang dikehendaki-Nya; dan Allah Maha Kuasa atas segala sesuatu. Rasul telah beriman kepada Al Quran yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang yang beriman... Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya...',
    count: 1,
    type: 'keduanya'
  },
  {
    id: 'm-al-ikhlas',
    title: 'Surat Al-Ikhlas',
    reference: 'QS. Al-Ikhlas: 1-4',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قُلْ هُوَ اللَّهُ أَحَدٌ. اللَّهُ الصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    latin: 'Bismillahir-rahmanir-rahim. Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakul lahu kufuwan ahad.',
    translation: 'Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Katakanlah: "Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan. Dan tidak ada seorangpun yang setara dengan Dia".',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm-al-falaq',
    title: 'Surat Al-Falaq',
    reference: 'QS. Al-Falaq: 1-5',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ. مِن شَرِّ مَا خَلَقَ. وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ. وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ. وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin: 'Bismillahir-rahmanir-rahim. Qul a\'uzu birabbil-falaq. Min syarri ma khalaq. Wa min syarri ghasiqin iza waqab. Wa min syarrin-naffasati fil-\'uqad. Wa min syarri hasidin iza hasad.',
    translation: 'Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Katakanlah: "Aku berlindung kepada Tuhan Yang Menguasai subuh. Dari kejahatan makhluk-Nya. Dan dari kejahatan malam apabila telah gelap gulita. Dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul. Dan dari kejahatan pendengki bila ia dengki".',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm-an-nas',
    title: 'Surat An-Nas',
    reference: 'QS. An-Nas: 1-6',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ النَّاسِ. مَلِكِ النَّاسِ. إِلَٰهِ النَّاسِ. مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ. الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ. مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Bismillahir-rahmanir-rahim. Qul a\'uzu birabbin-nas. Malikin-nas. Ilahin-nas. Min syarril-waswasil-khannas. Allazi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.',
    translation: 'Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Katakanlah: "Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi. Yang membisikkan (kejahatan) ke dalam dada manusia. Dari (golongan) jin dan manusia".',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm-asbahna',
    title: 'Doa Pagi Hari',
    reference: 'HR. Muslim',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ. رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin: 'Ashbahna wa ashbahal mulku lillah, walhamdulillah laa ilaaha illallahu wahdahu laa syariikalah, lahul mulku walahul hamdu wahuwa \'alaa kulli syai-in qadiir. Rabbi as-aluka khaira maa fii haadzal yaumi wa khaira maa ba\'dahu wa a\'uudzubika min syarri maa fii haadzal yaumi wa syarri maa ba\'dahu. Rabbi a\'uudzubika minal kasali wasuu-il kibar. Rabbi a\'uudzubika min \'adzaabin fin naari wa \'adzaabin fil qabr.',
    translation: 'Kami masuki pagi ini dan segenap kerajaan adalah milik Allah, segala puji bagi Allah, tiada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya lah segala kerajaan dan milik-Nya lah segala pujian. Dia Maha Kuasa atas segala sesuatu. Ya Tuhanku, aku memohon kepada-Mu kebaikan di hari ini dan kebaikan sesudahnya, dan aku berlindung kepada-Mu dari keburukan hari ini dan keburukan sesudahnya. Ya Tuhanku, aku berlindung kepada-Mu dari kemalasan dan keburukan di masa tua. Ya Tuhanku, aku berlindung kepada-Mu dari siksa di neraka dan siksa di kubur.',
    count: 1,
    type: 'pagi'
  },
  {
    id: 'm-amsaina',
    title: 'Doa Petang Hari',
    reference: 'HR. Muslim',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ. رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin: 'Amsainaa wa amsal mulku lillah, walhamdulillah laa ilaaha illallahu wahdahu laa syariikalah, lahul mulku walahul hamdu wahuwa \'alaa kulli syai-in qadiir. Rabbi as-aluka khaira maa fii haadzihil lailati wa khaira maa ba\'dahaa wa a\'uudzubika min syarri maa fii haadzihil lailati wa syarri maa ba\'dahaa. Rabbi a\'uudzubika minal kasali wasuu-il kibar. Rabbi a\'uudzubika min \'adzaabin fin naari wa \'adzaabin fil qabr.',
    translation: 'Kami masuki petang ini dan segenap kerajaan adalah milik Allah, segala puji bagi Allah, tiada sesembahan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya lah segala kerajaan dan milik-Nya lah segala pujian. Dia Maha Kuasa atas segala sesuatu. Ya Tuhanku, aku memohon kepada-Mu kebaikan di malam ini dan kebaikan sesudahnya, dan aku berlindung kepada-Mu dari keburukan malam ini dan keburukan sesudahnya. Ya Tuhanku, aku berlindung kepada-Mu dari kemalasan dan keburukan di masa tua. Ya Tuhanku, aku berlindung kepada-Mu dari siksa di neraka dan siksa di kubur.',
    count: 1,
    type: 'petang'
  },
  {
    id: 'm-sayyidul-istighfar',
    title: 'Sayyidul Istighfar',
    reference: 'HR. Bukhari',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: 'Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa \'abduka wa anaa \'alaa \'ahdika wawa\'dika mastatha\'tu, a\'uudzubika min syarri maa shana\'tu, abuu-u laka bini\'matika \'alayya wa abuu-u laka bidzanbii faghfir lii fa-innahuu laa yaghfirudz dzunuuba illaa anta.',
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan yang berhak disembah kecuali Engkau. Engkaulah yang menciptakanku dan aku adalah hamba-Mu. Aku akan setia pada perjanjianku dengan-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku. Sesungguhnya tiada yang mengampuni dosa-dosa kecuali Engkau.',
    count: 1,
    type: 'keduanya'
  },
  {
    id: 'm-allahumma-inni-asbahtu',
    title: 'Syukur Pagi Hari',
    reference: 'HR. Abu Dawud',
    arabic: 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
    latin: 'Allahumma innii ashbahtu usyhiduka wa usyhidu hamalata \'arsyika wa malaa-ikataka wa jamii\'a khalqika annaka antallahu laa ilaaha illaa anta wahdaka laa syariikalaka wa anna Muhammadan \'abduka wa rasuuluk.',
    translation: 'Ya Allah, sesungguhnya aku di waktu pagi ini mempersaksikan Engkau, malaikat pemikul 'Arsy-Mu, malaikat-malaikat-Mu, dan seluruh makhluk-Mu, bahwa sesungguhnya Engkau adalah Allah, tiada Tuhan berhak disembah kecuali Engkau semata, tiada sekutu bagi-Mu dan sesungguhnya Muhammad adalah hamba dan utusan-Mu.',
    count: 4,
    type: 'pagi'
  },
  {
    id: 'm-allahumma-inni-amsaytu',
    title: 'Syukur Petang Hari',
    reference: 'HR. Abu Dawud',
    arabic: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
    latin: 'Allahumma innii amsaitu usyhiduka wa usyhidu hamalata \'arsyika wa malaa-ikataka wa jamii\'a khalqika annaka antallahu laa ilaaha illaa anta wahdaka laa syariikalaka wa anna Muhammadan \'abduka wa rasuuluk.',
    translation: 'Ya Allah, sesungguhnya aku di waktu petang ini mempersaksikan Engkau, malaikat pemikul 'Arsy-Mu, malaikat-malaikat-Mu, dan seluruh makhluk-Mu, bahwa sesungguhnya Engkau adalah Allah, tiada Tuhan berhak disembah kecuali Engkau semata, tiada sekutu bagi-Mu dan sesungguhnya Muhammad adalah hamba dan utusan-Mu.',
    count: 4,
    type: 'petang'
  },
  {
    id: 'm-radhitu',
    title: 'Ridho Terhadap Islam',
    reference: 'HR. Abu Dawud',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: 'Radhiitu billaahi rabbaa, wabil islaami diinaa, wa bi Muhammadin shallallahu \'alaihi wa sallama nabiyyaa.',
    translation: 'Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad shallallahu \'alaihi wa sallam sebagai nabi(ku).',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm-bismillah',
    title: 'Mohon Perlindungan',
    reference: 'HR. Tirmidzi & Abu Dawud',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: 'Bismillahilladzii laa yadhurru ma\'as mihii syai-un fil ardhi walaa fis samaa-i wahuwas samii\'ul \'aliim.',
    translation: 'Dengan menyebut nama Allah yang dengan sebab nama-Nya tidak ada sesuatupun di bumi maupun di langit yang dapat membahayakan (mendatangkan mudharat). Dan Dia Maha Mendengar lagi Maha Mengetahui.',
    count: 3,
    type: 'keduanya'
  },
  {
    id: 'm-hasbiyallah',
    title: 'Tawakkal kepada Allah',
    reference: 'QS. At-Taubah: 129',
    arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    latin: 'Hasbiyallahu laa ilaaha illaa huwa, \'alaihi tawakkaltu wahuwa rabbul \'arsyil \'azhiim.',
    translation: 'Cukuplah Allah bagiku; tidak ada Tuhan selain Dia. Hanya kepada-Nya aku bertawakkal dan Dia adalah Tuhan yang memiliki \'Arsy yang agung.',
    count: 7,
    type: 'keduanya'
  }
];
