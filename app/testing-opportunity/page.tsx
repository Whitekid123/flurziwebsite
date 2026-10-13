import type {Metadata} from "next";
import Link from "next/link";
import {COMPANY} from "@/lib/site-content";

export const metadata:Metadata={
  title:"Quality testing opportunity",
  description:"Apply to be considered for Flurzi software quality testing opportunities, with fees of up to £10 per test.",
  alternates:{canonical:"/testing-opportunity"},
};

export default function TestingOpportunityPage(){
  const subject=encodeURIComponent("Flurzi quality testing application");
  const body=encodeURIComponent("Name:\nDevices and operating systems I can test:\nRelevant testing experience or interests:\nGeneral availability:\n");
  return <>
    <section className="page-intro corp-page-intro">
      <span className="section-label">WORK WITH FLURZI</span>
      <h1>Help us test<br/><em>what we build.</em></h1>
      <p>Apply to be considered for software quality testing opportunities with Flurzi.</p>
    </section>
    <section className="corp-section">
      <div className="corp-section-heading">
        <h2>Put products<br/>through their paces.</h2>
        <p>We invite testers to try assigned product experiences, follow the test instructions and share clear feedback about what works and what needs attention.</p>
      </div>
      <div className="scope-grid">
        <article><h3>Fees</h3><p>Selected tests may pay up to £10 per test. The fee and scope for an assignment will be confirmed before you take it on; applying does not guarantee selection or paid work.</p></article>
        <article><h3>How to apply</h3><p>Email us with your name, the devices and operating systems you can test, any relevant testing experience or interests, and your general availability. Please do not send passwords, payment details or identity documents.</p></article>
        <article><h3>What happens next</h3><p>We will review your application and contact you if a suitable testing opportunity is available. Test assignments and their requirements can vary.</p></article>
      </div>
      <a className="solid-link" href={`mailto:${COMPANY.email}?subject=${subject}&body=${body}`}>Apply by email <span aria-hidden="true">↗</span></a>
      <p className="form-explanation">We use application details to consider you for testing opportunities and communicate about them. See our <Link href="/privacy-policy">privacy information</Link>.</p>
      <p className="form-explanation">Questions? Contact <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>
    </section>
  </>;
}
