"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, Search, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { fetchVehicleDetails, validateVehicleNumber, type VehicleInfo } from "@/lib/vehicle-api"

interface VehicleLookupProps {
  onVehicleSelect?: (vehicleInfo: VehicleInfo) => void
}

export function VehicleLookup({ onVehicleSelect }: VehicleLookupProps) {
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!vehicleNumber.trim()) {
      setError("Please enter a vehicle number")
      return
    }

    if (!validateVehicleNumber(vehicleNumber)) {
      setError("Please enter a valid vehicle number (e.g., MH12AB1234)")
      return
    }

    setIsLoading(true)
    setError("")
    setVehicleInfo(null)

    try {
      const response = await fetchVehicleDetails(vehicleNumber)

      if (response.success && response.data) {
        setVehicleInfo(response.data)
        if (onVehicleSelect) {
          onVehicleSelect(response.data)
        }
      } else {
        setError(response.error || "Vehicle not found")
      }
    } catch (err) {
      setError("Failed to fetch vehicle details. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    // Auto-format vehicle number
    const formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    if (formatted.length <= 10) {
      setVehicleNumber(formatted)
      setError("")
    }
  }

  const formatVehicleNumber = (number: string) => {
    if (number.length >= 4) {
      return `${number.slice(0, 2)}-${number.slice(2, 4)}-${number.slice(4, 6)}-${number.slice(6)}`
    }
    return number
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="h-5 w-5 mr-2" />
            Vehicle Information Lookup
          </CardTitle>
          <CardDescription>
            Enter your vehicle registration number to fetch details from government database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber">Vehicle Registration Number</Label>
            <div className="flex space-x-2">
              <Input
                id="vehicleNumber"
                placeholder="e.g., MH12AB1234"
                value={formatVehicleNumber(vehicleNumber)}
                onChange={(e) => handleInputChange(e.target.value)}
                className="flex-1"
                maxLength={13}
              />
              <Button onClick={handleSearch} disabled={isLoading || !vehicleNumber.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {vehicleInfo && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Vehicle details fetched successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {vehicleInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Details</CardTitle>
            <CardDescription>Information from government database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Registration Number</Label>
                  <p className="text-lg font-semibold">{vehicleInfo.registrationNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Owner Name</Label>
                  <p className="text-lg">{vehicleInfo.ownerName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Make & Model</Label>
                  <p className="text-lg">
                    {vehicleInfo.make} {vehicleInfo.model}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Vehicle Class</Label>
                  <p className="text-lg">{vehicleInfo.vehicleClass}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Fuel Type</Label>
                  <Badge variant="outline">{vehicleInfo.fuelType}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Manufacturing Date</Label>
                  <p className="text-lg">{new Date(vehicleInfo.manufacturingDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Registration Date</Label>
                  <p className="text-lg">{new Date(vehicleInfo.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Insurance Valid Upto</Label>
                  <p className="text-lg">{new Date(vehicleInfo.insuranceUpto).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">PUC Valid Upto</Label>
                  <p className="text-lg">{new Date(vehicleInfo.puccUpto).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">RC Status</Label>
                  <Badge
                    className={
                      vehicleInfo.rcStatus === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }
                  >
                    {vehicleInfo.rcStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Engine Number</Label>
                  <p className="font-mono">{vehicleInfo.engineNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Chassis Number</Label>
                  <p className="font-mono">{vehicleInfo.chassisNumber}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
