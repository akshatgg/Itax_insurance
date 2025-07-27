"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, Search, FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"

const mockClaims = [
  {
    id: "CLM001234",
    policyNumber: "POL789456",
    claimAmount: "₹45,000",
    status: "approved",
    statusHindi: "स्वीकृत",
    date: "2024-01-15",
    hospital: "Apollo Hospital, Mumbai",
    description: "Cardiac Surgery",
  },
  {
    id: "CLM001235",
    policyNumber: "POL789456",
    claimAmount: "₹12,500",
    status: "processing",
    statusHindi: "प्रक्रिया में",
    date: "2024-01-20",
    hospital: "Fortis Hospital, Delhi",
    description: "Diagnostic Tests",
  },
  {
    id: "CLM001236",
    policyNumber: "POL789456",
    claimAmount: "₹8,750",
    status: "pending",
    statusHindi: "लंबित",
    date: "2024-01-25",
    hospital: "Max Hospital, Bangalore",
    description: "Emergency Treatment",
  },
]

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [claims] = useState(mockClaims)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-orange-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredClaims = claims.filter(
    (claim) =>
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <Link href="/" className="flex items-center text-orange-600 hover:text-orange-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">क्लेम प्रबंधन</h1>
          <h2 className="text-xl text-orange-600 mb-6">Claims Management</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            अपने क्लेम की स्थिति देखें, नया क्लेम दाखिल करें और क्लेम इतिहास की जांच करें।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="/claims/new">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
              <Plus className="mr-2 h-5 w-5" />
              नया क्लेम दाखिल करें / File New Claim
            </Button>
          </Link>
          <Link href="/claims/track">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50 w-full sm:w-auto bg-transparent"
            >
              <Search className="mr-2 h-5 w-5" />
              क्लेम ट्रैक करें / Track Claim
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by Claim ID, Policy Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">आपके क्लेम / Your Claims</h3>

          {filteredClaims.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Claims Found</h3>
                <p className="text-gray-600 mb-4">कोई क्लेम नहीं मिला</p>
                <Link href="/claims/new">
                  <Button className="bg-orange-600 hover:bg-orange-700">File Your First Claim</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredClaims.map((claim) => (
              <Card key={claim.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-800">Claim ID: {claim.id}</CardTitle>
                      <CardDescription>
                        Policy: {claim.policyNumber} | Date: {claim.date}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(claim.status)}
                      <Badge className={getStatusColor(claim.status)}>{claim.statusHindi}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Claim Amount</Label>
                      <p className="text-lg font-semibold text-orange-600">{claim.claimAmount}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Hospital</Label>
                      <p className="text-sm text-gray-800">{claim.hospital}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Description</Label>
                      <p className="text-sm text-gray-800">{claim.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      View Details / विवरण देखें
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                    >
                      Download Documents / दस्तावेज़ डाउनलोड करें
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Claim Process Info */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">क्लेम प्रक्रिया / Claim Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "File Claim",
                subtitle: "क्लेम दाखिल करें",
                description: "Submit your claim with required documents",
              },
              {
                step: "2",
                title: "Verification",
                subtitle: "सत्यापन",
                description: "Our team verifies your claim details",
              },
              {
                step: "3",
                title: "Processing",
                subtitle: "प्रक्रिया",
                description: "Claim is processed and reviewed",
              },
              {
                step: "4",
                title: "Settlement",
                subtitle: "निपटान",
                description: "Amount is settled to your account",
              },
            ].map((step, index) => (
              <Card key={index} className="text-center border-orange-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg text-gray-800">{step.title}</CardTitle>
                  <CardDescription className="font-medium text-orange-600">{step.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-orange-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">क्लेम में सहायता चाहिए? / Need Help with Claims?</h3>
          <p className="text-lg mb-6 opacity-90">हमारी टीम आपकी सहायता के लिए तैयार है</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Call Support / सहायता कॉल करें
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Live Chat / लाइव चैट
            </Button>
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
          <p className="text-gray-400 text-sm">
            © 2024 Amar IMF Services Pvt Ltd. All rights reserved. | IRDAI License No: 123456789
          </p>
        </div>
      </footer>
    </div>
  )
}
