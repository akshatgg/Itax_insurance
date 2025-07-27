"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { insuranceDB } from "@/lib/indexeddb"

interface SearchResult {
  id: string
  claimId: string
  policyNumber: string
  claimType: string
  status: string
  amount: number
  dateSubmitted: string
  lastUpdated: string
  description: string
  documents: string[]
}

export default function ClaimSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<"claim" | "policy" | "pan">("claim")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState<SearchResult | null>(null)

  // Sample data for demonstration
  const sampleClaims: SearchResult[] = [
    {
      id: "1",
      claimId: "CLM001234",
      policyNumber: "POL789456",
      claimType: "Health",
      status: "Under Review",
      amount: 45000,
      dateSubmitted: "2024-01-15",
      lastUpdated: "2024-01-20",
      description: "Hospitalization for cardiac procedure",
      documents: ["Medical Reports", "Hospital Bills", "Discharge Summary"],
    },
    {
      id: "2",
      claimId: "CLM001235",
      policyNumber: "POL789457",
      claimType: "Motor",
      status: "Approved",
      amount: 25000,
      dateSubmitted: "2024-01-10",
      lastUpdated: "2024-01-18",
      description: "Vehicle damage due to accident",
      documents: ["Police Report", "Repair Estimates", "Photos"],
    },
    {
      id: "3",
      claimId: "CLM001236",
      policyNumber: "POL789458",
      claimType: "Home",
      status: "Rejected",
      amount: 15000,
      dateSubmitted: "2024-01-05",
      lastUpdated: "2024-01-12",
      description: "Water damage to property",
      documents: ["Property Assessment", "Photos", "Repair Quotes"],
    },
  ]

  useEffect(() => {
    // Initialize with sample data
    setSearchResults(sampleClaims)
  }, [])

  const detectSearchType = (query: string) => {
    if (query.match(/^CLM\d+$/i)) return "claim"
    if (query.match(/^POL\d+$/i)) return "policy"
    if (query.match(/^[A-Z]{5}\d{4}[A-Z]$/i)) return "pan"
    return "claim"
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    const detectedType = detectSearchType(searchQuery)
    setSearchType(detectedType)

    try {
      let results: any[] = []

      switch (detectedType) {
        case "claim":
          results = await insuranceDB.searchClaim(searchQuery)
          break
        case "policy":
          results = await insuranceDB.searchPolicy(searchQuery)
          break
        case "pan":
          results = await insuranceDB.searchByPAN(searchQuery)
          break
      }

      // If no results from DB, use sample data for demo
      if (results.length === 0) {
        results = sampleClaims.filter(
          (claim) =>
            claim.claimId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            claim.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
      // Fallback to sample data
      const filtered = sampleClaims.filter(
        (claim) =>
          claim.claimId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          claim.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "under review":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      case "under review":
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-vanilla-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-vanilla-900 mb-2">Search Claims & Policies</h1>
          <p className="text-vanilla-700">
            Search by Claim ID (CLM001234), Policy Number (POL789456), or PAN Number (ABCDE1234F)
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 border-vanilla-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5 text-vanilla-600" />
              Search
            </CardTitle>
            <CardDescription>
              Enter your Claim ID, Policy Number, or PAN to find your insurance information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Query</Label>
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter CLM001234, POL789456, or ABCDE1234F"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={isLoading} className="bg-vanilla-600 hover:bg-vanilla-700">
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Badge variant="outline">Claim ID: CLM001234</Badge>
              <Badge variant="outline">Policy: POL789456</Badge>
              <Badge variant="outline">PAN: ABCDE1234F</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-2">
            <Card className="border-vanilla-200">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>{searchResults.length} result(s) found</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedClaim?.id === result.id
                          ? "border-vanilla-600 bg-vanilla-50"
                          : "border-gray-200 hover:border-vanilla-300"
                      }`}
                      onClick={() => setSelectedClaim(result)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-vanilla-900">{result.claimId}</h3>
                            <Badge className={getStatusColor(result.status)}>
                              {getStatusIcon(result.status)}
                              <span className="ml-1">{result.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Policy: {result.policyNumber}</span>
                            <span>Type: {result.claimType}</span>
                            <span>Amount: ₹{result.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>Submitted: {result.dateSubmitted}</div>
                          <div>Updated: {result.lastUpdated}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {searchResults.length === 0 && !isLoading && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
                      <p>Try searching with a different Claim ID, Policy Number, or PAN</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Claim Details */}
          <div>
            {selectedClaim ? (
              <Card className="border-vanilla-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-vanilla-600" />
                    Claim Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Claim ID</Label>
                    <p className="text-lg font-semibold">{selectedClaim.claimId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <Badge className={`${getStatusColor(selectedClaim.status)} mt-1`}>
                      {getStatusIcon(selectedClaim.status)}
                      <span className="ml-1">{selectedClaim.status}</span>
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Claim Amount</Label>
                    <p className="text-2xl font-bold text-vanilla-600">₹{selectedClaim.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Policy Number</Label>
                    <p className="font-semibold">{selectedClaim.policyNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Claim Type</Label>
                    <p className="font-semibold">{selectedClaim.claimType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-sm">{selectedClaim.description}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Documents</Label>
                    <div className="space-y-1 mt-1">
                      {selectedClaim.documents.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <FileText className="h-3 w-3 text-vanilla-600" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full bg-vanilla-600 hover:bg-vanilla-700">View Full Details</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-vanilla-200">
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-vanilla-900 mb-2">Select a Claim</h3>
                  <p className="text-muted-foreground">Click on a search result to view detailed information</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
