import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Music, 
  Youtube, 
  ChevronDown, 
  Menu, 
  X, 
  Share2, 
  Film, 
  Globe,
  ExternalLink
} from 'lucide-react';

// --- Types ---
type Language = 'ko' | 'en';

interface Member {
  id: string;
  name: string;
  image: string;
  description: {
    ko: string;
    en: string;
  };
  color: string;
}

interface Track {
  id: string;
  title: string;
  isFocus?: boolean;
  isTitle?: boolean;
  isOutro?: boolean;
  youtubeId: string;
}

// --- Data ---
const MEMBERS: Member[] = [
  {
    id: 'sunny',
    name: 'Sunny',
    image: '/images/Sunny.jpg',
    description: {
      en: 'As the leader and the "Sun" of the group, SUNNY illuminates the stage with her dazzling smile and golden charisma. Much like a clear sky after a long winter, her powerful yet warm vocals bring comfort and energy to listeners worldwide. She embodies the bright, unwavering spirit of Weather Idols, guiding the group with her brilliant presence.',
      ko: '그룹의 리더이자 "태양"인 써니는 눈부신 미소와 황금빛 카리스마로 무대를 밝힙니다. 긴 겨울 끝의 맑은 하늘처럼, 그녀의 파워풀하면서도 따뜻한 보컬은 전 세계 리스너들에게 위로와 에너지를 선사합니다. 그녀는 웨더 아이돌의 밝고 흔들림 없는 정신을 상징하며, 찬란한 존재감으로 그룹을 이끕니다.'
    },
    color: 'from-primary/20'
  },
  {
    id: 'rain',
    name: 'Rain',
    image: '/images/Rain.jpg',
    description: {
      en: 'RAIN captivates the audience with her deep, emotive voice and elegant aura. Representing the refreshing and transformative power of a summer shower, she brings a sense of calm and depth to the group’s discography. Her sophisticated style and soulful performances flow like a rhythmic rainfall, touching the hearts of fans across the globe.',
      ko: '레인은 깊고 감성적인 목소리와 우아한 아우라로 관객을 사로잡습니다. 여름 소나기의 상쾌하고 변화무쌍한 힘을 상징하는 그녀는 그룹의 디스코그래피에 평온함과 깊이를 더합니다. 그녀의 세련된 스타일과 소울풀한 퍼포먼스는 리드미컬한 빗줄기처럼 흘러 전 세계 팬들의 마음을 적십니다.'
    },
    color: 'from-tertiary/20'
  },
  {
    id: 'cloudy',
    name: 'Cloudy',
    image: '/images/Cloudy.jpg',
    description: {
      en: 'With her ethereal blue aesthetic and dreamy gaze, CLOUDY represents the boundless possibilities of the sky. Her unique, airy vocal tone feels like floating among soft clouds on a breezy afternoon. She is the group\'s creative spark, blending mystery and softness to create a heavenly atmosphere in every performance.',
      ko: '천상계의 블루 에스테틱과 몽환적인 눈빛을 가진 클라우디는 하늘의 무한한 가능성을 상징합니다. 그녀의 독특하고 공기 같은 보컬 톤은 산들바람 부는 오후의 부드러운 구름 사이를 떠다니는 듯한 느낌을 줍니다. 그녀는 그룹의 창의적인 불꽃으로, 신비로움과 부드러움을 결합하여 모든 공연에서 천국 같은 분위기를 조성합니다.'
    },
    color: 'from-secondary/20'
  },
  {
    id: 'thunder',
    name: 'Thunder',
    image: '/images/Thunder.jpg',
    description: {
      en: 'THUNDER is the electric heartbeat of the group. With her bold violet hair and sharp, high-energy performance style, she brings the "storm" to the stage. Her rap and dance skills are as striking as a lightning bolt, providing a powerful contrast to the group’s melodies. She embodies the intensity and excitement of an unpredictable weather phenomenon.',
      ko: '썬더는 그룹의 짜릿한 심장박동입니다. 대담한 바이올렛 헤어와 날카롭고 에너지 넘치는 퍼포먼스 스타일로 무대에 "폭풍"을 몰고 옵니다. 그녀의 랩과 댄스 실력은 번개처럼 강렬하여 그룹의 멜로디와 강력한 대조를 이룹니다. 그녀는 예측 불가능한 기상 현상의 강렬함과 흥분을 구현합니다.'
    },
    color: 'from-black/20'
  }
];

const TRACKLIST: Track[] = [
  { id: '01', title: 'Golden Hour', youtubeId: 'sxw-YaR8BXA' },
  { id: '02', title: 'Blue Prism', isFocus: true, youtubeId: 'Vl4U4L5UJKc' },
  { id: '03', title: 'Cloud 9', youtubeId: 'em8GTh5CGk8' },
  { id: '04', title: 'Electric Pulse', youtubeId: '4FQMlSyRyOw' },
  { id: '05', title: 'Rainbow', isTitle: true, youtubeId: 'Z6BuDS8SFe4' },
  { id: '06', title: 'The Summer We Were', youtubeId: 'YuZk_n9aBWY' },
  { id: '07', title: 'OVERDRIVE', isOutro: true, youtubeId: '_lzKShXmzM4' }
];

const LYRICS: Record<string, string> = {
  '01': `Yeah, feel the light! It's Sunny time!

알람 소리 대신 창가에 쏟아진 햇살
기지개 켜고 일어난 이 도시는 나의 무대야
어제 입은 고민은 옷장에 다 집어던져
가장 빛나는 미소만 골라 입고 밖으로 나가

그림자마저 춤을 추게 만드는 열기
네 맘의 온도계를 조금 더 높여봐 (Right now!)
차갑던 공기는 어느새 사라지고
온 세상이 내 색깔로 물들어 가니까

I'm your Sunny, 눈부신 이 순간
너의 맘에 빛을 선물해줄게
뜨거운 태양 아래 우리 둘의 리듬
멈추지 마, 지금이 바로 Golden Hour!
(Oh oh oh, feel the sunshine!)

선글라스 뒤로 비친 세상은 다 비타민
길을 걷는 발걸음마다 꽃이 피어나니
구름 한 점 없는 Sky, 내 기분은 High
지루한 일상에 내가 던지는 눈부신 Hi!

가끔은 너무 뜨거워 눈이 부시겠지만
그만큼 찬란하게 널 비춰줄게
어둠이 와도 걱정 마, 내일은 다시
나의 빛으로 널 깨워줄 테니까

Keep it bright, keep it gold.
Stay Sunny!`,

  '02': `Pitter-patter, hear my heart...

회색빛 도시 위로 한 방울씩 떨어지는 리듬
바쁘게 움직이던 사람들은 걸음을 멈추고
우산 밑에 숨긴 너의 작은 어깨 위로
나의 위로를 조용히 내려놓을게

뿌연 안개 속에 갇힌 너의 마음이
내 눈물에 씻겨 다시 투명해지길
답답한 세상 소음은 잠시 꺼둘게
오직 빗소리와 내 숨소리만 들리게

Rainy day, 푸른빛의 선율을 따라
씻겨 내려가는 너의 모든 슬픔
나의 눈물은 너를 위한 위로가 돼
Blue Prism, 맑게 개인 하늘을 기다려
(Falling down, falling in love)

창밖을 봐, 세상은 수채화처럼 번져가
너와 나 사이 흐르는 공기는 좀 더 깊어져 가
굳이 말하지 않아도 다 알고 있어
비 온 뒤 땅이 굳듯 우린 더 단단해져

천천히 스며들어 가, 너의 깊은 곳까지
촉촉한 감성이 널 포근히 안아줄 때까지
무지개가 뜨기 전 가장 고요한 시간
내가 널 지킬게

비가 그치면 내가 보일 거야...
Still raining in my heart.`,

  '03': `Floating, floating... oh.

솜사탕 같은 구름을 베고 누워
오늘 하루는 시계를 보지 않을래
지상에서의 일들은 잠시 잊어버려
바람이 부는 대로 내 몸을 맡긴 채

안개 속에 가려진 비밀스러운 길
상상하는 대로 다 이뤄질 것 같아
둥실둥실 떠오른 내 마음의 풍선
어디까지 날아갈지 나도 모르겠어

Up in the Cloud 9, 둥실 떠올라
발끝에 닿는 폭신한 꿈의 조각들
서두를 건 없어, 바람 가는 대로
우리만의 비밀 정원에서 춤을 춰
(Fly with me, in the clouds)

때론 뭉게구름, 때론 얇은 새털구름
내 마음도 매분 매초 모양을 바꿔
정해진 답은 없어, 그게 나니까
자유로운 영혼이 되어 하늘을 유영해

세상이 너무 딱딱하게 느껴질 땐
고개를 들어 나를 봐, 폭신하게 안아줄게
포근한 그늘이 되어 널 쉬게 해줄게

Slow and steady.
Just keep floating...`,

  '04': `Watch out!

정적을 찢는 사운드, 넌 숨을 죽여
어둠 속에 숨어있던 본능을 깨워
경고도 없이 찾아가는 나의 Strike
심장을 강타하는 묵직한 이 비트, I like it

공기 중의 마찰, 올라가는 Voltage
숨 막히는 긴장감 속에 넌 이미 Cage
피할 생각은 마, 어차피 명중이니까
한순간에 널 사로잡을 Electric shock!

Thunder! 깜깜한 어둠 속에 Strike
거부할 수 없는 강력한 Pulse
내 비트가 닿는 곳마다 타올라
폭풍우의 중심, 내가 바로 주인공이야
(Boom! Thunder! Boom! Thunder!)

Ay, 하늘에서 내려꽂는 나의 Punchline
가짜들은 다 비켜, 여긴 나의 Baseline
번쩍이는 Light, 눈이 멀어버릴지 몰라
I'm the storm, 아무도 날 막지는 못해, 홀라!

폭풍전야의 고요함을 즐겨봐
곧 터져 나올 거대한 에너지에 몸을 맡겨
3, 2, 1... GO!

Did you feel it?
Electric Pulse. I am Thunder.`,

  '05': `One sky, Four colors.
We are the Weather Idols. Let's go!

눈부신 아침 햇살이 창을 두드리면
몽글몽글 피어난 구름 위로 기지개 켜
어느새 촉촉이 젖어드는 대지의 숨소리
정적을 깨고 터지는 뜨거운 심장 소리

회색빛 하늘 아래 길을 잃었던 어제
각자의 리듬으로 우린 서로를 불러
차가운 공기 속에 피어나는 뜨거운 에너지
준비됐어, 이제 막이 올라 (Right now!)

We are the Rainbow, 일곱 빛깔의 꿈
비 온 뒤 맑게 갠 세상에 노래해
찬란하게 빛나는 나의 Sunshine
슬픔을 씻어낼 Blue Prism
다 같이 Higher, 하늘 끝까지 닿게
우리가 만드는 완벽한 Season (Weather Idols!)

Ay, Watch out! 번개처럼 나타나 판을 뒤집어
내 스텝은 Thunder, 무대 위를 휘저어
안개 속을 걷는 듯 몽환적인 나의 Flow
구름 위를 유영하듯 여유롭게 Go slow
빗방울이 만드는 드럼 비트 위에
태양의 멜로디를 더해 우린 하나가 돼

때로는 비바람이 앞을 가로막아도
때로는 짙은 안개 속에 갇혀버려도
멈추지 마, 폭풍 뒤엔 반드시 빛이 오니까
네 마음의 무지개를 띄워줄게, 영원히!

We are the Rainbow, 일곱 빛깔의 꿈
비 온 뒤 맑게 갠 세상에 노래해
찬란하게 빛나는 나의 Sunshine
슬픔을 씻어낼 Blue Prism
다 같이 Higher, 하늘 끝까지 닿게
우리가 만드는 완벽한 Season (Weather Idols!)

랄라라- 랄라라-
랄라라- 랄라라-
해가 지지 않는 우리의 시간
We are the Weather Idols.`,

  '06': `반쯤 열린 교실 창문 사이로
운동장에 퍼지던 너의 웃음소리
풀냄새 섞인 바람이 불어오면
서툴게 써 내려간 편지를 숨겼지

해 질 녘 골목길, 나란히 걷던 그림자
좁은 어깨가 닿을 듯 말 듯 설레던
그때의 우린 왜 그리도 수줍었는지
마주 본 눈동자에 온 세상을 담았는데

아득한 기억의 저편에서
여전히 너는 그 시절 그 모습으로
손을 흔들며 나를 부르고 있어

눈부시게 푸르던 우리의 여름날
서투른 약속과 흩날리던 너의 머리카락
가슴 한구석이 아릿해질 만큼
아름다워서 더 눈물이 나는 그 이름
사랑이었다고, 말하지 못했던 나의 첫 페이지

오래된 사진첩 속에 멈춰버린 시간
가끔은 꿈속에서 너를 만나곤 해
계절은 흘러도 변하지 않는 건
내 맘속 가장 빛나는 구석에 핀 너라는 기억

지워질까 봐, 잊혀질까 봐
소중히 품어왔던 그날의 우리들
시간을 되돌려 단 한 번이라도
너를 꽉 안아줄 수 있다면!

눈부시게 푸르던 우리의 여름날
서투른 약속과 흩날리던 너의 머리카락
가슴 한구석이 아릿해질 만큼
아름다워서 더 눈물이 나는 그 이름
사랑이었다고, 말하지 못했던 나의 첫 페이지

고마웠어, 나의 찬란했던 시절
안녕, 나의 서툴던 첫사랑...`,

  '07': `Ready?
Check.
3, 2, 1... Ignite!

RPM은 이미 한계치, 아스팔트 위를 긁어대는 발톱
시야는 터널 속으로 빨려 들어가, 감각은 이미 칼날 같아
브레이크 따윈 밟지 않아, 관성을 무시한 채 꺾는 코너
따라올 테면 따라와 봐, 내 뒤엔 먼지뿐인 패자들의 코러스!

Yo, 뒤를 봐봐 내 그림자가 네 범퍼를 이미 집어삼켜
엔진 소리는 포효하고 내 야망은 네 앞길을 가로막아
한 치의 오차도 허용 안 해, 완벽한 라인을 그어내며 추월
속도가 곧 권력, 이 트랙 위에서 증명하는 나의 부활!

좁혀지는 거리, 끓어오르는 니트로
터질 듯한 심장, 거칠게 밀어붙여 더 세게
한계를 돌파해!

Full speed! 끝까지 밟아 OVERDRIVE!
미친 듯이 달려, 운명의 선을 넘어
누구보다 빠르게, 불꽃을 튀기며
가로막는 벽을 부수고 끝까지 Run!
(Let's go! Fast & Furious!)

왼쪽 코너 파고들어
오른쪽으로 길을 막아
빈틈을 찾아내 순식간에
가속 페달을 끝까지 밟아
숨 쉴 틈 없는 랩의 파동
고막을 때리는 비트의 고동
누구도 멈추지 못해 우리!
엔진이 터질 때까지 계속해!

잠시 숨을 골라, 승리의 향기가 느껴져
마지막 한 방을 위해 힘을 모아, 다시 시동을 걸어
자, 이제 피니시 라인이 보여
다들 비켜, 진짜가 들어간다!

Full speed! 끝까지 밟아 OVERDRIVE!
미친 듯이 달려, 운명의 선을 넘어
누구보다 빠르게, 불꽃을 튀기며
가로막는 벽을 부수고 끝까지 Run!
(We the kings of the road!)

Checkered flag is mine.
Good race.
Next lap, 더 세게 가보자고.`
};

const FEED_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBtzatkY3Qz6r7O2y0WXChg5ejmVW2M5FGgDuwDVOVnhas7OcfysisNfjttau9O6RPbw4m_zrj1qXQ0JRJVLeMRCssQ-qukZ5hM2U66l30fkO5t6LNdS6Js96WMxDIdxePG2P4wzVeBDMyfj42DyFVPHv2sz_DkFcGJcH0vYjuR2euaE5jEgsYaLduEErmnNgn16uPso2Ppf1ez7X7UG5I4EMoWzzHm11KbVjmTNIKRwmxlFNcj8VxA1V05mHVdVcCeZ1veu7_MqJrB',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUdTTr8lpW_SvTHrGbKu8COPfqv2lHG-LEeRHs54ADH25liAgSHwilYjXW1sAeo8AGQmnCrW6WIE9b1FHsTLgPRy0rDUw3BW4ILjUhEWJApEJr_6bmb_efaJNuixQWKLe_sLRKHGeOTdEoepOQkIlUACRfzLNV-CG3XFc-Gvcsut46zPdFxRvoBJZJj2SlKj6g7rKR9fz-WY0zduLQ9jvOhtmzRUAYP5PWCzjZh9ju16vEwFu4Oscc_QRsbBTX0jIgIrswM3yPpiC3',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Q_zDm9oNCkwO0OdOWL595qcAz-TMQO1Avx5Da4ozt5MOm-P8v94qB5MAgGDD6spp0YOklrK3f6YkJ_PU0GjCz39dxAhJEtiijIucWsYomm5xvJs_jKgLI5no4iZjY9Ve3BaN-hLHxSJVBQPgJ9S_9LcQIkPkhuESiiLIf1d4QRzzXRV7CpTxiCz-koT07ZzDXv4yingfsy81PgzuBT8PkTf_GI4k56OzC1BPg-xw80pXWt6uHhmxdLWlF--f_tC64gS5F2xF-ULx',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBfY0uhZo-Leqg8z32Xib2M9cj-pbOnX1l1d6UBlkkLBJAhXl8zR5eb-DIUgVZ_Q2BySnv2XILZhTSgt8ogqDJ7KyN5WW4Jv6G5IKDmwxkdjHs9b6etgDcmZ7QgvReNoT5dx85L3rcVBKWc4E_0eQNqwcuZi5ikweYTBLGg3sMtXxsS3UA-5U14A702RbkO44WXD21xG9465kftFcE0Amn4Togd6PTPkVNA7HNLJ-Op1tskG8mSQjtLq_yUcZfKDRmT7T7D3uQaQcU2'
];

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { en: 'MEMBERS', ko: '멤버' },
    { en: 'ALBUMS', ko: '앨범' },
    { en: 'STREAM', ko: '스트림' },
    { en: 'SOCIAL', ko: '소셜' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-neutral-200/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <img
            src="/images/logo.png"
            alt="Weather Idols"
            className="h-12 w-12 object-contain"
          />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item, i) => (
            <motion.a
              key={item.en}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href={`#${item.en.toLowerCase()}`}
              className={`font-serif text-sm tracking-widest uppercase transition-colors duration-300 ${i === 0 ? 'text-primary border-b-2 border-primary' : 'text-neutral-800 hover:text-primary'}`}
            >
              {item[lang]}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 font-serif text-sm tracking-widest uppercase text-primary hover:text-primary-dim transition-colors"
            >
              {lang === 'ko' ? 'KOR' : 'ENG'}
              <ChevronDown className={`w-3 h-3 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showLangDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-32 bg-white border border-neutral-200/50 rounded-lg shadow-xl overflow-hidden"
                >
                  <button 
                    onClick={() => { setLang('ko'); setShowLangDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-xs font-serif tracking-widest uppercase text-neutral-800 hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  >
                    한국어
                  </button>
                  <button
                    onClick={() => { setLang('en'); setShowLangDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-xs font-serif tracking-widest uppercase text-neutral-800 hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((item) => (
                <a 
                  key={item.en} 
                  href={`#${item.en.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-lg tracking-widest uppercase text-neutral-800"
                >
                  {item[lang]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Weather Idols"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-serif text-white text-6xl md:text-9xl font-bold tracking-tighter headline-glow leading-none mb-6">
            WEATHER IDOLS
          </h1>
          <p className="font-sans text-sm md:text-lg tracking-[0.3em] uppercase sub-glow opacity-90 text-primary-container font-semibold mb-12">
            {lang === 'ko' ? '글로벌 데뷔 프로모션 — 25개 이상의 플랫폼에서 스트리밍 중' : 'GLOBAL DEBUT PROMOTION — STREAMING ON 25+ PLATFORMS'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-flex flex-wrap items-center justify-center gap-6 p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        >
          <span className="font-sans text-sm uppercase tracking-widest text-white font-bold mr-2">{lang === 'ko' ? '지금 듣기' : 'Listen Now'}</span>
          <div className="flex items-center gap-6">
            <a 
              href="https://open.spotify.com/artist/3UT9AnjTyxOSv2FCeVJiPS?si=sMTlUhMfQjGMTc9ZKcqBEw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform group"
            >
              <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-primary-container transition-colors">Spotify</span>
            </a>
            <a 
              href="https://music.apple.com/kr/artist/weather-idols/1892108328"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#FA243C] to-[#FF5E62] rounded-full flex items-center justify-center shadow-lg">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-primary-container transition-colors">Apple Music</span>
            </a>
            <a 
              href="https://www.youtube.com/channel/UCa-1X2fR15hrCH-wb5r49mg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform group"
            >
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center shadow-lg">
                <Youtube className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-primary-container transition-colors">YouTube Music</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Members = ({ lang }: { lang: Language }) => {
  return (
    <section id="members" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl text-primary">{lang === 'ko' ? '멤버 소개' : 'Phenomenon Members'}</h2>
          <div className="w-24 h-1 bg-primary-container mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {MEMBERS.map((member, i) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-container-low transition-all duration-500 hover:-translate-y-2 mb-6 shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${member.color} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className="px-2">
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">{member.name}</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {member.description[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Discography = ({ lang }: { lang: Language }) => {
  const [selectedTrack, setSelectedTrack] = useState<Track>(TRACKLIST[0]);
  const [showLyrics, setShowLyrics] = useState<string | null>(null);
  const [showCredit, setShowCredit] = useState<string | null>(null);

  const currentLyricsTrack = showLyrics ? TRACKLIST.find(t => t.id === showLyrics) : null;
  const currentCreditTrack = showCredit ? TRACKLIST.find(t => t.id === showCredit) : null;

  return (
    <section id="albums" className="py-24 px-6 md:px-12 soft-prism-bg border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-sans uppercase tracking-widest text-sm mb-4">{lang === 'ko' ? '1st 미니 앨범' : '1st Mini Album'}</p>
            <h2 className="font-serif text-5xl md:text-6xl">The Prism of Nature</h2>
          </motion.div>
          <div className="hidden lg:block w-32 h-1 bg-primary-container mb-4" />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 font-serif text-lg leading-relaxed text-on-surface-variant max-w-3xl"
        >
          {lang === 'ko' 
            ? '"웨더 아이돌"은 자연의 요소와 디지털 음악 사이의 가교 역할을 하는 세계 최초의 AI 기반 날씨 테마 아이돌 그룹입니다. 25개 이상의 글로벌 플랫폼에서 출시된 7개의 트랙을 통해 대기의 끊임없이 변화하는 아름다움을 표현합니다. \'골든 아워\'의 따뜻함부터 \'일렉트릭 펄스\'의 리드미컬한 비트까지, 웨더 아이돌은 하늘의 렌즈를 통해 음악을 경험하도록 여러분을 초대합니다.'
            : '"Weather Idols" is the world’s first AI-driven weather-themed idol group, bridging the gap between nature’s elements and digital music. With 7 tracks released across 25 global platforms, they represent the ever-changing beauty of the atmosphere. From the warmth of the \'Golden Hour\' to the rhythmic beat of the \'Electric Pulse\', Weather Idols invites you to experience music through the lens of the sky.'
          }
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Music Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/40">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner bg-black">
                <iframe
                  key={selectedTrack.youtubeId}
                  src={`https://www.youtube.com/embed/${selectedTrack.youtubeId}`}
                  title={selectedTrack.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-8 flex flex-wrap justify-between items-center px-4 gap-4">
                <div>
                  <h4 className="font-serif text-2xl text-primary">{lang === 'ko' ? '재생 중' : 'NOW PLAYING'}</h4>
                  <p className="text-xs font-sans uppercase tracking-widest text-on-surface-variant">{selectedTrack.id}. {selectedTrack.title}</p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedTrack.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-primary-dim transition-all shadow-lg hover:shadow-primary/20"
                >
                  <Youtube className="w-4 h-4" /> {lang === 'ko' ? '유튜브에서 보기' : 'Watch on YouTube'}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Tracklist */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40 h-full">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-6">
                <span className="font-sans text-xs uppercase text-on-surface-variant tracking-widest">{lang === 'ko' ? '트랙' : 'Track #'}</span>
                <span className="font-sans text-xs uppercase text-on-surface-variant tracking-widest">{lang === 'ko' ? '제목 & 정보' : 'Title & Info'}</span>
                <span className="font-sans text-xs uppercase text-on-surface-variant tracking-widest">{lang === 'ko' ? '액션' : 'Actions'}</span>
              </div>
              <div className="space-y-2">
                {TRACKLIST.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => setSelectedTrack(track)}
                    className={`flex items-center justify-between py-4 group transition-all px-4 rounded-xl cursor-pointer ${
                      selectedTrack.id === track.id
                        ? 'bg-primary/10 border-l-4 border-primary shadow-sm'
                        : 'hover:bg-primary/5'
                    }`}
                  >
                    <div className="w-6 flex items-center justify-center">
                      {selectedTrack.id === track.id
                        ? <Play className="w-4 h-4 text-primary fill-primary" />
                        : <span className="font-sans font-light text-primary/60">{track.id}</span>
                      }
                    </div>
                    <div className="flex-1 px-4">
                      <h5 className={`font-sans font-semibold text-base transition-colors ${
                        selectedTrack.id === track.id ? 'text-primary' : 'text-on-surface group-hover:text-primary'
                      }`}>{track.title}</h5>
                      <div className="flex gap-2 mt-1">
                        {track.isFocus && <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-blue-100 text-blue-700">Focus</span>}
                        {track.isTitle && <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-primary-container text-on-primary-container">Title</span>}
                        {track.isOutro && <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-neutral-100 text-neutral-600">Outro</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowLyrics(track.id); }}
                        className="px-3 py-1 border border-neutral-200 rounded-full text-[10px] font-sans uppercase hover:bg-neutral-900 hover:text-white transition-all"
                      >{lang === 'ko' ? '가사' : 'Lyrics'}</button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowCredit(track.id); }}
                        className="px-3 py-1 border border-neutral-200 rounded-full text-[10px] font-sans uppercase hover:bg-neutral-900 hover:text-white transition-all"
                      >{lang === 'ko' ? '크레딧' : 'Credit'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lyrics Modal */}
      <AnimatePresence>
        {showLyrics && currentLyricsTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowLyrics(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-neutral-100 px-8 py-6 flex justify-between items-center z-10">
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-1">{lang === 'ko' ? '가사' : 'Lyrics'}</p>
                  <h3 className="font-serif text-2xl">{currentLyricsTrack.id}. {currentLyricsTrack.title}</h3>
                </div>
                <button
                  onClick={() => setShowLyrics(null)}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
              <div className="px-8 py-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                <pre className="font-sans text-sm leading-loose whitespace-pre-wrap text-on-surface-variant">
{LYRICS[showLyrics]}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credit Modal */}
      <AnimatePresence>
        {showCredit && currentCreditTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowCredit(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="border-b border-neutral-100 px-8 py-6 flex justify-between items-center">
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-primary mb-1">{lang === 'ko' ? '크레딧' : 'Credit'}</p>
                  <h3 className="font-serif text-2xl">{currentCreditTrack.id}. {currentCreditTrack.title}</h3>
                </div>
                <button
                  onClick={() => setShowCredit(null)}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
              <div className="px-8 py-8">
                <div className="space-y-4">
                  {(lang === 'ko'
                    ? ['프로듀싱', '작사', '작곡', '편곡', '믹싱', '마스터링']
                    : ['Produced by', 'Written by', 'Composed by', 'Arranged by', 'Mixed by', 'Mastered by']
                  ).map((role) => (
                    <div key={role} className="flex justify-between items-center py-2 border-b border-neutral-50">
                      <span className="text-sm text-on-surface-variant font-sans">{role}</span>
                      <span className="text-sm font-semibold text-on-surface font-sans">WELLBIANLABS</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Streaming = ({ lang }: { lang: Language }) => {
  const platforms = ['Amazon Music', 'TIDAL', 'Deezer', 'Pandora', 'KKBOX', 'Anghami', 'QQ Music'];

  return (
    <section id="stream" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl mb-4"
          >
            {lang === 'ko' ? '스트리밍' : 'Streaming Now'}
          </motion.h2>
          <p className="text-on-surface-variant font-sans uppercase tracking-widest text-sm">
            {lang === 'ko' ? '25개 이상의 글로벌 플랫폼에서 이용 가능' : 'Available on 25+ Global Platforms'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { 
              name: 'Spotify', 
              color: 'bg-[#1DB954]', 
              icon: <Play className="fill-current" />,
              url: 'https://open.spotify.com/artist/3UT9AnjTyxOSv2FCeVJiPS?si=sMTlUhMfQjGMTc9ZKcqBEw'
            },
            { 
              name: 'YouTube Music', 
              color: 'bg-[#FF0000]', 
              icon: <Youtube className="fill-current" />,
              url: 'https://www.youtube.com/channel/UCa-1X2fR15hrCH-wb5r49mg'
            },
            { 
              name: 'Apple Music', 
              color: 'bg-gradient-to-r from-[#FA243C] to-[#FF5E62]', 
              icon: <Music />,
              url: 'https://music.apple.com/kr/artist/weather-idols/1892108328'
            }
          ].map((p) => (
            <motion.a 
              key={p.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${p.color} h-32 rounded-2xl flex items-center justify-center gap-4 shadow-xl cursor-pointer text-white`}
            >
              <div className="w-10 h-10 flex items-center justify-center">{p.icon}</div>
              <span className="font-bold text-xl">{p.name}</span>
            </motion.a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {platforms.map((p) => (
            <span key={p} className="font-bold text-lg text-neutral-900 cursor-default">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const YouTubeShorts = ({ lang }: { lang: Language }) => {
  const FALLBACK_SHORTS = ['hw_wcw89YI4', 'z1SYJVUMPG0', 'MMCyLzOGtJY'];
  const [shortsIds, setShortsIds] = useState<string[]>(FALLBACK_SHORTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShorts = async () => {
      const channelUrl = encodeURIComponent('https://www.youtube.com/@weatheridols/shorts');
      const proxyUrls = [
        `https://api.codetabs.com/v1/proxy?quest=${channelUrl}`,
        `https://api.allorigins.win/raw?url=${channelUrl}`
      ];

      for (const proxyUrl of proxyUrls) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const response = await fetch(proxyUrl, { signal: controller.signal });
          clearTimeout(timeout);
          if (!response.ok) continue;
          const html = await response.text();
          const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
          const uniqueIds = [...new Set(matches.map(m => m[1]))];
          if (uniqueIds.length > 0) {
            setShortsIds(uniqueIds);
            break;
          }
        } catch {
          continue;
        }
      }
      setLoading(false);
    };

    fetchShorts();
  }, []);

  const gridCols = shortsIds.length >= 4
    ? 'sm:grid-cols-2 md:grid-cols-4'
    : shortsIds.length === 3
      ? 'sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto'
      : 'sm:grid-cols-2 max-w-3xl mx-auto';

  return (
    <section id="shorts" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-serif text-4xl mb-2">
              {lang === 'ko' ? '오늘 날씨 어때?' : "How's the weather today?"}
            </h2>
            <p className="text-on-surface-variant font-sans text-sm tracking-widest uppercase">{lang === 'ko' ? '유튜브 쇼츠' : 'YouTube Shorts'}</p>
          </div>
          <a
            href="https://www.youtube.com/@weatheridols/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#FF0000] text-white rounded-full font-sans text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
          >
            <Youtube className="w-4 h-4" /> {lang === 'ko' ? '쇼츠 보기' : 'View Shorts'}
          </a>
        </div>

        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-neutral-200 animate-pulse rounded-2xl" />
            ))
          ) : (
            shortsIds.map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[9/16] bg-black rounded-2xl overflow-hidden relative border border-white/40 shadow-lg"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}?loop=1&modestbranding=1&rel=0`}
                  title={`Weather Idols Shorts ${i + 1}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const TikTokFeed = ({ lang }: { lang: Language }) => {
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <section id="social" className="py-24 px-6 md:px-12 soft-prism-bg border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-serif text-4xl mb-2">TikTok</h2>
            <p className="text-on-surface-variant font-sans text-sm tracking-widest uppercase">
              {lang === 'ko' ? '@weatheridols 의 최신 영상' : 'Latest from @weatheridols'}
            </p>
          </div>
          <a
            href="https://www.tiktok.com/@weatheridols"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full font-sans text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
          >
            <ExternalLink className="w-4 h-4" /> {lang === 'ko' ? '틱톡에서 보기' : 'View on TikTok'}
          </a>
        </div>

        <div className="flex justify-center">
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@weatheridols"
            data-unique-id="weatheridols"
            data-embed-type="creator"
            style={{ maxWidth: '780px', minWidth: '288px' }}
          >
            <section>
              <a target="_blank" href="https://www.tiktok.com/@weatheridols?refer=creator_embed">@weatheridols</a>
            </section>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  return (
    <footer className="w-full py-12 px-8 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
        <div className="text-lg font-serif text-primary uppercase tracking-[0.3em]">Weather Idols</div>
        <p className="font-sans text-xs tracking-widest text-neutral-400">
          {lang === 'ko' ? '© 2026 웰비안랩스 뮤직. 모든 권리 보유.' : '© 2026 WELLBIANLABS MUSIC. ALL RIGHTS RESERVED.'}
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ko');

  return (
    <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Members lang={lang} />
      <Discography lang={lang} />
      <Streaming lang={lang} />
      <YouTubeShorts lang={lang} />
      <TikTokFeed lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
