import { useEffect, useState } from "react";
import {
  Globe,
  Search,
  ArrowRight,
  Plus,
  Minus,
  LocateFixed,
  Map as MapIcon,
  Eye,
  Box,
  Share2,
  Wallet,
} from "lucide-react";

/**
 * Design tokens ported 1:1 from the original discover.html Tailwind config.
 * Kept as inline style values (CSS variables) rather than Tailwind classes,
 * since arbitrary-value utilities (e.g. bg-[#101415]) aren't available
 * without a build step here — this keeps exact color/type fidelity while
 * everything else (layout, spacing, flex, grid, transitions) stays Tailwind.
 */
const c = {
  background: "#101415",
  onBackground: "#e0e3e5",
  surface: "#101415",
  surfaceDim: "#101415",
  surfaceBright: "#363a3b",
  surfaceContainerLowest: "#0b0f10",
  surfaceContainerLow: "#191c1e",
  surfaceContainer: "#1d2022",
  surfaceContainerHigh: "#272a2c",
  surfaceContainerHighest: "#323537",
  surfaceVariant: "#323537",
  onSurface: "#e0e3e5",
  onSurfaceVariant: "#c6c6cd",
  outline: "#909097",
  outlineVariant: "#45464d",
  primary: "#bec6e1",
  onPrimary: "#283045",
  primaryContainer: "#121a2e",
  onPrimaryContainer: "#7b839b",
  primaryFixed: "#dae2fe",
  secondary: "#76d6d5",
  onSecondary: "#003737",
  secondaryContainer: "#007f7f",
  onSecondaryContainer: "#ddfffe",
  tertiary: "#e9c400",
  onTertiary: "#3a3000",
  tertiaryContainer: "#c9a900",
  onTertiaryContainer: "#4c3f00",
};

const fontDisplay = { fontFamily: "'Manrope', sans-serif" };
const fontBody = { fontFamily: "'Hanken Grotesk', sans-serif" };

function useGoogleFonts() {
  useEffect(() => {
    const id = "sansar-google-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Manrope:wght@600;800&family=Hanken+Grotesk:wght@400;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const labelCaps = {
  ...fontBody,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "0.1em",
  fontWeight: 700,
};
const displayLg = {
  ...fontDisplay,
  fontSize: "48px",
  lineHeight: "56px",
  letterSpacing: "-0.02em",
  fontWeight: 800,
};
const displayLgMobile = {
  ...fontDisplay,
  fontSize: "32px",
  lineHeight: "40px",
  letterSpacing: "-0.01em",
  fontWeight: 800,
};
const bodyLg = { ...fontBody, fontSize: "18px", lineHeight: "28px", fontWeight: 400 };
const bodyMd = { ...fontBody, fontSize: "16px", lineHeight: "24px", fontWeight: 400 };
const headlineMd = { ...fontDisplay, fontSize: "24px", lineHeight: "32px", fontWeight: 600 };

const NAV_ITEMS = [
  { key: "discover", label: "Discover" },
  { key: "destinations", label: "Destinations" },
  { key: "budget-planner", label: "Budget Planner" },
];

const MAP_NODES = [
  {
    top: "30%",
    left: "20%",
    color: c.tertiary,
    glow: "rgba(233,196,0,0.8)",
    region: "North America",
    place: "Cascadia Biome",
    delay: "0s",
  },
  {
    top: "45%",
    right: "30%",
    color: c.secondary,
    glow: "rgba(118,214,213,0.8)",
    region: "Europe",
    place: "Alpine Network",
    delay: "0.5s",
  },
  {
    bottom: "35%",
    right: "15%",
    color: c.primary,
    glow: "rgba(190,198,225,0.8)",
    region: "Asia",
    place: "Neo-Tokyo Hub",
    delay: "1s",
  },
];

const FEATURES = [
  {
    icon: Box,
    iconColor: c.secondary,
    iconBg: `${c.secondaryContainer}80`,
    glow: `${c.secondary}1a`,
    title: "Interactive Discovery",
    body: "Experience terrain before arrival. Our proprietary 3D modeling engine renders geography and landmarks with millimeter precision.",
    offset: "",
  },
  {
    icon: Share2,
    iconColor: c.primary,
    iconBg: `${c.primaryContainer}80`,
    glow: `${c.primary}1a`,
    title: "Hybrid Intelligence",
    body: "A synthesis of macro and micro. We aggregate global public data and fuse it with hyper-local, curated insights for unmatched context.",
    offset: "md:-mt-8",
  },
  {
    icon: Wallet,
    iconColor: c.tertiary,
    iconBg: `${c.tertiaryContainer}4d`,
    glow: `${c.tertiary}1a`,
    title: "Precision Budgeting",
    body: "Foresee every variable. Dynamic, multi-tiered cost analysis algorithms adapt to real-time economic fluctuations.",
    offset: "md:mt-8",
  },
];

const DESTINATIONS = [
  {
    country: "Japan",
    title: "Kyoto Neo-Districts",
    stat: "14.2k Active",
    hotspot: true,
    offset: "",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALwG16Cc0Os0XJKKG6tPvkhNgDBsTAKvXJ1rei2vDFsGHzoVw8pdKER6Suu2gFkQ1fNlEjT0H5hfPlIfMoibbIlw3SwICuUvYW257yUb7a2RCkAaVkft0FgaviGxnSDmdXVHjXp3-UO3DjZwB5ZKjsQgHuv52Hh_kee7D031Rdug01bqzaJQfJfD50PfPwDwWTp3GXscxw-Rc4shYVcX8GLWA8Qw15vdaRlpn0KY59GU7JACU6M95oaw",
  },
  {
    country: "Puerto Rico",
    title: "Mosquito Bay Bioluminescence",
    stat: "8.9k Active",
    offset: "lg:translate-y-8",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPF9LcAR1RNlE_rXEYaObIj8YlUC8BvGMELzT3SO6yLnX9q_P4CW6KkIz4TjxNpk0L5Zm3TDlZg2Fm1oDddXHUyG9rqTLin9F0tAWKkELWcEePOE0gvyAm7mnaHtN9-nRvXvDe_xVkWGWXUOxUv2frTVWjLjDn9Ubc2xX5KHll8omkKUoJmCUIaeZkD-kk6Qt6G0xmcLHeMhwXihHk8_MukyLQTjjzZa247hG45zjnHh243_tPcGS4VQ",
  },
  {
    country: "Costa Rica",
    title: "Canopy Eco-Sanctuary",
    stat: "11.5k Active",
    offset: "",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvO6949vjeVP1fG7ODBMhwxZyT5-x_71-vq_4hBUPobMQyEJit7Nva2tqPTBWpYT1GYv7uNVQuMgK4gRIiYbPbm3ZgPmGRBCr-rw9tqqXFdZroIUPUlXDtKJ_jGpwDb6i3hyoqLP1Jm2eKcXF-9bWXjPxtUGKi5bRJohY9CwigIb170NkXpibH7PuUnW0YdU9OaFJ19I0ONwFAj2KRU1Ca9kdT_u4BdBO6Xpw-YaWrUBC45q6vP5FykQ",
  },
];

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAtrLF1pVSAdehfs3yTU4MzEtjdm-cuUKe-wxYMIV_ekYHZrjTtcB2vQRv7wy3GvsEdzkJ6kdvY-irPukErP2qNIXEb_5LIuTFTnqFC2zTgHOooUfq2Coh2SbZ8-JOXIZv7lZwF8ZbY8E3ZoXw6pel1ECTt_F5yx7IdM7o8_TXpDoSNLqkncUinizPJ0qSUZ_migTwVsO0iyCfwHJg1AX-I9CmI277Ry3_tim_zfreSZQQtgK94fAcxdA";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAAIsbETRFnK7yqBKApSGz-vSuqo5TVrvIbZZwqJ_L81KHxGxQcvIHDI4-NAnD_CkhfHA7BUFwyBvFO-htS9JNOPGM4ADddW7QOgCypSWxGyEK4Hp30r3IXlAVj88xUFTnDbdQNdN00U_JeslCgHaglBKM0dFZI31JgD8EQGyw9VNomSLVoFOgWf7HJLC5vWXDV8Lk-bJmg7gKOkZpCY3SM-0xKAkc3kry26c43gO12ePCMC0PHpF9xnQ";

const MAP_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8HDM3MCd_XRmhmoUexF4Kh5a0YUN3-bx-yf95_B46Iy6Z19nwJGz6Ep_Yc3a6Ky4MWNYMX4nbG5KvAqHHoqIRhtRu8jEEfioHk6cYsN6sOhBFNUINJQVZ4BJgjweXc8hF9Aa8TtAffI8F9SDDxoHga-UP5NUDxEi1MtyAK9Px4nKdkBXsTrNX3n74oglDO6n7JqfEuZPRzRM0vZcdCwqql089IuGupyp4baHkhEdhUmz_DCHD9GlgfQ";

const REYKJAVIK_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBMzPF6wc11VKuDz_-opPGgImCeOu0KJkv3elwEeQpTwwARvIpOggXQ6lfzExsqVr5ZP64Dqexps9E7xtaC8DAMiCFcesTzkpW41AGUN9edDkN2Wl78oGN4d7tvSaCGS1JcWcI5XEgD4tPGiEgGcKiGOPEweoJqMEUletg3aHK8dtfoZOg3Ke6y4IhNBQ88p64Rgx5uGHTByiD_nHzVMORdLQdSeibA88oxBuh_mPUH_-7aJc7mopTUfQ";

function NavLink({ item, active, onClick }) {
  return (
    <a
      href="#"
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.key);
      }}
      style={{ ...labelCaps, color: active ? c.primary : c.onSurfaceVariant }}
      className="uppercase transition-colors hover:opacity-90"
    >
      {item.label}
    </a>
  );
}

function MapNode({ node }) {
  return (
    <div
      className="absolute group/node cursor-pointer"
      style={{ top: node.top, left: node.left, right: node.right, bottom: node.bottom }}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: `${node.color}33`, animationDelay: node.delay }}
        />
        <div
          className="w-3 h-3 rounded-full border-2"
          style={{
            backgroundColor: node.color,
            borderColor: c.surface,
            boxShadow: `0 0 15px ${node.glow}`,
          }}
        />
      </div>
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 backdrop-blur-sm px-3 py-1.5 rounded-lg border opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap shadow-xl"
        style={{ backgroundColor: `${c.surface}e6`, borderColor: `${node.color}4d` }}
      >
        <span
          style={{ ...labelCaps, fontSize: "10px", color: node.color }}
          className="uppercase tracking-widest block mb-0.5"
        >
          {node.region}
        </span>
        <span style={bodyMd} className="text-sm" >
          <span style={{ color: c.onSurface }}>{node.place}</span>
        </span>
      </div>
    </div>
  );
}

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  return (
    <div
      className={`group relative rounded-2xl p-8 overflow-hidden transition-all shadow-lg flex flex-col h-full min-h-[360px] ${feature.offset}`}
      style={{ backgroundColor: `${c.surfaceContainer}66`, backdropFilter: "blur(24px)" }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-all"
        style={{ backgroundColor: feature.glow }}
      />
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-6 relative z-10 border"
        style={{ backgroundColor: feature.iconBg, borderColor: `${feature.iconColor}33` }}
      >
        <Icon size={22} color={feature.iconColor} />
      </div>
      <h3 style={{ ...headlineMd, color: c.onSurface }} className="mb-3 relative z-10">
        {feature.title}
      </h3>
      <p style={{ ...bodyMd, color: c.onSurfaceVariant }} className="mb-6 relative z-10 grow">
        {feature.body}
      </p>
    </div>
  );
}

function DestinationCard({ dest }) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden h-[450px] shadow-xl cursor-pointer ${dest.offset}`}
    >
      <img
        src={dest.img}
        alt={dest.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${c.background}1a, ${c.background}66, ${c.background}f2)`,
        }}
      />
      {dest.hotspot && (
        <div
          className="absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-full border flex items-center gap-1.5 shadow-lg"
          style={{ backgroundColor: `${c.surface}cc`, borderColor: `${c.outlineVariant}80` }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: c.tertiary }} />
          <span style={{ ...labelCaps, fontSize: "10px", color: c.onSurface }} className="uppercase tracking-wider">
            Hotspot
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
        <span style={{ ...labelCaps, color: c.secondary }} className="uppercase tracking-widest">
          {dest.country}
        </span>
        <h3 style={{ ...headlineMd, color: c.onSurface }}>{dest.title}</h3>
        <div
          className="flex items-center justify-between mt-3 pt-3 border-t"
          style={{ borderColor: `${c.outlineVariant}4d` }}
        >
          <div className="flex items-center gap-2 text-sm" style={{ ...bodyMd, color: `${c.onSurfaceVariant}cc` }}>
            <Eye size={14} />
            <span>{dest.stat}</span>
          </div>
          <ArrowRight
            size={16}
            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            style={{ color: c.onSurface }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Discover() {
  useGoogleFonts();
  const [activePath, setActivePath] = useState("discover");

  return (
    <div style={{ backgroundColor: c.background, color: c.onSurface, ...bodyMd }} className="min-h-screen w-full">
      {/* Header */}
      <header
        className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{ backgroundColor: `${c.surface}cc`, boxShadow: "0 1px 8px rgba(0,0,0,0.1)" }}
      >
        <div className="h-20 w-full px-5 md:px-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="Sansar Logo" className="h-8 w-auto object-contain" />
            <span style={{ ...headlineMd, color: c.onSurface }} className="tracking-tight">
              Sansar
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.key} item={item} active={activePath === item.key} onClick={setActivePath} />
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <Search
              size={20}
              className="cursor-pointer transition-colors hover:opacity-80"
              style={{ color: c.onSurfaceVariant }}
            />
          </div>
        </div>
      </header>

      <main className="w-full pt-20">
        {/* Hero */}
        <section className="relative w-full h-[600px] min-h-[500px] flex items-center justify-center -mt-20 pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${HERO_BG}')` }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${c.background}66, ${c.background}99, ${c.background})`,
              }}
            />
          </div>
          <div className="relative z-10 w-full max-w-[1440px] px-5 md:px-16 flex flex-col items-center text-center gap-6 mt-16">
            <h1 style={{ ...displayLg, color: c.onSurface }} className="max-w-3xl leading-tight">
              The World, <span style={{ color: c.tertiary }}>Unveiled.</span>
            </h1>
            <p style={{ ...bodyLg, color: c.onSurfaceVariant }} className="max-w-2xl mb-8">
              Navigate the unseen. Curate your next expedition with unprecedented precision and immersive geographic
              intelligence.
            </p>

            {/* Search bar */}
            <div className="w-full max-w-2xl relative group">
              <div
                className="absolute -inset-0.5 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"
                style={{
                  background: `linear-gradient(to right, ${c.secondary}80, ${c.tertiary}4d, ${c.secondary}80)`,
                }}
              />
              <div
                className="relative flex items-center backdrop-blur-md rounded-full p-2 pl-6 pr-3 shadow-2xl transition-all border"
                style={{ backgroundColor: `${c.surfaceContainer}cc`, borderColor: `${c.outlineVariant}4d` }}
              >
                <Globe size={20} style={{ color: c.onSurfaceVariant }} className="mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search destinations, landmarks, or coordinates..."
                  style={{ ...bodyLg, color: c.onSurface }}
                  className="bg-transparent w-full focus:outline-none placeholder:opacity-40"
                />
                <button
                  style={{
                    background: `linear-gradient(to right, ${c.secondaryContainer}, ${c.primaryContainer})`,
                    color: c.onSecondaryContainer,
                    ...labelCaps,
                  }}
                  className="uppercase px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-lg ml-2 hover:opacity-90"
                >
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive map */}
        <section className="w-full relative z-20 pb-24">
          <div className="w-full max-w-[1920px] mx-auto px-5 md:px-16 relative">
            <div
              className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden relative shadow-2xl border group"
              style={{ borderColor: `${c.outlineVariant}33`, backgroundColor: c.surfaceContainer }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('${MAP_BG}')`,
                  filter: "grayscale(80%) sepia(20%) hue-rotate(180deg) brightness(0.6) contrast(1.2)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${c.background}e6, transparent, transparent)` }}
              />

              {/* Overlay card */}
              <div
                className="absolute top-8 left-8 backdrop-blur-md p-4 rounded-xl border flex flex-col gap-2 max-w-xs shadow-lg"
                style={{ backgroundColor: `${c.surface}cc`, borderColor: `${c.outlineVariant}4d` }}
              >
                <span
                  style={{ ...labelCaps, color: c.secondary }}
                  className="uppercase tracking-widest flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: c.secondary }} />
                  Global Recon
                </span>
                <h3 style={{ ...headlineMd, color: c.onSurface }}>Interactive Discovery</h3>
                <p style={{ ...bodyMd, color: c.onSurfaceVariant }} className="text-sm">
                  Pan, zoom, and select regions to access hyper-local intelligence and real-time environmental data.
                </p>
              </div>

              {MAP_NODES.map((node, i) => (
                <MapNode key={i} node={node} />
              ))}

              {/* Map controls */}
              <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                {[
                  { Icon: Plus, extra: "" },
                  { Icon: Minus, extra: "" },
                  { Icon: LocateFixed, extra: "mt-2" },
                ].map(({ Icon, extra }, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 backdrop-blur-md rounded-lg border flex items-center justify-center transition-colors shadow-lg hover:opacity-90 ${extra}`}
                    style={{ backgroundColor: `${c.surface}cc`, borderColor: `${c.outlineVariant}4d`, color: c.onSurface }}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full max-w-[1440px] mx-auto px-5 md:px-16 py-24 relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span style={{ ...labelCaps, color: c.secondary }} className="uppercase tracking-widest mb-2 block">
                System Capabilities
              </span>
              <h2 style={{ ...displayLg, color: c.onSurface }}>Architect Your Journey.</h2>
            </div>
            <p style={{ ...bodyMd, color: c.onSurfaceVariant }} className="max-w-md">
              Beyond conventional mapping. Sansar integrates multi-layered intelligence for the discerning traveler.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} feature={f} />
            ))}
          </div>
        </section>

        {/* Trending destinations */}
        <section className="w-full py-24 relative overflow-hidden" style={{ backgroundColor: c.surfaceContainerLow }}>
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${c.outlineVariant}, transparent)`,
            }}
          />
          <div className="max-w-[1440px] mx-auto px-5 md:px-16 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="flex items-center gap-4">
                <h2 style={{ ...displayLg, color: c.onSurface }}>Trending Immersions</h2>
                <span
                  style={{ ...labelCaps, backgroundColor: `${c.tertiary}1a`, color: c.tertiary, borderColor: `${c.tertiary}33` }}
                  className="px-3 py-1 rounded-full border"
                >
                  Live Data
                </span>
              </div>
              <a
                href="#"
                className="group flex items-center gap-2 uppercase transition-colors hover:opacity-80"
                style={{ ...labelCaps, color: c.primary }}
              >
                View All Coordinates
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATIONS.map((d, i) => (
                <DestinationCard key={i} dest={d} />
              ))}

              {/* Map-context card */}
              <div
                className="group relative rounded-2xl overflow-hidden h-[450px] shadow-xl cursor-pointer lg:translate-y-8 flex flex-col p-1"
                style={{ backgroundColor: c.surfaceContainer }}
              >
                <div
                  className="w-full h-1/2 rounded-t-xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${REYKJAVIK_BG}')` }}
                />
                <div
                  className="flex-1 p-6 flex flex-col justify-end rounded-b-xl relative z-10"
                  style={{ background: `linear-gradient(to top, ${c.background}, ${c.background}cc)` }}
                >
                  <div
                    className="absolute -top-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border"
                    style={{ backgroundColor: c.surface, borderColor: `${c.outlineVariant}4d`, color: c.secondary }}
                  >
                    <MapIcon size={18} />
                  </div>
                  <span style={{ ...labelCaps, color: c.secondary }} className="uppercase tracking-widest mb-2 block">
                    Iceland
                  </span>
                  <h3 style={{ ...headlineMd, color: c.onSurface }} className="mb-2">
                    Reykjavik Thermal Network
                  </h3>
                  <p style={{ ...bodyMd, color: `${c.onSurfaceVariant}cc` }} className="text-sm line-clamp-2">
                    Map view of geothermal hotspots and optimal routing algorithms.
                  </p>
                  <div
                    className="flex items-center justify-between mt-3 pt-3 border-t"
                    style={{ borderColor: `${c.outlineVariant}4d` }}
                  >
                    <span style={{ ...labelCaps, fontSize: "10px", color: c.primary }} className="uppercase tracking-widest">
                      Access Map
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" style={{ color: c.primary }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="w-full py-16 px-5 md:px-16 border-t"
        style={{ backgroundColor: c.surfaceContainerLowest, borderColor: `${c.outlineVariant}1a` }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Sansar Logo" className="h-6 w-auto opacity-70" />
              <span style={{ ...headlineMd, fontSize: "18px", lineHeight: "28px", color: c.onSurface }}>Sansar</span>
            </div>
            <p style={{ ...bodyMd, color: c.onSurfaceVariant }} className="max-w-xs">
              Discover hidden gems and orchestrate the ultimate expedition with precision and wonder.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <span style={{ ...labelCaps, color: c.onSurface }} className="uppercase">
                Company
              </span>
              {["About", "Press", "Careers"].map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{ ...bodyMd, color: c.onSurfaceVariant }}
                  className="transition-colors hover:opacity-80"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <span style={{ ...labelCaps, color: c.onSurface }} className="uppercase">
                Connect
              </span>
              {["Instagram", "Twitter", "TikTok"].map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{ ...bodyMd, color: c.onSurfaceVariant }}
                  className="transition-colors hover:opacity-80"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className="max-w-[1440px] mx-auto mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 uppercase"
          style={{ ...labelCaps, fontSize: "10px", color: c.onSurfaceVariant, borderColor: `${c.outlineVariant}33` }}
        >
          <span>© 2024 Sansar Expeditions.</span>
          <span>All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}