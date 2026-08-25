import SiteHeader from "@/components/site/SiteHeader";


const TOC = [
  "Definitions",
  "Scope and Purposes of Processing",
  "Personal Data Processing Requirements",
  "Data Security",
  "Security Breach",
  "Subprocessors",
  "Data Transfers",
  "Audits",
  "Return or Destruction of Personal Data",
  "General Terms",
  "Schedule A — Annex I & II",
  "Schedule B — Subprocessors",
];

const SUBPROCESSORS = [
  ["Amazon Web Services, Inc. (S3)", "Infrastructure", "United States"],
  ["Corvex, Inc.", "Infrastructure", "United States"],
  ["Rshere Tech Inc.", "Infrastructure", "India"],
  ["OVH SAS", "Infrastructure", "United States"],
  ["Google LLC", "Infrastructure/LLM Provider/Authentication", "United States"],
  ["Railway Corporation", "Infrastructure", "United States"],
  ["Vercel Inc.", "Infrastructure", "United States"],
  ["Cloudflare, Inc.", "Network/Security", "Nearest data centre to end-user (global)"],
  ["Github, Inc.", "Authentication", "United States"],
  ["Plus Five Five, Inc. (Resend Email)", "Email Provider", "United States"],
  ["Stripe, Inc.", "Payments", "Nearest data centre to end-user (global)"],
  ["Hot Labs", "Payments", "Decentralized network"],
  ["Datadog, Inc.", "Observability", "United States"],
  ["PostHog, Inc.", "Observability", "United States"],
  ["Slack Technologies Inc.", "Customer Communication", "United States"],
  ["Crisp IM SAS", "Customer Support", "EU"],
  ["OpenAI", "LLM Provider", "United States"],
  ["Chutes Global Corp", "LLM Provider", "Decentralized network"],
  ["Anthropic PBC", "LLM Provider", "United States"],
  ["OpenRouter, Inc.", "LLM Provider", "United States"],
  ["Brave Software, Inc.", "Search", "United States"],
];

export default function DPAPage() {
  return (
    <div className="relative w-full font-sans bg-[#ECECEC] text-[#101010]">
      <div className="relative w-full flex flex-col">

        {/* ─── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[36vh] flex flex-col bg-gradient-to-b from-[#525252] from-[35%] to-[#ECECEC]">
          <div className="absolute inset-0 z-[1] bg-[#101010]/40 pointer-events-none" />
          <div className="relative z-10 flex flex-col flex-1 mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-20">
            <SiteHeader />
            <div className="flex flex-col flex-1 justify-end pb-12 lg:pb-16 pt-8">
              <h1 className="text-white font-medium leading-[1.05] tracking-tight max-w-[900px]" style={{ fontSize: "var(--font-size-h1)" }}>
                NEAR AI Data Processing Agreement for Customers
              </h1>
              <p className="mt-3 font-mono text-[0.75rem] uppercase tracking-[0.25em] text-white/50">
                Last Updated — August 17, 2026
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
                    <a key={item} href={`#section-${i + 1}`} className="text-pretty text-muted hover:text-[#101010] transition-colors [font-size:var(--font-size-body)] leading-snug">
                      <span className="font-mono text-[0.7rem] mr-2 opacity-50">{i <= 9 ? `${i + 1}.` : ""}</span>
                      {item}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Body */}
              <div className="flex flex-col gap-1 max-w-[860px]">

                {/* Intro */}
                <div className="mb-12 flex flex-col gap-4 text-muted leading-[1.8]" style={{ fontSize: "var(--font-size-body)" }}>
                  <p>This Data Processing Agreement (&ldquo;DPA&rdquo;) is incorporated into and forms part of (and if applicable, amends the current version of) the Terms of Service or the Master Platform Agreement between Customer and/or its affiliates (&ldquo;Customer&rdquo;) and NEAR AI (&ldquo;NEAR AI&rdquo;), each a &ldquo;Party&rdquo; and collectively the &ldquo;Parties&rdquo;. This DPA applies to and takes precedence over the agreement between the Parties and any associated contractual document between the Parties, such as an order form, statement of work, or data processing agreement thereunder (collectively, the &ldquo;Agreement&rdquo;), to the extent of any conflict. Capitalized terms not defined herein are defined as in applicable Data Protection Laws. Customer and NEAR AI agree as follows:</p>

                  {/* Mobile TOC */}
                  <div className="lg:hidden mt-4 border border-[#CAC8C8] rounded-2xl p-6 flex flex-col gap-2">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted mb-2">Contents</p>
                    {TOC.map((item, i) => (
                      <a key={item} href={`#section-${i + 1}`} className="text-pretty text-muted [font-size:var(--font-size-body)] leading-snug">
                        <span className="font-mono text-[0.7rem] mr-2 opacity-50">{i <= 9 ? `${i + 1}.` : ""}</span>{item}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Section 1 */}
                <Section id="section-1" number="1" title="Definitions.">
                  <p>For purposes of this DPA:</p>
                  <ol>
                    <li><strong>&ldquo;Data Protection Laws&rdquo;</strong> means all applicable laws, regulations, and other legal or self-regulatory requirements in any jurisdiction relating to privacy, data protection, data security, breach notification, or the Processing of personal data, including without limitation, to the extent applicable, the General Data Protection Regulation, Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;); the United Kingdom Data Protection Act of 2018; the Swiss Federal Act on Data Protection (&ldquo;FADP&rdquo;); and the California Consumer Privacy Act, Cal. Civ. Code § 1798.100 et seq., including its regulations and the amendments made by the California Privacy Rights Act of 2020 (&ldquo;CCPA&rdquo;), the Virginia Consumer Data Protection Act (&ldquo;VCDPA&rdquo;), the Colorado Privacy Act and related regulations (&ldquo;CPA&rdquo;), and any other similar state law governing the Processing of Personal Data (collectively, &ldquo;U.S. State Privacy Laws&rdquo;). For the avoidance of doubt, if the Parties&apos; Processing activities involving Personal Data are not within the scope of a given Data Protection Law, such law is not applicable for purposes of this DPA.</li>
                    <li><strong>&ldquo;Data Subject,&rdquo; &ldquo;Processor,&rdquo; &ldquo;Service Provider,&rdquo; &ldquo;Controller,&rdquo;</strong> and <strong>&ldquo;Business&rdquo;</strong> shall be defined as provided in applicable Data Protection Laws.</li>
                    <li><strong>&ldquo;EU SCCs&rdquo;</strong> means the Standard Contractual Clauses issued pursuant to Commission Implementing Decision (EU) 2021/914 of 4 June 2021 on standard contractual clauses for the transfer of personal data to third countries pursuant to Regulation (EU) 2016/679 of the European Parliament and of the Council, located http://data.europa.eu/eli/dec_impl/2021/914/oj, and completed as set forth in Section 7 below.</li>
                    <li><strong>&ldquo;Personal Data&rdquo;</strong> refers to any information relating to an identified or identifiable natural person that NEAR AI Processes on behalf of Customer under these Terms. For purposes of this DPA, the term &ldquo;Personal Data&rdquo; includes &ldquo;personal information,&rdquo; &ldquo;personally identifiable information,&rdquo; and similar terms defined under Data Protection Laws, but does not include Business Contact Information or Usage Data, as such terms are defined in these Terms.</li>
                    <li><strong>&ldquo;Process&rdquo;</strong> and <strong>&ldquo;Processing&rdquo;</strong> mean any operation or set of operations performed on Personal Data or on sets of Personal Data, whether or not by automated means, such as collection, recording, organization, creating, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure, or destruction.</li>
                    <li><strong>&ldquo;Security Breach&rdquo;</strong> means any accidental or unlawful acquisition, destruction, loss, alteration, unauthorized disclosure of, or access to, Personal Data occurring on NEAR AI&apos;s systems or otherwise under NEAR AI&apos;s control.</li>
                    <li><strong>&ldquo;UK SCCs&rdquo;</strong> means the International Data Transfer Addendum to the EU Commission Standard Contractual Clauses (available as of the Effective Date at https://ico.org.uk/media2/migrated/4019539/international-data-transfer-addendum.pdf).</li>
                  </ol>
                </Section>

                {/* Section 2 */}
                <Section id="section-2" number="2" title="Scope and Purposes of Processing.">
                  <ol>
                    <li>The scope, nature, purposes, and duration of the processing, the types of Personal Data Processed, and the Data Subjects concerned are set forth in this DPA, including its Schedule A. The details provided in Schedule A are deemed to satisfy any requirement to provide such details under any Data Protection Law.</li>
                    <li>NEAR AI will Process Personal Data solely: (1) to fulfill its obligations to Customer under the Agreement, including this DPA; (2) on Customer&apos;s behalf; and (3) in compliance with Data Protection Laws. NEAR AI will not &ldquo;sell&rdquo; Personal Data (as such term in quotation marks is defined in applicable Data Protection Laws), &ldquo;share&rdquo; or Process Personal Data for purposes of &ldquo;cross-context behavioral advertising&rdquo; or &ldquo;targeted advertising&rdquo; (as such terms in quotation marks are defined in applicable Data Protection Laws), or otherwise Process Personal Data for any purpose other than for the specific purposes set forth herein or outside of the direct business relationship with Customer. For the avoidance of doubt, NEAR AI will Process Personal Data solely to provide the cloud processing services to Customer as set forth in the Agreement, or as otherwise permitted by Data Protection Laws (for example, to comply with NEAR AI&apos;s legal obligations). Notwithstanding anything to the contrary in this DPA, NEAR AI may process Personal Data as an independent Controller for its own legitimate business operations, including security, fraud prevention, compliance, and internal reporting, in each case as described in NEAR AI&apos;s Privacy Policy. In addition, NEAR AI may process Personal Data as an Independent Controller for product development and improvement solely in connection with the AI Agent Hosting Service and the White-Labeled AI Agent Service (as described in Appendix A and Appendix B, respectively). NEAR AI does not process Personal Data as an Independent Controller for product development or improvement in connection with the NEAR AI Cloud Services and Inference API (as described in Appendix C).</li>
                    <li>NEAR AI will comply with any applicable restrictions under Data Protection Laws on combining the Personal Data with personal data that NEAR AI receives from, or on behalf of, another person or persons, or that NEAR AI collects from any interaction between it and any Data Subject.</li>
                    <li>NEAR AI will provide the same level of protection for the Personal Data as is required under Data Protection Laws applicable to Customer.</li>
                    <li>Customer retains the right, upon notice, to take reasonable steps to stop and remediate unauthorized use of Personal Data, including any use of Personal Data not expressly authorized in this DPA.</li>
                  </ol>
                </Section>

                {/* Section 3 */}
                <Section id="section-3" number="3" title="Personal Data Processing Requirements.">
                  <p>NEAR AI will:</p>
                  <ol>
                    <li>Ensure that the persons it authorizes to Process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.</li>
                    <li>Assist Customer in the fulfilment of Customer&apos;s obligations to respond to verifiable requests by Data Subjects (or their lawful representatives) for exercising their rights under Data Protection Laws with respect to their Personal Data.</li>
                    <li>Provide reasonable assistance to and cooperation with Customer for Customer&apos;s consultation with regulatory authorities in relation to the Processing or proposed Processing of Personal Data, and notify Customer of (i) any third-party complaints regarding the Processing of Personal Data; or (ii) any government requests for access to or information about NEAR AI&apos;s Processing of Personal Data on Customer&apos;s behalf, unless prohibited by Data Protection Laws. NEAR AI will provide Customer with reasonable cooperation and assistance in relation to any such request. If NEAR AI is prohibited by applicable Data Protection Laws from disclosing the details of a government request to Customer, NEAR AI shall inform Customer that it can no longer comply with Customer&apos;s instructions under this DPA without providing more details.</li>
                    <li>Provide reasonable assistance to and cooperation with Customer for Customer&apos;s performance of a data protection impact assessment of Processing or proposed Processing of Personal Data, when required by applicable Data Protection Laws, and at Customer&apos;s reasonable expense.</li>
                    <li>Notify Customer if it determines that (i) it can no longer meet its obligations under this DPA or applicable Data Protection Laws; or (ii) in its opinion, an instruction from Customer infringes applicable Data Protection Laws.</li>
                    <li>NEAR AI certifies it understands its obligations under this DPA (including without limitation the restrictions under Sections 2 and 3) and that it will comply with them.</li>
                  </ol>
                </Section>

                {/* Section 4 */}
                <Section id="section-4" number="4" title="Data Security.">
                  <p>NEAR AI will implement appropriate administrative, technical, physical, and organizational measures to protect Personal Data, as set forth in Schedule A, Annex II.</p>
                </Section>

                {/* Section 5 */}
                <Section id="section-5" number="5" title="Security Breach.">
                  <p>NEAR AI will notify Customer without undue delay of any known Security Breach resulting from NEAR AI&apos;s Processing of Personal Data on behalf of Customer. NEAR AI will comply with the Security Breach-related obligations directly applicable to it under Data Protection Laws and will provide reasonable assistance to Customer in Customer&apos;s compliance with its Security Breach-related obligations, including without limitation by:</p>
                  <ol>
                    <li>Taking commercially reasonable steps to mitigate the effects of the Security Breach and reduce the risk to Data Subjects whose Personal Data was involved.</li>
                    <li>
                      Providing Customer with the following information, to the extent known:
                      <ol>
                        <li>The nature of the Security Breach, including, where possible, how the Security Breach occurred, the categories and approximate number of Data Subjects concerned, and the categories and approximate number of Personal Data records concerned.</li>
                        <li>The likely consequences of the Security Breach.</li>
                        <li>Measures taken or proposed to be taken by NEAR AI to address the Security Breach, including, where appropriate, measures to mitigate its possible adverse effects.</li>
                      </ol>
                    </li>
                  </ol>
                </Section>

                {/* Section 6 */}
                <Section id="section-6" number="6" title="Subprocessors.">
                  <ol>
                    <li>Customer acknowledges and agrees that NEAR AI may use NEAR AI affiliates and other Subprocessors to Process Personal Data in accordance with the provisions within this DPA and Data Protection Laws. Where NEAR AI sub-contracts any of its rights or obligations concerning Personal Data, including to any affiliate, NEAR AI will take steps to select and retain Subprocessors that are capable of maintaining appropriate privacy and security measures to protect Personal Data consistent with applicable Data Protection Laws and require that each Subprocessor complies with obligations that are no less restrictive than those imposed on NEAR AI under this DPA.</li>
                    <li>To the extent required by applicable Data Protection Laws, NEAR AI&apos;s current list of Subprocessors are provided in Schedule B hereto, and Customer hereby consents to NEAR AI&apos;s use of such Subprocessors. NEAR AI will maintain an up-to-date list of its Subprocessors, and it will provide Customer with reasonable prior notice of any new Subprocessor added to the list. In the event Customer has a commercially reasonable objection to a new Subprocessor, NEAR AI will use reasonable efforts to make available to Customer a change in the services or recommend a commercially reasonable change to Customer&apos;s use of the services to avoid Processing of Personal Data by the objected-to Subprocessor. Customer may, in its sole discretion, terminate these Terms at any time and by providing written notice to NEAR AI in the event that it objects to a Subprocessor and NEAR AI is unable to offer reasonable changes the services to satisfy Customer.</li>
                  </ol>
                </Section>

                {/* Section 7 */}
                <Section id="section-7" number="7" title="Data Transfers.">
                  <ol>
                    <li>NEAR AI will not engage in any cross-border Processing of Personal Data, or transmit, directly or indirectly, any Personal Data to any country outside of the country from which such Personal Data was collected, without complying with applicable Data Protection Laws. Where NEAR AI engages in an onward transfer of Personal Data, NEAR AI shall ensure that a lawful data transfer mechanism is in place prior to transferring Personal Data from one country to another.</li>
                    <li>
                      To the extent legally required, by signing this DPA, Customer and NEAR AI are deemed to have signed the EU SCCs, which form part of this DPA and (except as described in Section 7(c) and (d) below) will be deemed completed as follows:
                      <ol>
                        <li>Module 2 of the EU SCCs applies to transfers of Personal Data from Customer (as a controller) to NEAR AI (as a processor), or to the extent that NEAR AI acts as a controller with respect to Personal Data from Customer, in accordance with Section 2(2) of the DPA, then Module 1 of the EU SCCs applies and the Parties act as independent controllers;</li>
                        <li>Clause 7 (the optional docking clause) is included;</li>
                        <li>Under Clause 9 (Use of subprocessors), the Parties select Option 2 (General written authorization). The initial list of subprocessors is set forth in Schedule B of this DPA and NEAR AI shall update that list and provide a notice to Customer in advance of any intended additions or replacements of subprocessors as provided in Section 6.</li>
                        <li>Under Clause 11 (Redress), the optional language requiring that Data Subjects be permitted to lodge a complaint with an independent dispute resolution body shall not be deemed to be included;</li>
                        <li>Under Clause 17 (Governing law), the Parties choose Option 1 (the law of an EU Member State that allows for third-Party beneficiary rights). The Parties select the laws of Ireland;</li>
                        <li>Under Clause 18 (Choice of forum and jurisdiction), the Parties select the courts of Ireland;</li>
                        <li>Annex I(A) and I(B) (List of Parties) is completed as set forth in Schedule A of this DPA;</li>
                        <li>Under Annex I(C) (Competent supervisory authority), the Parties shall follow the rules for identifying such authority under Clause 13 and, to the extent legally permissible, select the Irish Data Protection Commission.</li>
                        <li>Annex II (Technical and organizational measures) is completed with Schedule A of this DPA; and</li>
                        <li>Annex III (List of subprocessors) is not applicable as the Parties have chosen General Authorization under Clause 9. However, a list of NEAR AI&apos;s subprocessors is available in Schedule B.</li>
                      </ol>
                    </li>
                    <li>With respect to Personal Data transferred from the United Kingdom for which United Kingdom law (and not the law in any European Economic Area jurisdiction or Switzerland) governs the international nature of the transfer, the UK SCCs form part of this DPA and takes precedence over the rest of this DPA as set forth in the UK SCCs. Undefined capitalized terms used in this provision shall mean the definitions in the UK SCCs. For purposes of the UK SCCs, they shall be deemed completed as follows: (i) the Parties&apos; details shall be the Parties and their affiliates to the extent any of them is involved in such transfer; (ii) the Key Contacts shall be the contacts set forth in Schedule A; (iii) the Approved EU SCCs referenced in Table 2 shall be the EU SCCs as executed by the Parties; (iv) Annex 1A, 1B, II, and III shall be set forth in Schedules A and B below; (v) either Party may end this DPA as set out in Section 19 of the UK SCCs; and (vi) by entering into this DPA, the Parties are deemed to be signing the UK SCCs.</li>
                    <li>For transfers of Personal Data that are subject to the FADP, the EU SCCs form part of this DPA as set forth in Section 7(b) of this DPA, but with the following differences to the extent required by the FADP: (i) references to the GDPR in the EU SCCs are to be understood as references to the FADP insofar as the data transfers are subject exclusively to the FADP and not to the GDPR; (ii) references to personal data in the EU SCCs also refer to data about identifiable legal entities until the entry into force of revisions to the FADP that eliminate this broader scope; (iii) the term &ldquo;member state&rdquo; in EU SCCs shall not be interpreted in such a way as to exclude Data Subjects in Switzerland from the possibility of suing for their rights in their place of habitual residence (Switzerland) in accordance with Clause 18(c) of the EU SCCs; and (iv) the relevant supervisory authority is the Swiss Federal Data Protection and Information Commissioner (for transfers subject to the FADP and not the GDPR), or both such Commissioner and the supervisory authority identified in the EU SCCs (where the FADP and GDPR apply, respectively).</li>
                  </ol>
                </Section>

                {/* Section 8 */}
                <Section id="section-8" number="8" title="Audits.">
                  <p>To the extent required by applicable Data Protection Law, NEAR AI shall make available all information necessary for Customer to confirm NEAR AI&apos;s compliance with this DPA. If Customer has a reasonable basis to conclude that such information provided by NEAR AI is not satisfactory to confirm such compliance, Customer may, at Customer&apos;s sole expense, upon reasonable prior notice, conduct an audit during normal business hours and in a manner that does not disrupt NEAR AI&apos;s business of those NEAR AI systems and records relevant to NEAR AI&apos;s Processing of Personal Data on Customer&apos;s behalf. Customer shall limit its exercise of audit rights to not more than once in any twelve (12) calendar month period, unless (i) required by instruction of a Supervisory Authority; or (ii) following a Security Breach.</p>
                </Section>

                {/* Section 9 */}
                <Section id="section-9" number="9" title="Return or Destruction of Personal Data.">
                  <p>Except to the extent required otherwise by Data Protection Laws, upon termination or expiry of these Terms, NEAR AI will (at Customer&apos;s election and written request) delete or return all Personal Data in its possession or control as soon as reasonably practicable. Except to the extent prohibited by Data Protection Laws, NEAR AI will inform Customer if it is not able to return or delete the Personal Data.</p>
                </Section>

                {/* Section 10 */}
                <Section id="section-10" number="10" title="General Terms.">
                  <ol>
                    <li>The provisions of this DPA survive the termination or expiration of these Terms for so long as NEAR AI or its Subprocessors Process the Personal Data.</li>
                    <li>If there is a conflict between these Terms and this DPA, the terms of this DPA will prevail. In the event of a conflict between this DPA and the EU SCCs or UK SCCs, the terms of the EU SCCs or UK SCCs, as relevant, will control.</li>
                    <li>Any claims brought under this DPA shall be subject to the terms and conditions, including but not limited to, the exclusions and limitations, set forth in these Terms.</li>
                  </ol>
                </Section>

                {/* Schedule A */}
                <div id="section-11" className="pt-12 flex flex-col gap-5">
                  <div className="flex items-baseline gap-3 pb-4 border-b border-[#CAC8C8]">
                    <h2 className="text-pretty font-medium leading-[1.1] tracking-tight text-[#101010]" style={{ fontSize: "var(--font-size-h3)" }}>
                      Schedule A
                    </h2>
                  </div>
                  <div className="flex flex-col gap-8 text-muted leading-[1.8] [&_strong]:font-medium [&_strong]:text-[#101010]" style={{ fontSize: "var(--font-size-body)" }}>

                    <div className="flex flex-col gap-3">
                      <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.3em] text-[#101010]">Annex I</h3>

                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="font-medium text-[#101010] mb-2">A. List of Parties</p>
                          <p><strong>Data exporter(s):</strong> The exporter (Controller) is Customer and Customer&apos;s contact details and signature are as provided in these Terms and the DPA.</p>
                          <p><strong>Data importer(s):</strong> The importer (Processor) is NEAR AI and NEAR AI&apos;s contact details and signature are as provided in these Terms and the DPA.</p>
                        </div>

                        <div>
                          <p className="font-medium text-[#101010] mb-2">B. Description of Transfer</p>
                          <div className="flex flex-col gap-2">
                            <p><strong>Categories of data subjects whose personal data is transferred:</strong> The Personal Data transferred concerns data subjects whose information Customer makes available through its use of the services under these Terms.</p>
                            <p><strong>Categories of personal data transferred:</strong> Any personal data provided by Customer to NEAR AI for NEAR AI to perform services under these Terms.</p>
                            <p><strong>Sensitive data transferred (if applicable):</strong> N/A</p>
                            <p><strong>The frequency of the transfer (e.g. whether the data is transferred on a one-off or continuous basis):</strong> On a continuous basis as needed to provide the services to Customer.</p>
                            <p><strong>Nature of the processing:</strong> The nature of the Processing is set out in these Terms between the Parties.</p>
                            <p><strong>Purpose(s) of the data transfer and further processing:</strong> The purposes of the data transfer is to provide the services chosen by Customer in connection with these Terms.</p>
                            <p><strong>The period for which the personal data will be retained, or, if that is not possible, the criteria used to determine that period:</strong> The data will be retained for the time period needed to accomplish the purposes of Processing, unless otherwise required by applicable law.</p>
                            <p><strong>For transfers to (sub-)processors, also specify subject matter, nature and duration of the processing:</strong> Same as above to the extent that Personal Data is provided to Subprocessors for purposes of providing the services under these Terms to Customer.</p>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium text-[#101010] mb-2">C. Competent Supervisory Authority</p>
                          <p><strong>Identify the competent supervisory authority/ies in accordance with Clause 13:</strong> The data exporter&apos;s competent supervisory authority will be determined in accordance with the GDPR, and where possible, will be the Irish Data Protection Commissioner.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.3em] text-[#101010]">Annex II — Technical and Organisational Measures Including Technical and Organisational Measures to Ensure the Security of the Data</h3>
                      <p>NEAR AI, as Provider, will implement and maintain the following administrative, technical, physical, and organizational security measures for the Processing of Personal Data: Provider must maintain an effective Information Security Program (in line with industry standards such as ISO 27001, etc.) and security measures requirements while handling Personal Data and confidential information of the Disclosing Controller including but not limited to the below requirements.</p>
                      <div className="flex flex-col gap-3">
                        <p><strong>Security policies and procedures:</strong> Provider shall maintain a management approved documented Information Security Policy and an established security risk management process to continually assess and evaluate new security risk and manage them through adequate security controls or safeguards.</p>
                        <p><strong>Confidentiality, Integrity and Availability:</strong> Provider shall maintain confidentiality, integrity and availability of the Personal Data disclosed to it by the Disclosing Controller by identifying assets that store, process or transmit such data and deploying adequate technical and organization measures such as, but not limited to, data encryption, physical and logical access control, strong password control, malware and content protection, security vulnerability assessment and patching, secure hardening, network/data segregation controls.</p>
                        <p><strong>Vulnerability management:</strong> Wherever applicable, Provider must ensure that any software component (such as code or API) provided to Provider is free for any security vulnerability or issues and ensure security of data processed using such component.</p>
                        <p><strong>Incident Handling:</strong> In the event of a confirmed personal data breach (as defined by Applicable Data Protection Law), Provider must inform the Disclosing Controller about any impact to its Personal Data promptly and designate a security point of contact (POC) to interact and notify the Disclosing Controller on security matters.</p>
                        <p><strong>Notification obligation:</strong> Any operational change that impacts the security of the Disclosing Controller&apos;s Personal Data and confidential information or systems that handles such data must be notified to the Disclosing Controller without undue delay.</p>
                        <p><strong>Secure destruction of data:</strong> At the end of the Existing Agreement or as otherwise in accordance with Annex A (Description of Processing), on Disclosing Controller&apos;s request, the Provider must destroy all Personal Data disclosed or authorized to be collected by the Disclosing Controller in a secure manner making the Personal Data un-readable and un-recoverable. If the Personal Data cannot be deleted, the Personal Data must be archived and protected from unauthorized access, modification, and disclosure until securely deleted. The Disclosing Controller at its discretion may request for a data destruction certification that includes method of data destruction used.</p>
                        <p><strong>Security risk management program relating to Third Parties:</strong> The Provider will ensure a similar level of security controls wherever the Personal Data disclosed or authorized to be collected by the Disclosing Controller is exchanged with a third party.</p>
                        <p><strong>Encryption:</strong> To the extent the Personal Data disclosed by the Disclosing Controller includes sensitive data (as defined by Applicable Data Protection Laws), Provider will ensure that such Personal Data is encrypted at rest and in transit.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Schedule B */}
                <div id="section-12" className="pt-12 flex flex-col gap-5">
                  <div className="flex items-baseline gap-3 pb-4 border-b border-[#CAC8C8]">
                    <h2 className="text-pretty font-medium leading-[1.1] tracking-tight text-[#101010]" style={{ fontSize: "var(--font-size-h3)" }}>
                      Schedule B — NEAR AI Subprocessors
                    </h2>
                  </div>
                  <p className="text-muted leading-[1.8]" style={{ fontSize: "var(--font-size-body)" }}>
                    The Parties agree that the following list of Subprocessors are approved:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left" style={{ fontSize: "var(--font-size-body)" }}>
                      <thead>
                        <tr className="border-b border-[#CAC8C8]">
                          <th className="pb-3 pr-6 font-medium text-[#101010] whitespace-nowrap">Name of Sub-processor</th>
                          <th className="pb-3 pr-6 font-medium text-[#101010] whitespace-nowrap">Processing Activities</th>
                          <th className="pb-3 font-medium text-[#101010] whitespace-nowrap">Location of Processing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CAC8C8]">
                        {SUBPROCESSORS.map(([name, activity, location]) => (
                          <tr key={name + activity}>
                            <td className="py-4 pr-6 align-top font-medium text-[#101010] whitespace-nowrap">{name}</td>
                            <td className="py-4 pr-6 align-top text-muted">{activity}</td>
                            <td className="py-4 align-top text-muted leading-snug">{location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

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
      <div className="flex flex-col gap-4 text-muted leading-[1.8] break-words [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_ol_ol]:mt-2 [&_strong]:font-medium [&_strong]:text-[#101010]" style={{ fontSize: "var(--font-size-body)" }}>
        {children}
      </div>
    </div>
  );
}
