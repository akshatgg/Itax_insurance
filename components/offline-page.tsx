"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  WifiOff,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Save,
} from "lucide-react"

interface OfflineData {
  policies: any[]
  claims: any[]
  lastSync: Date
}

export function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true)
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load offline data from localStorage
    const savedData = localStorage.getItem("amarimf-offline-data")
    if (savedData) {
      setOfflineData(JSON.parse(savedData))
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleSync = async () => {
    setSyncStatus("syncing")
    try {
      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update offline data
      const newData: OfflineData = {
        policies: [
          { id: "POL001", type: "Health", status: "Active", premium: 12500 },
          { id: "POL002", type: "Motor", status: "Active", premium: 8500 },
        ],
        claims: [
          { id: "CLM001", status: "Pending", amount: 25000 },
          { id: "CLM002", status: "Approved", amount: 45000 },
        ],
        lastSync: new Date(),
      }

      setOfflineData(newData)
      localStorage.setItem("amarimf-offline-data", JSON.stringify(newData))
      setSyncStatus("success")

      setTimeout(() => setSyncStatus("idle"), 3000)
    } catch (error) {
      setSyncStatus("error")
      setTimeout(() => setSyncStatus("idle"), 3000)
    }
  }

  const handleSaveOffline = () => {
    // Save current form data or state for offline use
    const currentData = {
      timestamp: new Date().toISOString(),
      formData: "Sample form data",
    }
    localStorage.setItem("amarimf-pending-data", JSON.stringify(currentData))
    alert("Data saved for offline use!")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Offline Mode</h1>
              <p className="text-gray-600">Access your insurance information without internet</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center space-x-1">
                {isOnline ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    <span>Offline</span>
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>

        {/* Connection Status Alert */}
        {!isOnline && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              You're currently offline. Some features may be limited, but you can still access your saved data and
              emergency contacts.
            </AlertDescription>
          </Alert>
        )}

        {/* Sync Status */}
        {isOnline && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className={`h-5 w-5 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
                <span>Data Synchronization</span>
              </CardTitle>
              <CardDescription>Keep your offline data up to date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {offlineData?.lastSync && (
                    <p className="text-sm text-gray-600">Last synced: {offlineData.lastSync.toLocaleString()}</p>
                  )}
                  {syncStatus === "success" && (
                    <p className="text-sm text-green-600 flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Successfully synced</span>
                    </p>
                  )}
                  {syncStatus === "error" && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Sync failed</span>
                    </p>
                  )}
                </div>
                <Button onClick={handleSync} disabled={syncStatus === "syncing"}>
                  {syncStatus === "syncing" ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Offline Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Offline Data</span>
              </CardTitle>
              <CardDescription>Your cached insurance information</CardDescription>
            </CardHeader>
            <CardContent>
              {offlineData ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Policies ({offlineData.policies.length})</h4>
                    <div className="space-y-2">
                      {offlineData.policies.map((policy) => (
                        <div key={policy.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{policy.id}</p>
                            <p className="text-sm text-gray-600">{policy.type} Insurance</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{policy.status}</Badge>
                            <p className="text-sm text-gray-600">₹{policy.premium.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Claims ({offlineData.claims.length})</h4>
                    <div className="space-y-2">
                      {offlineData.claims.map((claim) => (
                        <div key={claim.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{claim.id}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{claim.status}</Badge>
                            <p className="text-sm text-gray-600">₹{claim.amount.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <WifiOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No offline data available</p>
                  <p className="text-sm text-gray-500">Connect to internet and sync to cache your data</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Emergency Contacts</span>
              </CardTitle>
              <CardDescription>Always available contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">24/7 Emergency Helpline</h4>
                  <div className="flex items-center space-x-2 text-red-700">
                    <Phone className="h-4 w-4" />
                    <span className="font-mono text-lg">8770877270</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">For immediate assistance and claims</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@amarimf.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="text-sm text-gray-600">G41, Gandhi Nagar, Padav, Gwalior</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-gray-600">Mon-Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={handleSaveOffline} variant="outline" className="w-full bg-transparent">
                    <Save className="h-4 w-4 mr-2" />
                    Save Current Data Offline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offline Features */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Available Offline Features</CardTitle>
            <CardDescription>What you can do without internet connection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">View Cached Policies</p>
                  <p className="text-sm text-gray-600">Access your saved policy information</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Emergency Contacts</p>
                  <p className="text-sm text-gray-600">Always available contact information</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Save Form Data</p>
                  <p className="text-sm text-gray-600">Save forms to submit later</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Limited Claims</p>
                  <p className="text-sm text-gray-600">View cached claim status only</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">No New Quotes</p>
                  <p className="text-sm text-gray-600">Internet required for new quotes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">No Payments</p>
                  <p className="text-sm text-gray-600">Online connection needed for payments</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
