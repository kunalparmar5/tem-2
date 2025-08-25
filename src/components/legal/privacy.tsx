import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: July 1, 2023</p>

        <Separator className="my-6" />

        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>
            At PropertyDirect, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">
            1. Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6">
            <li>Register for an account</li>
            <li>Create or modify your profile</li>
            <li>List a property</li>
            <li>Search for properties</li>
            <li>Communicate with other users</li>
            <li>Contact our customer support</li>
            <li>Subscribe to our newsletters</li>
          </ul>
          <p>
            This information may include your name, email address, phone number,
            address, profile picture, property details, and any other
            information you choose to provide.
          </p>
          <p>
            We also automatically collect certain information when you visit,
            use or navigate our platform. This information does not reveal your
            specific identity but may include device and usage information, such
            as your IP address, browser and device characteristics, operating
            system, language preferences, referring URLs, device name, country,
            location, information about how and when you use our platform and
            other technical information.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>
              Send you technical notices, updates, security alerts, and support
              messages
            </li>
            <li>Respond to your comments, questions, and requests</li>
            <li>
              Communicate with you about products, services, offers, and events
            </li>
            <li>
              Monitor and analyze trends, usage, and activities in connection
              with our services
            </li>
            <li>
              Detect, investigate, and prevent fraudulent transactions and other
              illegal activities
            </li>
            <li>Personalize your experience on our platform</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">
            3. Sharing of Information
          </h2>
          <p>We may share information about you as follows:</p>
          <ul className="list-disc pl-6">
            <li>
              With other users of the platform as necessary to facilitate your
              transactions (e.g., when you contact a property owner)
            </li>
            <li>
              With vendors, consultants, and other service providers who need
              access to such information to carry out work on our behalf
            </li>
            <li>
              In response to a request for information if we believe disclosure
              is in accordance with any applicable law, regulation, or legal
              process
            </li>
            <li>
              If we believe your actions are inconsistent with our user
              agreements or policies, or to protect the rights, property, and
              safety of PropertyDirect or others
            </li>
            <li>
              In connection with, or during negotiations of, any merger, sale of
              company assets, financing, or acquisition of all or a portion of
              our business by another company
            </li>
            <li>With your consent or at your direction</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you
            from loss, theft, misuse and unauthorized access, disclosure,
            alteration and destruction. However, no internet or email
            transmission is ever fully secure or error free.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">5. Your Choices</h2>
          <p>
            <strong>Account Information:</strong> You may update, correct or
            delete information about you at any time by logging into your online
            account and modifying your information or by emailing us at
            privacy@propertydirect.com. We may retain certain information as
            required by law or for legitimate business purposes.
          </p>
          <p>
            <strong>Cookies:</strong> Most web browsers are set to accept
            cookies by default. If you prefer, you can usually choose to set
            your browser to remove or reject browser cookies. Please note that
            if you choose to remove or reject cookies, this could affect the
            availability and functionality of our services.
          </p>
          <p>
            <strong>Promotional Communications:</strong> You may opt out of
            receiving promotional emails from PropertyDirect by following the
            instructions in those emails. If you opt out, we may still send you
            non-promotional emails, such as those about your account or our
            ongoing business relations.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">6. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 16, and we do not
            knowingly collect personal information from children under 16. If we
            learn we have collected or received personal information from a
            child under 16 without verification of parental consent, we will
            delete that information.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">
            7. Changes to this Privacy Policy
          </h2>
          <p>
            We may change this Privacy Policy from time to time. If we make
            changes, we will notify you by revising the date at the top of the
            policy and, in some cases, we may provide you with additional notice
            (such as adding a statement to our homepage or sending you a
            notification).
          </p>

          <h2 className="mt-8 text-2xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@propertydirect.com.
          </p>
        </div>
      </div>
    </div>
  );
}
