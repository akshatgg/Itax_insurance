"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, AlertCircle, Lightbulb, ArrowRight, Sparkles } from "lucide-react"

interface FormField {
  id: string
  type: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea" | "checkbox" | "radio"
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
  validation?: {
    pattern?: string
    min?: number
    max?: number
    message?: string
  }
  aiSuggestion?: string
  dependsOn?: string
  dependsOnValue?: string
}

interface AIFormBuilderProps {
  productType: string
  onFormUpdate?: (data: any) => void
  onNext?: () => void
}

export function AIFormBuilder({ productType, onFormUpdate, onNext }: AIFormBuilderProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Dynamic form fields based on product type
  const getFormFields = (): FormField[][] => {
    const commonFields: FormField[] = [
      {
        id: "fullName",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        aiSuggestion: "Use your legal name as it appears on official documents",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "your.email@example.com",
        required: true,
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
      {
        id: "phone",
        type: "tel",
        label: "Phone Number",
        placeholder: "+91 98765 43210",
        required: true,
        validation: {
          pattern: "^[+]?[0-9]{10,15}$",
          message: "Please enter a valid phone number",
        },
      },
      {
        id: "dateOfBirth",
        type: "date",
        label: "Date of Birth",
        required: true,
        aiSuggestion: "Age affects premium calculation significantly",
      },
      {
        id: "pincode",
        type: "text",
        label: "Pincode",
        placeholder: "Enter 6-digit pincode",
        required: true,
        validation: {
          pattern: "^[0-9]{6}$",
          message: "Please enter a valid 6-digit pincode",
        },
        aiSuggestion: "Location affects risk assessment and premium",
      },
    ]

    const productSpecificFields: Record<string, FormField[][]> = {
      health: [
        commonFields,
        [
          {
            id: "planType",
            type: "radio",
            label: "Plan Type",
            required: true,
            options: ["Individual", "Family Floater", "Senior Citizen"],
            aiSuggestion: "Family floater plans offer better value for families",
          },
          {
            id: "coverageAmount",
            type: "select",
            label: "Coverage Amount",
            required: true,
            options: ["₹3,00,000", "₹5,00,000", "₹10,00,000", "₹15,00,000", "₹25,00,000", "₹50,00,000"],
            aiSuggestion: "Higher coverage recommended for metro cities",
          },
          {
            id: "familySize",
            type: "number",
            label: "Family Size",
            placeholder: "Number of family members",
            dependsOn: "planType",
            dependsOnValue: "Family Floater",
            validation: { min: 2, max: 10 },
          },
          {
            id: "preExistingConditions",
            type: "checkbox",
            label: "Do you have any pre-existing medical conditions?",
            aiSuggestion: "Declaring conditions upfront prevents claim rejections",
          },
          {
            id: "smokingHabits",
            type: "radio",
            label: "Smoking Habits",
            options: ["Never", "Occasional", "Regular", "Quit"],
            aiSuggestion: "Non-smokers get better premium rates",
          },
        ],
        [
          {
            id: "annualIncome",
            type: "select",
            label: "Annual Income",
            options: ["Below ₹5L", "₹5L - ₹10L", "₹10L - ₹25L", "₹25L - ₹50L", "Above ₹50L"],
            aiSuggestion: "Income affects tax benefits eligibility",
          },
          {
            id: "occupation",
            type: "select",
            label: "Occupation",
            options: ["Salaried", "Business", "Professional", "Retired", "Student", "Homemaker"],
            aiSuggestion: "Some occupations are considered high-risk",
          },
          {
            id: "previousInsurance",
            type: "radio",
            label: "Previous Health Insurance",
            options: ["Yes", "No"],
            aiSuggestion: "Continuous coverage provides no-claim bonus benefits",
          },
          {
            id: "medicalHistory",
            type: "textarea",
            label: "Brief Medical History",
            placeholder: "Mention any significant medical history, surgeries, or ongoing treatments",
            aiSuggestion: "Complete disclosure helps in accurate premium calculation",
          },
        ],
      ],
      motor: [
        commonFields,
        [
          {
            id: "vehicleType",
            type: "radio",
            label: "Vehicle Type",
            required: true,
            options: ["Car", "Motorcycle", "Commercial Vehicle"],
            aiSuggestion: "Vehicle type significantly affects premium rates",
          },
          {
            id: "vehicleMake",
            type: "select",
            label: "Vehicle Make",
            required: true,
            options: ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Other"],
          },
          {
            id: "vehicleModel",
            type: "text",
            label: "Vehicle Model",
            placeholder: "e.g., Swift, i20, Nexon",
            required: true,
          },
          {
            id: "manufacturingYear",
            type: "number",
            label: "Manufacturing Year",
            required: true,
            validation: { min: 2000, max: new Date().getFullYear() },
            aiSuggestion: "Newer vehicles get better premium rates",
          },
          {
            id: "fuelType",
            type: "radio",
            label: "Fuel Type",
            options: ["Petrol", "Diesel", "CNG", "Electric"],
            aiSuggestion: "Electric vehicles often get premium discounts",
          },
        ],
        [
          {
            id: "vehicleUsage",
            type: "radio",
            label: "Vehicle Usage",
            options: ["Personal", "Commercial", "Both"],
            aiSuggestion: "Commercial usage increases premium rates",
          },
          {
            id: "parkingLocation",
            type: "radio",
            label: "Parking Location",
            options: ["Covered Garage", "Open Parking", "Street Parking"],
            aiSuggestion: "Covered parking reduces theft and damage risk",
          },
          {
            id: "drivingExperience",
            type: "number",
            label: "Driving Experience (Years)",
            validation: { min: 0, max: 50 },
            aiSuggestion: "More experience typically means lower premiums",
          },
          {
            id: "previousClaims",
            type: "radio",
            label: "Previous Claims (Last 3 Years)",
            options: ["None", "1 Claim", "2 Claims", "3+ Claims"],
            aiSuggestion: "No-claim history provides significant discounts",
          },
        ],
      ],
      home: [
        commonFields,
        [
          {
            id: "propertyType",
            type: "radio",
            label: "Property Type",
            required: true,
            options: ["Independent House", "Apartment", "Villa", "Row House"],
            aiSuggestion: "Apartment complexes often have better security features",
          },
          {
            id: "propertyAge",
            type: "number",
            label: "Property Age (Years)",
            required: true,
            validation: { min: 0, max: 100 },
            aiSuggestion: "Newer properties get better premium rates",
          },
          {
            id: "builtUpArea",
            type: "number",
            label: "Built-up Area (Sq Ft)",
            required: true,
            validation: { min: 100, max: 10000 },
          },
          {
            id: "propertyValue",
            type: "select",
            label: "Property Value",
            required: true,
            options: ["₹10L - ₹25L", "₹25L - ₹50L", "₹50L - ₹1Cr", "₹1Cr - ₹2Cr", "Above ₹2Cr"],
            aiSuggestion: "Accurate valuation ensures proper coverage",
          },
        ],
        [
          {
            id: "securityFeatures",
            type: "checkbox",
            label: "Security Features Available",
            options: ["CCTV", "Security Guard", "Gated Community", "Fire Safety", "Burglar Alarm"],
            aiSuggestion: "Security features can reduce premium significantly",
          },
          {
            id: "locationRisk",
            type: "radio",
            label: "Location Risk Assessment",
            options: ["Low Risk", "Medium Risk", "High Risk", "Flood Prone"],
            aiSuggestion: "Location risk affects natural disaster coverage",
          },
          {
            id: "previousClaims",
            type: "radio",
            label: "Previous Home Insurance Claims",
            options: ["None", "1 Claim", "2+ Claims"],
            aiSuggestion: "No previous claims provide better rates",
          },
        ],
      ],
      travel: [
        commonFields,
        [
          {
            id: "tripType",
            type: "radio",
            label: "Trip Type",
            required: true,
            options: ["Domestic", "International", "Business", "Leisure"],
            aiSuggestion: "International trips require higher coverage",
          },
          {
            id: "destination",
            type: "text",
            label: "Destination",
            placeholder: "Enter destination country/city",
            required: true,
          },
          {
            id: "tripDuration",
            type: "number",
            label: "Trip Duration (Days)",
            required: true,
            validation: { min: 1, max: 365 },
            aiSuggestion: "Longer trips need comprehensive coverage",
          },
          {
            id: "travelersCount",
            type: "number",
            label: "Number of Travelers",
            required: true,
            validation: { min: 1, max: 10 },
          },
        ],
        [
          {
            id: "coverageType",
            type: "radio",
            label: "Coverage Type",
            options: ["Basic", "Comprehensive", "Premium"],
            aiSuggestion: "Comprehensive coverage recommended for international trips",
          },
          {
            id: "medicalHistory",
            type: "checkbox",
            label: "Any pre-existing medical conditions?",
            aiSuggestion: "Medical conditions must be declared for coverage",
          },
          {
            id: "adventureActivities",
            type: "checkbox",
            label: "Planning adventure activities?",
            aiSuggestion: "Adventure sports require additional coverage",
          },
          {
            id: "tripValue",
            type: "select",
            label: "Trip Value",
            options: ["Below ₹50K", "₹50K - ₹1L", "₹1L - ₹3L", "₹3L - ₹5L", "Above ₹5L"],
            aiSuggestion: "Higher trip values need trip cancellation coverage",
          },
        ],
      ],
    }

    return productSpecificFields[productType] || [commonFields]
  }

  const formSteps = getFormFields()
  const currentFields = formSteps[currentStep] || []
  const totalSteps = formSteps.length

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: "" }))
    }

    // Trigger AI analysis for certain fields
    if (["pincode", "occupation", "vehicleType"].includes(fieldId)) {
      analyzeField(fieldId, value)
    }

    // Update parent component
    if (onFormUpdate) {
      onFormUpdate({ ...formData, [fieldId]: value })
    }
  }

  const analyzeField = async (fieldId: string, value: any) => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const suggestions: Record<string, string> = {
        pincode: "Based on your location, we recommend higher coverage due to metro area risks",
        occupation: "Your profession qualifies for group insurance discounts",
        vehicleType: "Consider comprehensive coverage for better protection",
      }

      setAiSuggestions((prev) => ({ ...prev, [fieldId]: suggestions[fieldId] || "" }))
      setIsAnalyzing(false)
    }, 1000)
  }

  const validateField = (field: FormField, value: any): string => {
    if (field.required && (!value || value === "")) {
      return `${field.label} is required`
    }

    if (field.validation && value) {
      const { pattern, min, max, message } = field.validation

      if (pattern && !new RegExp(pattern).test(value)) {
        return message || `Invalid ${field.label.toLowerCase()}`
      }

      if (field.type === "number") {
        const numValue = Number(value)
        if (min !== undefined && numValue < min) {
          return `${field.label} must be at least ${min}`
        }
        if (max !== undefined && numValue > max) {
          return `${field.label} must be at most ${max}`
        }
      }
    }

    return ""
  }

  const validateStep = (): boolean => {
    const stepErrors: Record<string, string> = {}

    currentFields.forEach((field) => {
      // Skip dependent fields that shouldn't be shown
      if (field.dependsOn && formData[field.dependsOn] !== field.dependsOnValue) {
        return
      }

      const error = validateField(field, formData[field.id])
      if (error) {
        stepErrors[field.id] = error
      }
    })

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // Form completed
        if (onNext) {
          onNext()
        }
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderField = (field: FormField) => {
    // Skip dependent fields
    if (field.dependsOn && formData[field.dependsOn] !== field.dependsOnValue) {
      return null
    }

    const fieldValue = formData[field.id] || ""
    const fieldError = errors[field.id]
    const fieldSuggestion = aiSuggestions[field.id] || field.aiSuggestion

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id} className="flex items-center">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        {field.type === "text" ||
        field.type === "email" ||
        field.type === "tel" ||
        field.type === "number" ||
        field.type === "date" ? (
          <Input
            id={field.id}
            type={field.type}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={fieldError ? "border-red-500" : ""}
          />
        ) : field.type === "select" ? (
          <Select onValueChange={(value) => handleInputChange(field.id, value)} value={fieldValue}>
            <SelectTrigger className={fieldError ? "border-red-500" : ""}>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === "textarea" ? (
          <Textarea
            id={field.id}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={fieldError ? "border-red-500" : ""}
            rows={3}
          />
        ) : field.type === "radio" ? (
          <RadioGroup
            value={fieldValue}
            onValueChange={(value) => handleInputChange(field.id, value)}
            className="flex flex-wrap gap-4"
          >
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : field.type === "checkbox" ? (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={fieldValue}
              onCheckedChange={(checked) => handleInputChange(field.id, checked)}
            />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        ) : null}

        {fieldError && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{fieldError}</span>
          </div>
        )}

        {fieldSuggestion && !fieldError && (
          <div className="flex items-start space-x-2 text-blue-600 text-sm bg-blue-50 p-3 rounded-lg">
            <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{fieldSuggestion}</span>
          </div>
        )}
      </div>
    )
  }

  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-vanilla-100 rounded-lg">
            <Brain className="h-5 w-5 text-vanilla-600" />
          </div>
          <div>
            <h3 className="font-semibold text-vanilla-900 flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Form
            </h3>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-vanilla-600">
          {Math.round(progress)}% Complete
        </Badge>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Form Fields */}
      <Card className="border-vanilla-200">
        <CardHeader>
          <CardTitle className="text-lg">
            {currentStep === 0 && "Personal Information"}
            {currentStep === 1 && `${productType.charAt(0).toUpperCase() + productType.slice(1)} Details`}
            {currentStep === 2 && "Additional Information"}
          </CardTitle>
          <CardDescription>
            {isAnalyzing && (
              <div className="flex items-center space-x-2 text-vanilla-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-vanilla-600"></div>
                <span>AI is analyzing your inputs...</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{currentFields.map(renderField)}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0} className="bg-transparent">
          Previous
        </Button>
        <Button onClick={handleNext} className="bg-vanilla-600 hover:bg-vanilla-700 text-white">
          {currentStep === totalSteps - 1 ? (
            <>
              Complete Form
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Form Summary */}
      {Object.keys(formData).length > 0 && (
        <Card className="border-vanilla-200 bg-vanilla-50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-vanilla-900">Form Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {Object.entries(formData)
                .filter(([_, value]) => value && value !== "")
                .slice(0, 6)
                .map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-muted-foreground truncate">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:{" "}
                      {String(value).slice(0, 20)}
                      {String(value).length > 20 ? "..." : ""}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
