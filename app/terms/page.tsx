import type { Metadata } from "next";

import LegalDoc from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Use | IBTU",
  description:
    "The terms that govern use of It's Bigger Than Us's website, donations, Community Builder sign-up, and event participation.",
  alternates: { canonical: "/terms" },
};

const CONTENT = `Welcome to It's Bigger Than Us ("IBTU," "we," "us," or "our"). These Terms of Use ("Terms") govern your access to and use of our website, donation pages, Community Builder sign-up, event registration and vending, and any related services we provide (together, the "Services"). By using our website, donating, signing up as a Community Builder, registering for or vending at an event, or otherwise using the Services, you agree to these Terms. If you do not agree, please do not use the Services.

## 1. Acceptance and eligibility

By accessing or using the Services, you confirm that you are at least 18 years old, or that you are using the Services with the involvement and consent of a parent or legal guardian who agrees to these Terms on your behalf. If you use the Services on behalf of an organization, you represent that you are authorized to accept these Terms for that organization.

## 2. Use of our site and services

You agree to use our website and Services lawfully and not to disrupt, misuse, reverse-engineer, scrape without permission, or attempt unauthorized access to them or to any account, system, or network connected to them. If any part of the Services requires an account or registration, you are responsible for the accuracy of the information you provide and for activity that occurs under your registration. We may update, suspend, limit, or discontinue any part of the Services at any time, and we may remove content or restrict access for conduct that violates these Terms.

## 3. Donations

Donations are processed through our payment provider and support IBTU's charitable programs. IBTU is a 501(c)(3) nonprofit organization (EIN 85-3136505); donations are tax-deductible to the extent allowed by law, and a receipt is issued for each gift. Donations are generally non-refundable. If you believe a gift was made in error or in a duplicate or incorrect amount, contact us promptly and we will work with you in good faith to resolve it. If you set up a recurring donation, it will continue on the schedule you select until you cancel; you may cancel a recurring gift at any time by contacting us, and cancellation applies to future scheduled gifts only.

## 4. Community Builders and event participation

Community Builders and event participants agree to follow IBTU's on-site guidance and applicable venue and safety rules. Participation in IBTU programs and events is voluntary, and you participate at your own risk to the extent permitted by law. Vendors and partners are responsible for their own permits, licenses, insurance, and compliance as set out in their participation agreements; in the event of a conflict between these Terms and a signed participation agreement, the participation agreement governs for that activity.

## 5. Intellectual property

The IBTU name, logo, and the content on our website are owned by IBTU or its licensors and may not be used without permission, except as needed to share or support our mission with attribution. If you submit content to us (for example, photos, testimonials, or event materials), you grant IBTU a non-exclusive, royalty-free license to use, reproduce, and display that content in connection with our mission and programs, and you represent that you have the rights necessary to grant that license.

## 6. Third-party services and links

Our website and Services rely on third-party providers (for example, Bloomerang, Brevo, Intuit QuickBooks, Airtable, Vercel, and Sanity) and may link to third-party sites. We are not responsible for the content, products, or practices of third parties; their terms and privacy policies govern your use of them.

## 7. Privacy

Your use of the Services is also governed by our Privacy Policy, which describes how we collect, use, and share personal information and the privacy rights available to you, including rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act. Please review the Privacy Policy to understand our practices.

## 8. Disclaimers

The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including any implied warranties of merchantability, fitness for a particular purpose, and non-infringement, to the fullest extent permitted by law. We do not warrant that the Services will be uninterrupted, secure, or error-free.

## 9. Limitation of liability

To the fullest extent permitted by law, IBTU and its officers, directors, employees, and Community Builders will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, goodwill, or other intangible losses, arising from or related to your use of the Services. To the fullest extent permitted by law, IBTU's total liability for any claim arising out of or relating to the Services will not exceed one hundred U.S. dollars (USD $100) or, if greater, the amount you paid or donated to IBTU in the twelve months before the event giving rise to the claim. Some jurisdictions do not allow certain limitations, so some of these limitations may not apply to you.

## 10. Indemnification

You agree to indemnify and hold IBTU harmless from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of your misuse of the Services, your violation of these Terms, or your violation of any law or the rights of a third party.

## 11. Governing law and dispute resolution

These Terms are governed by the laws of the State of California, without regard to its conflict-of-law rules. You agree that any dispute arising out of or relating to these Terms or the Services will be brought exclusively in the state or federal courts located in Los Angeles County, California, and you consent to the jurisdiction of those courts. Before filing any claim, you agree to first contact us and attempt to resolve the dispute informally in good faith.

## 12. Changes to these Terms

We may update these Terms from time to time. The effective date above reflects the latest version. Material changes will be reflected by updating this page, and your continued use of the Services after changes take effect means you accept the updated Terms.

## 13. General

If any provision of these Terms is found unenforceable, the remaining provisions will remain in full effect. Our failure to enforce any provision is not a waiver of it. You may not assign these Terms without our consent; we may assign them in connection with a merger, reorganization, or transfer of our operations. These Terms, together with any policies or participation agreements referenced here, are the entire agreement between you and IBTU regarding the Services.

## 14. Contact

It's Bigger Than Us · 2006 W. 76th Street, Los Angeles, CA 90047 · info@itsbiggerthanusla.org`;

export default function TermsPage() {
  return <LegalDoc eyebrow="Legal" title="Terms of Use" effective="Effective date: June 28, 2026" content={CONTENT} />;
}
