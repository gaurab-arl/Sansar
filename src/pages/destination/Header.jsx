const NAV_LINKS = [
  { label: "Discover", path: "discover" },
  { label: "Destinations", path: "destinations" },
  { label: "Budget Planner", path: "budget-planner" },
];

export default function Header({ activePath = "destinations", logoSrc }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.1)]">
      <div className="h-20 w-full px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img alt="Sansar Logo" className="h-8 w-auto object-contain" src={logoSrc} />
          <span className="font-headline-md text-headline-md text-on-surface tracking-tight">
            Sansar
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-gutter">
          {NAV_LINKS.map((link) => {
            const isActive = link.path === activePath;
            return (
              <a
                key={link.path}
                href="#"
                aria-current={isActive ? "page" : undefined}
                className={`font-label-caps text-label-caps uppercase transition-colors ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
