"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Heart,
  Home,
  Plane,
  Building2,
  CheckCircle,
  Calculator,
  Phone,
  FileText,
  Shield,
  ArrowRight,
  Users,
  Clock,
  Award,
} from "lucide-react"

const productData = {
  motor: {
    title: "Motor Insurance",
    subtitle: "Comprehensive protection for your vehicle",
    icon: Car,
    color: "bg-blue-100 text-blue-600",
    description:
      "Protect your car, bike, or commercial vehicle with our comprehensive motor insurance plans. Get coverage for accidents, theft, natural disasters, and third-party liabilities.",
    features: [
      "Third Party Liability Coverage",
      "Own Damage Protection",
      "Personal Accident Cover",
      "Zero Depreciation Add-on",
      "Engine Protection Cover",
      "Roadside Assistance 24/7",
      "Key Replacement Cover",
      "Tyre Protection",
      "Return to Invoice",
      "NCB Protection",
    ],
    benefits: [
      {
        title: "Cashless Repairs",
        description: "Get your vehicle repaired at 5000+ network garages without paying upfront",
        icon: Shield,
      },
      {
        title: "Quick Claim Settlement",
        description: "Fast claim processing with 98.5% settlement ratio",
        icon: Clock,
      },
      {
        title: "24/7 Roadside Assistance",
        description: "Emergency support anywhere, anytime across India",
        icon: Phone,
      },
      {
        title: "Zero Depreciation",
        description: "Get full claim amount without depreciation deduction",
        icon: Award,
      },
    ],
    plans: [
      {
        name: "Basic Third Party",
        price: "₹2,094",
        coverage: "As per Motor Vehicles Act",
        features: ["Third Party Liability", "Personal Accident ₹15L", "Legal Support"],
      },
      {
        name: "Comprehensive",
        price: "₹4,299",
        coverage: "Up to IDV",
        features: ["Own Damage", "Third Party", "Personal Accident", "Zero Depreciation"],
        popular: true,
      },
      {
        name: "Premium Plus",
        price: "₹6,899",
        coverage: "Enhanced Protection",
        features: ["All Comprehensive Benefits", "Engine Protection", "Roadside Assistance", "Key Replacement"],
      },
    ],
  },
  health: {
    title: "Health Insurance",
    subtitle: "Complete healthcare protection for you and your family",
    icon: Heart,
    color: "bg-red-100 text-red-600",
    description:
      "Secure your family's health with our comprehensive health insurance plans. Get cashless treatment, pre & post hospitalization coverage, and protection against medical emergencies.",
    features: [
      "Cashless Treatment at 10,000+ Hospitals",
      "Pre & Post Hospitalization",
      "Day Care Procedures",
      "Maternity & New Born Cover",
      "Critical Illness Protection",
      "Ambulance Services",
      "Health Check-ups",
      "Alternative Treatment (AYUSH)",
      "Mental Health Coverage",
      "Tele-consultation Services",
    ],
    benefits: [
      {
        title: "Cashless Treatment",
        description: "Get treated at network hospitals without paying upfront",
        icon: Heart,
      },
      {
        title: "Family Floater",
        description: "Single policy covering entire family with shared sum insured",
        icon: Users,
      },
      {
        title: "No Claim Bonus",
        description: "Increase sum insured by up to 50% for claim-free years",
        icon: Award,
      },
      {
        title: "Lifetime Renewability",
        description: "Continue coverage throughout your lifetime",
        icon: Shield,
      },
    ],
    plans: [
      {
        name: "Individual Basic",
        price: "₹3,499",
        coverage: "₹3,00,000",
        features: ["Individual Coverage", "Pre & Post Hospitalization", "Day Care", "Ambulance"],
      },
      {
        name: "Family Floater",
        price: "₹8,999",
        coverage: "₹5,00,000",
        features: ["Family Coverage", "Maternity Benefits", "New Born Cover", "Health Check-up"],
        popular: true,
      },
      {
        name: "Premium Care",
        price: "₹15,999",
        coverage: "₹10,00,000",
        features: ["Enhanced Coverage", "Critical Illness", "International Treatment", "Wellness Benefits"],
      },
    ],
  },
  home: {
    title: "Home Insurance",
    subtitle: "Protect your home and belongings",
    icon: Home,
    color: "bg-green-100 text-green-600",
    description:
      "Safeguard your home, furniture, and valuables against fire, theft, natural disasters, and other unforeseen events with our comprehensive home insurance.",
    features: [
      "Structure Protection",
      "Contents Coverage",
      "Personal Belongings",
      "Temporary Accommodation",
      "Personal Liability",
      "Theft & Burglary",
      "Fire & Lightning",
      "Natural Disasters",
      "Electronic Equipment",
      "Jewelry & Valuables",
    ],
    benefits: [
      {
        title: "Complete Protection",
        description: "Coverage for structure, contents, and personal belongings",
        icon: Home,
      },
      {
        title: "Temporary Stay",
        description: "Alternative accommodation costs during repairs",
        icon: Shield,
      },
      {
        title: "Personal Liability",
        description: "Protection against third-party claims",
        icon: Users,
      },
      {
        title: "Quick Settlement",
        description: "Fast claim processing and settlement",
        icon: Clock,
      },
    ],
    plans: [
      {
        name: "Basic Home",
        price: "₹1,899",
        coverage: "₹10,00,000",
        features: ["Structure Cover", "Contents ₹2L", "Personal Liability", "Fire Protection"],
      },
      {
        name: "Comprehensive Home",
        price: "₹3,499",
        coverage: "₹25,00,000",
        features: ["Enhanced Structure", "Contents ₹5L", "Temporary Stay", "Natural Disasters"],
        popular: true,
      },
      {
        name: "Premium Home",
        price: "₹5,999",
        coverage: "₹50,00,000",
        features: ["Maximum Protection", "Contents ₹10L", "Jewelry Cover", "Electronic Equipment"],
      },
    ],
  },
  travel: {
    title: "Travel Insurance",
    subtitle: "Worry-free travel protection",
    icon: Plane,
    color: "bg-purple-100 text-purple-600",
    description:
      "Travel with confidence knowing you're protected against medical emergencies, trip cancellations, baggage loss, and other travel-related risks.",
    features: [
      "Medical Emergency Coverage",
      "Trip Cancellation/Interruption",
      "Baggage Loss/Delay",
      "Flight Delay Compensation",
      "Personal Accident",
      "Emergency Evacuation",
      "Passport Loss",
      "Hijack Coverage",
      "Adventure Sports",
      "Pre-existing Conditions",
    ],
    benefits: [
      {
        title: "Worldwide Coverage",
        description: "Protection across all international destinations",
        icon: Plane,
      },
      {
        title: "24/7 Assistance",
        description: "Round-the-clock emergency support",
        icon: Phone,
      },
      {
        title: "Cashless Treatment",
        description: "Direct billing at network hospitals worldwide",
        icon: Heart,
      },
      {
        title: "Quick Claims",
        description: "Fast claim processing and settlement",
        icon: Clock,
      },
    ],
    plans: [
      {
        name: "Domestic Travel",
        price: "₹149",
        coverage: "₹1,00,000",
        features: ["Medical Emergency", "Trip Cancellation", "Baggage Loss", "Personal Accident"],
      },
      {
        name: "International Basic",
        price: "₹999",
        coverage: "₹5,00,000",
        features: ["Medical Emergency", "Trip Benefits", "Baggage Cover", "Flight Delay"],
        popular: true,
      },
      {
        name: "International Premium",
        price: "₹2,499",
        coverage: "₹10,00,000",
        features: ["Enhanced Medical", "Adventure Sports", "Pre-existing Conditions", "Emergency Evacuation"],
      },
    ],
  },
  business: {
    title: "Business Insurance",
    subtitle: "Comprehensive protection for your business",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
    description:
      "Protect your business assets, operations, and employees with our comprehensive business insurance solutions designed for enterprises of all sizes.",
    features: [
      "Property Insurance",
      "Public Liability",
      "Product Liability",
      "Professional Indemnity",
      "Cyber Liability",
      "Business Interruption",
      "Key Person Insurance",
      "Directors & Officers",
      "Employment Practices",
      "Trade Credit Insurance",
    ],
    benefits: [
      {
        title: "Asset Protection",
        description: "Comprehensive coverage for business property and equipment",
        icon: Building2,
      },
      {
        title: "Liability Coverage",
        description: "Protection against third-party claims and lawsuits",
        icon: Shield,
      },
      {
        title: "Business Continuity",
        description: "Coverage for income loss during business interruption",
        icon: Clock,
      },
      {
        title: "Cyber Security",
        description: "Protection against cyber threats and data breaches",
        icon: Award,
      },
    ],
    plans: [
      {
        name: "Small Business",
        price: "₹5,999",
        coverage: "₹25,00,000",
        features: ["Property Cover", "Public Liability", "Business Interruption", "Key Person"],
      },
      {
        name: "Medium Enterprise",
        price: "₹15,999",
        coverage: "₹1,00,00,000",
        features: ["Enhanced Property", "Product Liability", "Cyber Cover", "Professional Indemnity"],
        popular: true,
      },
      {
        name: "Large Corporate",
        price: "₹49,999",
        coverage: "₹5,00,00,000",
        features: ["Comprehensive Cover", "D&O Insurance", "Trade Credit", "Employment Practices"],
      },
    ],
  },
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.productId as string
  const product = productData[productId as keyof typeof productData]

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold text-vanilla-900 mb-4">Product Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">The insurance product you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-vanilla-600 hover:bg-vanilla-700">Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const ProductIcon = product.icon

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-vanilla-gradient">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`w-20 h-20 rounded-full ${product.color} flex items-center justify-center mx-auto mb-6`}>
              <ProductIcon className="h-10 w-10" />
            </div>

            <h1 className="text-5xl font-bold text-vanilla-900 mb-4">{product.title}</h1>
            <p className="text-xl text-vanilla-800 mb-8">{product.subtitle}</p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/quote?product=${productId}`}>
                <Button size="lg" className="bg-vanilla-600 hover:bg-vanilla-700 text-white px-8 py-4 text-lg">
                  <Calculator className="mr-2 h-5 w-5" />
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/compare">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 px-8 py-4 text-lg bg-transparent"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Compare Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-20 px-4">
        <div className="container">
          <Tabs defaultValue="features" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="features" className="text-lg">
                Features
              </TabsTrigger>
              <TabsTrigger value="benefits" className="text-lg">
                Benefits
              </TabsTrigger>
              <TabsTrigger value="plans" className="text-lg">
                Plans & Pricing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-vanilla-900 mb-4">Key Features</h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive coverage features included in our {product.title.toLowerCase()} plans
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.features.map((feature, index) => (
                  <Card key={index} className="border-vanilla-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="font-medium text-vanilla-900">{feature}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="benefits">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-vanilla-900 mb-4">Why Choose Our {product.title}?</h2>
                <p className="text-lg text-muted-foreground">
                  Experience the advantages of our comprehensive insurance coverage
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.benefits.map((benefit, index) => (
                  <Card key={index} className="border-vanilla-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full ${product.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <benefit.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-vanilla-900 mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="plans">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-vanilla-900 mb-4">Choose Your Plan</h2>
                <p className="text-lg text-muted-foreground">
                  Select the perfect {product.title.toLowerCase()} plan that fits your needs and budget
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${plan.popular ? "ring-2 ring-vanilla-400" : ""}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-vanilla-600 text-white z-10">
                        Most Popular
                      </Badge>
                    )}

                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold text-vanilla-900">{plan.name}</CardTitle>
                      <div className="text-4xl font-black text-vanilla-700 mt-4">{plan.price}</div>
                      <CardDescription className="text-lg font-semibold text-vanilla-600">
                        Coverage: {plan.coverage}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-3">
                        <Link href={`/quote?product=${productId}&plan=${plan.name.toLowerCase().replace(" ", "-")}`}>
                          <Button className="w-full bg-vanilla-600 hover:bg-vanilla-700 text-white font-semibold py-3 rounded-xl">
                            Get This Plan
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 font-semibold py-3 rounded-xl bg-transparent"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call Expert
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-vanilla-600">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Protected?</h2>
          <p className="text-xl text-vanilla-100 mb-8 max-w-2xl mx-auto">
            Get instant quotes, compare plans, and buy {product.title.toLowerCase()} online in just a few clicks
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href={`/quote?product=${productId}`}>
              <Button
                size="lg"
                className="bg-white text-vanilla-600 hover:bg-vanilla-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Calculator className="mr-3 h-6 w-6" />
                Get Free Quote
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <Phone className="mr-3 h-6 w-6" />
              Call Expert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
