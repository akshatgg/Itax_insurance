"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Shield,
  Heart,
  Car,
  Home,
  Plane,
  Clock,
  FileText,
  CreditCard,
  Phone,
  Mail,
  IndianRupee,
  Download,
  Eye,
  Plus,
  Settings,
  LogOut,
  Bell,
  User,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { generatePDF } from "@/lib/pdf-generator"
import { VehicleLookup } from "@/components/vehicle-lookup"

interface Policy {
  id: string
  type: "health" | "motor" | "home" | "travel"
  company: string
  policyNumber: string
  premium: number
  coverageAmount: number
  status: "active" | "expired" | "pending"
  startDate: string
  endDate: string
  nextPremiumDue?: string
}

interface Claim {
  id: string
  policyId: string
  type: string
  amount: number
  status: "pending" | "approved" | "rejected" | "processing"
  submittedDate: string
  description: string
  documents?: string[]
}

interface Payment {
  id: string
  policyId: string
  amount: number
  date: string
  method: string
  status: "completed" | "pending" | "failed"
  receiptNumber: string
}

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: "POL001",
      type: "health",
      company: "Star Health Insurance",
      policyNumber: "SH2024001234",
      premium: 12500,
      coverageAmount: 500000,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      nextPremiumDue: "2024-12-01",
    },
    {
      id: "POL002",
      type: "motor",
      company: "ICICI Lombard",
      policyNumber: "IL2024005678",
      premium: 8500,
      coverageAmount: 800000,
      status: "active",
      startDate: "2024-02-15",
      endDate: "2025-02-14",
      nextPremiumDue: "2025-01-15",
    },
    {
      id: "POL003",
      type: "home",
      company: "HDFC ERGO",
      policyNumber: "HE2024009876",
      premium: 6500,
      coverageAmount: 1000000,
      status: "pending",
      startDate: "2024-08-01",
      endDate: "2025-07-31",
    },
  ])

  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "CLM001",
      policyId: "POL001",
      type: "Medical Treatment",
      amount: 25000,
      status: "pending",
      submittedDate: "2024-07-15",
      description: "Hospitalization for fever treatment",
      documents: ["medical_bill.pdf", "discharge_summary.pdf"],
    },
    {
      id: "CLM002",
      policyId: "POL002",
      type: "Accident Damage",
      amount: 45000,
      status: "approved",
      submittedDate: "2024-07-10",
      description: "Front bumper damage due to accident",
      documents: ["accident_report.pdf", "repair_estimate.pdf"],
    },
  ])

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY001",
      policyId: "POL001",
      amount: 12500,
      date: "2024-01-01",
      method: "Credit Card",
      status: "completed",
      receiptNumber: "RCP001234",
    },
    {
      id: "PAY002",
      policyId: "POL002",
      amount: 8500,
      date: "2024-02-15",
      method: "Net Banking",
      status: "completed",
      receiptNumber: "RCP005678",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "health":
        return <Heart className="h-5 w-5 text-red-500" />
      case "motor":
        return <Car className="h-5 w-5 text-blue-500" />
      case "home":
        return <Home className="h-5 w-5 text-green-500" />
      case "travel":
        return <Plane className="h-5 w-5 text-purple-500" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const handleExportPDF = async (type: "policies" | "claims" | "payments") => {
    let data: any[] = []
    let title = ""

    switch (type) {
      case "policies":
        data = policies
        title = "My Policies Report"
        break
      case "claims":
        data = claims
        title = "My Claims Report"
        break
      case "payments":
        data = payments
        title = "My Payments Report"
        break
    }

    await generatePDF(data, title, "Amar IMF Services Pvt Ltd - Customer Report")
  }

  const totalCoverage = policies.reduce((sum, policy) => sum + policy.coverageAmount, 0)
  const activePolicies = policies.filter((p) => p.status === "active").length
  const pendingClaims = claims.filter((c) => c.status === "pending").length
  const totalPremium = policies.reduce((sum, policy) => sum + policy.premium, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
                <p className="text-gray-600">Amar IMF Services Pvt Ltd</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <div className="text-right">
                <p className="font-medium">{user?.name || "Customer"}</p>
                <p className="text-sm text-gray-600">{user?.email || "customer@example.com"}</p>
              </div>
              <Avatar>
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Policies</p>
                  <p className="text-3xl font-bold text-gray-900">{activePolicies}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Coverage</p>
                  <p className="text-3xl font-bold text-gray-900">₹{(totalCoverage / 100000).toFixed(1)}L</p>
                </div>
                <IndianRupee className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Claims</p>
                  <p className="text-3xl font-bold text-gray-900">{pendingClaims}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Annual Premium</p>
                  <p className="text-3xl font-bold text-gray-900">₹{totalPremium.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle Lookup</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Claim approved for ₹45,000</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Premium payment received</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">New policy activated</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Document uploaded successfully</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Renewals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {policies
                      .filter((p) => p.nextPremiumDue)
                      .map((policy) => (
                        <div key={policy.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(policy.type)}
                            <div>
                              <p className="font-medium">{policy.company}</p>
                              <p className="text-sm text-gray-600">{policy.policyNumber}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{policy.premium.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              Due: {policy.nextPremiumDue && new Date(policy.nextPremiumDue).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Policies</h2>
              <div className="flex space-x-2">
                <Button onClick={() => handleExportPDF("policies")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Policy
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {policies.map((policy) => (
                <Card key={policy.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">{getTypeIcon(policy.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{policy.company}</h3>
                            <Badge className={getStatusColor(policy.status)}>
                              {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">Policy: {policy.policyNumber}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Type</p>
                              <p className="font-medium capitalize">{policy.type}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Premium</p>
                              <p className="font-medium">₹{policy.premium.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Coverage</p>
                              <p className="font-medium">₹{policy.coverageAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Valid Until</p>
                              <p className="font-medium">{new Date(policy.endDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Claims</h2>
              <div className="flex space-x-2">
                <Button onClick={() => handleExportPDF("claims")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Claim
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {claims.map((claim) => (
                <Card key={claim.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">Claim #{claim.id}</h3>
                          <Badge className={getStatusColor(claim.status)}>
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{claim.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-500">Type</p>
                            <p className="font-medium">{claim.type}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-medium">₹{claim.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Submitted</p>
                            <p className="font-medium">{new Date(claim.submittedDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Policy</p>
                            <p className="font-medium">{claim.policyId}</p>
                          </div>
                        </div>
                        {claim.documents && claim.documents.length > 0 && (
                          <div>
                            <p className="text-gray-500 text-sm mb-2">Documents</p>
                            <div className="flex flex-wrap gap-2">
                              {claim.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Payment History</h2>
              <Button onClick={() => handleExportPDF("payments")}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Receipt
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Policy
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{payment.receiptNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.policyId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ₹{payment.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.method}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Receipt
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicle Lookup Tab */}
          <TabsContent value="vehicle" className="space-y-6">
            <VehicleLookup />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{user?.name || "Customer Name"}</h3>
                      <p className="text-gray-600">{user?.email || "customer@example.com"}</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone Number</label>
                      <p className="text-lg">+91 9876543210</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                      <p className="text-lg">15/01/1990</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">PAN Number</label>
                      <p className="text-lg">ABCDE1234F</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Aadhar Number</label>
                      <p className="text-lg">XXXX XXXX 1234</p>
                    </div>
                  </div>

                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Your registered address and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-lg">123, Sample Street, Sample City, State - 123456</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                    <p className="text-lg">+91 9876543211</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Preferred Communication</label>
                    <p className="text-lg">Email & SMS</p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Support Contact</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>8770877270</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>support@amarimf.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Home className="h-4 w-4 text-gray-400" />
                        <span>G41, Gandhi Nagar, Padav, Gwalior</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
