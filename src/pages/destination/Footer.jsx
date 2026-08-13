const FOOTER_COLUMNS = [
  {
    title: "Company",
    hoverColor: "hover:text-tertiary",
    links: ["About", "Press", "Careers"],
  },
  {
    title: "Connect",
    hoverColor: "hover:text-secondary",
    links: ["Instagram", "Twitter", "TikTok"],
  },
];

export default function Footer({ logoSrc }) {
  return (
    <footer className="w-full bg-surface-container-lowest py-16 px-margin-desktop border-t border-outline-variant/10">
      <div className="max-w-container-max-width mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img alt="Sansar Logo" className="h-6 w-auto opacity-70" src={logoSrc} />
            <span className="font-headline-md text-body-lg text-on-surface">Sansar</span>
          </div>
          <p className="text-on-surface-variant max-w-xs font-body-md text-body-md">
            Discover hidden gems and orchestrate the ultimate expedition with precision and
            wonder.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-on-surface uppercase">
                {col.title}
              </span>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className={`text-on-surface-variant ${col.hoverColor} font-body-md text-body-md transition-colors`}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto mt-16 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest">
        <span>© 2024 Sansar Expeditions.</span>
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  );
}
