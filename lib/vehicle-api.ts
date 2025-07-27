interface VehicleInfo {
  registrationNumber: string
  ownerName: string
  vehicleClass: string
  fuelType: string
  model: string
  manufacturingDate: string
  registrationDate: string
  fitnessUpto: string
  insuranceUpto: string
  puccUpto: string
  make: string
  engineNumber: string
  chassisNumber: string
  rcStatus: string
}

interface VehicleApiResponse {
  success: boolean
  data?: VehicleInfo
  error?: string
}

// Mock API function - In production, this would call actual government API
export async function fetchVehicleDetails(vehicleNumber: string): Promise<VehicleApiResponse> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock data based on vehicle number pattern
    const mockData: VehicleInfo = {
      registrationNumber: vehicleNumber.toUpperCase(),
      ownerName: "RAJESH KUMAR",
      vehicleClass: "MOTOR CAR",
      fuelType: "PETROL",
      model: "SWIFT VXI",
      manufacturingDate: "2020-03-15",
      registrationDate: "2020-04-01",
      fitnessUpto: "2035-03-31",
      insuranceUpto: "2025-03-31",
      puccUpto: "2024-09-30",
      make: "MARUTI SUZUKI",
      engineNumber: "K12M1234567",
      chassisNumber: "MA3ERLF1S00123456",
      rcStatus: "ACTIVE",
    }

    // Simulate different responses based on vehicle number
    if (vehicleNumber.toLowerCase().includes("test")) {
      return {
        success: false,
        error: "Vehicle not found in database",
      }
    }

    return {
      success: true,
      data: mockData,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch vehicle details",
    }
  }
}

// Function to get vehicle makes and models
export async function getVehicleMakesAndModels() {
  return {
    makes: [
      {
        name: "MARUTI SUZUKI",
        models: ["SWIFT", "BALENO", "DZIRE", "ALTO", "WAGON R", "VITARA BREZZA", "ERTIGA", "XL6"],
      },
      {
        name: "HYUNDAI",
        models: ["I20", "CRETA", "VERNA", "VENUE", "SANTRO", "GRAND I10", "TUCSON", "ELANTRA"],
      },
      {
        name: "TATA",
        models: ["NEXON", "HARRIER", "SAFARI", "ALTROZ", "TIGOR", "TIAGO", "PUNCH", "HEXA"],
      },
      {
        name: "MAHINDRA",
        models: ["XUV700", "SCORPIO", "THAR", "BOLERO", "XUV300", "MARAZZO", "KUV100", "ALTURAS"],
      },
      {
        name: "HONDA",
        models: ["CITY", "AMAZE", "WR-V", "JAZZ", "CR-V", "CIVIC", "ACCORD", "BR-V"],
      },
      {
        name: "TOYOTA",
        models: ["INNOVA", "FORTUNER", "CAMRY", "COROLLA", "ETIOS", "GLANZA", "URBAN CRUISER", "VELLFIRE"],
      },
    ],
  }
}

// Function to validate vehicle number format
export function validateVehicleNumber(vehicleNumber: string): boolean {
  // Indian vehicle number format: XX00XX0000 or XX-00-XX-0000
  const pattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$|^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$/
  const cleanNumber = vehicleNumber.replace(/-/g, "").toUpperCase()
  return pattern.test(cleanNumber)
}
