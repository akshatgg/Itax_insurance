import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Heart, Home, Plane, Building2, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: "motor",
    title: "Motor Insurance",
    description: "Comprehensive protection for your vehicles",
    icon: Car,
    color: "bg-blue-100 text-blue-600",
    plans: [
      {
        name: "Third Party Liability",
        price: "₹2,094",
        features: ["Legal Liability Cover", "Personal Accident Cover", "Mandatory by Law"],
        popular: false,
      },
      {
        name: "Comprehensive",
        price: "₹4,299",
        features: ["Own Damage Cover", "Third Party Liability", "Personal Accident", "Zero Depreciation"],
        popular: true,
      },
      {
        name: "Zero Depreciation",
        price: "₹6,499",
        features: ["No Depreciation on Claims", "Full Coverage", "Roadside Assistance", "Engine Protection"],
        popular: false,
      },
    ],
  },
  {
    id: "health",
    title: "Health Insurance",
    description: "Medical coverage for individuals and families",
    icon: Heart,
    color: "bg-red-100 text-red-600",
    plans: [
      {
        name: "Individual Basic",
        price: "₹3,499",
        features: ["₹2L Coverage", "Cashless Treatment", "Pre & Post Hospitalization"],
        popular: false,
      },
      {
        name: "Family Floater",
        price: "₹8,999",
        features: ["₹5L Coverage", "Family Coverage", "Maternity Benefits", "Day Care Procedures"],
        popular: true,
      },
      {
        name: "Super Top-up",
        price: "₹12,999",
        features: ["₹10L Coverage", "Critical Illness", "International Coverage", "Wellness Benefits"],
        popular: false,
      },
    ],
  },
  {
    id: "home",
    title: "Home Insurance",
    description: "Protect your home and belongings",
    icon: Home,
    color: "bg-green-100 text-green-600",
    plans: [
      {
        name: "Structure Only",
        price: "₹1,899",
        features: ["Building Structure", "Fire & Allied Perils", "Natural Disasters"],
        popular: false,
      },
      {
        name: "Home Complete",
        price: "₹3,499",
        features: ["Structure + Contents", "Personal Liability", "Temporary Accommodation", "Theft Protection"],
        popular: true,
      },
      {
        name: "Premium Home",
        price: "₹5,999",
        features: ["Comprehensive Coverage", "High-Value Items", "Home Renovation", "Legal Expenses"],
        popular: false,
      },
    ],
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description: "Coverage for domestic and international trips",
    icon: Plane,
    color: "bg-purple-100 text-purple-600",
    plans: [
      {
        name: "Domestic Travel",
        price: "₹149",
        features: ["Medical Emergency", "Trip Cancellation", "Baggage Loss", "Personal Accident"],
        popular: false,
      },
      {
        name: "International Basic",
        price: "₹999",
        features: ["Worldwide Coverage", "Medical Emergency", "Trip Interruption", "Passport Loss"],
        popular: true,
      },
      {
        name: "Annual Multi-Trip",
        price: "₹2,999",
        features: ["Multiple Trips", "Extended Coverage", "Adventure Sports", "Business Travel"],
        popular: false,
      },
    ],
  },
  {
    id: "business",
    title: "Business Insurance",
    description: "Commercial coverage for enterprises",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
    plans: [
      {
        name: "Small Business",
        price: "₹5,999",
        features: ["Property Insurance", "Public Liability", "Product Liability", "Key Person"],
        popular: false,
      },
      {
        name: "Commercial Package",
        price: "₹15,999",
        features: ["Comprehensive Coverage", "Business Interruption", "Cyber Liability", "Directors & Officers"],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Tailored Solutions", "Global Coverage", "Risk Management", "Dedicated Support"],
        popular: false,
      },
    ],
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-vanilla-gradient">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-vanilla-900 mb-6">Insurance Products</h1>
            <p className="text-xl text-vanilla-800 mb-8">
              Comprehensive coverage solutions for all your insurance needs. Choose from our wide range of products
              designed to protect what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="space-y-16">
            {products.map((product) => (
              <div key={product.id} className="space-y-8">
                <div className="text-center">
                  <div
                    className={`w-20 h-20 rounded-full ${product.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <product.icon className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-vanilla-900 mb-2">{product.title}</h2>
                  <p className="text-lg text-muted-foreground">{product.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {product.plans.map((plan, index) => (
                    <Card
                      key={index}
                      className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                        plan.popular ? "ring-2 ring-vanilla-400" : ""
                      }`}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-vanilla-600 text-white">
                          Most Popular
                        </Badge>
                      )}

                      <CardHeader className="text-center">
                        <CardTitle className="text-xl font-bold text-vanilla-900">{plan.name}</CardTitle>
                        <div className="text-3xl font-black text-vanilla-700 mt-2">{plan.price}</div>
                        <CardDescription>per year</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="space-y-3">
                          <Link href={`/quote?product=${product.id}&plan=${plan.name}`}>
                            <Button className="w-full bg-vanilla-600 hover:bg-vanilla-700 text-white font-semibold py-3 rounded-xl">
                              Get Quote
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/products/${product.id}`}>
                            <Button
                              variant="outline"
                              className="w-full border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 font-semibold py-3 rounded-xl bg-transparent"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
