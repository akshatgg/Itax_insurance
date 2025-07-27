"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  Shield,
  Car,
  Home,
  Heart,
  Plane,
  Building2,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Clock,
  Phone,
  ArrowRight,
  Calculator,
  FileText,
  Headphones,
} from "lucide-react"

const insuranceProducts = [
  {
    id: "motor",
    title: "Motor Insurance",
    description: "Comprehensive coverage for cars, bikes & commercial vehicles",
    icon: Car,
    color: "bg-blue-100 text-blue-600",
    features: ["Third Party Liability", "Own Damage Cover", "Personal Accident", "Zero Depreciation"],
    startingPrice: "₹2,094",
    popular: true,
  },
  {
    id: "health",
    title: "Health Insurance",
    description: "Individual & family health protection plans",
    icon: Heart,
    color: "bg-red-100 text-red-600",
    features: ["Cashless Treatment", "Pre & Post Hospitalization", "Day Care Procedures", "Maternity Cover"],
    startingPrice: "₹3,499",
    popular: false,
  },
  {
    id: "home",
    title: "Home Insurance",
    description: "Protect your home & belongings from unforeseen events",
    icon: Home,
    color: "bg-green-100 text-green-600",
    features: ["Structure Cover", "Contents Protection", "Personal Liability", "Temporary Accommodation"],
    startingPrice: "₹1,899",
    popular: false,
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description: "Domestic & international travel protection",
    icon: Plane,
    color: "bg-purple-100 text-purple-600",
    features: ["Medical Emergency", "Trip Cancellation", "Baggage Loss", "Flight Delay"],
    startingPrice: "₹149",
    popular: false,
  },
  {
    id: "business",
    title: "Business Insurance",
    description: "Commercial coverage for enterprises",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
    features: ["Property Insurance", "Liability Cover", "Business Interruption", "Cyber Security"],
    startingPrice: "₹5,999",
    popular: false,
  },
]

const stats = [
  { label: "Happy Customers", value: "50L+", icon: Users },
  { label: "Claims Settled", value: "₹500Cr+", icon: CheckCircle },
  { label: "Settlement Ratio", value: "99.2%", icon: TrendingUp },
  { label: "Network Partners", value: "25,000+", icon: Award },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "Excellent service! My car insurance claim was settled within 24 hours. Highly recommended.",
    product: "Motor Insurance",
  },
  {
    name: "Priya Sharma",
    location: "Delhi, NCR",
    rating: 5,
    text: "The health insurance policy covered all my medical expenses. Great customer support.",
    product: "Health Insurance",
  },
  {
    name: "Amit Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "Home insurance claim process was smooth and hassle-free. Very satisfied with the service.",
    product: "Home Insurance",
  },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-vanilla-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-vanilla-300/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-vanilla-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-vanilla-600 text-white px-6 py-2 text-lg font-semibold animate-pulse-vanilla">
              🛡️ India's Most Trusted General Insurance
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black text-vanilla-900 mb-6 leading-tight">
              Complete
              <br />
              <span className="text-vanilla-700">Insurance</span>
              <br />
              Protection
            </h1>

            <p className="text-xl md:text-2xl text-vanilla-800 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive general insurance solutions for Motor, Health, Home, Travel & Business.
              <span className="font-bold"> Trusted by 50+ Lakh customers</span> across India.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button
                size="lg"
                className="bg-vanilla-600 hover:bg-vanilla-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Calculator className="mr-3 h-6 w-6" />
                Get Instant Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <FileText className="mr-3 h-6 w-6" />
                Compare Plans
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-vanilla-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <stat.icon className="h-8 w-8 text-vanilla-600 mx-auto mb-2" />
                  <div className="text-3xl font-black text-vanilla-800 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-vanilla-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Products */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-vanilla-900 mb-4">Our Insurance Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive coverage solutions tailored for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  product.popular ? "ring-2 ring-vanilla-400" : ""
                }`}
              >
                {product.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-vanilla-600 text-white z-10">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${product.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <product.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-vanilla-900">{product.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
                  <div className="text-2xl font-black text-vanilla-700 mt-2">Starting from {product.startingPrice}</div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link href={`/products/${product.id}`}>
                      <Button className="w-full bg-vanilla-600 hover:bg-vanilla-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                        View Plans
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/quote?product=${product.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 font-semibold py-3 rounded-xl bg-transparent"
                      >
                        Get Quote
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-vanilla-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-vanilla-900 mb-4">Why Choose Amar Insurance?</h2>
            <p className="text-xl text-muted-foreground">Your trusted partner for comprehensive insurance solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Quick Claims",
                description: "Fast claim processing with 99.2% settlement ratio",
              },
              {
                icon: Shield,
                title: "Trusted Brand",
                description: "25+ years of experience with IRDAI registration",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Round-the-clock customer service and assistance",
              },
              {
                icon: Award,
                title: "Best Rates",
                description: "Competitive premiums with maximum coverage benefits",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-vanilla-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-vanilla-600" />
                  </div>
                  <CardTitle className="text-lg font-bold text-vanilla-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-vanilla-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Real experiences from our satisfied customers</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-vanilla-gradient">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                  ))}
                </div>

                <blockquote className="text-2xl font-semibold text-vanilla-900 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-vanilla-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-vanilla-900 text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-muted-foreground">{testimonials[currentTestimonial].location}</div>
                    <div className="text-sm text-vanilla-600 font-medium">
                      {testimonials[currentTestimonial].product}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-vanilla-600 scale-125" : "bg-vanilla-300 hover:bg-vanilla-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-vanilla-600">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Protected?</h2>
          <p className="text-xl text-vanilla-100 mb-8 max-w-2xl mx-auto">
            Get instant quotes, compare plans, and buy insurance online in just a few clicks
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-vanilla-600 hover:bg-vanilla-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Calculator className="mr-3 h-6 w-6" />
              Get Free Quote
            </Button>
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
