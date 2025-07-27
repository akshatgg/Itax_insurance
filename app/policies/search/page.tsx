"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { insuranceDB } from "@/lib/indexeddb"
import {
  Search,
  Shield,
  Calendar,
  CreditCard,
  Phone,
  Download,
  Eye,
  FileText,
  Car,
  Heart,
  Home,
  Plane,
  Building2,
} from "lucide-react"

interface PolicyData {
  id: string
  policyNumber: string
  customerName: string
  customerPAN: string
  customerPhone: string
  customerEmail: string
  policyType: "motor" | "health" | "home" | "travel" | "business"
  planName: string
  premium: number
  sumInsured: number
  startDate: string
  endDate: string
  status: "active" | "expired" | "cancelled" | "lapsed"
  statusHindi: string
  paymentMode: string
  agent: {
    name: string
    phone: string
    email: string
  }
  nominees: {
    name: string
    relationship: string
    percentage: number
  }[]
  claims: {
    claimId: string
    amount: number
    status: string
    date: string
  }[]
}

// Mock policy data
const mockPolicies: PolicyData[] = [
  {
    id: "1",
    policyNumber: "POL789456",
    customerName: "Rajesh Kumar",
    customerPAN: "ABCDE1234F",
    customerPhone: "+91 98765 43210",
    customerEmail: "rajesh.kumar@email.com",
    policyType: "health",
    planName: "Family Health Comprehensive",
    premium: 15999,
    sumInsured: 1000000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    statusHindi: "सक्रिय",
    paymentMode: "Annual",
    agent: {
      name: "Amit Sharma",
      phone: "+91 98765 12345",
      email: "amit.sharma@amarinsurance.com",
    },
    nominees: [
      { name: "Sunita Kumar", relationship: "Spouse", percentage: 50 },
      { name: "Arjun Kumar", relationship: "Son", percentage: 50 },
    ],
    claims: [
      { claimId: "CLM001234", amount: 45000, status: "Settled", date: "2024-01-20" },
      { claimId: "CLM001235", amount: 12500, status: "Under Review", date: "2024-01-22" },
    ],
  },
  {
    id: "2",
    policyNumber: "POL789457",
    customerName: "Priya Sharma",
    customerPAN: "FGHIJ5678K",
    customerPhone: "+91 98765 43211",
    customerEmail: "priya.sharma@email.com",
    policyType: "motor",
    planName: "Comprehensive Motor Insurance",
    premium: 8999,
    sumInsured: 500000,
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    status: "active",
    statusHindi: "सक्रिय",
    paymentMode: "Annual",
    agent: {
      name: "Neha Patel",
      phone: "+91 98765 12346",
      email: "neha.patel@amarinsurance.com",
    },
    nominees: [{ name: "Vikram Sharma", relationship: "Husband", percentage: 100 }],
    claims: [],
  },
  {
    id: "3",
    policyNumber: "POL789458",
    customerName: "Amit Patel",
    customerPAN: "LMNOP9012Q",
    customerPhone: "+91 98765 43212",
    customerEmail: "amit.patel@email.com",
    policyType: "home",
    planName: "Home Comprehensive Protection",
    premium: 5999,
    sumInsured: 2500000,
    startDate: "2023-12-01",
    endDate: "2024-11-30",
    status: "active",
    statusHindi: "सक्रिय",
    paymentMode: "Annual",
    agent: {
      name: "Ravi Kumar",
      phone: "+91 98765 12347",
      email: "ravi.kumar@amarinsurance.com",
    },
    nominees: [{ name: "Kavita Patel", relationship: "Wife", percentage: 100 }],
    claims: [{ claimId: "CLM001236", amount: 8750, status: "Submitted", date: "2024-01-25" }],
  },
]

const policyTypeIcons = {
  motor: Car,
  health: Heart,
  home: Home,
  travel: Plane,
  business: Building2,
}

export default function PolicySearchPage() {
  const searchParams = useSearchParams()
  const initialPAN = searchParams.get("pan") || ""
  const initialPolicy = searchParams.get("policy") || ""

  const [searchQuery, setSearchQuery] = useState(initialPAN || initialPolicy || "")
  const [searchType, setSearchType] = useState<"policy" | "pan">(initialPAN ? "pan" : "policy")
  const [searchResults, setSearchResults] = useState<PolicyData[]>([])
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (initialPAN || initialPolicy) {
      handleSearch()
    }
  }, [initialPAN, initialPolicy])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const query = searchQuery.trim().toUpperCase()
      let results: PolicyData[] = []

      if (searchType === "policy" || query.startsWith("POL")) {
        results = mockPolicies.filter((policy) => policy.policyNumber.toUpperCase().includes(query))
      } else if (searchType === "pan" || query.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
        results = mockPolicies.filter((policy) => policy.customerPAN.toUpperCase() === query)
      } else {
        // General search
        results = mockPolicies.filter(
          (policy) =>
            policy.policyNumber.toUpperCase().includes(query) ||
            policy.customerName.toUpperCase().includes(query) ||
            policy.customerPAN.toUpperCase().includes(query),
        )
      }

      setSearchResults(results)

      // Save search to IndexedDB
      try {
        await insuranceDB.saveData("policies", {
          id: Date.now().toString(),
          type: "policy",
          data: { searchQuery: query, results: results.length },
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      } catch (error) {
        console.error("Error saving to IndexedDB:", error)
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      case "lapsed":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-vanilla-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-vanilla-900 mb-4">Search Policies</h1>
            <p className="text-lg text-vanilla-800 mb-8">
              Find your insurance policy details by entering Policy Number or PAN
            </p>

            {/* Search Form */}
            <Card className="border-vanilla-200 shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search" className="text-sm font-medium text-vanilla-900">
                        Search Query
                      </Label>
                      <div className="relative mt-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="search"
                          placeholder="Enter Policy Number or PAN..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-12 text-lg"
                          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        />
                      </div>
                    </div>
                    <div className="sm:w-40">
                      <Label className="text-sm font-medium text-vanilla-900">Search Type</Label>
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value as "policy" | "pan")}
                        className="mt-1 w-full h-12 px-3 border border-gray-300 rounded-md focus:border-vanilla-500 focus:outline-none"
                      >
                        <option value="policy">Policy No</option>
                        <option value="pan">PAN</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={handleSearch}
                    disabled={isLoading || !searchQuery.trim()}
                    className="w-full bg-vanilla-600 hover:bg-vanilla-700 text-white h-12 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Search Policies
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12 px-4">
        <div className="container">
          {hasSearched && (
            <div className="max-w-6xl mx-auto">
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-vanilla-900 mb-2">
                      Found {searchResults.length} polic{searchResults.length !== 1 ? "ies" : "y"}
                    </h2>
                    <p className="text-muted-foreground">Click on any policy to view detailed information</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {searchResults.map((policy) => {
                      const PolicyIcon = policyTypeIcons[policy.policyType]
                      return (
                        <Card
                          key={policy.id}
                          className="border-vanilla-200 hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => setSelectedPolicy(policy)}
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-vanilla-100 rounded-full flex items-center justify-center">
                                  <PolicyIcon className="h-5 w-5 text-vanilla-600" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg text-vanilla-900">{policy.policyNumber}</CardTitle>
                                  <CardDescription>
                                    {policy.customerName} | {policy.planName}
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge className={getStatusColor(policy.status)}>{policy.statusHindi}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Premium</Label>
                                <p className="text-lg font-semibold text-vanilla-700">
                                  {formatCurrency(policy.premium)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Sum Insured</Label>
                                <p className="text-lg font-semibold text-vanilla-700">
                                  {formatCurrency(policy.sumInsured)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Valid Till</Label>
                                <p className="text-sm text-vanilla-800 flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {policy.endDate}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Claims</Label>
                                <p className="text-sm text-vanilla-800">
                                  {policy.claims.length} claim{policy.claims.length !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className="w-full mt-4 border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 bg-transparent"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Policy Details
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <Card className="max-w-2xl mx-auto text-center">
                  <CardContent className="p-12">
                    <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-xl font-semibold text-vanilla-900 mb-2">No Policies Found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any policies matching your search criteria. Please check your input and try
                      again.
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Policy Number format: POL789456</p>
                      <p>• PAN format: ABCDE1234F</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-vanilla-gradient">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-vanilla-900">
                    Policy Details - {selectedPolicy.policyNumber}
                  </CardTitle>
                  <CardDescription className="text-vanilla-800 text-lg">
                    Complete information about your insurance policy
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedPolicy(null)}
                  className="text-vanilla-700 hover:text-vanilla-900"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="coverage">Coverage</TabsTrigger>
                  <TabsTrigger value="claims">Claims</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    {/* Status Banner */}
                    <div
                      className={`p-4 rounded-lg border-l-4 ${
                        selectedPolicy.status === "active"
                          ? "bg-green-50 border-green-500"
                          : selectedPolicy.status === "expired"
                            ? "bg-red-50 border-red-500"
                            : selectedPolicy.status === "lapsed"
                              ? "bg-yellow-50 border-yellow-500"
                              : "bg-gray-50 border-gray-500"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5" />
                        <div>
                          <h3 className="font-semibold">Policy Status: {selectedPolicy.statusHindi}</h3>
                          <p className="text-sm text-muted-foreground">
                            Valid from {selectedPolicy.startDate} to {selectedPolicy.endDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Policy Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Policy Holder</Label>
                          <p className="text-lg font-semibold text-vanilla-900">{selectedPolicy.customerName}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">PAN Number</Label>
                          <p className="text-lg font-semibold text-vanilla-900">{selectedPolicy.customerPAN}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Contact</Label>
                          <p className="text-vanilla-800">{selectedPolicy.customerPhone}</p>
                          <p className="text-vanilla-800">{selectedPolicy.customerEmail}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Plan Name</Label>
                          <p className="text-lg font-semibold text-vanilla-900">{selectedPolicy.planName}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Annual Premium</Label>
                          <p className="text-2xl font-bold text-vanilla-700">
                            {formatCurrency(selectedPolicy.premium)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Sum Insured</Label>
                          <p className="text-2xl font-bold text-vanilla-700">
                            {formatCurrency(selectedPolicy.sumInsured)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Payment Mode</Label>
                          <p className="text-lg font-semibold text-vanilla-900">{selectedPolicy.paymentMode}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Agent Details</Label>
                          <p className="text-vanilla-800">{selectedPolicy.agent.name}</p>
                          <p className="text-vanilla-800">{selectedPolicy.agent.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Nominees */}
                    <div>
                      <h3 className="text-lg font-semibold text-vanilla-900 mb-4">Nominees</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedPolicy.nominees.map((nominee, index) => (
                          <Card key={index} className="border-vanilla-200">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-vanilla-900">{nominee.name}</p>
                                  <p className="text-sm text-muted-foreground">{nominee.relationship}</p>
                                </div>
                                <Badge variant="outline">{nominee.percentage}%</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="coverage">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-vanilla-900">Coverage Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-vanilla-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Basic Coverage</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Sum Insured</span>
                              <span className="font-semibold">{formatCurrency(selectedPolicy.sumInsured)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Policy Type</span>
                              <span className="font-semibold capitalize">{selectedPolicy.policyType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Premium</span>
                              <span className="font-semibold">{formatCurrency(selectedPolicy.premium)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-vanilla-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Policy Period</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Start Date</span>
                              <span className="font-semibold">{selectedPolicy.startDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>End Date</span>
                              <span className="font-semibold">{selectedPolicy.endDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Status</span>
                              <Badge className={getStatusColor(selectedPolicy.status)}>
                                {selectedPolicy.statusHindi}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="claims">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-vanilla-900">Claim History</h3>
                    {selectedPolicy.claims.length > 0 ? (
                      <div className="space-y-4">
                        {selectedPolicy.claims.map((claim, index) => (
                          <Card key={index} className="border-vanilla-200">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-vanilla-900">{claim.claimId}</p>
                                  <p className="text-sm text-muted-foreground">Filed on {claim.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-vanilla-700">{formatCurrency(claim.amount)}</p>
                                  <Badge variant="outline">{claim.status}</Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="border-vanilla-200">
                        <CardContent className="p-8 text-center">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                          <p className="text-muted-foreground">No claims filed for this policy</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="documents">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-vanilla-900">Policy Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Policy Certificate",
                        "Terms & Conditions",
                        "Premium Receipt",
                        "Proposal Form",
                        "Medical Reports",
                        "KYC Documents",
                      ].map((doc, index) => (
                        <Card key={index} className="border-vanilla-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-vanilla-600" />
                                <span className="font-medium text-vanilla-900">{doc}</span>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
                <Button className="bg-vanilla-600 hover:bg-vanilla-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Agent
                </Button>
                <Button
                  variant="outline"
                  className="border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Policy
                </Button>
                <Button
                  variant="outline"
                  className="border-vanilla-600 text-vanilla-600 hover:bg-vanilla-50 bg-transparent"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}
