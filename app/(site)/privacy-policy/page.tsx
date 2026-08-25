import SiteHeader from "@/components/site/SiteHeader";


const TOC: { id: string; num: string; title: string; subs?: { id: string; num: string; title: string }[] }[] = [
  { id: "section-1", num: "1", title: "Scope and Audience" },
  {
    id: "section-2", num: "2", title: "Information We Collect",
    subs: [{ id: "section-2-1", num: "2.1", title: "Analytics, Advertising, and Online Tracking" }],
  },
  { id: "section-3", num: "3", title: "How We Use Personal Data" },
  { id: "section-4", num: "4", title: "Legal Bases for Collecting and Processing Personal Data" },
  { id: "section-5", num: "5", title: "Data Retention" },
  { id: "section-6", num: "6", title: "How We Disclose Personal Data" },
  { id: "section-7", num: "7", title: "Securing Your Personal Data" },
  {
    id: "section-8", num: "8", title: "Your Rights",
    subs: [
      { id: "section-8-1", num: "8.1", title: "General Rights" },
      { id: "section-8-2", num: "8.2", title: "Exercising Your Rights" },
      { id: "section-8-3", num: "8.3", title: "Marketing Communications" },
      { id: "section-8-4", num: "8.4", title: "Notice of Right to Opt Out of Sales and Targeted Advertising" },
      { id: "section-8-5", num: "8.5", title: "Additional Rights for Users in the EEA, UK, and Other Applicable Jurisdictions" },
    ],
  },
  { id: "section-9", num: "9", title: "Additional Information for California Residents" },
  { id: "section-10", num: "10", title: "International Transfers of Personal Data" },
  { id: "section-11", num: "11", title: "Minors" },
  { id: "section-12", num: "12", title: "Google User Data" },
  { id: "section-13", num: "13", title: "Third-Party Links and Services" },
  { id: "section-14", num: "14", title: "Changes to This Privacy Policy" },
  { id: "section-15", num: "15", title: "Contact Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative w-full font-sans bg-[#ECECEC] text-[#101010]">
      <div className="relative w-full flex flex-col">

        {/* ─── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[36vh] flex flex-col bg-gradient-to-b from-[#525252] from-[35%] to-[#ECECEC]">
          <div className="absolute inset-0 z-[1] bg-[#101010]/40 pointer-events-none" />
          <div className="relative z-10 flex flex-col flex-1 mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-20">
            <SiteHeader />
            <div className="flex flex-col flex-1 justify-end pb-12 lg:pb-16 pt-8">
              <h1
                className="text-white font-medium leading-[1.05] tracking-tight"
                style={{ fontSize: "var(--font-size-h1)" }}
              >
                Privacy Policy
              </h1>
              <p className="mt-3 font-mono text-[0.75rem] uppercase tracking-[0.25em] text-white/50">
                Last Updated — August 10, 2026
              </p>
            </div>
          </div>
        </section>

        {/* ─── CONTENT ───────────────────────────────────────────────────────── */}
        <section className="bg-[#ECECEC] py-16 lg:py-24">
          <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 lg:gap-24 items-start">

              {/* Sticky TOC */}
              <aside className="hidden lg:block sticky top-12">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted mb-6">Contents</p>
                <nav className="flex flex-col gap-2">
                  {TOC.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2">
                      <a
                        href={`#${item.id}`}
                        className="text-pretty text-muted hover:text-[#101010] transition-colors [font-size:var(--font-size-body)] leading-snug"
                      >
                        <span className="font-mono text-[0.7rem] mr-2 opacity-50">{item.num}.</span>
                        {item.title}
                      </a>
                      {item.subs && (
                        <div className="flex flex-col gap-2 pl-6">
                          {item.subs.map((sub) => (
                            <a
                              key={sub.id}
                              href={`#${sub.id}`}
                              className="text-pretty text-muted hover:text-[#101010] transition-colors [font-size:var(--font-size-body)] leading-snug opacity-80"
                            >
                              <span className="font-mono text-[0.7rem] mr-2 opacity-50">{sub.num}</span>
                              {sub.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </aside>

              {/* Body */}
              <div className="flex flex-col gap-1 max-w-[860px]">

                {/* Intro */}
                <div className="prose-section mb-12 flex flex-col gap-4">
                  <p className="text-pretty text-muted leading-[1.8]" style={{ fontSize: "var(--font-size-body)" }}>
                    Jasnah Inc., d/b/a NEAR AI, a Delaware corporation, and its subsidiaries and affiliates (&ldquo;NEAR AI&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respect your privacy.
                  </p>
                  <p className="text-pretty text-muted leading-[1.8]" style={{ fontSize: "var(--font-size-body)" }}>
                    This Privacy Policy (&ldquo;Privacy Policy&rdquo; or &ldquo;Policy&rdquo;) explains how we collect, use, disclose, and store Personal Data about individuals (&ldquo;you&rdquo; or &ldquo;User&rdquo;) who interact with our websites, including www.near.ai, https://cloud.near.ai/, https://agent.near.ai/, https://www.ironclaw.com/, and https://hub.ironclaw.com/ (collectively the &ldquo;Websites&rdquo;), and our products, materials, and services provided through or on those sites (collectively, the &ldquo;Services&rdquo;).
                  </p>
                  <p className="text-pretty text-muted leading-[1.8]" style={{ fontSize: "var(--font-size-body)" }}>
                    This Privacy Policy applies to our activities as a &ldquo;data controller&rdquo; or &ldquo;business,&rdquo; as such terms are defined in applicable law. If you are an end-user of our customer and have questions about how we process information on behalf of that customer, please reach out directly to that customer.
                  </p>

                  {/* Mobile TOC */}
                  <div className="lg:hidden mt-4 border border-[#CAC8C8] rounded-2xl p-6 flex flex-col gap-2">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted mb-2">Contents</p>
                    {TOC.map((item) => (
                      <div key={item.id} className="flex flex-col gap-2">
                        <a href={`#${item.id}`} className="text-pretty text-muted [font-size:var(--font-size-body)] leading-snug">
                          <span className="font-mono text-[0.7rem] mr-2 opacity-50">{item.num}.</span>{item.title}
                        </a>
                        {item.subs && (
                          <div className="flex flex-col gap-2 pl-6">
                            {item.subs.map((sub) => (
                              <a key={sub.id} href={`#${sub.id}`} className="text-pretty text-muted [font-size:var(--font-size-body)] leading-snug opacity-80">
                                <span className="font-mono text-[0.7rem] mr-2 opacity-50">{sub.num}</span>{sub.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 1 */}
                <Section id="section-1" number="1" title="Scope and Audience">
                  <p>This Policy describes how we collect, use, store, and disclose Personal Data from individuals who interact with the Services, including:</p>
                  <ul>
                    <li>visitors to www.near.ai;</li>
                    <li>users of Agent Hosting at https://agent.near.ai/, including the managed agent hosting platform, APIs, and related features;</li>
                    <li>users of NEAR AI Cloud at https://cloud.near.ai/, to the extent they interact with NEAR AI&apos;s Websites or provide Business Contact Information for account administration;</li>
                    <li>users of the IronClaw open-source framework (https://www.ironclaw.com/) to the extent they interact with NEAR AI Websites or create a NEAR AI account; and</li>
                    <li>users of the extension catalog for the IronClaw open-source framework, Ironhub located at https://hub.ironclaw.com/.</li>
                  </ul>
                  <p>By using the Services, you accept and agree to be bound by this Privacy Policy and the applicable Terms of Service. If you do not agree, you must not access or use the Services.</p>
                  <p>Our public marketing website (www.near.ai) may use analytics and advertising-related tracking technologies described in Section 4.</p>
                </Section>

                {/* Section 2 */}
                <Section id="section-2" number="2" title="Information We Collect">
                  <p>NEAR AI may collect certain Personal Data directly from you, as well as from other available sources, to the extent relevant and permitted by applicable local law. The categories of Personal Data we collect and process include the following:</p>

                  <div className="overflow-x-auto mt-6">
                    <table className="w-full border-collapse text-left" style={{ fontSize: "var(--font-size-body)" }}>
                      <thead>
                        <tr className="border-b border-[#CAC8C8]">
                          <th className="pb-3 pr-8 font-medium text-[#101010] w-[200px]">Category</th>
                          <th className="pb-3 font-medium text-[#101010]">What We Collect</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CAC8C8]">
                        {[
                          ["Account Information", "Email address; OAuth authentication proofs (access/refresh tokens, signature nonces); NEAR wallet authentication credentials; GitHub OAuth tokens."],
                          ["Business Contact Information", "Business addresses, phone numbers, email addresses, and contact persons' names provided for account administration."],
                          ["Support & Communications", "Name, email, and the contents of messages you send us (email, Discord, in-app chat)."],
                          ["Usage Data", "Information in connection with your use of the Services (such as information you provide us or systems you connect to in relation to your use of Services, such as Ironclaw)."],
                          ["Commercial and Billing Data", "Information in connection with products/services you purchase through our Services, such as the specific Services and subscription plan you use. (We do not receive access to your payment information. Payment information is processed through our payment processor, Stripe.)"],
                          ["Website Analytics Data", "IP address (approximate location); pages viewed; timestamps and duration; referring URLs; device and browser type; operating system; cookie identifiers; pixel/tag events (page views, conversions, form submissions)."],
                        ].map(([cat, desc]) => (
                          <tr key={cat}>
                            <td className="py-4 pr-8 align-top font-medium text-[#101010]">{cat}</td>
                            <td className="py-4 text-muted leading-[1.7]">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p>Our infrastructure providers may process limited network metadata (e.g., IP addresses) to deliver the service.</p>

                  <SubSection id="section-2-1" number="2.1" title="Analytics, Advertising, and Online Tracking">
                    <p>We use analytics, advertising, and online tracking technologies on www.near.ai to understand website usage and, where enabled, to measure the effectiveness of our marketing campaigns. These technologies may include cookies, SDKs, pixels, and tags (collectively, &ldquo;Tracking Technologies&rdquo;).</p>
                    <p>As of the &ldquo;Last Updated&rdquo; date, the Tracking Technologies used on www.near.ai include:</p>
                    <ul>
                      <li>PostHog (analytics)</li>
                      <li>LinkedIn Insight Tag (advertising/measurement)</li>
                      <li>Twitter/X Ads Pixel (advertising/measurement)</li>
                    </ul>
                    <p>These providers may collect or receive information such as page views, referring URLs, timestamps, device/browser characteristics, IP address (or derived approximate location), and event data. They may use cookies or similar identifiers to recognise your browser or device over time. Additionally, our advertising partners help us provide you with content we think will be of interest to you on our Services and across the Internet.</p>
                    <p>Where required by law (e.g., in the UK/EEA), we will obtain your consent before placing non-essential cookies or enabling advertising-related pixels. You can manage your preferences via our cookie banner or by adjusting browser settings. For more information, see our Cookie Policy. If you are interested in more information about tailored browser advertising and how you can generally control cookies from being put on your computer to deliver tailored advertising, you may visit the Network Advertising Initiative&apos;s Consumer Opt-Out link or the Digital Advertising Alliance&apos;s Consumer Opt-Out link to opt-out of receiving tailored advertising from companies that participate in those programs.</p>
                    <p>Do Not Track: There is no uniform standard for responding to Do Not Track signals. At this time, the Services do not function differently based on a user&apos;s Do Not Track signal.</p>
                  </SubSection>
                </Section>

                {/* Section 3 */}
                <Section id="section-3" number="3" title="How We Use Personal Data">
                  <p>We use the personal and usage information we collect for the following purposes:</p>
                  <ul>
                    <li><strong>Account and Authorisation.</strong> To provide access to and administer your account; authenticate you; manage access tokens and session information.</li>
                    <li><strong>Analytics.</strong> To allow us and our analytics partners to understand how users use our Services so we can measure and improve them.</li>
                    <li><strong>Billing and Administration.</strong> To meter token usage, process payments (without storing full card numbers, which is managed by our payment processor), manage subscriptions, reconcile billing, and provide invoicing.</li>
                    <li><strong>Communication.</strong> To communicate with you, including service-related communications (purchases, payment notices, security alerts, technical notices, changes to terms or policies), feature updates, and product changes, in accordance with applicable law.</li>
                    <li><strong>Legal Compliance.</strong> To comply with applicable laws, regulations, legal processes, audit and security requirements, and to enforce our Terms and other agreements.</li>
                    <li><strong>Security and Integrity.</strong> To detect fraud or abuse, enforce rate limits, safeguard the Services, and verify Confidential Compute environment integrity via per-request attestation; to ensure network and information security; to maintain the ongoing confidentiality, integrity, availability, and resilience of the Services.</li>
                    <li><strong>Operate, Deliver, and Improve the Services.</strong> To authenticate you, route requests, generate responses, and otherwise provide, operate, and improve the Services you request.</li>
                    <li><strong>Support.</strong> To respond to questions, bug reports, or feedback you submit; provide in-product support.</li>
                    <li><strong>Marketing.</strong> To send you emails and messages about NEAR AI&apos;s products and services, events, and similar content, in accordance with applicable law. You can opt out of marketing communications as described in this Policy.</li>
                    <li><strong>Advertising and Campaign Measurement.</strong> To measure the performance of our and our advertising partners&apos; advertising campaigns on www.near.ai (e.g., page views, sign-ups, or form submissions).</li>
                  </ul>
                  <p>We may de-identify information we collect so the information cannot reasonably identify you or your device, or we may collect information that is already in de-identified form. Our use and disclosure of de-identified information is not subject to any restrictions under this Privacy Policy, and we may use and disclose it to others for any purpose, without limitation.</p>
                </Section>

                {/* Section 4 */}
                <Section id="section-4" number="4" title="Legal Bases for Collecting and Processing Personal Data">
                  <p>The laws in certain jurisdictions (such as those in the European Union and United Kingdom), require us to inform you of the &ldquo;legal bases&rdquo; on which we process your information.</p>
                  <ul>
                    <li><strong>Contractual Necessity (Art. 6(1)(b)).</strong> When processing is required for the performance of an agreement to which you are a party, including to set up and run your account, provide the Services, support you, apply your settings, and fulfil other contractual obligations.</li>
                    <li><strong>Legal Obligation (Art. 6(1)(c)).</strong> Where processing is necessary to comply with legal obligations, such as security and audit requirements, record-keeping, responding to lawful requests, and fulfilling data-rights requests.</li>
                    <li><strong>Legitimate Interest (Art. 6(1)(f)).</strong> Where processing serves our legitimate interests, such as research and development, marketing and promotion, protection of our legal rights, keeping the service secure and reliable (logging, threat detection, abuse prevention), measuring and improving performance, running light product analytics, and defending legal claims. We balance these interests against your rights and freedoms. You can object to processing based on legitimate interests at any time (see Section 8).</li>
                    <li><strong>Consent (Art. 6(1)(a)).</strong> Where you give us permission to collect and use your Personal Data for a specific purpose. This may include optional features, marketing emails, or enabling advertising-related tracking technologies on our marketing website where required by law. You can withdraw consent at any time.</li>
                    <li><strong>Special Categories (Art. 9).</strong> The Services are not intended for special-category or criminal-convictions data. Please do not input such data unless it is necessary and permitted by law.</li>
                  </ul>
                </Section>

                {/* Section 5 */}
                <Section id="section-5" number="5" title="Data Retention">
                  <p>We retain Personal Data only for as long as needed to provide and secure the Services, or as required to comply with law. When data is no longer necessary, we delete, de-identify, or aggregate it in accordance with our retention procedures, unless a particular retention period is required by law or a valid legal hold applies.</p>
                  <p>If you have an account with us, we retain your information while the account is active and as needed to perform our contractual obligations, deliver the Services, comply with legal obligations, resolve disputes, preserve legal rights, and enforce our agreements.</p>
                </Section>

                {/* Section 6 */}
                <Section id="section-6" number="6" title="How We Disclose Personal Data">
                  <p>How we disclose Personal Data depends on the product you use and your relationship with us, and may include:</p>
                  <ul>
                    <li><strong>Affiliates.</strong> We may disclose information among our group companies or affiliates for the business purposes described in this Policy.</li>
                    <li><strong>Vendors and Service Providers.</strong> We engage vendors and service providers to perform business purposes on our behalf, including analytics, hosting, payment processing, fraud prevention and security, customer support tools, email and communications services, and database and archival services. Service providers may use such information for their operational purposes in order to provide their services to us.</li>
                    <li><strong>Website Analytics and Advertising Measurement</strong> (for www.near.ai), such as: PostHog; LinkedIn (Insight Tag); Twitter/X (Ads Pixel) to help us understand how you and our Users interact with the Services and, subject to applicable law, provide you with content that we and our advertising partners think will be of interest to you on our Services and across the Internet.</li>
                    <li><strong>Auditors, Accountants, and Lawyers.</strong> We may transfer your Personal Data to auditors, accountants, and lawyers in order to complete financial, technical, and legal audits, as well as for other legal requirements.</li>
                    <li><strong>Law Enforcement and Regulators.</strong> We disclose information as appropriate when we have a good faith belief that such disclosure is necessary to protect legal rights, privacy, and safety; detect fraud or abuse; respond to lawful requests from government authorities; or comply with legal process. Our ability to respond to lawful data requests varies by product.</li>
                    <li><strong>Business Transactions.</strong> In the event of a merger, acquisition, transfer of control, bankruptcy, reorganisation, or sale of assets, we may transfer information as part of that transaction.</li>
                    <li><strong>Others (including where required, with Your Consent).</strong> We may disclose your Personal Data where permitted or required by applicable law, including to comply with legal obligations, protect our rights, during emergencies, or with your consent.</li>
                  </ul>
                </Section>

                {/* Section 7 */}
                <Section id="section-7" number="7" title="Securing Your Personal Data">
                  <p>We implement technical and organisational measures appropriate to the risk level of each product and service, including encryption in transit and at rest, access controls, continuous monitoring, and incident-response procedures. Where we use third-party service providers or model APIs, they operate under written data-processing terms and are subject to appropriate security and privacy due diligence. For detailed information about our security practices, please visit our trust and security page.</p>
                  <p>No method of transmitting data over the internet or storing data is completely secure. While we work to protect your information, you acknowledge that you provide Personal Data at your own risk.</p>
                </Section>

                {/* Section 8 */}
                <Section id="section-8" number="8" title="Your Rights">
                  <p>Depending on your location, you may have rights to access, correct, delete, or port your data, and to object to or restrict certain processing.</p>

                  <SubSection id="section-8-1" number="8.1" title="General Rights">
                    <p>Your local laws (including applicable laws in the EU, UK, Switzerland, and certain states within the United States, such as California, Connecticut, Colorado, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Montana, Minnesota, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Virginia, Tennessee, and Texas, as well as similar U.S. state laws) may permit you to request that we:</p>
                    <ul>
                      <li>provide access to and/or a copy of certain information we hold about you;</li>
                      <li>update information which is out of date or incorrect;</li>
                      <li>delete certain information that we are holding about you;</li>
                      <li>restrict or object to the way that we process and disclose certain of your information;</li>
                      <li>transfer your information, where technically feasible;</li>
                      <li>prevent the processing of your information for direct-marketing purposes;</li>
                      <li>opt out of the processing of your information for automated processing that results in legal or similarly significant effects.</li>
                    </ul>
                    <p>In addition:</p>
                    <ul>
                      <li>California and Oregon residents can request information about the categories of information we collect, disclose or sell or share about you; California residents can request the sources of such information, the business or commercial purpose for collecting or selling or sharing your information; and the categories of third parties to whom we disclose information. Such information is also set forth in this Privacy Policy.</li>
                      <li>Oregon, Minnesota, and Connecticut residents can request a list of the specific third parties, other than natural persons, to which we have disclosed information.</li>
                    </ul>
                    <p>Your local laws may also permit you to revoke your consent to the processing of your information for certain purposes. As provided by applicable law, you have the right not to be discriminated against for exercising your rights.</p>
                    <p>We may need to retain certain information to provide the Services to you or comply with legal obligations. We will take reasonable steps to verify your identity before fulfilling your request. You may designate an authorised agent to make requests on your behalf with signed written permission or a power of attorney.</p>
                    <p>Certain information may be exempt from such requests under applicable law such as information we retain for legal compliance and to secure, provide and audit our Services. We may need certain information in order to provide the Services to you; if you ask us to delete it, you may no longer be able to use the Services.</p>
                  </SubSection>

                  <SubSection id="section-8-2" number="8.2" title="Exercising Your Rights">
                    <p>You may exercise your rights through in-product settings where available, or by emailing us at <a href="mailto:privacy@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">privacy@near.ai</a> or <a href="mailto:legal@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">legal@near.ai</a>.</p>
                    <p>If you are a resident of Colorado, Connecticut, Delaware, Iowa, Indiana, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, and Virginia, you may have the right to appeal our decision to deny your request, if applicable. Your description must include your full name and the email address used for your account with us, along with a copy of the denial notice you received from us.</p>
                  </SubSection>

                  <SubSection id="section-8-3" number="8.3" title="Marketing Communications">
                    <p>To opt out of marketing communications, follow the unsubscribe instructions in the marketing communication or email us. We may still send you non-marketing communications (e.g., service announcements, security notices, transactional emails).</p>
                  </SubSection>

                  <SubSection id="section-8-4" number="8.4" title="Notice of Right to Opt Out of Sales and Targeted Advertising">
                    <p>Depending on your jurisdiction (such as certain states listed above), you may have the right to opt out of &ldquo;sales&rdquo; of your personal information and/or &ldquo;sharing&rdquo; or processing of your personal information for targeted advertising.</p>
                    <ul>
                      <li>We do not sell personal information for money. However, allowing third-party advertising/measurement pixels to collect data from our marketing website may be considered a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; for cross-context behavioural advertising under certain U.S. state privacy laws.</li>
                      <li>You may opt out of such sharing/targeted advertising by using our cookie preference tools (where available) or by enabling legally recognised opt-out signals such as Global Privacy Control (GPC), which we will honour where required by applicable law.</li>
                      <li>We do not knowingly sell or share the personal information of minors under 16 years of age without legally required affirmative authorisation.</li>
                    </ul>
                  </SubSection>

                  <SubSection id="section-8-5" number="8.5" title="Additional Rights for Users in the EEA, UK, and Other Applicable Jurisdictions">
                    <p>If you are located in the European Economic Area (EEA), the United Kingdom (UK), or another jurisdiction that grants similar privacy rights, you may have additional rights under applicable data protection laws, including the GDPR. These may include the right to withdraw consent, the right to object, the right of access, the right to rectification, the right to erasure, the right to data portability, and the right to make a formal complaint to your competent data protection authority.</p>
                  </SubSection>
                </Section>

                {/* Section 9 */}
                <Section id="section-9" number="9" title="Additional Information for California Residents">
                  <p>This section describes how we collect, use, and share Personal Information of California residents in our capacity as a &ldquo;Business&rdquo; under the California Consumer Privacy Act (&ldquo;CCPA&rdquo;), as amended by the California Privacy Rights Act (&ldquo;CPRA&rdquo;).</p>

                  <div className="overflow-x-auto mt-6">
                    <table className="w-full border-collapse text-left" style={{ fontSize: "var(--font-size-body)" }}>
                      <thead>
                        <tr className="border-b border-[#CAC8C8]">
                          <th className="pb-3 pr-6 font-medium text-[#101010]">Category of Personal Information</th>
                          <th className="pb-3 pr-6 font-medium text-[#101010]">How We Use This Information</th>
                          <th className="pb-3 font-medium text-[#101010]">Sold or Shared?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CAC8C8]">
                        {[
                          ["Contact information (e.g., email address)", "Provide Services; communicate; personalise; analyse and improve Services; marketing; security/fraud prevention; legal compliance; business transfers", "Yes"],
                          ["Device and online information (e.g., IP address, browsing history, usage information, including general location inferred from IP address)", "Provide Services; communicate; personalise; analyse and improve Services; marketing; security/fraud prevention; legal compliance; business transfers", "Yes"],
                          ["Commercial information (e.g., transactions and subscription plans)", "Provide Services; analyse and improve Services; security/fraud prevention; legal compliance; business transfers", "Yes"],
                          ["Account credentials", "Provide Services; analyse and improve Services; security/fraud prevention; legal compliance; business transfers", "No sale/share"],
                          ["Information in connection with your use of the Services", "Provide Services; analyse and improve Services; security/fraud prevention; legal compliance; business transfers", "No sale/share"],
                        ].map(([cat, use, sold]) => (
                          <tr key={cat}>
                            <td className="py-4 pr-6 align-top text-muted leading-[1.6]">{cat}</td>
                            <td className="py-4 pr-6 align-top text-muted leading-[1.6]">{use}</td>
                            <td className="py-4 align-top font-mono text-[0.75rem] text-muted">{sold}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p>CCPA Rights: As a California resident, you have the following rights: the right to know, the right to delete, the right to correct, the right to opt out of sale or sharing, the right to limit use of sensitive personal information, and the right to non-discrimination. You can submit a request to <a href="mailto:legal@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">legal@near.ai</a> or <a href="mailto:privacy@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">privacy@near.ai</a>. We collect account credentials (username and password), which is considered sensitive personal information under the CCPA; we do not process such information for a purpose that would require us to provide a &lsquo;right to limit.&rsquo;</p>
                  <p>If we ever offer any financial incentives in exchange for your personal information, we will provide you with appropriate information about such incentives.</p>
                  <p>Sale/Sharing of Personal Information: You have the right to opt out of the sharing/sale of your personal information for purposes of online analytics and advertising by clicking the &ldquo;Your Privacy Choices&rdquo; link on our website footer. To opt out of any such disclosures made through means other than cookies and similar technologies, please email us at <a href="mailto:privacy@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">privacy@near.ai</a>. Over the last 12 months, we have not knowingly &ldquo;sold&rdquo; or &ldquo;shared&rdquo; personal information of individuals under 16.</p>
                  <p>Shine the Light: The California &lsquo;Shine the Light&rsquo; law gives residents of California the right under certain circumstances to opt out of the disclosure of certain categories of personal information (as defined in the Shine the Light law) with third parties for their direct marketing purposes, or in the alternative, that we provide a cost-free means for consumers to opt out of any such disclosure. We do not currently disclose your personal information to third parties for their own direct marketing purposes. To opt out of activities that are considered &lsquo;sales&rsquo; or &lsquo;sharing&rsquo; under California law, please see the &lsquo;Sale/Sharing of Personal Information&rsquo; section above.</p>
                </Section>

                {/* Section 10 */}
                <Section id="section-10" number="10" title="International Transfers of Personal Data">
                  <p>Your Personal Data may be transferred outside your home country, including outside the European Economic Area (EEA), Switzerland, and the United Kingdom, for purposes described in this Policy. Whenever we transfer your Personal Data out of these jurisdictions, we will endeavour to ensure a similar degree of protection by implementing at least one of the following safeguards:</p>
                  <ul>
                    <li><strong>Adequacy Decisions.</strong> We may transfer your Personal Data to countries that have been deemed to provide an adequate level of protection by the European Commission or UK authorities.</li>
                    <li><strong>Standard Contractual Clauses (SCCs).</strong> We may rely on European Commission-approved standard contractual clauses, UK International Data Transfer Addenda, or similar instruments.</li>
                    <li><strong>Vendor-Specific Compliance Mechanisms.</strong> We may rely on vendor-specific data protection addenda or frameworks that incorporate SCCs or equivalent safeguards.</li>
                  </ul>
                  <p>Please contact us if you want further information on the specific mechanism used when transferring your Personal Data outside your jurisdiction.</p>
                </Section>

                {/* Section 11 */}
                <Section id="section-11" number="11" title="Minors">
                  <p>All Services are intended solely for individuals aged 18 or older. By accessing or using any of the Services, you represent and warrant that you are at least 18 years of age. We do not permit use of the Services by anyone under 18, regardless of parental consent.</p>
                  <p>We do not knowingly collect Personal Data from individuals under 18 in connection with our Services. If we become aware that we have inadvertently collected such data, we will take reasonable steps to delete it promptly. We may adjust eligibility thresholds where required by applicable law.</p>
                </Section>

                {/* Section 12 */}
                <Section id="section-12" number="12" title="Google User Data">
                  <p>When you connect Google services to NEAR AI / IronClaw, we access Google user data only as needed to perform actions you explicitly request through the AI assistant. This section describes how we handle data received from Google APIs, in compliance with the Google API Services User Data Policy, including the Limited Use requirements.</p>

                  <SubSection number="" title="Data Accessed">
                    <p>You choose which Google services to connect. No Google data is accessed until you explicitly authorize a specific integration. Depending on which integrations you enable, we may access the following:</p>
                    <ul>
                      <li><strong>Gmail</strong> (scopes: gmail.modify, gmail.compose): Email messages, message metadata (sender, recipients, subject, labels), drafts, and attachments.</li>
                      <li><strong>Google Calendar</strong> (scope: calendar.events): Calendar events including summary, description, times, attendees, and location.</li>
                      <li><strong>Google Drive</strong> (scope: drive): Files, folders, file content, and sharing permissions.</li>
                      <li><strong>Google Docs</strong> (scope: documents): Document content and structure.</li>
                      <li><strong>Google Sheets</strong> (scope: spreadsheets): Spreadsheet content and structure.</li>
                      <li><strong>Google Slides</strong> (scope: presentations): Presentation content and structure.</li>
                    </ul>
                  </SubSection>

                  <SubSection number="" title="Data Usage">
                    <p>Google user data is accessed solely to execute actions you initiate through the AI assistant — for example, reading an email, creating a calendar event, or editing a document. Retrieved data is passed to the language model within your conversation context to generate responses and carry out your instructions.</p>
                    <p>We do not use Google user data to train, retrain, or fine-tune any AI models.</p>
                  </SubSection>

                  <SubSection number="" title="Data Sharing">
                    <p>Google user data is not shared with any third parties. Data flows only between your Google account, the Google API, and your NEAR AI / IronClaw instance. No Google user data is transmitted to analytics providers, advertisers, or any other external services.</p>
                  </SubSection>

                  <SubSection number="" title="Data Storage & Protection">
                    <p>OAuth access and refresh tokens are encrypted at rest using AES-256-GCM encryption. Tokens are injected at runtime through a sandboxed execution boundary — application tool code never has direct access to raw token values. All communication with Google APIs occurs over HTTPS/TLS. Google API responses are processed in-memory within your active conversation session and are not persisted to disk or database unless you explicitly choose to save information to your workspace.</p>
                  </SubSection>

                  <SubSection number="" title="Data Retention & Deletion">
                    <p>Google API responses are not automatically stored beyond your active session. OAuth tokens persist in encrypted storage solely to maintain your connection across sessions. You may revoke NEAR AI&apos;s access to your Google account at any time through your Google Account permissions page, which immediately invalidates all stored tokens. You may also request deletion of all stored credentials by contacting us at <a href="mailto:privacy@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">privacy@near.ai</a>.</p>
                  </SubSection>

                  <SubSection number="" title="Google API Services User Data Policy Compliance">
                    <p>NEAR AI&apos;s use and transfer to any other app of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.</p>
                  </SubSection>
                </Section>

                {/* Section 13 */}
                <Section id="section-13" number="13" title="Third-Party Links and Services">
                  <p>The Websites may contain links to third-party websites or services that are not operated or controlled by NEAR AI. We are not responsible for the privacy practices, content, or policies of any third-party sites. We encourage you to review the privacy policies of any such third parties before providing them with your Personal Data.</p>
                </Section>

                {/* Section 14 */}
                <Section id="section-14" number="14" title="Changes to This Privacy Policy">
                  <p>This Privacy Policy may change from time to time. When changes are made, we will post a revised version on our Website with the last updated date at the top of this page. Your continued use of the Services after we make changes is deemed to be acceptance of those changes.</p>
                </Section>

                {/* Section 15 */}
                <Section id="section-15" number="15" title="Contact Information">
                  <p>To ask questions or comment about this Privacy Policy and our privacy practices, please contact us at:</p>
                  <ul>
                    <li><a href="mailto:privacy@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">privacy@near.ai</a></li>
                    <li><a href="mailto:legal@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">legal@near.ai</a></li>
                  </ul>
                </Section>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ─── Local layout helpers ─────────────────────────────────────────────────── */

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="pt-12 first:pt-0 flex flex-col gap-5">
      <div className="flex items-baseline gap-3 pb-4 border-b border-[#CAC8C8]">
        <span className="font-mono text-[0.75rem] text-muted shrink-0">{number}.</span>
        <h2 className="text-pretty font-medium leading-[1.1] tracking-tight text-[#101010]" style={{ fontSize: "var(--font-size-h3)" }}>
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-4 text-muted leading-[1.8] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_strong]:font-medium [&_strong]:text-[#101010]" style={{ fontSize: "var(--font-size-body)" }}>
        {children}
      </div>
    </div>
  );
}

function SubSection({ id, number, title, children }: { id?: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mt-4 flex flex-col gap-3">
      <h3 className="font-medium text-[#101010]" style={{ fontSize: "var(--font-size-body)" }}>
        {number && <span className="font-mono text-[0.7rem] text-muted mr-2">{number}</span>}
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
