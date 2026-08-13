// App.js
import React, { useState } from 'react';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App bg-background font-body-md text-on-surface min-h-screen">
      {/* Header - fixed top */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.1)]">
        <div className="h-20 w-full px-margin-desktop flex items-center justify-between max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4">
            <img
              alt="Sansar Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtrLF1pVSAdehfs3yTU4MzEtjdm-cuUKe-wxYMIV_ekYHZrjTtcB2vQRv7wy3GvsEdzkJ6kdvY-irPukErP2qNIXEb_5LIuTFTnqFC2zTgHOooUfq2Coh2SbZ8-JOXIZv7lZwF8ZbY8E3ZoXw6pel1ECTt_F5yx7IdM7o8_TXpDoSNLqkncUinizPJ0qSUZ_migTwVsO0iyCfwHJg1AX-I9CmI277Ry3_tim_zfreSZQQtgK94fAcxdA"
            />
            <span className="font-headline-md text-headline-md text-on-surface tracking-tight">Sansar</span>
          </div>

          <nav className="hidden md:flex items-center gap-gutter" data-active-classes="text-primary font-bold">
            <a className="transition-colors uppercase text-primary font-bold" data-path="discover" href="#">
              Discover
            </a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors uppercase" data-path="destinations" href="#">
              Destinations
            </a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors uppercase" data-path="budget-planner" href="#">
              Budget Planner
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
              search
            </span>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-background">
        <div className="flex flex-col w-full relative">
          {/* Hero Section */}
          <section className="relative w-full h-[600px] min-h-[500px] flex items-center justify-center -mt-20 pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center"
                data-alt="A breathtaking, cinematic ultra-wide shot of a vast, mysterious mountain range at twilight. The scene features deep blues and indigos, with glowing, ethereal mist clinging to the peaks. A subtle, high-tech HUD overlay with delicate teal and gold lines maps the topography, creating a sense of advanced exploration. Moody lighting, high contrast, 8k resolution, premium travel aesthetic."
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAIsbETRFnK7yqBKApSGz-vSuqo5TVrvIbZZwqJ_L81KHxGxQcvIHDI4-NAnD_CkhfHA7BUFwyBvFO-htS9JNOPGM4ADddW7QOgCypSWxGyEK4Hp30r3IXlAVj88xUFTnDbdQNdN00U_JeslCgHaglBKM0dFZI31JgD8EQGyw9VNomSLVoFOgWf7HJLC5vWXDV8Lk-bJmg7gKOkZpCY3SM-0xKAkc3kry26c43gO12ePCMC0PHpF9xnQ")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
            </div>

            <div className="relative z-10 w-full max-w-container-max-width px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center gap-6 mt-16">
              <h1 className="font-display-lg text-display-lg text-on-surface max-w-3xl leading-tight">
                The World, <span className="text-tertiary">Unveiled.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">
                Navigate the unseen. Curate your next expedition with unprecedented precision and immersive geographic intelligence.
              </p>

              {/* Search Bar */}
              <div className="w-full max-w-2xl relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/50 via-tertiary/30 to-secondary/50 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center bg-surface-container/80 backdrop-blur-md rounded-full p-2 pl-6 pr-3 shadow-2xl transition-all border border-outline-variant/30 group-hover:border-secondary/50">
                  <span className="material-symbols-outlined text-on-surface-variant text-xl mr-3">public</span>
                  <input
                    className="bg-transparent font-body-lg text-body-lg text-on-surface w-full focus:outline-none placeholder:text-on-surface-variant/50"
                    placeholder="Search destinations, landmarks, or coordinates..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-gradient-to-r from-secondary-container to-primary-container hover:from-secondary hover:to-primary text-on-secondary-container font-label-caps text-label-caps uppercase px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-lg ml-2">
                    <span>Explore</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Map Exploration Section */}
          <section className="w-full bg-background relative z-20 pb-24">
            <div className="w-full max-w-[1920px] mx-auto px-margin-mobile md:px-margin-desktop relative">
              <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden relative shadow-2xl border border-outline-variant/20 bg-surface-container group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out group-hover:scale-105"
                  data-alt="A highly detailed, stylized digital map interface with a dark theme. Glowing teal and gold nodes connect various global locations. Topographic contour lines overlay the terrain, creating a high-tech, strategic exploration aesthetic."
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8HDM3MCd_XRmhmoUexF4Kh5a0YUN3-bx-yf95_B46Iy6Z19nwJGz6Ep_Yc3a6Ky4MWNYMX4nbG5KvAqHHoqIRhtRu8jEEfioHk6cYsN6sOhBFNUINJQVZ4BJgjweXc8hF9Aa8TtAffI8F9SDDxoHga-UP5NUDxEi1MtyAK9Px4nKdkBXsTrNX3n74oglDO6n7JqfEuZPRzRM0vZcdCwqql089IuGupyp4baHkhEdhUmz_DCHD9GlgfQ")',
                    filter: 'grayscale(80%) sepia(20%) hue-rotate(180deg) brightness(0.6) contrast(1.2)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>

                {/* Map Overlay Elements */}
                <div className="absolute top-8 left-8 bg-surface/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-2 max-w-xs shadow-lg">
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    Global Recon
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Interactive Discovery</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    Pan, zoom, and select regions to access hyper-local intelligence and real-time environmental data.
                  </p>
                </div>

                {/* Map Nodes */}
                <div className="absolute top-[30%] left-[20%] group/node cursor-pointer">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-tertiary/20 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-tertiary rounded-full shadow-[0_0_15px_rgba(233,196,0,0.8)] border-2 border-surface"></div>
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-tertiary/30 opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                    <span className="font-label-caps text-[10px] text-tertiary uppercase tracking-widest block mb-0.5">North America</span>
                    <span className="font-body-md text-sm text-on-surface">Cascadia Biome</span>
                  </div>
                </div>

                <div className="absolute top-[45%] right-[30%] group/node cursor-pointer">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-secondary rounded-full shadow-[0_0_15px_rgba(118,214,213,0.8)] border-2 border-surface"></div>
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-secondary/30 opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                    <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest block mb-0.5">Europe</span>
                    <span className="font-body-md text-sm text-on-surface">Alpine Network</span>
                  </div>
                </div>

                <div className="absolute bottom-[35%] right-[15%] group/node cursor-pointer">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(190,198,225,0.8)] border-2 border-surface"></div>
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-primary/30 opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                    <span className="font-label-caps text-[10px] text-primary uppercase tracking-widest block mb-0.5">Asia</span>
                    <span className="font-body-md text-sm text-on-surface">Neo-Tokyo Hub</span>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-surface/80 backdrop-blur-md rounded-lg border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface hover:text-primary transition-colors shadow-lg">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button className="w-10 h-10 bg-surface/80 backdrop-blur-md rounded-lg border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface hover:text-primary transition-colors shadow-lg">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <button className="w-10 h-10 bg-surface/80 backdrop-blur-md rounded-lg border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface hover:text-primary transition-colors shadow-lg mt-2">
                    <span className="material-symbols-outlined">my_location</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-24 relative z-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-2 block">
                  System Capabilities
                </span>
                <h2 className="font-display-lg text-display-lg text-on-surface">Architect Your Journey.</h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Beyond conventional mapping. Sansar integrates multi-layered intelligence for the discerning traveler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="group relative bg-surface-container/40 backdrop-blur-xl rounded-2xl p-8 overflow-hidden transition-all hover:bg-surface-container/60 shadow-lg flex flex-col h-full min-h-[360px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-secondary/20 transition-all"></div>
                <div className="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center mb-6 relative z-10 border border-secondary/20">
                  <span className="material-symbols-outlined text-secondary">view_in_ar</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 relative z-10">Interactive Discovery</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10 grow">
                  Experience terrain before arrival. Our proprietary 3D modeling engine renders geography and landmarks with millimeter precision.
                </p>
                <div className="relative h-24 w-full mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
                  <svg className="w-full h-full text-secondary" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 200 100">
                    <path className="opacity-50" d="M10 80 L50 40 L90 60 L140 20 L190 70" strokeWidth="2" />
                    <path d="M10 90 L50 50 L90 70 L140 30 L190 80" />
                    <path className="opacity-30" d="M10 100 L50 60 L90 80 L140 40 L190 90" strokeWidth="0.5" />
                    <circle className="text-tertiary" cx="50" cy="40" fill="currentColor" r="3" />
                    <circle className="text-tertiary" cx="140" cy="20" fill="currentColor" r="3" />
                  </svg>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-surface-container/40 backdrop-blur-xl rounded-2xl p-8 overflow-hidden transition-all hover:bg-surface-container/60 shadow-lg flex flex-col h-full min-h-[360px] md:-mt-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all"></div>
                <div className="w-12 h-12 rounded-full bg-primary-container/50 flex items-center justify-center mb-6 relative z-10 border border-primary/20">
                  <span className="material-symbols-outlined text-primary">hub</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 relative z-10">Hybrid Intelligence</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10 grow">
                  A synthesis of macro and micro. We aggregate global public data and fuse it with hyper-local, curated insights for unmatched context.
                </p>
                <div className="relative h-24 w-full mt-auto opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(190,198,225,0.8)]"></div>
                    <div className="absolute top-1/3 left-1/2 w-3 h-3 rounded-full bg-tertiary shadow-[0_0_15px_rgba(233,196,0,0.8)]"></div>
                    <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(118,214,213,0.8)]"></div>
                    <svg className="absolute inset-0 w-full h-full text-outline-variant" stroke="currentColor" strokeDasharray="4 4">
                      <line x1="25%" x2="50%" y1="50%" y2="33%" />
                      <line x1="50%" x2="75%" y1="33%" y2="66%" />
                      <line opacity="0.3" x1="25%" x2="75%" y1="50%" y2="66%" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-surface-container/40 backdrop-blur-xl rounded-2xl p-8 overflow-hidden transition-all hover:bg-surface-container/60 shadow-lg flex flex-col h-full min-h-[360px] md:mt-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-tertiary/20 transition-all"></div>
                <div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center mb-6 relative z-10 border border-tertiary/20">
                  <span className="material-symbols-outlined text-tertiary">account_balance_wallet</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 relative z-10">Precision Budgeting</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10 grow">
                  Foresee every variable. Dynamic, multi-tiered cost analysis algorithms adapt to real-time economic fluctuations.
                </p>
                <div className="relative h-24 w-full mt-auto flex items-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="w-1/4 bg-surface-variant rounded-t-sm h-1/3 relative group-hover:h-2/5 transition-all"><div className="absolute top-0 inset-x-0 h-1 bg-outline-variant"></div></div>
                  <div className="w-1/4 bg-primary-container rounded-t-sm h-2/3 relative group-hover:h-3/4 transition-all"><div className="absolute top-0 inset-x-0 h-1 bg-primary"></div></div>
                  <div className="w-1/4 bg-secondary-container rounded-t-sm h-1/2 relative group-hover:h-3/5 transition-all"><div className="absolute top-0 inset-x-0 h-1 bg-secondary"></div></div>
                  <div className="w-1/4 bg-tertiary-container/30 rounded-t-sm h-full relative transition-all"><div className="absolute top-0 inset-x-0 h-1 bg-tertiary"></div></div>
                </div>
              </div>
            </div>
          </section>

          {/* Trending Destinations Section */}
          <section className="w-full bg-surface-container-low py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>
            <div className="absolute -left-64 top-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="flex items-center gap-4">
                  <h2 className="font-display-lg text-display-lg text-on-surface">Trending Immersions</h2>
                  <span className="px-3 py-1 bg-tertiary/10 text-tertiary font-label-caps text-label-caps rounded-full border border-tertiary/20">
                    Live Data
                  </span>
                </div>
                <a className="group flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase hover:text-primary-fixed transition-colors" href="#">
                  View All Coordinates
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="group relative rounded-2xl overflow-hidden h-[450px] shadow-xl cursor-pointer">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    data-alt="Vertical view of a futuristic neon-lit alleyway in Kyoto at night, blending traditional wooden architecture with subtle holographic signs. Deep indigo shadows, vibrant cyan and gold highlights, cyberpunk meets traditional Japanese aesthetic, high contrast."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALwG16Cc0Os0XJKKG6tPvkhNgDBsTAKvXJ1rei2vDFsGHzoVw8pdKER6Suu2gFkQ1fNlEjT0H5hfPlIfMoibbIlw3SwICuUvYW257yUb7a2RCkAaVkft0FgaviGxnSDmdXVHjXp3-UO3DjZwB5ZKjsQgHuv52Hh_kee7D031Rdug01bqzaJQfJfD50PfPwDwWTp3GXscxw-Rc4shYVcX8GLWA8Qw15vdaRlpn0KY59GU7JACU6M95oaw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/95"></div>
                  <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-outline-variant/50 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="font-label-caps text-[10px] text-on-surface uppercase tracking-wider">Hotspot</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Japan</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Kyoto Neo-Districts</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-2 text-on-surface-variant/80 font-body-md text-sm">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>14.2k Active</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative rounded-2xl overflow-hidden h-[450px] shadow-xl cursor-pointer lg:translate-y-8">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    data-alt="A dramatic aerial shot of a glowing bio-luminescent bay in Puerto Rico at midnight. Dark, inky black water contrasted with glowing electric blue waves. Minimalist, premium, mysterious atmosphere."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPF9LcAR1RNlE_rXEYaObIj8YlUC8BvGMELzT3SO6yLnX9q_P4CW6KkIz4TjxNpk0L5Zm3TDlZg2Fm1oDddXHUyG9rqTLin9F0tAWKkELWcEePOE0gvyAm7mnaHtN9-nRvXvDe_xVkWGWXUOxUv2frTVWjLjDn9Ubc2xX5KHll8omkKUoJmCUIaeZkD-kk6Qt6G0xmcLHeMhwXihHk8_MukyLQTjjzZa247hG45zjnHh243_tPcGS4VQ"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/95"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Puerto Rico</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Mosquito Bay Bioluminescence</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-2 text-on-surface-variant/80 font-body-md text-sm">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>8.9k Active</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative rounded-2xl overflow-hidden h-[450px] shadow-xl cursor-pointer">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    data-alt="Sleek, ultra-modern eco-pods suspended above a misty, dense green rainforest in Costa Rica. Morning light piercing through the canopy. Architecture blends seamlessly with nature. High contrast between the dark greens and warm sunlight."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvO6949vjeVP1fG7ODBMhwxZyT5-x_71-vq_4hBUPobMQyEJit7Nva2tqPTBWpYT1GYv7uNVQuMgK4gRIiYbPbm3ZgPmGRBCr-rw9tqqXFdZroIUPUlXDtKJ_jGpwDb6i3hyoqLP1Jm2eKcXF-9bWXjPxtUGKi5bRJohY9CwigIb170NkXpibH7PuUnW0YdU9OaFJ19I0ONwFAj2KRU1Ca9kdT_u4BdBO6Xpw-YaWrUBC45q6vP5FykQ"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/95"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Costa Rica</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Canopy Eco-Sanctuary</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-2 text-on-surface-variant/80 font-body-md text-sm">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>11.5k Active</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 4 - Map Context */}
                <div className="group relative rounded-2xl overflow-hidden h-[450px] shadow-xl cursor-pointer bg-surface-container lg:translate-y-8 flex flex-col p-1">
                  <div
                    className="w-full h-1/2 rounded-t-xl bg-cover bg-center"
                    data-location="Reykjavik, Iceland"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMzPF6wc11VKuDz_-opPGgImCeOu0KJkv3elwEeQpTwwARvIpOggXQ6lfzExsqVr5ZP64Dqexps9E7xtaC8DAMiCFcesTzkpW41AGUN9edDkN2Wl78oGN4d7tvSaCGS1JcWcI5XEgD4tPGiEgGcKiGOPEweoJqMEUletg3aHK8dtfoZOg3Ke6y4IhNBQ88p64Rgx5uGHTByiD_nHzVMORdLQdSeibA88oxBuh_mPUH_-7aJc7mopTUfQ")',
                    }}
                  />
                  <div className="flex-1 p-6 flex flex-col justify-end bg-gradient-to-t from-background to-background/80 rounded-b-xl relative z-10">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-surface rounded-full shadow-lg flex items-center justify-center border border-outline-variant/30 text-secondary">
                      <span className="material-symbols-outlined">map</span>
                    </div>
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-2 block">Iceland</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Reykjavik Thermal Network</h3>
                    <p className="font-body-md text-sm text-on-surface-variant/80 line-clamp-2">
                      Map view of geothermal hotspots and optimal routing algorithms.
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant/30">
                      <span className="text-primary font-label-caps text-[10px] uppercase tracking-widest">Access Map</span>
                      <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-1 transition-transform">
                        east
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest py-16 px-margin-desktop border-t border-outline-variant/10">
        <div className="max-w-container-max-width mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Sansar Logo"
                className="h-6 w-auto opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtrLF1pVSAdehfs3yTU4MzEtjdm-cuUKe-wxYMIV_ekYHZrjTtcB2vQRv7wy3GvsEdzkJ6kdvY-irPukErP2qNIXEb_5LIuTFTnqFC2zTgHOooUfq2Coh2SbZ8-JOXIZv7lZwF8ZbY8E3ZoXw6pel1ECTt_F5yx7IdM7o8_TXpDoSNLqkncUinizPJ0qSUZ_migTwVsO0iyCfwHJg1AX-I9CmI277Ry3_tim_zfreSZQQtgK94fAcxdA"
              />
              <span className="font-headline-md text-body-lg text-on-surface">Sansar</span>
            </div>
            <p className="text-on-surface-variant max-w-xs font-body-md text-body-md">
              Discover hidden gems and orchestrate the ultimate expedition with precision and wonder.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-on-surface uppercase">Company</span>
              <a className="text-on-surface-variant hover:text-tertiary font-body-md text-body-md transition-colors" href="#">
                About
              </a>
              <a className="text-on-surface-variant hover:text-tertiary font-body-md text-body-md transition-colors" href="#">
                Press
              </a>
              <a className="text-on-surface-variant hover:text-tertiary font-body-md text-body-md transition-colors" href="#">
                Careers
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-on-surface uppercase">Connect</span>
              <a className="text-on-surface-variant hover:text-secondary font-body-md text-body-md transition-colors" href="#">
                Instagram
              </a>
              <a className="text-on-surface-variant hover:text-secondary font-body-md text-body-md transition-colors" href="#">
                Twitter
              </a>
              <a className="text-on-surface-variant hover:text-secondary font-body-md text-body-md transition-colors" href="#">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-container-max-width mx-auto mt-16 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest">
          <span>© 2024 Sansar Expeditions.</span>
          <span>All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Discover;