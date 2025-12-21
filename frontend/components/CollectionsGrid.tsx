"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext"; 
import Image from "next/image"; 

// ... (기존 allPhotos 데이터 유지) ...
// 주의: 데이터가 너무 길어 생략했습니다. 기존 데이터를 그대로 두세요.
const allPhotos = [
  { id: 1, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/483278643_1306193017272450_6850192804037755443_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 2, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/483933443_1169535291531905_3554273313930417656_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 3, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/484168185_1898278931007456_3931509711110679139_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 4, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/484309314_548137277697148_8505816986235858993_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 5, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/491463844_689456013604218_1717216910098896517_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 6, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/491468503_1006125568159868_5556386922636683298_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 7, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/550108550_17998017167819013_2831090458844259389_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 8, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/550787928_17998016420819013_5336358062713856354_n.heic ", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 9, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/550934886_17998017131819013_5237128599951367867_n.heic ", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 10, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/551476898_17998016390819013_4063752741279133770_n.heic ", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 11, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/573687962_18003868463819013_4660683220299959755_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 12, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/574224668_18003868496819013_193950875416962018_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 13, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/574232173_18003868487819013_4272593282518951223_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 14, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/575319609_18003868451819013_1084318406257887322_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 15, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/575965073_18004158329819013_4885523971114578824_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 16, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/580576821_18004158338819013_9202504934975730_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },

  { id: 17, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/491495416_3965537693688401_9041840034892499790_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 18, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/491897190_1102793884941205_5003656687309355808_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 19, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/497192154_1742898586604751_5947079437609506409_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 20, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/497409904_1012392897540179_7971688212912654929_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 21, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/498302354_676053915354361_8212619349833851722_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 22, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/498704351_670819202588516_7039279371721156079_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 23, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/502707094_683304234471199_6415715858775977057_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 24, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/502711139_718717120570403_7086948843982551342_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 25, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/502992234_1368619090859122_5773000484268668564_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 26, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/503030265_1504819030479905_2361594450475709780_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 27, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/503314706_2172834936474997_6599142741721626373_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 28, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/504141047_2735133483351552_7881614569176289822_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 29, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/504197388_1912227612941723_1889325038354872945_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 30, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/505123774_1852987062147623_4376389147970514559_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 31, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/505453823_1443819846791697_5182331327898770852_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 32, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/514707815_780940094272399_1743861555334110385_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 33, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/516393907_24529785409992884_8036228683649255228_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 34, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/516561534_1264940418505644_3215474373426842387_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 35, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/517400774_1464938544859030_4260603339295066246_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 36, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/527561723_1461883894847473_4694501824789537309_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 37, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/528054542_3238364272987134_7986823959461907383_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 38, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/528652514_2168932490276047_7861283854825049355_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 39, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/559122668_18000315791819013_3260192696217110117_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 40, category: "graduation", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/559262135_18000315953819013_8094942252985796890_n.heic", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 41, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/559438824_18000315887819013_7526463290938790359_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 42, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/559907946_18000315941819013_4945895457867034499_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  { id: 43, category: "graduation", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Grad/559907946_18000315941819013_4945895457867034499_n.heic ", title: " ", specs: "ISO 1400 • f/2.8 • 1/100s" },
  
  { id: 44, category: "portraits", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/portrait/494006454_1339236077133770_7812831058633152540_n.heic ", title: " ", specs: "ISO 400 • f/4.0 • 1/500s" },
  { id: 45, category: "portraits", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/portrait/495129018_1860748114722517_8538559678675404957_n.heic ", title: " ", specs: "ISO 400 • f/4.0 • 1/500s" },
  { id: 46, category: "portraits", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/portrait/496358448_457890090740399_153087090492319940_n.heic", title: " ", specs: "ISO 400 • f/4.0 • 1/500s" },

  { id: 47, category: "family", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/family/587802153_18005754083819013_6768598122445420901_n.heic", title: " ", specs: "ISO 900 • f/6.0 • 1/1500s" },
  { id: 48, category: "family", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/family/591121954_18005754104819013_7034465213696952520_n.heic", title: " ", specs: "ISO 900 • f/6.0 • 1/1500s" },
  { id: 49, category: "family", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/family/591140837_18005754005819013_5144521881938673645_n.heic", title: " ", specs: "ISO 900 • f/6.0 • 1/1500s" },

  { id: 50, category: "maternity", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Maternity/519675471_1049628567292521_898396229982885195_n.heic", title: " ", specs: "ISO 1100 • f/5.0 • 1/11500s" },
  { id: 51, category: "maternity", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Maternity/519689965_2587639928235775_6839871437623690397_n.heic", title: " ", specs: "ISO 1100 • f/5.0 • 1/11500s" },
  { id: 52, category: "maternity", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Maternity/521691874_1247207823208747_7009025051623278233_n.heic", title: " ", specs: "ISO 1100 • f/5.0 • 1/11500s" },

  { id: 53, category: "couple", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/couple/487696922_3810541062519681_800658080783669805_n.heic", title: " ", specs: "ISO 3000 • f/8.0 • 1/2500s" },
  { id: 54, category: "couple", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/couple/488206601_3989094074673392_7424324062978903696_n.heic", title: " ", specs: "ISO 3000 • f/8.0 • 1/2500s" },
  { id: 55, category: "couple", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/couple/488480007_969566975392841_3569867427780699813_n.heic", title: " ", specs: "ISO 3000 • f/8.0 • 1/2500s" },
  { id: 56, category: "couple", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/couple/495531641_2168129226989293_3662426146766442129_n.heic", title: " ", specs: "ISO 3000 • f/8.0 • 1/2500s" },
  { id: 57, category: "couple", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/couple/495674392_1052986236742292_7192999295702587184_n.heic", title: " ", specs: "ISO 3000 • f/8.0 • 1/2500s" },

  { id: 58, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/486663875_637065875959028_3857943899283404276_n.heic", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 59, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/486675303_4009894265953160_2486347416272116566_n.heic", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 60, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/486825861_647314718260580_1221874646501346486_n.heic", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 61, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/489536693_1149177963358196_4174334768090116787_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 62, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/489858367_678639281484857_2392473643447251943_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 63, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/491494491_1726601447956436_3980948303514100043_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 64, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/491518216_1183021093565935_5879248494599862877_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 65, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/534163188_607477868893587_5308507215671013681_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 66, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/534218431_1510044880026066_7502893934308007331_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 67, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/534523515_1433702427850914_243553870810016157_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 68, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/535267512_3904455299851881_8001273326730162823_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 69, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/535615067_1271004758101435_4603442091290327442_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 70, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/537360417_1953409085417854_5898263251068748680_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 71, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/537770755_1717233662299492_5926894754899099151_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 72, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/549146485_17997747683819013_7678916420991180573_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 73, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/549162028_17997747632819013_1260991540298845767_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 74, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/549428538_17997747719819013_2819955155791277293_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 75, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/552604609_17998677257819013_5352390763070535781_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 76, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/552722985_17998677296819013_2613647793211890460_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 77, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/554964179_17998677248819013_8907473286905233585_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 79, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/565951395_18001795778819013_457205484287609084_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },
  { id: 80, category: "other", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/566593708_18001795712819013_2263524674656509398_n.heic ", title: " ", specs: "ISO 200 • f/2.8 • 1/100s" },

];

const ITEMS_PER_PAGE = 9;

// Helper: Shuffle
const shuffleArray = (array: typeof allPhotos) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function CollectionsGrid() {
  const { t, language } = useLanguage(); 
  const [filter, setFilter] = useState("all");
  const [activePhotos, setActivePhotos] = useState(allPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof allPhotos[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const categories = [
    { id: "all", label: t.catAll },
    { id: "weddings", label: t.catWeddings },
    { id: "couple", label: t.catCouple },
    { id: "maternity", label: t.catMaternity },
    { id: "graduation", label: t.catGraduation },
    { id: "family", label: t.catFamily },
    { id: "portraits", label: t.catPortraits },
    { id: "other", label: t.catOther },
  ];

  useEffect(() => {
    setActivePhotos(shuffleArray(allPhotos));
  }, []);

  const handleFilterChange = (catId: string) => {
    setFilter(catId);
    const filtered = catId === "all" 
      ? allPhotos 
      : allPhotos.filter(p => p.category === catId);
      
    setActivePhotos(shuffleArray(filtered));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visiblePhotos = activePhotos.slice(0, visibleCount);
  const titleFontClass = language === "ko" ? "font-serif-kr tracking-tight" : "tracking-tighter";

  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-6 md:px-12 border-t border-white/10 relative z-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className={`text-3xl md:text-5xl font-bold text-white mb-2 ${titleFontClass}`}>
            {t.colTitle}
          </h2>
          <p className="text-neutral-400">
            {t.colSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                filter === cat.id 
                  ? "bg-white text-black" 
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visiblePhotos.map((photo) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-neutral-900"
            >
              {/* 👇 수정됨: photo.url.trim()을 사용하여 URL 공백 제거 */}
              <Image 
                src={photo.url.trim()} 
                alt={photo.title || "Gallery Photo"} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                // HEIC 파일 에러 방지를 위한 unoptimized 옵션 (임시 방편)
                // 만약 여전히 에러가 나면 이 옵션을 켜야 할 수도 있습니다.
                // unoptimized={photo.url.includes('.heic')} 
              />
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-2 text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                   <Maximize2 className="w-4 h-4" />
                   <span className="text-xs uppercase tracking-widest">{t.inspect}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LOAD MORE */}
      {visibleCount < activePhotos.length && (
        <div className="flex justify-center mt-16">
          <button 
            onClick={handleLoadMore}
            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span className="text-sm uppercase tracking-[0.2em]">{t.btnSeeMore}</span>
            <div className="p-3 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
               <ChevronDown className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[3/2] md:aspect-[16/9] bg-black border border-white/10 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 이미지: 여기도 .trim() 적용 */}
              <img src={selectedPhoto.url.trim()} alt={selectedPhoto.title} className="w-full h-full object-contain" />
              
              <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start text-green-400 font-mono text-xs md:text-sm tracking-widest drop-shadow-md">
                   <div className="flex flex-col gap-1"><span>REC ●</span><span>[ {selectedPhoto.specs} ]</span></div>
                   <div className="flex gap-4"><span>BAT [||||]</span><span>{selectedPhoto.category.toUpperCase()}</span></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center">
                   <div className="w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                </div>
                <div className="flex justify-between items-end text-white/80 font-sans">
                   <div><h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter">{selectedPhoto.title}</h3></div>
                   <div className="text-right">
                     <button onClick={() => setSelectedPhoto(null)} className="pointer-events-auto hover:text-green-400 transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                       {t.close} <X className="w-4 h-4" />
                     </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}