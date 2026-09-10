import { Container } from '../../components/Container/Container'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'

export function Terms() {
  return (
    <>
      <SEO title="Terms of Service" description="Kyvanta Innovation terms of service. Terms governing the use of our website and services." path="/terms" />
      <WebPageSchema title="Terms of Service" description="Kyvanta Innovation terms of service." path="/terms" />
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight mb-8">Terms of Service</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
                <p>By accessing and using the Kyvanta Innovation website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">2. Services</h2>
                <p>Kyvanta Innovation provides AI automation, AI agent development, custom AI applications, conversational AI, AI integration, intelligent document processing, and custom software development services. Specific terms for each engagement are defined in separate project agreements.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">3. Intellectual Property</h2>
                <p>Ownership of custom-built solutions is defined in individual project agreements. Kyvanta Innovation retains ownership of its pre-existing tools, frameworks, and methodologies unless otherwise specified in a project agreement.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">4. Limitation of Liability</h2>
                <p>Kyvanta Innovation shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of or inability to use our website or services.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">5. Confidentiality</h2>
                <p>We treat all project information as confidential. We will not disclose your business information to third parties without your written consent, except as required by law.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">6. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Changes will be effective when posted on this page. Your continued use of our website constitutes acceptance of the modified terms.</p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">7. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at kyvanta.innovations@gmail.com or +91 9480700048.</p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
