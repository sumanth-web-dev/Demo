import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '../Container/Container'
import { siteData, navigation } from '../../data/site'
import { solutions } from '../../data/solutions'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <Container>
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <img
                src="/KyvantaLogo.png"
                alt="Kyvanta Innovation"
                className="h-9 w-auto mb-4"
              />
              <p className="text-sm leading-relaxed max-w-xs">
                {siteData.company.description}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Solutions
              </h4>
              <ul className="space-y-2.5">
                {solutions.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/solutions#${s.id}`}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Get in Touch
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/contact"
                    className="text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    Start a Project
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:kyvantainnovations@gmail.com"
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    kyvantainnovations@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919480700048"
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    +91 9480700048
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} {siteData.company.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-600">
                {siteData.company.tagline}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
