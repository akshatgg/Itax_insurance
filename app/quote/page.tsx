"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import UniversalAIFormBuilder from "@/components/universal-ai-form-builder"
import { Shield, Heart, Home, Car, Plane, FileText, Phone, CheckCircle } from "lucide-react"

interface QuoteData {
  product: string
  formData: any
  familyMembers: any[]
  estimatedPremium: number
  coverage: string
  recommendations: string[]
}

export default function QuotePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const product = searchParams.get("product") || "health"
  const [isComplete, setIsComplete] = useState(false)
  const [quoteData, setQuoteData] = useState<QuoteData>({
    product,
    formData: {},
    familyMembers: [],
    estimatedPremium: 0,
    coverage: "",
    recommendations: [],
  })

  const productConfig = {
    health: {
      title: "Health Insurance Quote",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Get comprehensive health coverage for you and your family",
    },
    motor: {
      title: "Motor Insurance Quote",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Protect your vehicle with comprehensive motor insurance",
    },
    home: {
      title: "Home Insurance Quote",
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Secure your home and belongings with comprehensive coverage",
    },
    travel: {
      title: "Travel Insurance Quote",
      icon: Plane,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Travel with confidence with comprehensive travel protection",
    },
    life: {
      title: "Life Insurance Quote",
      icon: Shield,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Secure your family's financial future with life insurance",
    },
    business: {
      title: "Business Insurance Quote",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Protect your business with comprehensive coverage",
    },
  }

  const config = productConfig[product as keyof typeof productConfig] || productConfig.health

  const handleFormComplete = async (data: any) => {
    // Generate PDF for the complete application
    const { generateInsuranceApplicationPDF } = await import("@/lib/pdf-generator")

    await generateInsuranceApplicationPDF(data.formData, data.familyMembers, product)

    // Calculate premium and set completion
    const estimatedPremium = calculatePremium(data.formData, data.familyMembers)

    setQuoteData({
      ...quoteData,
      formData: data.formData,
      familyMembers: data.familyMembers,
      estimatedPremium,
      coverage: generateCoverage(data.formData),
      recommendations: generateRecommendations(data.formData),
    })

    setIsComplete(true)
  }

  const handleFamilyUpdate = (members: any[]) => {
    setQuoteData((prev) => ({
      ...prev,
      familyMembers: members,
    }))
  }

  const calculatePremium = (formData: any, familyMembers: any[]) => {
    let basePremium = 0

    switch (product) {
      case "health":
        basePremium = 15000
        if (formData.dateOfBirth) {
          const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()
          if (age > 45) basePremium += 5000
          if (age > 60) basePremium += 10000
        }
        basePremium += familyMembers.length * 3000
        if (formData.hasPreExistingConditions === "Yes") basePremium += 8000
        if (formData.smokingStatus === "Regular") basePremium += 12000
        break
      case "motor":
        basePremium = 8000
        if (formData.manufacturingYear) {
          const vehicleAge = new Date().getFullYear() - formData.manufacturingYear
          if (vehicleAge > 5) basePremium += 2000
          if (vehicleAge > 10) basePremium += 4000
        }
        if (formData.vehicleType === "Commercial Vehicle") basePremium += 5000
        if (formData.previousClaims !== "None") basePremium += 3000
        break
      case "home":
        basePremium = 12000
        if (formData.propertyValue) {
          if (formData.propertyValue.includes("₹1Cr")) basePremium += 4000
          if (formData.propertyValue.includes("Above ₹5Cr")) basePremium += 8000
        }
        if (formData.propertyAge > 20) basePremium += 3000
        if (formData.locationRisk === "High Risk Area") basePremium += 5000
        break
      case "travel":
        basePremium = 2500
        if (formData.tripType === "International") basePremium += 1500
        const tripDuration =
          formData.returnDate && formData.departureDate
            ? Math.ceil(
                (new Date(formData.returnDate).getTime() - new Date(formData.departureDate).getTime()) /
                  (1000 * 60 * 60 * 24),
              )
            : 7
        if (tripDuration > 30) basePremium += 1000
        if (formData.additionalCovers?.includes("Adventure Sports")) basePremium += 2000
        break
      case "life":
        basePremium = 20000
        if (formData.dateOfBirth) {
          const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()
          basePremium += age * 200
        }
        if (formData.smokingStatus === "Regular") basePremium += 15000
        if (formData.coverageAmount) {
          const amount = Number.parseInt(formData.coverageAmount.replace(/[₹,]/g, ""))
          basePremium += amount / 10000
        }
        break
      case "business":
        basePremium = 25000
        if (formData.annualTurnover) {
          if (formData.annualTurnover.includes("Above ₹100Cr")) basePremium += 20000
          else if (formData.annualTurnover.includes("₹25Cr")) basePremium += 10000
        }
        if (formData.coverageTypes?.length > 3) basePremium += 8000
        break
    }

    return Math.max(basePremium, 1000) // Minimum premium
  }

  const generateCoverage = (formData: any) => {
    switch (product) {
      case "health":
        return formData.coverageAmount || "₹5,00,000 Sum Insured"
      case "motor":
        return `Comprehensive Coverage for ${formData.vehicleMake || "Vehicle"} ${formData.vehicleModel || ""}`
      case "home":
        return formData.propertyValue || "₹25L - ₹50L Property Coverage"
      case "travel":
        return `${formData.tripType || "Travel"} Coverage`
      case "life":
        return formData.coverageAmount || "₹50,00,000 Life Cover"
      case "business":
        return "Comprehensive Business Protection"
      default:
        return "Standard Coverage"
    }
  }

  const generateRecommendations = (formData: any) => {
    const recommendations = []

    switch (product) {
      case "health":
        recommendations.push("Consider adding critical illness cover")
        if (formData.planType === "Family Floater") {
          recommendations.push("Family floater plan recommended for cost savings")
        }
        if (formData.smokingStatus === "Never") {
          recommendations.push("Non-smoker discount available")
        }
        break
      case "motor":
        recommendations.push("Zero depreciation cover recommended")
        recommendations.push("Engine protection add-on suggested")
        if (formData.vehicleType === "Car" && formData.manufacturingYear >= 2020) {
          recommendations.push("Return to invoice cover available")
        }
        break
      case "home":
        recommendations.push("Natural disaster coverage included")
        recommendations.push("Valuable items coverage recommended")
        if (formData.securityFeatures?.length > 2) {
          recommendations.push("Security discount applicable")
        }
        break
      case "travel":
        recommendations.push("Trip cancellation protection included")
        if (formData.tripType === "International") {
          recommendations.push("Visa rejection coverage recommended")
        }
        break
      case "life":
        recommendations.push("Term life insurance for maximum coverage")
        recommendations.push("Consider adding accidental death benefit")
        break
      case "business":
        recommendations.push("Cyber liability coverage essential")
        recommendations.push("Professional indemnity recommended")
        break
    }

    return recommendations
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-vanilla-gradient">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <Card className="border-green-200 bg-green-50 mb-8">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-green-900 mb-2">Application Submitted Successfully!</h1>
                <p className="text-green-700 mb-4">
                  Your {config.title.toLowerCase()} application has been received and a PDF copy has been generated.
                </p>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  Application ID: APP-{Date.now()}
                </Badge>
              </CardContent>
            </Card>

            {/* Quote Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-vanilla-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <config.icon className={`h-5 w-5 mr-2 ${config.color}`} />
                    Quote Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-vanilla-50 rounded-lg">
                    <div className="text-3xl font-bold text-vanilla-600 mb-2">
                      ₹{quoteData.estimatedPremium.toLocaleString()}
                    </div>
                    <p className="text-vanilla-700">Estimated Annual Premium</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage:</span>
                      <span className="font-medium">{quoteData.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Family Members:</span>
                      <span className="font-medium">{quoteData.familyMembers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product Type:</span>
                      <span className="font-medium capitalize">{product} Insurance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-vanilla-200">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quoteData.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                        <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span className="text-blue-800 text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Card className="border-vanilla-200 mt-8">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-vanilla-50 rounded-lg">
                    <div className="text-2xl font-bold text-vanilla-600 mb-2">1</div>
                    <h3 className="font-semibold mb-2">Review & Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your application within 24 hours
                    </p>
                  </div>
                  <div className="text-center p-4 bg-vanilla-50 rounded-lg">
                    <div className="text-2xl font-bold text-vanilla-600 mb-2">2</div>
                    <h3 className="font-semibold mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll contact you for any additional documents needed
                    </p>
                  </div>
                  <div className="text-center p-4 bg-vanilla-50 rounded-lg">
                    <div className="text-2xl font-bold text-vanilla-600 mb-2">3</div>
                    <h3 className="font-semibold mb-2">Policy Issuance</h3>
                    <p className="text-sm text-muted-foreground">Your policy will be issued within 3-5 working days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button onClick={() => router.push("/compare")} className="flex-1 bg-vanilla-600 hover:bg-vanilla-700">
                Compare Other Plans
              </Button>
              <Button
                onClick={() => window.open("tel:8770877270", "_self")}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Expert: 8770877270
              </Button>
              <Button onClick={() => router.push("/dashboard")} variant="outline" className="flex-1 bg-transparent">
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <UniversalAIFormBuilder />
    </div>
  )
}
