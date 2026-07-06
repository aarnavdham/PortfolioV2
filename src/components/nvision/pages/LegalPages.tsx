"use client";

import { useRouter } from "../router";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";

function LegalShell({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <div className="page-enter pt-32">
      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Legal ]
            </span>
          </ScrollReveal>
          <SplitText
            text={title}
            as="h1"
            className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9]"
            stagger={0.04}
          />
          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-sm text-muted-foreground font-mono-tight uppercase tracking-wider">
              Last updated: {updated}
            </p>
            <p className="mt-8 text-base text-foreground/70 leading-relaxed max-w-2xl">
              {intro}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-12 lg:py-20 border-t border-foreground/[0.06]">
        <div className="mx-auto max-w-4xl flex flex-col gap-16">
          {sections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-mono-tight text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                </div>
                <div className="pl-0 lg:pl-8 flex flex-col gap-4">
                  {section.body.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-foreground/65 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy"
      updated="June 28, 2025"
      intro="We respect your privacy the same way we respect your time — by not wasting it. This policy explains what we collect, why we collect it, and what we do (and don't do) with it."
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you contact us through our form, we collect the information you explicitly provide: your name, email address, company, and the message you send. That's it. We don't sneak in hidden fields or scrape your LinkedIn.",
            "When you visit our website, we collect anonymous analytics data — page views, referrers, device type, and rough geographic region. We use this to understand how the site is being used and to make it better. We don't track individual users across sessions.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Information you provide through the contact form is used solely to respond to your inquiry and, if we end up working together, to deliver the project. We never sell, rent, or share your data with third parties for marketing purposes.",
            "Anonymous analytics data is used in aggregate to improve the website. We may share aggregated, non-identifying statistics publicly (e.g., 'we had 50,000 visitors last month') but never in a way that could identify an individual.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use a single essential cookie to remember your theme preference (dark mode, in case you were wondering — it's always dark mode). We do not use third-party advertising cookies, tracking pixels, or social media embeds that track you across the web.",
            "Analytics is collected via a privacy-respecting tool (Plausible) that does not use cookies and does not collect personally identifiable information. You can verify this by inspecting our network requests — we encourage it.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under GDPR and similar regulations, you have the right to access, correct, or delete any personal data we hold about you. You also have the right to object to processing and to request data portability.",
            "To exercise any of these rights, email privacy@nvision.studio. We'll respond within 30 days. We don't make you fill out a form to exercise a legal right — just send us an email.",
          ],
        },
        {
          heading: "Data retention",
          body: [
            "Contact form submissions are retained for 24 months. If we begin a project together, project-related communications are retained for the duration of the engagement plus 7 years for tax and legal compliance.",
            "Anonymous analytics data is retained indefinitely in aggregate form. Individual session data is not retained beyond 24 hours.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Questions about this policy? Email privacy@nvision.studio. We wrote this policy ourselves — no lawyers, no jargon — and we're happy to clarify anything that's unclear.",
          ],
        },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <LegalShell
      title="Terms"
      updated="June 28, 2025"
      intro="These terms govern your use of the NVISION website. They're written in plain language because we believe legal documents shouldn't require a translator."
      sections={[
        {
          heading: "Using this website",
          body: [
            "By accessing this website, you agree to use it for lawful purposes only. You agree not to disrupt the website, attempt to gain unauthorized access to our systems, or use automated tools to scrape content without permission.",
            "We make this website available for free. In return, we ask that you don't reproduce substantial portions of it without attribution. Linking to us is always welcome.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "All content on this website — including text, graphics, logos, motion design, and code — is the property of NVISION Studio unless otherwise noted. You may share links and short excerpts with attribution.",
            "The project case studies shown in our portfolio are shown with client permission. The underlying work product belongs to the respective clients. We display them to demonstrate our capabilities, not to imply endorsement of any third-party use.",
          ],
        },
        {
          heading: "Project engagements",
          body: [
            "Separate from these website terms, any project engagement with NVISION is governed by a dedicated services agreement signed by both parties. That agreement supersedes any conflicting language on this website.",
            "We work on a fixed-fee or retainer basis. Payment schedules, deliverables, and intellectual property transfer are defined per-project in the services agreement. Nothing on this website constitutes a binding offer.",
          ],
        },
        {
          heading: "Disclaimers",
          body: [
            "This website is provided 'as is' without warranty of any kind. We don't guarantee that the website will be available at all times, error-free, or compatible with every device. We do, however, try very hard to make it so.",
            "Any testimonials or case studies represent the experiences of specific clients at specific points in time. They are not promises of future results for any other engagement.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the maximum extent permitted by law, NVISION Studio shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website. Our total liability for any claim related to this website is limited to USD $100.",
            "This limitation does not apply to liability that cannot be excluded under applicable law, such as liability for gross negligence or willful misconduct.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "We may update these terms from time to time. The 'last updated' date at the top of this page reflects the most recent revision. Continued use of the website after changes constitutes acceptance of the updated terms.",
            "If we make material changes, we'll note them on our blog. We won't email you about minor wording fixes — only about changes that materially affect your rights.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Questions about these terms? Email legal@nvision.studio. We'll do our best to answer in plain English (or Portuguese, Spanish, or French, if you prefer).",
          ],
        },
      ]}
    />
  );
}
