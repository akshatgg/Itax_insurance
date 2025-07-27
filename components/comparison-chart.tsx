"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, X, Star, Users, Phone, Download, Share2, Filter } from "lucide-react"

interface InsurancePlan {
  id: string
  company: string
  planName: string
  premium: number
  originalPremium: number
  coverage: number
  rating: number
  claimRatio: string
  networkSize: number
  features: {
    [key: string]: boolean | string | number
  }
  addOns: string[]
  pros: string[]
  cons: string[]
  bestFor: string[]
  popular?: boolean
}

interface ComparisonChartProps {
  plans: InsurancePlan[]
  productType: string
}

export function ComparisonChart({ plans, productType }: ComparisonChartProps) {
  const [selectedPlans, setSelectedPlans] = useState<string[]>(plans.slice(0, 3).map((p) => p.id))
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  // Get all unique features across plans
  const allFeatures = Array.from(new Set(plans.flatMap((plan) => Object.keys(plan.features))))

  const displayFeatures = showAllFeatures ? allFeatures : allFeatures.slice(0, 10)
  const selectedPlanData = plans.filter((plan) => selectedPlans.includes(plan.id))

  const handlePlanSelection = (planId: string, checked: boolean) => {
    if (checked && selectedPlans.length < 4) {
      setSelectedPlans([...selectedPlans, planId])
    } else if (!checked) {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId))
    }
  }

  const getFeatureValue = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
      return value ? <CheckCircle className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />
    }
    return <span className="text-sm font-medium">{value}</span>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleContactExpert = () => {
    window.open("tel:8770877270", "_self")
  }

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5 text-orange-600" />
            Select Plans to Compare
          </CardTitle>
          <CardDescription>
            Choose up to 4 plans for detailed comparison (Currently selected: {selectedPlans.length})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  selectedPlans.includes(plan.id)
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedPlans.includes(plan.id)}
                    onCheckedChange={(checked) => handlePlanSelection(plan.id, checked as boolean)}
                    disabled={!selectedPlans.includes(plan.id) && selectedPlans.length >= 4}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{plan.company}</h4>
                      {plan.popular && <Badge className="bg-orange-600 text-white text-xs">Popular</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{plan.planName}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-700">{formatCurrency(plan.premium)}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">{plan.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedPlanData.length > 0 && (
        <Card className="border-orange-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Plan Comparison</CardTitle>
                <CardDescription className="text-orange-100">
                  Detailed feature comparison for selected plans
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="bg-white text-orange-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="bg-white text-orange-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-200">
                    <th className="text-left p-4 font-semibold text-gray-900 bg-orange-50 sticky left-0 z-10">
                      Features
                    </th>
                    {selectedPlanData.map((plan) => (
                      <th key={plan.id} className="text-center p-4 min-w-[200px] bg-orange-50">
                        <div className="space-y-2">
                          <div className="font-bold text-gray-900">{plan.company}</div>
                          <div className="text-sm text-muted-foreground">{plan.planName}</div>
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
                    <td className="p-4 font-semibold text-gray-900 bg-orange-50 sticky left-0 z-10">Annual Premium</td>
                    {selectedPlanData.map((plan) => (
                      <td key={plan.id} className="p-4 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-orange-700">{formatCurrency(plan.premium)}</div>
                          {plan.originalPremium > plan.premium && (
                            <div className="text-sm text-muted-foreground line-through">
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
                    <td className="p-4 font-semibold text-gray-900 bg-orange-50 sticky left-0 z-10">Coverage Amount</td>
                    {selectedPlanData.map((plan) => (
                      <td key={plan.id} className="p-4 text-center">
                        <div className="text-lg font-bold text-orange-700">{formatCurrency(plan.coverage)}</div>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-100 bg-orange-25">
                    <td className="p-4 font-semibold text-gray-900 bg-orange-50 sticky left-0 z-10">
                      Claim Settlement Ratio
                    </td>
                    {selectedPlanData.map((plan) => (
                      <td key={plan.id} className="p-4 text-center">
                        <div className="text-lg font-bold text-green-600">{plan.claimRatio}</div>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-semibold text-gray-900 bg-orange-50 sticky left-0 z-10">Network Size</td>
                    {selectedPlanData.map((plan) => (
                      <td key={plan.id} className="p-4 text-center">
                        <div className="text-lg font-bold text-orange-700">
                          {plan.networkSize.toLocaleString()}+ Hospitals
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Features */}
                  {displayFeatures.map((feature, index) => (
                    <tr key={feature} className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-orange-25" : ""}`}>
                      <td className="p-4 font-medium text-gray-900 bg-orange-50 sticky left-0 z-10">
                        {feature.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </td>
                      {selectedPlanData.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          {getFeatureValue(plan.features[feature] || false)}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Action Row */}
                  <tr className="bg-orange-50">
                    <td className="p-4 font-semibold text-gray-900 sticky left-0 z-10">Actions</td>
                    {selectedPlanData.map((plan) => (
                      <td key={plan.id} className="p-4">
                        <div className="space-y-2">
                          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Buy Now</Button>
                          <Button
                            variant="outline"
                            className="w-full border-orange-600 text-orange-600 bg-transparent"
                            onClick={handleContactExpert}
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

            {!showAllFeatures && allFeatures.length > 10 && (
              <div className="p-4 text-center border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowAllFeatures(true)}
                  className="border-orange-600 text-orange-600"
                >
                  Show All Features ({allFeatures.length - 10} more)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Pros & Cons */}
      {selectedPlanData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {selectedPlanData.map((plan) => (
            <Card key={plan.id} className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {plan.company} - {plan.planName}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-700">{formatCurrency(plan.premium)}</span>
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
                    {plan.pros.map((pro, index) => (
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
                    {plan.cons.map((con, index) => (
                      <li key={index} className="text-sm text-red-700 flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Best For
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.bestFor.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Choose This Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Contact Expert Section */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">Need Expert Guidance?</CardTitle>
          <CardDescription className="text-center text-lg">
            Our insurance experts are available 24/7 to help you choose the right plan
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <div className="text-lg font-semibold text-gray-800">Contact Information</div>
            <div className="text-orange-600 font-medium">Phone: 8770877270</div>
            <div className="text-gray-600">G41, Gandhi Nagar, Padav, Gwalior</div>
          </div>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleContactExpert}>
            <Phone className="h-4 w-4 mr-2" />
            Call Expert Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
