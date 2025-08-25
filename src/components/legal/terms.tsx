import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-muted-foreground">Last updated: July 1, 2023</p>

        <Separator className="my-6" />

        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>
            Welcome to PropertyDirect. These Terms of Service ("Terms") govern
            your use of our website, services, and applications (collectively,
            the "Service"). By accessing or using the Service, you agree to be
            bound by these Terms.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using our Service, you agree to be bound by these
            Terms. If you disagree with any part of the terms, you may not
            access the Service.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">
            2. Description of Service
          </h2>
          <p>
            PropertyDirect is a platform that connects property owners directly
            with potential buyers or renters. We provide tools for listing
            properties, searching for properties, and facilitating communication
            between parties. We do not act as a broker, agent, or intermediary
            in any property transactions.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">3. User Accounts</h2>
          <p>
            To access certain features of the Service, you must register for an
            account. You agree to provide accurate, current, and complete
            information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password. You agree not to disclose your password to any third
            party. You must notify us immediately upon becoming aware of any
            breach of security or unauthorized use of your account.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">4. User Content</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise
            make available certain information, text, graphics, videos, or other
            material ("Content"). You are responsible for the Content that you
            post on or through the Service, including its legality, reliability,
            and appropriateness.
          </p>
          <p>
            By posting Content on or through the Service, you represent and
            warrant that: (i) the Content is yours (you own it) and/or you have
            the right to use it and the right to grant us the rights and license
            as provided in these Terms, and (ii) that the posting of your
            Content on or through the Service does not violate the privacy
            rights, publicity rights, copyrights, contract rights or any other
            rights of any person or entity.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">5. Property Listings</h2>
          <p>
            Property owners are responsible for ensuring that all information
            provided in their listings is accurate, complete, and up-to-date.
            This includes property details, images, availability, and pricing.
            Misrepresentation of properties may result in the removal of
            listings and termination of accounts.
          </p>
          <p>
            PropertyDirect reserves the right to remove any listing that
            violates these Terms or that we determine, in our sole discretion,
            is harmful to the Service, users, or third parties.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">
            6. Communications Between Users
          </h2>
          <p>
            The Service facilitates communication between property owners and
            seekers. You agree to use this feature responsibly and not to
            harass, threaten, or otherwise harm other users. PropertyDirect is
            not responsible for the content of communications between users.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">7. Prohibited Uses</h2>
          <p>You agree not to use the Service:</p>
          <ul className="list-disc pl-6">
            <li>
              In any way that violates any applicable national or international
              law or regulation.
            </li>
            <li>
              To impersonate or attempt to impersonate PropertyDirect, a
              PropertyDirect employee, another user, or any other person or
              entity.
            </li>
            <li>
              To engage in any other conduct that restricts or inhibits anyone's
              use or enjoyment of the Service, or which, as determined by us,
              may harm PropertyDirect or users of the Service or expose them to
              liability.
            </li>
            <li>To post false, misleading, or fraudulent property listings.</li>
            <li>
              To circumvent, disable, or otherwise interfere with
              security-related features of the Service.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">
            8. Limitation of Liability
          </h2>
          <p>
            In no event shall PropertyDirect, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from (i) your access to or use
            of or inability to access or use the Service; (ii) any conduct or
            content of any third party on the Service; (iii) any content
            obtained from the Service; and (iv) unauthorized access, use or
            alteration of your transmissions or content, whether based on
            warranty, contract, tort (including negligence) or any other legal
            theory, whether or not we have been informed of the possibility of
            such damage.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will provide
            at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole
            discretion.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            support@propertydirect.com.
          </p>
        </div>
      </div>
    </div>
  );
}
