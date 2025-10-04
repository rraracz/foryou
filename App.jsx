import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Users, Images, StickyNote, ArrowLeft, CheckCircle2, Plus, Mail } from "lucide-react";

/**
 * 🎀 Gift App — FINAL v8
 *
 * Revisi sesuai request terakhir:
 * - PASSCODE: pill "VIRTUAL GIFT" & judul diturunin (tidak terlalu atas),
 *   teks "anniversary ❤️" juga diturunin. Foto di atas input, deret 8
 *   bulatan love untuk preview digit, keypad kotak 3×4 (ada icon heart kecil),
 *   tombol "Next Page". Kode benar ➜ masuk ke Love Pages.
 * - LOVE PAGES: footer hanya "28 Agt 2023 — awal cerita kita" (tanpa "made with love").
 *
 * Ubah cepat:
 *   SPECIAL_DATE → "28082023" (28/08/2023)
 *   PHOTO_URL → ganti ke foto kalian
 */

// ===== KONFIG =====
const SPECIAL_DATE = "28082023"; // format DDMMYYYY
const PHOTO_URL = "/gallery/nol.jpg"; // ganti ke foto kalian (atau URL)
// ===================

export default function App() {
  const [ok, setOk] = useState(false);
  return ok ? <PinkHomeSafe /> : <PasscodeScreen onSuccess={() => setOk(true)} />;
}

/* --------------------------------------------------------
   PASSCODE SCREEN (v3 style)
-------------------------------------------------------- */
function PasscodeScreen({ onSuccess }) {
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [err, setErr] = useState("");

  const val = `${dd}${mm}${yy}`; // 8 digit

  const setFromString = (s) => {
    const clean = (s || "").replace(/\D/g, "").slice(0, 8);
    setDd(clean.slice(0, 2));
    setMm(clean.slice(2, 4));
    setYy(clean.slice(4, 8));
  };

  const append = (d) => {
    const cur = `${dd}${mm}${yy}`;
    if (cur.length >= 8) return;
    setFromString(cur + String(d));
    setErr("");
  };
  const backspace = () => setFromString(val.slice(0, -1));

  const validate = () => {
    if (val.length !== 8) return setErr("Lengkapi 8 digit dulu ya ✨");
    if (val === SPECIAL_DATE) onSuccess();
    else setErr("Belum pas. Coba lagi 💗");
  };

  // keyboard support
  useEffect(() => {
    const f = (e) => {
      if (/^[0-9]$/.test(e.key)) append(e.key);
      if (e.key === "Backspace") backspace();
      if (e.key === "Enter") validate();
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [dd, mm, yy]);

  // dekorasi lembut
  const floats = useMemo(() => new Array(12).fill(0).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: 0.8 + Math.random() * 0.8,
    d: 10 + Math.random() * 6,
    o: 0.05 + Math.random() * 0.08,
  })), []);

  return (
    <div
      className="min-h-screen min-h-[100dvh] w-full relative overflow-hidden bg-[radial-gradient(100%_100%_at_0%_0%,#ffe4f1_0,#ffd2e6_40%,#ffc1da_70%,#f5a3ce_100%)] text-rose-900"
      style={{ paddingTop: "calc(env(safe-area-inset-top,0px)+64px)", paddingBottom: 24 }}
    >
      {/* hearts bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {floats.map((f) => (
          <motion.div key={f.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: f.o, y: [0, -10, 0] }} transition={{ duration: f.d, repeat: Infinity }} className="absolute" style={{ left: `${f.x}%`, top: `${f.y}%`, scale: f.s }}>
            <Heart className="w-8 h-8" style={{ color: "rgba(244,114,182,0.14)" }} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl mx-auto px-4 min-h-[85svh] grid place-content-center">
        {/* pill + title (lebih turun) */}
        <div className="w-full flex justify-center mt-4 md:mt-6 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-rose-200 shadow">
            <Mail className="w-4 h-4 text-rose-500" />
            <span className="text-[11px] font-medium text-rose-600">VIRTUAL GIFT</span>
          </div>
        </div>
        <h1 className="text-center text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-700 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">Love Envelope for Fayril</h1>

        {/* photo */}
        <div className="mt-4 w-full flex justify-center">
          <img src={PHOTO_URL} alt="kita berdua" className="w-44 h-44 md:w-52 md:h-52 object-cover rounded-2xl border-4 border-white shadow-xl" onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop";}}/>
        </div>

        {/* anniversary (diturunin) */}
        <div className="mt-8 md:mt-10 mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-rose-200 shadow text-sm font-semibold text-rose-700 tracking-wide uppercase">
            ANNIVERSARY ❤️
          </div>
        </div>

        {/* inputs */}
        <div className="flex items-center justify-center gap-3">
          <NumInput value={dd} max={2} placeholder="DD" onChange={setDd} />
          <span className="text-rose-500">/</span>
          <NumInput value={mm} max={2} placeholder="MM" onChange={setMm} />
          <span className="text-rose-500">/</span>
          <NumInput value={yy} max={4} placeholder="YYYY" onChange={setYy} />
        </div>

        {/* preview row of 8 hearts (circles) */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative">
              <div className="w-10 h-10 md:w-11 md:h-11 grid place-items-center rounded-full bg-gradient-to-br from-pink-200 to-rose-200 border border-rose-300 shadow">
                <Heart className="w-4 h-4 text-rose-500" />
              </div>
              <div className="absolute inset-0 grid place-items-center font-semibold text-rose-700">{val[i] || ""}</div>
            </div>
          ))}
        </div>

        {/* keypad 3x4 — square cards with heart icon */}
        <div className="mt-5 grid grid-cols-3 gap-3 max-w-xs w-full mx-auto select-none">
          {[1,2,3,4,5,6,7,8,9].map((n)=> (
            <Pad key={n} label={n} onClick={()=>append(n)} />
          ))}
          <Pad label={<span className="text-sm font-semibold">⌫</span>} onClick={backspace} subtle />
          <Pad label={0} onClick={()=>append(0)} />
          <Pad label={<span className="text-sm font-semibold">OK</span>} onClick={validate} subtle />
        </div>

        {/* error */}
        <div className="min-h-[24px] mt-3 text-center text-rose-600">{err}</div>

        {/* action */}
        <div className="mt-1 flex justify-center">
          <motion.button whileTap={{ scale: 0.97 }} onClick={validate} className="px-6 md:px-8 py-3 rounded-2xl font-semibold text-white shadow-lg border border-rose-300 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 hover:from-pink-600 hover:via-rose-600 hover:to-fuchsia-600">Next Page</motion.button>
        </div>
      </div>
    </div>
  );
}

function NumInput({ value, onChange, max, placeholder }) {
  return (
    <input value={value} onChange={(e)=>{const only=e.target.value.replace(/\D/g, "").slice(0,max); onChange(only);}} inputMode="numeric" placeholder={placeholder} className="w-20 md:w-24 text-center rounded-xl px-3 py-3 font-mono text-lg border border-rose-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-pink-400" />
  );
}

function Pad({ label, onClick, subtle }) {
  return (
    <motion.button whileTap={{ scale: 0.94 }} onClick={onClick} className={`relative aspect-square rounded-2xl text-lg md:text-xl font-semibold flex items-center justify-center border ${subtle? 'bg-white/70 border-rose-200 hover:bg-white' : 'bg-gradient-to-br from-pink-200 to-rose-200 border-rose-300 hover:from-pink-300 hover:to-rose-300'} shadow`}>
      {/* small heart as decoration */}
      <Heart className="absolute top-2 left-2 w-4 h-4 text-rose-400/70" />
      <span className="relative z-10 text-rose-700">{label}</span>
    </motion.button>
  );
}

/* --------------------------------------------------------
   PINK HOME — 4 CARDS (v4 SAFE)
-------------------------------------------------------- */
function PinkHomeSafe() {
  const [page, setPage] = useState("home");
  const floats = useMemo(() => new Array(14).fill(0).map((_, i) => ({ id: i, x: Math.random()*100, y: Math.random()*100, s: 0.7+Math.random()*1.1, d: 9+Math.random()*6, o: 0.05+Math.random()*0.08 })), []);

  return (
    <div className="min-h-screen min-h-[100dvh] relative overflow-x-hidden text-rose-900 bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-100 pt-14 md:pt-16" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)" }}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        {floats.map((f)=> (
          <motion.div key={f.id} initial={{ opacity:0, y:8 }} animate={{ opacity:f.o, y:[0,-10,0] }} transition={{ duration:f.d, repeat:Infinity }} className="absolute" style={{ left:`${f.x}%`, top:`${f.y}%`, scale:f.s }}>
            <Heart className="w-8 h-8" style={{ color: "rgba(244,114,182,0.16)" }} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-14 md:pb-20">
        <AnimatePresence mode="wait">
          {page === 'home' ? (
            <motion.div key="home" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}>
              <div className="min-h-[70vh] flex flex-col justify-center">
                <Header />
                <div className="mt-6" />
                <Grid go={setPage} />
              </div>
            </motion.div>
          ) : (
            <motion.div key={page} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }}>
              <SubPage id={page} onBack={()=>setPage('home')} />
            </motion.div>
          )}
        </AnimatePresence>
        <FooterDecor />
      </div>
    </div>
  );
}

function Header(){
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-rose-200 shadow"><span className="text-[11px] font-medium text-rose-600">FOR FAYRIL • SPECIAL PAGES</span></div>
      <h1 className="mt-3 text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-700 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">Love Pages</h1>
      <p className="mt-2 text-rose-700/80">Empat ruang kecil untuk kamu: kata, cerita, memori, dan catatan</p>
    </div>
  );
}

function Grid({ go }){
  const cards=[
    { id:'message', title:'Message', desc:'Surat untuk kamu', icon: MessageSquare },
    { id:'about', title:'About Us', desc:'Tentang kita', icon: Users },
    { id:'gallery', title:'Gallery', desc:'Album memories', icon: Images },
    { id:'notes', title:'Notes', desc:'Catatan kecil', icon: StickyNote },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {cards.map((c)=> (
        <motion.button key={c.id} whileHover={{ y:-4, scale:1.02 }} whileTap={{ scale:0.98 }} onClick={()=>go(c.id)} className="group relative rounded-2xl p-4 md:p-5 text-left border border-rose-200/70 bg-white/70 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="pointer-events-none absolute -top-1 -right-10 w-2/3 h-40 rotate-12 opacity-0 group-hover:opacity-100 transition" style={{ background:"linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0))" }} />
          <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.35)" }} />
          <div className="relative z-10 flex items-start gap-3">
            <div className="shrink-0 grid place-items-center rounded-xl w-12 h-12 md:w-14 md:h-14 border border-rose-200 bg-gradient-to-br from-pink-200 to-rose-200 shadow-md">{React.createElement(c.icon,{ className:'w-6 h-6 text-rose-700' })}</div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-rose-900 tracking-tight">{c.title}</h3>
              <p className="text-xs md:text-sm text-rose-700/80 mt-1">{c.desc}</p>
            </div>
          </div>
          <div className="relative z-10 mt-3 flex items-center gap-2 text-rose-500 text-xs"><Heart className="w-3 h-3"/><span className="font-medium">Open</span></div>
        </motion.button>
      ))}
    </div>
  );
}

function SubPage({ id, onBack }){
  if(id==='message') return <MessagePage onBack={onBack}/>;
  if(id==='about') return <AboutPage onBack={onBack}/>;
  if(id==='gallery') return <GalleryPage onBack={onBack}/>;
  return <NotesPage onBack={onBack}/>;
}

function MessagePage({ onBack }) {
  return (
    <div className="relative rounded-3xl border border-rose-200/70 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      <Band title="Message" onBack={onBack} gradient="from-pink-100 to-rose-100" />
      <div className="px-6 md:px-10 py-8 space-y-8">
        {/* BAGIAN 1 */}
        <div className="space-y-4">
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            halo fayril, how's ur day? gimana sejauh ini serkomnya, lancar? aku harap sih gitu yaa. disini aku bikin web buat kamu, anggep aja sebagai ucapan perpisahan hehe. dan aku ngga ada maksud apapun selain ngasih tau sejujurnya tentang apa yang aku rasain selama ini, tolong dibaca semuanya yaa.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            first, aku mau ucapin terimakasih banyak, terutama selama seminggu terakhir ini kamu mau berusaha untuk memperbaiki kondisi aku supaya jadi lebih baik. sejujurnya ril, dihari itu pas aku dateng ke rumah kamu, aku bingung banget, ntah apa yang harus aku ungkapin, ntah apa yang harus aku minta. tapi setelah itu akhirnya kita nemuin jalan keluar, yaitu nunggu sampe kondisi aku bener bener baik, baru kamu boleh pergi.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            kamu tau ngga ril gimana perasaan aku disaat kamu minta semua itu? asing setelah kamu nebus kesalahan. sakit ril, sakit banget, 2 tahun yang kita lewatin rasanya harus diikhlasin gitu aja. setiap harinya kita bareng, aku cuma bisa mikirin kapan waktu yang tepat dan kapan aku siap untuk lepasin kamu. tapi seiring berjalannya waktu, aku makin gabisa ngebayangin gimana nanti kehidupanku setelah ngga sama kamu? apa aku bisa liat perempuan lain dapet versi terbaik dari dalem diri kamu? ah engga, aku ngga kuat. ngga mau ada in another life, aku cuma mau bisa sama kamu selamanya disini.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            hal yang lebih menyakitkan, adalah soal kita yang ngelangkah terlalu jauh. aku ngga bisa bayangin masa depanku nanti gimana, apa kamu ada mikir hal yang sama? engga.. kamu ngga mikirin itu, yang aku kira kamu bakalan nepatin semua janji, tapi ternyata engga. mana yang bilang bakal nikahin aku, bakal sama aku terus selamanya? mana yang katanya mau nyembuhin trauma aku soal hubungan dan mau yakinin aku untuk nikah? manusia yang aku kira bisa nyembuhin semua trauma itu, nyatanya ngasih aku trauma yang jauh lebih dalem.
          </p>
        </div>

        {/* BAGIAN 2 */}
        <div className="space-y-4">
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            aku minta maaf untuk semua hal buruk yang terjadi diantara kita belakangan ini, maaf mood aku terlalu cepet berubah. selama ini aku berusaha untuk ngga lampiasin ke kamu, aku berusaha mati matian nahan sendiri perasaan ngga enak itu, tapi kadang.. tetep aja ada yang ngga kekontrol. aku minta maaf yang sebesar besarnya, maaf karna aku ngga se worth it itu untuk diperjuangin sama kamu.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            di masalah terakhir ril, niat aku tadinya awal bulan ini emang mau ngobrol sama kamu soal kelanjutan kita. makanya aku ngajak kamu ngerjain b jepang, dengan harapan mungkin klo udah bareng nanti, aku bisa lebih encer gitu ungkapin semuanya. tapi yang bikin aku kecewa, kamu kalau diajak sama aku tuh responnya kaya gitu banget. ragu, keliatan gamau, dan ah bener bener raut wajah yang bikin sakit hati. terus di hari hari sebelumnya, kamu juga sering ngegame dan diem di sekolah sampe sore, tapi aku ngga protes kan.. bahkan sometimes kamu nih pulang sore banget, abis itu kita ngerjain tugas dan tidur, waktu ngobrol tuh kadang bener bener minim, aku mau minta waktu lebih aja malu.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            bahkan dihari terakhir (which is itu tuh hari selasa), kamu selesai serkom ngga bilang apapun ke aku, sampe aku ngechat ngga dibales, dan ternyata lagi ngegame. terus sampe rumah bebersih dll, kepotong aku lagi ada problem di BA, abis itu kamu ngagame lagi sampai malem. yang ada di pikiran aku tuh ya, emang ngga cukup waktu ngegame kamu di sekolah? sampe harus ngegame lagi pulangnya. dan ngga cuma itu, setelahnya pun aku harus rela ngalah demi kamu yang udah ngantuk.
          </p>
        </div>

        {/* BAGIAN 3 */}
        <div className="space-y-4">
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            mungkin bener kata kamu, aku terlalu ber ekspetasi tinggi. tapi kamu mikir ngga kenapa aku bisa gitu? iyap, karna diri kamu sendiri. kamu dulu ngasih aku segalanya, seisi dunia kali ya, sampe bikin aku bener bener ngerasa kamu perfect. dan kamu sendiri yang dari awal bilang ril bakal kasih aku pelayanan prima, aku pun ngga setiap hari minta waktu luang kamu kaya gitu, aku cuma mau selesain semuanya sebelum kita bener bener berakhir dan urus kehidupan kita masing masing.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            aku ngga pernah bosen buat bilang kalau aku sakit hati, tiap kali kaya gini, kamu ngga pernah ada usaha untuk ngehub aku :( fayril.. apa perasaan kamu buat aku bener bener ilang sepenuhnya? apa selama ini kamu emang cuma sebatas nepatin janji kamu? aku kangen, kangen kamu yang dulu. kangen fayril yang selalu ngusahain apapun buat aku, ngga bikin aku harus terus terusan nangis kaya gini.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            aku ngga pernah minta apapun, selain pengen dihargain, tolong liat aku sebagai perempuan yang pernah kamu sayang, cuma sebentarr aja.. aku tau aku bukan perempuan yang cantik, pinter, dll, tapi kenapa kamu ngajak aku sejauh ini cuma buat ngancurin aku sedalem ini :( tolong inget baik baik ril, aku ngga pernah sesayang dan setolol itu cinta ke orang, kamu yang pertama, kamu first experience aku dalam segala hal. mungkin ngga mudah buat aku lupain kamu, dan aku ngga akan pernah mau. tapi aku harap, kedepannya aku lebih bisa ngehargain diriku sendiri dibanding terus terusan ngejar sesuatu yang ngga pernah liat aku.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            tbh, meskipun udah temenan, kadang aku masih takut kamu ada apa apa sama perempuan lain. waktu kemarin kita balikan aja kamu ngga ngizinin aku untuk buka hp sedikit pun, beda sama dulu.. terus tiap kali lagi sama aku, pasti hp tuh selalu disakuin, bener bener kaya orang yang gamau hpnya dicek. tapi ya gapapa, makin kesini juga aku sadar, kalaupun ada perempuan lain, gapapa banget, silahkan.
          </p>
        </div>

        {/* BAGIAN 4 */}
        <div className="my-6 md:my-8 p-5 md:p-6 rounded-2xl border border-rose-200/70 bg-gradient-to-br from-pink-50 to-white shadow text-[15px] md:text-[17px] leading-8 text-rose-900">
          aku capek, capek banget :( aku pengen ngejalanin hubungan tanpa perlu ngerasa khawatir setiap saat. tanpa perlu ovt tiap kali bareng cuma grgr kamu nyembunyiin hp. dan tanpa harus stalk akun sosmed perempuan lain cuma untuk mastiin semuanya aman aman aja.
        </div>
      </div>
    </div>
  );
}

function AboutPage({ onBack }){
  return (
    <div className="relative rounded-3xl border border-rose-200/70 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      <Band title="About You" onBack={onBack} gradient="from-rose-100 to-pink-100"/>
      <div className="px-6 md:px-10 py-8 space-y-8">
        {/* BAGIAN 1 */}
        <div className="space-y-4">
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            kamu tau ngga ril apa alesan aku bisa jatuh hati ke kamu? ada banyak banget alesan, dan salah satunya karna kamu sweet banget ril, kamu bener bener tau cara treat orang lain dengan baik, iyaa.. dulu. dan kalau kamu tau, setiap kali aku muji kamu tuh bukan semata karna mau bikin kamu seneng, engga. aku bener bener ungkapin semuanya dari dalem hati aku, semua tentang kamu itu sempurna.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            fayril kamu ganteng, pinter, wawasannya luas, tinggi, atletik, humoris, romantis, semuanya ada di diri kamu. makanya kenapa aku selalu khawatir kamu dilirik perempuan lain, karna ini. kamu pernah bilang kan ke aku, kenapa kalau emang kamu ganteng, aku ngga pernah ngelirik dan reach out duluan pas awal masuk?
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            fayril, ini aku ketik sejujur jujurnya. bukan pick me, tapi aku bukan tipe cewek yang selalu jelalatan ngeliat cowok ganteng. aku tuh kalau suka sama cowok, bener bener harus tau dia orangnya kaya gimana, tau apakah dia cocok sama aku atau engga. dan seriusan, ngga ada satupun cowok di 4 yang pernah aku lirik, jangankan ngelirik, temenan aja dulunya aku gamau. dari awal masuk pun aku cuma pengen jalanin sekolah kaya biasa, batesin interaksi sama lawan jenis walaupun kebanyakan cowok.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            aku yang punya prinsip untuk ngga pacaran di SMK, akhirnya perlahan lahan luluh karna perlakuan yang kamu kasih. bahkan awal kamu ngechat aja aku ngga gimana gimana, aku cuma niat untuk temenan, udah. tapi lama kelamaan aku bisa sadar bahwa saat itu kamu "mau" lebih, sampe akhirnya tanpa sadar, aku juga mulai ada perasaan. aku masih inget banget waktu kamu ngetik longtext pas aku badmood, itu jadi awal dari semuanya. kamu beda dari mantan ataupun hts aku sebelumnya, ngga ada yang ngasih longtext sepanjang itu cuma karna khawatir aku lagi badmood, bahkan sampe rela nungguin aku yang lagi irma.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            HAHAHA DAN YANG PALING LUCUU, aku sadar kalau aku juga suka, pas kamu selalu interaksi dan bercanda sama anggi, rasanya ada perasaan yang gabisa dijelasin. apalagi waktu diorama dikelas, duh geramnyee akuuu. sampe yaa aku denial dan mikir "oh mungkin kamu emang sukanya ke anggi, aku yang too much". tapi eh tapi, belum ada 2 minggu PDKT, akhirnya kamu berani confess duluan.
          </p>
        </div>

        {/* BAGIAN 2 */}
        <div className="space-y-4">
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            mulai dari kamu deketin aku, sampe kamu confess pun, aku ngiranya kamu cuma penasaran ke aku, bahkan aku 100% ragu ke kamu. karna yaa gimana, di sekolah aja aku ngga pernah buka masker, aku takut kamu kecewa banget. sampe aku mikir "oh yaudah jalanin dulu aja, ntah sampe kapan hubungannya berjalan, yang penting sekarang aku bisa bahagia sama kamu" dan yaa jujur.. aku ngerasa kita ngga akan lama saat itu, karna aku pikir kamu sama aja kaya beberapa cowok lainnya.
          </p>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            setelah berhubungan, berantem ini itu, bahkan berkali kali putus, kamu berhasil bikin aku ngerasa dicintain sepenuhnya. kamu berhasil buktiin bahwa kamu beda dari cowok cowok diluar sana.
          </p>
          <ul className="list-disc pl-6 text-[15px] md:text-[17px] leading-8 text-rose-900 space-y-2">
            <li>setiap mau lakuin aktivitas, kamu selalu ngasih aku beberapa bbc supaya jadi penyemangat, bahkan tiap kali bangun ataupun sebelum tidur juga sama.</li>
            <li>aku yang ngga suka call, jadi ketergantungan banget karna hampir setiap hari kita sleepcall. jujur, kangen banget sleepcall kaya gini :( setelah berkali kali balikan pun kita udah jarang.</li>
            <li>kamu bikinin aku sorotan ig, bahkan jadiin aku post satu satunya di ig. sekarang, untuk dipost di sw aja ngga akan pernah bisa lagi kayanyaa..</li>
            <li>dan hal yang paling bikin aku bahagia, tiap kali tanggal 28, kamu selalu ngasih longtext ucapan mensive. entah aku ataupun kamu duluan, yang jelas tanggal ini tuh selalu jadi tanggal yang istimewa. beda sama sekarang, rasanya kamu inget aja aku udah Alhamdulillah.</li>
            <li>ngga cuma disaat mensive, tiap kali ada masalah kita bisa ngobrol baik baik, longtext dibales longtext, bukan cuma longtext dibales 2 bbc permintaan maaf .</li>
            <li>setiap pagi kamu luangin waktu buat aku, istirahat sampe pulang pun sama, kita jajan bareng sampe kemana mana juga bareng. aku minta maaf ya untuk ini, karna kamu jadi ngga ada waktu lebih bareng temen. tapi jujur aku kangen banget masa ini, karna sekarang kita interaksi di sekolah minim. kamu juga uda ga pernah anter aku pulang, tapi gapapa kok, wajar karna kita emang sejauh itu, dan kamu yang dulu cuma terlalu bucin ke aku makanya mau bela belain nemenin pulang hehe.</li>
            <li>tiap weekend kamu selalu pengen ketemu aku, ibaratnya kita seimbang, sama sama gabisa kl ga ketemu. tapi sekarang ngga pernah gitu lagi, malah kamu bilang "emang harus weekend ketemu?" aku inget banget kamu bilang gini pas di lab, membekas hehe.</li>
          </ul>
          <p className="text-[15px] md:text-[17px] leading-8 text-rose-900">
            ah masih banyak lagi hal hal yang kamu lakuin ke aku, hal hal yang kita lakuin bareng. dan ini ril yang jadi alesan kenapa "standar" dan "ekspetasi" aku ke kamu bisa setinggi itu, bukan aku yang buat, tapi fayril dulu yang ngasih semuanya ke aku, fayril yang masih sesayang itu ke aku.
          </p>
        </div>
      </div>
    </div>
  );
}

function GalleryPage({ onBack }){
  const items=[
    { src:, cap:'Sunset pertama bareng' },
    { src:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop', cap:'Tertawa sampai lupa waktu' },
    { src:'https://images.unsplash.com/photo-1520975922325-24c0a17adf49?q=80&w=1200&auto=format&fit=crop', cap:'Jalan kaki di kota' },
    { src:'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1200&auto=format&fit=crop', cap:'Pantai + angin + kamu' },
  ];
  return (
    <div className="relative rounded-3xl border border-rose-200/70 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      <Band title="Gallery" onBack={onBack} gradient="from-pink-100 to-rose-100"/>
      <div className="px-5 md:px-8 py-7">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((it,i)=> (
            <figure key={i} className="rounded-2xl overflow-hidden border border-rose-200/70 bg-white shadow group">
              <div className="aspect-[4/3] overflow-hidden"><img src={it.src} alt={it.cap} className="w-full h-full object-cover group-hover:scale-[1.02] transition"/></div>
              <figcaption className="p-3.5 md:p-4 text-rose-800/90 text-sm md:text-[15px]">{it.cap}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-rose-600/80 text-sm">Mau aku ganti dengan foto kalian? Kirim link fotonya, nanti setiap foto bisa dikasih teks bebas di bawahnya 💗</p>
      </div>
    </div>
  );
}

function NotesPage({ onBack }){
  // Checklist dengan dua kategori + progress persen
  const [items, setItems] = useState({
    general: [
      { text: 'wajib sholat tepat waktu', done: false },
      { text: 'istirahat yang cukup', done: false },
      { text: 'makan 2 - 3 kali sehari', done: false },
      { text: 'minum air putih 8 liter', done: false },
      { text: 'usahain untuk olahraga', done: false },
    ],
    daily: [
      { text: 'pasang alarm jam ±05.00', done: false },
      { text: 'sarapan dan bawa botol', done: false },
      { text: 'pakai jaket yang tebel', done: false },
      { text: 'makan mbg sampai habis', done: false },
      { text: 'kurangin main game', done: false },
      { text: 'pulang jangan kesorean', done: false },
      { text: 'kerjain tugas dari malem', done: false },
      { text: 'bebersih sebelum tidur', done: false },
    ],
  });

  const toggle = (section, idx) => {
    setItems(prev => ({
      ...prev,
      [section]: prev[section].map((it, i) => i === idx ? { ...it, done: !it.done } : it)
    }));
  };

  const total = items.general.length + items.daily.length;
  const done = items.general.filter(i => i.done).length + items.daily.filter(i => i.done).length;
  const progress = Math.round((done / Math.max(1, total)) * 100);

  return (
    <div className="relative rounded-3xl border border-rose-200/70 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      <Band title="Notes" onBack={onBack} gradient="from-rose-100 to-pink-100"/>
      <div className="px-6 md:px-10 py-8 space-y-8">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-sm text-rose-700/80 mb-2">
            <span>Progress</span>
            <span>{done}/{total} • {progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-rose-100 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Rutinitas secara umum */}
        <section>
          <h4 className="font-semibold text-rose-800 mb-3">rutinitas secara umum</h4>
          <ul className="space-y-3">
            {items.general.map((it, i) => (
              <li key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-rose-200/70 bg-white/70 shadow">
                <button onClick={()=>toggle('general', i)} className={`w-6 h-6 rounded-full border flex items-center justify-center ${it.done ? 'bg-gradient-to-br from-pink-400 to-fuchsia-500 border-transparent' : 'border-rose-300 bg-white'}`}>
                  {it.done && <CheckCircle2 className="w-4 h-4 text-white"/>}
                </button>
                <span className={`text-rose-900 ${it.done ? 'line-through opacity-60' : ''}`}>{it.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Rutinitas harian */}
        <section>
          <h4 className="font-semibold text-rose-800 mb-3">rutinitas biasa / harian</h4>
          <ul className="space-y-3">
            {items.daily.map((it, i) => (
              <li key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-rose-200/70 bg-white/70 shadow">
                <button onClick={()=>toggle('daily', i)} className={`w-6 h-6 rounded-full border flex items-center justify-center ${it.done ? 'bg-gradient-to-br from-pink-400 to-fuchsia-500 border-transparent' : 'border-rose-300 bg-white'}`}>
                  {it.done && <CheckCircle2 className="w-4 h-4 text-white"/>}
                </button>
                <span className={`text-rose-900 ${it.done ? 'line-through opacity-60' : ''}`}>{it.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-rose-600/80 text-sm">kurang lebihnya kamu pasti tau</p>
        </section>

        {/* Pesan terakhir, gaya kutipan seperti di Message */}
        <div className="my-2 p-5 md:p-6 rounded-2xl border border-rose-200/70 bg-gradient-to-br from-pink-50 to-white shadow">
          <p className="text-rose-700/90 italic text-lg md:text-xl">
            “pesan : jaga diri kamu, tolong jangan nyakitin perempuan manapun lagi. kalau kamu lagi capek, noleh ke belakang ya? ada aku disana. aku ngga akan pernah pergi kecuali kamu yang minta aku pergi. aku bakal selalu ada di belakang kamu, liat kamu tumbuh dengan baik, dan selalu do'ain yang terbaik buat kamu. I love u, more than my self.”
          </p>
        </div>
      </div>
    </div>
  );
}

function FooterDecor(){
  return (
    <div className="mt-10 md:mt-14">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-300/60 to-transparent"/>
      <div className="mt-6 mx-auto max-w-3xl">
        <div className="rounded-2xl border border-rose-200/60 bg-white/60 backdrop-blur p-4 md:p-5 text-center shadow">
          <div className="text-xs md:text-sm text-rose-700/80">28 Agt 2023 — awal cerita kita</div>
        </div>
      </div>
      <LoveMarquee />
    </div>
  );
}

function LoveMarquee(){
  const msg = "with love • for Fayril • since 28•08•2023 • ";
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-rose-200/60 bg-white/40">
      <motion.div className="py-2 whitespace-nowrap text-[11px] tracking-[0.25em] text-rose-600/80" animate={{ x:["0%","-50%"] }} transition={{ duration:18, ease:"linear", repeat:Infinity }}>
        {Array(12).fill(msg).join(" ")}
      </motion.div>
    </div>
  );
}

function Band({ title, onBack, gradient }){
  return (
    <div className={`px-6 md:px-8 py-5 border-b border-rose-200/60 bg-gradient-to-r ${gradient}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-rose-700 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">{title}</h3>
        <button onClick={onBack} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-rose-200 bg-white/70 hover:bg-white text-rose-700"><ArrowLeft className="w-4 h-4"/> Back</button>
      </div>
    </div>
  );
}
