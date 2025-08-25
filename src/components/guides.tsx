import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Home, CheckCircle } from "lucide-react";

export default function Guides() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          PropertyDirect Guides
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Comprehensive resources to help you navigate the property market
          without brokers
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <Tabs defaultValue="seekers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seekers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              For Seekers
            </TabsTrigger>
            <TabsTrigger value="owners" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              For Owners
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              General Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seekers" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Finding Your Perfect Property</CardTitle>
                  <CardDescription>
                    A comprehensive guide to searching and filtering properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn how to use PropertyDirect's advanced search features
                    to find properties that match your exact requirements. This
                    guide covers location-based searches, price filtering,
                    amenity preferences, and more.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>10 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communicating with Property Owners</CardTitle>
                  <CardDescription>
                    Tips for effective communication with property owners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Discover the best practices for reaching out to property
                    owners, what questions to ask, and how to negotiate
                    directly. This guide will help you communicate
                    professionally and effectively.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>8 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Viewing Checklist</CardTitle>
                  <CardDescription>
                    What to look for when viewing a property
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    A comprehensive checklist of things to inspect and questions
                    to ask when viewing a property. Ensure you don't miss any
                    important details before making a decision.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    <span>Includes downloadable PDF</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Understanding Property Documents</CardTitle>
                  <CardDescription>
                    A guide to legal documents in property transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Navigate the complex world of property documentation without
                    a broker. Learn about title deeds, sale agreements, and
                    other essential documents you'll encounter.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>15 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="owners" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Creating an Attractive Listing</CardTitle>
                  <CardDescription>
                    How to make your property stand out to potential buyers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn the art of creating compelling property listings that
                    attract serious buyers. This guide covers writing
                    descriptions, taking professional-quality photos, and
                    highlighting your property's best features.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>12 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Your Property Right</CardTitle>
                  <CardDescription>
                    Strategies for setting the optimal price for your property
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Discover how to research the market and set a competitive
                    price that will attract buyers while maximizing your return.
                    Learn about pricing strategies and common pitfalls to avoid.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>10 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hosting Successful Property Viewings</CardTitle>
                  <CardDescription>
                    Tips for showing your property to potential buyers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn how to prepare your property for viewings, what
                    information to have ready, and how to address common
                    questions and concerns from potential buyers.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>8 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Negotiating Without an Agent</CardTitle>
                  <CardDescription>
                    How to handle price negotiations directly with buyers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Master the art of negotiation when selling your property
                    directly. This guide covers responding to offers,
                    counteroffers, and reaching a mutually beneficial agreement.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>14 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="general" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>The Legal Process Explained</CardTitle>
                  <CardDescription>
                    Understanding the legal aspects of property transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    A comprehensive overview of the legal process involved in
                    buying or selling property without a broker. Learn about
                    contracts, title transfers, and legal requirements in your
                    area.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>20 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Market Trends</CardTitle>
                  <CardDescription>
                    Current trends and forecasts in the real estate market
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Stay informed about the latest trends in the property
                    market. This regularly updated guide provides insights into
                    market conditions, price trends, and forecasts for different
                    regions.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Updated monthly</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financing Your Property Purchase</CardTitle>
                  <CardDescription>
                    Options for financing a property without broker assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Explore various financing options available for property
                    purchases, including mortgages, loans, and alternative
                    financing methods. Learn how to approach lenders and secure
                    the best rates.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>15 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Taxes and Insurance</CardTitle>
                  <CardDescription>
                    Understanding the ongoing costs of property ownership
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    A comprehensive guide to property taxes, insurance
                    requirements, and other ongoing costs associated with
                    property ownership. Learn how to budget for these expenses
                    and find the best insurance rates.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>12 minute read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
