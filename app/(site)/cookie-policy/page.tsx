import SiteHeader from "@/components/site/SiteHeader";


const TOC = [
  "Introduction",
  "What are Cookies?",
  "What we use cookies for",
  "Why we collect and use Cookies",
  "Third Party Cookies",
  "How Long Will The Cookies Stay On My Browsing Device?",
  "Your Cookie Choices",
  "Do Not Track Signals",
  "Disabling Cookies",
  "Updates to this Policy",
  "Contact Us",
];

export default function CookiePolicyPage() {
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
                Cookie Policy
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
                  {TOC.map((item, i) => (
                    <a
                      key={item}
                      href={`#section-${i + 1}`}
                      className="text-pretty text-muted hover:text-[#101010] transition-colors [font-size:var(--font-size-body)] leading-snug"
                    >
                      <span className="font-mono text-[0.7rem] mr-2 opacity-50">{i + 1}.</span>
                      {item}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Body */}
              <div className="flex flex-col gap-1 max-w-[860px]">

                {/* Section 1 */}
                <Section id="section-1" number="1" title="Introduction">
                  <p>This Cookie Policy (&ldquo;Cookie Policy&rdquo; or &ldquo;Policy&rdquo;) explains how Jasnah Inc., d/b/a Near AI (&ldquo;Near AI,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), uses cookies and similar tracking technologies in connection with our website and related services.</p>
                  <p>This Policy applies when you (&ldquo;User&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) access or interact with:</p>
                  <ul>
                    <li><a href="https://www.near.ai" target="_blank" rel="noopener noreferrer" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">www.near.ai</a></li>
                    <li><a href="https://cloud.near.ai/" target="_blank" rel="noopener noreferrer" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://cloud.near.ai/</a></li>
                    <li><a href="https://agent.near.ai/" target="_blank" rel="noopener noreferrer" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://agent.near.ai/</a></li>
                    <li><a href="https://www.ironclaw.com/" target="_blank" rel="noopener noreferrer" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://www.ironclaw.com/</a></li>
                    <li><a href="https://hub.ironclaw.com/" target="_blank" rel="noopener noreferrer" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://hub.ironclaw.com/</a></li>
                    <li>job application portals, recruitment sites, and other digital properties operated by Near AI</li>
                  </ul>
                  <p>(collectively, the &ldquo;Website&rdquo; or &ldquo;Websites&rdquo;).</p>
                  <p>This Cookie Policy primarily applies to our public marketing website (www.near.ai). Authenticated product interfaces (cloud.near.ai, agent.near.ai, ironclaw.com, hub.ironclaw.com) use only strictly necessary cookies required for security and functionality and do not use third-party advertising cookies.</p>
                  <p>This Cookie Policy forms part of our broader Privacy Policy, which explains how we collect, use, and share your Personal Data (as defined therein). We are committed to handling your information in accordance with applicable privacy and data protection laws in the United States, the European Union, the United Kingdom, and other relevant jurisdictions.</p>
                  <p>For how we process personal data more generally, see our <a href="/privacy-policy" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">Privacy Policy</a>.</p>

                  {/* Mobile TOC */}
                  <div className="lg:hidden mt-4 border border-[#CAC8C8] rounded-2xl p-6 flex flex-col gap-2">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted mb-2">Contents</p>
                    {TOC.map((item, i) => (
                      <a key={item} href={`#section-${i + 1}`} className="text-pretty text-muted [font-size:var(--font-size-body)] leading-snug">
                        <span className="font-mono text-[0.7rem] mr-2 opacity-50">{i + 1}.</span>{item}
                      </a>
                    ))}
                  </div>

                  <SubSection number="" title="Definitions">
                    <p>&ldquo;Personal Data&rdquo; means any information relating to an identified or identifiable individual, as defined under applicable data protection laws.</p>
                    <p>&ldquo;Cookies&rdquo; refers to small text files and related technologies (e.g., pixels, tags, SDKs, local storage) placed on your device to store information or facilitate certain features.</p>
                    <p>&ldquo;First-party Cookies&rdquo; are set by Near AI.</p>
                    <p>&ldquo;Third-party Cookies&rdquo; are set by external service providers.</p>
                    <p>&ldquo;Services&rdquo; refers collectively to the Websites and any related online features, tools, or functionality provided by Near AI.</p>
                  </SubSection>
                </Section>

                {/* Section 2 */}
                <Section id="section-2" number="2" title="What are Cookies?">
                  <p>Cookies are data files placed on your computer or mobile device when you visit a website. They help the site to function properly, remain secure, remember your preferences, and understand how users interact with the Website. Cookies may contain session identifiers, usage patterns, settings such as language or theme, crash/error information, authentication tokens (for certain services). We primarily use cookies to improve the quality of our Services, tailor recommendations to your interests, and make the Services easier to use. More information on cookies and their use can be found at www.aboutcookies.org or www.allaboutcookies.org.</p>
                </Section>

                {/* Section 3 */}
                <Section id="section-3" number="3" title="What we use cookies for">
                  <p>When you access or interact with the Websites, we may place the following categories of Cookies on your device.</p>
                  <SubSection number="" title="A. Strictly Necessary Cookies">
                    <p>These Cookies are essential for the Websites to function and cannot be turned off in our systems. They are typically set in response to actions taken by you, such as:</p>
                    <ul>
                      <li>logging in,</li>
                      <li>setting privacy or cookie preferences,</li>
                      <li>filling in forms,</li>
                      <li>providing chatbox functionalities (e.g., for user feedback),</li>
                      <li>providing secure access, load balancing, and session management.</li>
                    </ul>
                    <p>Blocking these cookies in your browser may cause parts of the Websites not to function.</p>
                    <p>Strictly necessary (essential) Cookies are required for the Websites to work and to collect user feedback, remember your cookie preferences, enable security and load balancing, and provide chatbox functionalities for user feedback. You cannot opt out of these Cookies because we use them only to provide services you request.</p>
                    <p>Examples include:</p>
                    <div className="overflow-x-auto mt-6">
                      <table className="w-full border-collapse text-left" style={{ fontSize: "var(--font-size-body)" }}>
                        <thead>
                          <tr className="border-b border-[#CAC8C8]">
                            <th className="pb-3 pr-6 font-medium text-[#101010]">Name</th>
                            <th className="pb-3 pr-6 font-medium text-[#101010]">Who sets it</th>
                            <th className="pb-3 pr-6 font-medium text-[#101010]">Type</th>
                            <th className="pb-3 pr-6 font-medium text-[#101010]">Purpose</th>
                            <th className="pb-3 font-medium text-[#101010]">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#CAC8C8]">
                          {[
                            ["oauth_id_token", "private-chat.near.ai", "Strictly necessary", "Stores your cookie choices", "12 months"],
                            ["token", "private-chat.near.ai", "Strictly necessary", "Stores your cookie choices", "12 months"],
                            ["crisp-client%2Fsession* AND crisp-client%2Fsocket*", "Crisp Chat", "Strictly necessary", "Providing chatbox functionalities for user feedback", "6 months"],
                            ["ph_phc_", "Crisp Chat", "Performance", "Providing chatbox functionalities for user feedback", ""],
                            ["shared_profile", "Crisp Chat", "Performance", "Providing chatbox functionalities for user feedback", ""],
                          ].map(([name, who, type, purpose, duration]) => (
                            <tr key={name}>
                              <td className="py-4 pr-6 align-top font-mono text-[0.8rem] text-[#101010] break-words">{name}</td>
                              <td className="py-4 pr-6 align-top text-muted leading-[1.6]">{who}</td>
                              <td className="py-4 pr-6 align-top text-muted leading-[1.6]">{type}</td>
                              <td className="py-4 pr-6 align-top text-muted leading-[1.6]">{purpose}</td>
                              <td className="py-4 align-top text-muted leading-[1.6]">{duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SubSection>
                  <SubSection number="" title="B. Performance Cookies">
                    <p>We use these Cookies to count visits and traffic sources so we can measure and improve the performance of our Website. They help us to know which pages are the most and least popular and see how visitors move around the Website, and to resolve any errors that occur on the Website quickly to provide you with a better experience. These Cookies collect information about how visitors use and interact with our Websites, for instance which pages they go to most often.</p>
                  </SubSection>
                  <SubSection number="" title="C. Analytics (non-essential) Cookies">
                    <p>With your consent (where required), we may use analytics tools to measure and improve Website performance (for example, which pages are used, stability, and load times). These Cookies are not strictly necessary and may be disabled in your browser settings.</p>
                  </SubSection>
                  <SubSection number="" title="D. Advertising &amp; Measurement Cookies (Non-Essential)">
                    <p>With your consent (where required by law), we use advertising and measurement technologies on our public marketing website (www.near.ai) to measure the effectiveness of our campaigns and understand user actions (e.g., page views, sign-ups or form submissions).</p>
                    <p>These technologies may include:</p>
                    <ul>
                      <li>LinkedIn Insight Tag</li>
                      <li>Twitter/X Ads Pixel</li>
                    </ul>
                    <p>These technologies may collect information such as IP address, device and browser information, pages visited, referring URLs, and conversion or interaction events.</p>
                    <p>We do not deploy advertising cookies or pixels within authenticated product interfaces, including cloud.near.ai or private-chat.near.ai.</p>
                  </SubSection>
                  <SubSection number="" title="E. Functional Cookies">
                    <p>These Cookies enable enhanced features and personalization, such as remembering your settings and preferences, saving your cookie choices and maintaining browser state across sessions.</p>
                  </SubSection>
                  <SubSection number="" title="F. Temporary Cookies">
                    <p>We may use temporary cookies that are stored on your end device to optimize user-friendliness. If you visit our Website again, it will automatically recognize that you have already been with us and what entries and settings you have made so that you do not have to enter them again.</p>
                  </SubSection>
                  <SubSection number="" title="G. Session Cookies">
                    <p>We may use session cookies to recognize that you have already visited individual pages of our Website.</p>
                    <p>The cookies are stored for a period of 12 months and automatically deleted after this period of time.</p>
                  </SubSection>
                </Section>

                {/* Section 4 */}
                <Section id="section-4" number="4" title="Why we collect and use Cookies">
                  <p>We may collect and use cookies for a variety of purposes, including but not limited to:</p>
                  <ul>
                    <li>Enhancing your experience, navigation, and interaction with our Website</li>
                    <li>Personalizing the Website and Services to suit your preferences</li>
                    <li>Enabling access to features, content, and job application functionalities</li>
                    <li>Administering and maintaining the performance and functionality of our Website and related Services</li>
                  </ul>
                </Section>

                {/* Section 5 */}
                <Section id="section-5" number="5" title="Third Party Cookies">
                  <p>We use trusted analytics and infrastructure providers such as PostHog and Cloudflare, who may place Cookies on your device.</p>
                  <p>PostHog provides first-party analytics to help us understand website usage and improve performance. Cloudflare helps us analyze how our Websites are used. Cloudflare uses performance Cookies to track visitor interactions. For example, by using Cookies, Cloudflare can tell us which pages our users view, which are most popular, what time of day our websites are visited, whether visitors have been to our websites before, what website referred the visitor to our websites, and other similar information.</p>
                  <p>We have little control over these &ldquo;third party&rdquo; Cookies, so we suggest that you check the respective privacy policies for these external services to help you understand what data these organizations hold about you and what they do with it.</p>
                </Section>

                {/* Section 6 */}
                <Section id="section-6" number="6" title="How Long Will The Cookies Stay On My Browsing Device?">
                  <p>The length of time a cookie will stay on your browsing device depends on whether it is a &ldquo;persistent&rdquo; or &ldquo;session&rdquo; cookie. Session cookies will only stay on your device until you close your browser. Persistent cookies will stay on your device between browsing session (i.e., they do not expire when you close your browser). The length of time a persistent cookie stays on your device varies from cookie to cookie.</p>
                  <p>Some Cookies operate from the time you visit a Website or to the end of that particular web-browsing session. These Cookies expire and are automatically deleted when you close your internet browser. These are &ldquo;Session&rdquo; cookies, which last until you close your browser.</p>
                </Section>

                {/* Section 7 */}
                <Section id="section-7" number="7" title="Your Cookie Choices">
                  <p>You can exercise your preference to receive all types of Cookies by managing them from your web browser. As the means by which to activate or deactivate Cookies varies from one web browser to another, you should visit your web browser&apos;s help menu for more information on Cookie preferences. You can also configure your browser at any time to be notified of the receipt of a Cookie, so that you can decide whether you want to accept it or not. At the moment, it is technically impossible for you to synchronize your settings between your browsers and your devices (your computer or your smartphone). You must set them on each browser/device that you currently use and each time you use a new browser or device.</p>
                </Section>

                {/* Section 8 */}
                <Section id="section-8" number="8" title="Do Not Track Signals">
                  <p>There is no uniform or consistent standard or definition for responding to, processing, or communicating Do Not Track signals. At this time, the Websites do not function differently based on a user&apos;s Do Not Track signal. For more information on Do Not Track signals, see <a href="https://allaboutdnt.com/" target="_blank" rel="noopener noreferrer" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">All About Do Not Track</a>.</p>
                </Section>

                {/* Section 9 */}
                <Section id="section-9" number="9" title="Disabling Cookies">
                  <p>Most browsers automatically accept cookies. You can decline to accept Cookies by changing the settings on your browser at any time. Most browsers allow you to delete Cookies, prevent them from being installed, or provide a warning before installing a cookie. The relevant browser instructions might provide you with additional information on this issue.</p>
                  <p>If you wish to return your browser to a cookie-free state for this domain, find your browser in the list below and follow the instructions.</p>
                  <ul>
                    <li>Google Chrome:<br /><a href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=en" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&amp;hl=en</a></li>
                    <li>Firefox:<br /><a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
                    <li>Internet Explorer:<br /><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies</a></li>
                    <li>Internet Explorer Edge:<br /><a href="https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy</a></li>
                    <li>Safari (Mobile):<br /><a href="https://support.apple.com/en-us/HT201265" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://support.apple.com/en-us/HT201265</a></li>
                    <li>Safari:<br /><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2 break-all">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
                  </ul>
                  <p>Please keep in mind that this may have an impact on your experience with our Website, not being able to access or use some features of the Services.</p>
                </Section>

                {/* Section 10 */}
                <Section id="section-10" number="10" title="Updates to this Policy">
                  <p>We may update this Policy from time to time. When we do, we will post the updated version on this page with a revised effective date. Your continued use of the Website after any changes become effective constitutes your acceptance of the revised Policy.</p>
                </Section>

                {/* Section 11 */}
                <Section id="section-11" number="11" title="Contact Us">
                  <p>If you have any inquiries or concerns regarding this Policy, please do not hesitate to contact us at:</p>
                  <p>Email: <a href="mailto:privacy@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">privacy@near.ai</a> or <a href="mailto:legal@near.ai" className="text-[#101010] underline decoration-[#CAC8C8] underline-offset-2">legal@near.ai</a></p>
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

function SubSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <h3 className="font-medium text-[#101010]" style={{ fontSize: "var(--font-size-body)" }}>
        {number && <span className="font-mono text-[0.7rem] text-muted mr-2">{number}</span>}
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
