import { ChevronRight, Youtube } from 'lucide-react';

type DailyContent = {
  date: string;
  memberName: string;
  memberImage: string;
  shortsId: string;
};

type CharacterIdentity = {
  labelColor: string;
  textColor: string;
  desktopOverlay: string;
  mobileOverlay: string;
};

const CHARACTER_IDENTITIES: Record<string, CharacterIdentity> = {
  Sunny: {
    labelColor: 'text-[#9f7a13]',
    textColor: 'text-[#2e2612]',
    desktopOverlay: 'bg-[linear-gradient(115deg,rgba(255,250,228,0.96)_0%,rgba(255,232,132,0.72)_36%,rgba(184,119,27,0.62)_68%,rgba(44,33,19,0.92)_100%)]',
    mobileOverlay: 'bg-gradient-to-t from-[#21170c] via-[#6f4d19]/82 to-transparent',
  },
  Rain: {
    labelColor: 'text-[#6f6fac]',
    textColor: 'text-[#202338]',
    desktopOverlay: 'bg-[linear-gradient(115deg,rgba(245,244,255,0.96)_0%,rgba(201,197,255,0.72)_34%,rgba(91,99,146,0.66)_66%,rgba(22,28,44,0.94)_100%)]',
    mobileOverlay: 'bg-gradient-to-t from-[#151927] via-[#4c517c]/82 to-transparent',
  },
  Cloudy: {
    labelColor: 'text-[#5f7f95]',
    textColor: 'text-[#24333d]',
    desktopOverlay: 'bg-[linear-gradient(115deg,rgba(242,250,255,0.96)_0%,rgba(190,224,241,0.72)_36%,rgba(111,138,154,0.62)_68%,rgba(27,36,43,0.92)_100%)]',
    mobileOverlay: 'bg-gradient-to-t from-[#18242b] via-[#587182]/82 to-transparent',
  },
  Thunder: {
    labelColor: 'text-[#8b6cff]',
    textColor: 'text-[#221b37]',
    desktopOverlay: 'bg-[linear-gradient(115deg,rgba(248,244,255,0.96)_0%,rgba(178,152,255,0.70)_34%,rgba(59,87,162,0.66)_66%,rgba(22,18,39,0.94)_100%)]',
    mobileOverlay: 'bg-gradient-to-t from-[#171326] via-[#4b3f94]/82 to-transparent',
  },
};

const SHORTS_ARCHIVE = [
  { date: '2026-04-28', memberName: 'Rain', shortsId: 'GTkTwDLYDiw' },
  { date: '2026-04-27', memberName: 'Sunny', shortsId: 'z1SYJVUMPG0' },
  { date: '2026-04-26', memberName: 'Cloudy', shortsId: 'MMCyLzOGtJY' },
];

const TODAY: DailyContent = {
  date: SHORTS_ARCHIVE[0].date,
  memberName: SHORTS_ARCHIVE[0].memberName,
  memberImage: '/images/Rain.jpg',
  shortsId: SHORTS_ARCHIVE[0].shortsId,
};

const shortsUrl = `https://www.youtube.com/embed/${TODAY.shortsId}?autoplay=1&mute=1&loop=1&playlist=${TODAY.shortsId}&controls=0&modestbranding=1&rel=0&playsinline=1`;
const identity = CHARACTER_IDENTITIES[TODAY.memberName] ?? CHARACTER_IDENTITIES.Rain;

const ArchiveButton = ({ compact = false }: { compact?: boolean }) => (
  <a
    href="https://www.youtube.com/@weatheridols/shorts"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-md border font-semibold shadow-sm backdrop-blur-md transition ${
      compact
        ? 'border-white/50 bg-black/20 px-3 py-2 text-xs text-white hover:bg-white/12'
        : 'border-[#2d343a]/30 bg-white/20 px-5 py-4 text-sm text-[#22272a] hover:border-[#2d343a]/70 hover:bg-white/34'
    }`}
  >
    <Youtube className="h-4 w-4" />
    더 보기
    <ChevronRight className="h-4 w-4" />
  </a>
);

const AmbientVideo = ({ mobile = false }: { mobile?: boolean }) => (
  <div className="absolute inset-0 overflow-hidden bg-black">
    <iframe
      src={shortsUrl}
      title="Weather Idols ambient background"
      className={`absolute left-1/2 top-1/2 aspect-[9/16] -translate-x-1/2 -translate-y-1/2 border-0 opacity-24 blur-2xl saturate-125 ${
        mobile ? 'h-[112svh] w-auto scale-125' : 'h-[112svh] w-auto scale-[1.9]'
      }`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      aria-hidden="true"
    />
    <img src={TODAY.memberImage} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-18 blur-3xl mix-blend-soft-light" />
  </div>
);

const ShortsFrame = ({ mode }: { mode: 'desktop' | 'mobile' }) => (
  <div
    className={
      mode === 'desktop'
        ? 'relative mx-auto aspect-[9/16] h-[min(76svh,760px)] max-h-[760px] w-auto max-w-[min(36vw,430px)] overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/20'
        : 'absolute inset-0 overflow-hidden bg-black'
    }
  >
    <iframe
      src={shortsUrl}
      title="Weather Idols planning test shorts"
      className="absolute inset-0 h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

const RainMotionIcon = () => (
  <span className="relative inline-flex h-12 w-12 items-center justify-center" aria-hidden="true">
    <span className="absolute h-9 w-9 rounded-full border border-[#6f6fac]/35 bg-white/16 backdrop-blur-md animate-pulse" />
    <span className="absolute left-3 top-2 h-2.5 w-1.5 rounded-full bg-[#6f6fac] opacity-80 animate-bounce" />
    <span className="absolute left-5 top-4 h-3 w-1.5 rounded-full bg-[#8187c5] opacity-80 animate-bounce [animation-delay:160ms]" />
    <span className="absolute right-3 top-2.5 h-2 w-1.5 rounded-full bg-[#a9a8df] opacity-80 animate-bounce [animation-delay:320ms]" />
  </span>
);

export default function PlanningTestPage() {
  return (
    <main className="min-h-screen bg-[#11181d] text-white selection:bg-primary-container selection:text-on-primary-container">
      <section className="relative hidden min-h-[100svh] overflow-hidden md:block">
        <div className="absolute inset-0">
          <AmbientVideo />
          <div className={`absolute inset-0 ${identity.desktopOverlay}`} />
        </div>

        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-[220px_minmax(360px,1fr)_220px] items-center gap-8 px-8 py-10">
          <aside className={`self-center ${identity.textColor}`}>
            <div className="space-y-5">
              <div>
                <p className="font-serif text-3xl leading-none">{TODAY.date}</p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <p className="font-serif text-5xl leading-none">{TODAY.memberName}</p>
                  <RainMotionIcon />
                </div>
              </div>
            </div>
          </aside>

          <div className="flex items-center justify-center">
            <ShortsFrame mode="desktop" />
          </div>

          <aside className="flex justify-end">
            <ArchiveButton />
          </aside>
        </div>
      </section>

      <section className="relative min-h-[100svh] overflow-hidden bg-black md:hidden">
        <AmbientVideo mobile />
        <ShortsFrame mode="mobile" />
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-[42svh] ${identity.mobileOverlay}`} />
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[calc(env(safe-area-inset-bottom)+28px)]">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/70">날짜</p>
            <p className="font-serif text-3xl leading-none">{TODAY.date}</p>
          </div>
          <div className="mb-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/70">담당 캐릭터명</p>
            <p className="font-serif text-6xl leading-none">{TODAY.memberName}</p>
          </div>
          <ArchiveButton compact />
        </div>
      </section>
    </main>
  );
}
