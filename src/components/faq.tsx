import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about using PropertyDirect
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
            <CardDescription>
              Learn more about how PropertyDirect works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is PropertyDirect?</AccordionTrigger>
                <AccordionContent>
                  PropertyDirect is a platform that connects property owners
                  directly with potential buyers or renters, eliminating the
                  need for brokers and their associated fees. Our mission is to
                  make real estate transactions more transparent, efficient, and
                  affordable for everyone involved.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How does PropertyDirect make money?
                </AccordionTrigger>
                <AccordionContent>
                  PropertyDirect charges a small listing fee for property owners
                  who want to list multiple properties or access premium
                  features. Basic listings are free. We do not charge any
                  commission on sales or rentals, unlike traditional brokers who
                  typically charge 5-6% of the sale price.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Is PropertyDirect available in my area?
                </AccordionTrigger>
                <AccordionContent>
                  PropertyDirect is currently available in major cities across
                  the United States, with plans to expand to more locations
                  soon. You can check property listings in your area by using
                  the search function with your location.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>For Property Seekers</CardTitle>
            <CardDescription>
              Information for those looking to buy or rent property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="seeker-1">
                <AccordionTrigger>
                  How do I contact a property owner?
                </AccordionTrigger>
                <AccordionContent>
                  When you find a property you're interested in, simply click on
                  the "Contact Owner" button on the property details page.
                  You'll need to be logged in to send messages. The owner will
                  receive your message and can respond directly to you through
                  our messaging system.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seeker-2">
                <AccordionTrigger>
                  Are the properties verified?
                </AccordionTrigger>
                <AccordionContent>
                  While we encourage owners to provide accurate and detailed
                  information about their properties, PropertyDirect does not
                  physically verify each property. We recommend that seekers
                  always view the property in person before making any financial
                  commitments. We do have a verification system for owner
                  identities to increase trust on the platform.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seeker-3">
                <AccordionTrigger>
                  How do I schedule a viewing?
                </AccordionTrigger>
                <AccordionContent>
                  You can request a viewing by messaging the property owner
                  through our platform. Discuss suitable times directly with the
                  owner, and they will arrange the viewing with you. We
                  recommend always meeting in public places or bringing someone
                  with you when viewing properties for the first time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>For Property Owners</CardTitle>
            <CardDescription>
              Information for those listing their properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="owner-1">
                <AccordionTrigger>How do I list my property?</AccordionTrigger>
                <AccordionContent>
                  To list your property, create an account as a property owner,
                  then click on "List Your Property" in your dashboard. Fill out
                  the property details form with accurate information, upload
                  high-quality photos, and submit. Your listing will be live
                  immediately after submission.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="owner-2">
                <AccordionTrigger>
                  What information should I include in my listing?
                </AccordionTrigger>
                <AccordionContent>
                  The more detailed your listing, the better. Include accurate
                  information about the property size, number of rooms,
                  amenities, location, and price. High-quality photos from
                  multiple angles are essential. Also mention nearby facilities,
                  public transport options, and any special features that make
                  your property stand out.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="owner-3">
                <AccordionTrigger>
                  How do I handle property viewings?
                </AccordionTrigger>
                <AccordionContent>
                  When a seeker requests a viewing, you can arrange it directly
                  through our messaging system. We recommend verifying the
                  identity of viewers before meeting them, meeting in daylight
                  hours, and ensuring someone knows about your appointment. You
                  can set specific viewing hours in your profile to manage your
                  availability.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
