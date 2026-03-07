import { FOOTER_DATA } from "@/constants/marketing/footer";
import {
  IconBrandGithub,
  IconBrandReddit,
  IconBrandX,
  IconWorld,
} from "@tabler/icons-react";

const data = FOOTER_DATA;

export default function MarketingFooter() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tighter text-primary mb-4">
              {data.brand.name}
            </h2>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              {data.brand.description}
            </p>
            <div className="flex gap-4">
              {data.brand.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  {social.name === "X" && <IconBrandX size={20} />}
                  {social.name === "Reddit" && <IconBrandReddit size={20} />}
                  {social.name === "Github" && <IconBrandGithub size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Links Sections */}
          {data.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-foreground font-semibold mb-5 text-sm uppercase tracking-widest p-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm p-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-radius-md border border-border cursor-pointer hover:bg-secondary transition-colors">
            <IconWorld size={14} />
            <span>English (US)</span>
          </div>

          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} {data.brand.name}. Built for the star
            community
          </p>
        </div>
      </div>
    </footer>
  );
}
