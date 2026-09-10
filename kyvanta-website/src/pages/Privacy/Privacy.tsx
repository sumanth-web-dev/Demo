import { Container } from '../../components/Container/Container'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'

export function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Kyvanta Innovation privacy policy. How we collect, use, and protect your personal information." path="/privacy" />
      <WebPageSchema title="Privacy Policy" description="Kyvanta Innovation privacy policy." path="/privacy" />
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight mb-8">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you fill out a contact form, request an audit, or communicate with us. This may include your name, email address, company name, and project details.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to respond to your inquiries, provide requested services, send project-related communications, and improve our website and services.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Information Sharing</h2>
                <p>We do not sell or rent your personal information to third parties. We may share information with service providers who assist in operating our website and conducting our business, subject to confidentiality obligations.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Cookies</h2>
                <p>Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at kyvanta.innovations@gmail.com.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at kyvanta.innovations@gmail.com or +91 9480700048.</p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
