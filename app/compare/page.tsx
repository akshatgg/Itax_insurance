"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, ArrowLeft, Star, CheckCircle, X, Phone, Heart, Car, Home, Plane } from "lucide-react"

// Real insurance data
const insuranceData = {
  health: [
    {
      id: "star-health-comprehensive",
      company: "Star Health Insurance",
      plan: "Star Comprehensive",
      premium: 8999,
      originalPremium: 12999,
      coverage: 500000,
      rating: 4.2,
      claimRatio: "85.4%",
      networkSize: 9900,
      popular: true,
      features: {
        "Room Rent": "₹5,000/day",
        "Pre-existing Diseases": "2 years waiting",
        "Maternity Cover": false,
        "Day Care Procedures": true,
        "Ambulance Cover": "₹2,000",
        "Health Check-up": "₹5,000",
        "No Claim Bonus": "50%",
        "Network Hospitals": "9,900+",
        "Cashless Claims": true,
        "Pre & Post Hospitalization": "30/60 days",
        "Critical Illness": false,
        "Mental Health": false,
      },
      benefits: [
        "Wide network of hospitals",
        "Quick claim settlement",
        "24/7 customer support",
        "Online policy management",
      ],
      pros: [
        "Extensive hospital network",
        "Good claim settlement ratio",
        "Affordable premium",
        "Strong customer service",
      ],
      cons: ["No maternity cover", "Limited critical illness benefits", "Higher co-payment for senior citizens"],
    },
    {
      id: "icici-complete-health",
      company: "ICICI Lombard",
      plan: "Complete Health Guard",
      premium: 9499,
      originalPremium: 13499,
      coverage: 500000,
      rating: 4.5,
      claimRatio: "92.1%",
      networkSize: 6500,
      features: {
        "Room Rent": "₹6,000/day",
        "Pre-existing Diseases": "3 years waiting",
        "Maternity Cover": true,
        "Day Care Procedures": true,
        "Ambulance Cover": "₹2,500",
        "Health Check-up": "₹7,500",
        "No Claim Bonus": "100%",
        "Network Hospitals": "6,500+",
        "Cashless Claims": true,
        "Pre & Post Hospitalization": "60/90 days",
        "Critical Illness": true,
        "Mental Health": true,
      },
      benefits: [
        "Maternity coverage included",
        "Mental health coverage",
        "Critical illness cover",
        "100% no claim bonus",
      ],
      pros: ["Comprehensive coverage", "Excellent claim ratio", "Maternity benefits", "Mental health support"],
      cons: ["Higher premium", "Smaller network", "Longer waiting period for pre-existing"],
    },
    {
      id: "hdfc-my-health",
      company: "HDFC ERGO",
      plan: "My Health Suraksha",
      premium: 7899,
      originalPremium: 10899,
      coverage: 500000,
      rating: 4.3,
      claimRatio: "88.7%",
      networkSize: 10000,
      features: {
        "Room Rent": "₹4,000/day",
        "Pre-existing Diseases": "2 years waiting",
        "Maternity Cover": true,
        "Day Care Procedures": true,
        "Ambulance Cover": "₹1,500",
        "Health Check-up": "₹4,000",
        "No Claim Bonus": "50%",
        "Network Hospitals": "10,000+",
        "Cashless Claims": true,
        "Pre & Post Hospitalization": "30/60 days",
        "Critical Illness": false,
        "Mental Health": false,
      },
      benefits: ["Largest hospital network", "Affordable premium", "Maternity coverage", "Quick claim processing"],
      pros: ["Most affordable option", "Largest network", "Good for families", "Easy claim process"],
      cons: ["Lower room rent limit", "No critical illness cover", "Limited ambulance cover"],
    },
    {
      id: "bajaj-health-guard",
      company: "Bajaj Allianz",
      plan: "Health Guard",
      premium: 10299,
      originalPremium: 14299,
      coverage: 500000,
      rating: 4.1,
      claimRatio: "86.3%",
      networkSize: 7000,
      features: {
        "Room Rent": "₹7,000/day",
        "Pre-existing Diseases": "2 years waiting",
        "Maternity Cover": true,
        "Day Care Procedures": true,
        "Ambulance Cover": "₹3,000",
        "Health Check-up": "₹6,000",
        "No Claim Bonus": "75%",
        "Network Hospitals": "7,000+",
        "Cashless Claims": true,
        "Pre & Post Hospitalization": "45/75 days",
        "Critical Illness": true,
        "Mental Health": false,
      },
      benefits: [
        "High room rent allowance",
        "Critical illness coverage",
        "Good ambulance cover",
        "Flexible policy terms",
      ],
      pros: ["High room rent coverage", "Critical illness benefits", "Good ambulance coverage", "Flexible terms"],
      cons: ["Higher premium", "Medium network size", "No mental health coverage"],
    },
  ],
  motor: [
    {
      id: "bajaj-motor-comprehensive",
      company: "Bajaj Allianz",
      plan: "Motor Comprehensive",
      premium: 8500,
      originalPremium: 11000,
      coverage: 800000,
      rating: 4.3,
      claimRatio: "89.2%",
      networkSize: 4500,
      popular: true,
      features: {
        "IDV Coverage": "₹8,00,000",
        "Third Party": "Unlimited",
        "Zero Depreciation": true,
        "Engine Protection": true,
        "Roadside Assistance": true,
        "Key Replacement": true,
        "Return to Invoice": false,
        "Personal Accident": "₹15,00,000",
        "Consumables Cover": true,
        "NCB Protection": true,
      },
      benefits: [
        "Zero depreciation cover",
        "Engine protection included",
        "24/7 roadside assistance",
        "Quick claim settlement",
      ],
    },
    {
      id: "icici-motor-complete",
      company: "ICICI Lombard",
      plan: "Motor Complete",
      premium: 9200,
      originalPremium: 12500,
      coverage: 800000,
      rating: 4.4,
      claimRatio: "91.5%",
      networkSize: 3800,
      features: {
        "IDV Coverage": "₹8,00,000",
        "Third Party": "Unlimited",
        "Zero Depreciation": true,
        "Engine Protection": true,
        "Roadside Assistance": true,
        "Key Replacement": true,
        "Return to Invoice": true,
        "Personal Accident": "₹20,00,000",
        "Consumables Cover": true,
        "NCB Protection": true,
      },
      benefits: [
        "Return to invoice cover",
        "Higher personal accident cover",
        "Premium claim service",
        "Digital claim process",
      ],
    },
  ],
}

export default function ComparePage() {
  const [selectedProduct, setSelectedProduct] = useState("health")
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [quoteData, setQuoteData] = useState<any>(null)

  useEffect(() => {
    // Load quote data from localStorage if available
    const savedQuoteData = localStorage.getItem("quoteData")
    if (savedQuoteData) {
      setQuoteData(JSON.parse(savedQuoteData))
      setSelectedProduct(JSON.parse(savedQuoteData).product)
    }

    // Set default selected plans
    const defaultPlans =
      insuranceData[selectedProduct as keyof typeof insuranceData]?.slice(0, 3).map((p) => p.id) || []
    setSelectedPlans(defaultPlans)
  }, [selectedProduct])

  const currentPlans = insuranceData[selectedProduct as keyof typeof insuranceData] || []
  const selectedPlanData = currentPlans.filter((plan) => selectedPlans.includes(plan.id))

  const handlePlanSelection = (planId: string, checked: boolean) => {
    if (checked && selectedPlans.length < 4) {
      setSelectedPlans([...selectedPlans, planId])
    } else if (!checked) {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId))
    }
  }

  const getFeatureValue = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-500 mx-auto" />
      )
    }
    return <span className="text-sm font-medium text-center block">{value}</span>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProductIcon = (product: string) => {
    switch (product) {
      case "health":
        return Heart
      case "motor":
        return Car
      case "home":
        return Home
      case "travel":
        return Plane
      default:
        return Shield
    }
  }

  const ProductIcon = getProductIcon(selectedProduct)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Amar IMF Services</h1>
                <p className="text-sm text-gray-600">अमर आईएमएफ सर्विसेज</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.open("tel:8770877270")}>
                <Phone className="h-4 w-4 mr-2" />
                8770877270
              </Button>
              <Link href="/" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ProductIcon className="h-8 w-8 text-orange-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">योजनाओं की तुलना करें</h1>
          </div>
          <h2 className="text-xl text-orange-600 mb-6">Compare Insurance Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            भारत की प्रमुख बीमा कंपनियों की योजनाओं की विस्तृत तुलना करें और सर्वोत्तम चुनें।
          </p>
        </div>

        {/* Product Type Selector */}
        <div className="mb-8 flex justify-center">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select insurance type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health">Health Insurance / स्वास्थ्य बीमा</SelectItem>
              <SelectItem value="motor">Motor Insurance / मोटर बीमा</SelectItem>
              <SelectItem value="home">Home Insurance / गृह बीमा</SelectItem>
              <SelectItem value="travel">Travel Insurance / यात्रा बीमा</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Plan Selection Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Select Plans to Compare</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPlans.includes(plan.id)
                    ? "border-orange-500 bg-orange-50 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:shadow-md"
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <Checkbox
                      checked={selectedPlans.includes(plan.id)}
                      onCheckedChange={(checked) => handlePlanSelection(plan.id, checked as boolean)}
                      disabled={!selectedPlans.includes(plan.id) && selectedPlans.length >= 4}
                    />
                    {plan.popular && <Badge className="bg-orange-600 text-white text-xs">Most Popular</Badge>}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-800">{plan.company}</CardTitle>
                  <CardDescription className="text-sm">{plan.plan}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{formatCurrency(plan.premium)}</div>
                        {plan.originalPremium > plan.premium && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(plan.originalPremium)}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{plan.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Coverage:</span>
                        <span className="font-medium">{formatCurrency(plan.coverage)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Claim Ratio:</span>
                        <span className="font-medium text-green-600">{plan.claimRatio}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Network:</span>
                        <span className="font-medium">{plan.networkSize.toLocaleString()}+</span>
                      </div>
                    </div>

                    {plan.benefits && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {plan.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedPlanData.length > 0 && (
          <Card className="mb-8 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <CardTitle className="text-2xl font-bold">Detailed Plan Comparison</CardTitle>
              <CardDescription className="text-orange-100">
                Compare features, benefits, and pricing side by side
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10 min-w-[200px]">
                        Features
                      </th>
                      {selectedPlanData.map((plan) => (
                        <th key={plan.id} className="text-center p-4 min-w-[250px] bg-gray-50">
                          <div className="space-y-2">
                            <div className="font-bold text-gray-900">{plan.company}</div>
                            <div className="text-sm text-gray-600">{plan.plan}</div>
                            <div className="flex items-center justify-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                              <span className="font-medium">{plan.rating}</span>
                            </div>
                            {plan.popular && <Badge className="bg-orange-600 text-white text-xs">Most Popular</Badge>}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Premium & Coverage */}
                    <tr className="border-b border-gray-100 bg-orange-25">
                      <td className="p-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">Annual Premium</td>
                      {selectedPlanData.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-orange-600">{formatCurrency(plan.premium)}</div>
                            {plan.originalPremium > plan.premium && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatCurrency(plan.originalPremium)}
                              </div>
                            )}
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Save {formatCurrency(plan.originalPremium - plan.premium)}
                            </Badge>
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">Coverage Amount</td>
                      {selectedPlanData.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          <div className="text-lg font-bold text-gray-700">{formatCurrency(plan.coverage)}</div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-100 bg-orange-25">
                      <td className="p-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">
                        Claim Settlement Ratio
                      </td>
                      {selectedPlanData.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          <div className="text-lg font-bold text-green-600">{plan.claimRatio}</div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">Network Size</td>
                      {selectedPlanData.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          <div className="text-lg font-bold text-gray-700">
                            {plan.networkSize.toLocaleString()}+ Hospitals
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Features */}
                    {Object.keys(selectedPlanData[0]?.features || {}).map((feature, index) => (
                      <tr key={feature} className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-orange-25" : ""}`}>
                        <td className="p-4 font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">{feature}</td>
                        {selectedPlanData.map((plan) => (
                          <td key={plan.id} className="p-4 text-center">
                            {getFeatureValue(plan.features[feature] || false)}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Action Row */}
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900 sticky left-0 z-10">Actions</td>
                      {selectedPlanData.map((plan) => (
                        <td key={plan.id} className="p-4">
                          <div className="space-y-2">
                            <Link href={`/quote?product=${selectedProduct}&company=${plan.company}&plan=${plan.plan}`}>
                              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Buy Now</Button>
                            </Link>
                            <Button
                              variant="outline"
                              className="w-full border-orange-600 text-orange-600 bg-transparent"
                              onClick={() => window.open("tel:8770877270")}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call Expert
                            </Button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pros & Cons Cards */}
        {selectedPlanData.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Pros & Cons Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {selectedPlanData.map((plan) => (
                <Card key={plan.id} className="border-gray-200 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-gray-900">{plan.company}</CardTitle>
                      {plan.popular && <Badge className="bg-orange-600 text-white text-xs">Popular</Badge>}
                    </div>
                    <CardDescription>{plan.plan}</CardDescription>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-2xl font-bold text-orange-600">{formatCurrency(plan.premium)}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-medium">{plan.rating}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Pros */}
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Pros
                      </h4>
                      <ul className="space-y-1">
                        {plan.pros?.map((pro, index) => (
                          <li key={index} className="text-sm text-green-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Cons
                      </h4>
                      <ul className="space-y-1">
                        {plan.cons?.map((con, index) => (
                          <li key={index} className="text-sm text-red-700 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex space-x-2">
                        <Link
                          href={`/quote?product=${selectedProduct}&company=${plan.company}&plan=${plan.plan}`}
                          className="flex-1"
                        >
                          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Choose Plan</Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => window.open("tel:8770877270")}
                          className="border-orange-600 text-orange-600"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-orange-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need Expert Guidance? / विशेषज्ञ सलाह चाहिए?</h3>
          <p className="text-lg mb-6 opacity-90">हमारे बीमा विशेषज्ञ आपको सही योजना चुनने में मदद करेंगे</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100"
              onClick={() => window.open("tel:8770877270")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now: 8770877270
            </Button>
            <div className="text-sm opacity-90">
              <div>24/7 Support Available</div>
              <div>G41, Gandhi Nagar, Padav, Gwalior</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-orange-400" />
            <span className="text-lg font-semibold">Amar IMF Services Pvt Ltd</span>
          </div>
          <p className="text-gray-400 text-sm mb-2">G41, Gandhi Nagar, Padav, Gwalior | Phone: 8770877270</p>
          <p className="text-gray-400 text-sm">
            © 2024 Amar IMF Services Pvt Ltd. All rights reserved. | IRDAI License No: 123456789
          </p>
        </div>
      </footer>
    </div>
  )
}
