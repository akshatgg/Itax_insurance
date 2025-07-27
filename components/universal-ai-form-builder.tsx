"use client"

import { useState } from "react"
import { Card3D, Card3DContent } from "@/components/ui/card-3d"
import { Button3D } from "@/components/ui/button-3d"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Car,
  Home,
  Plane,
  Heart,
  Building,
  Plus,
  Minus,
  Download,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Info,
  FileText,
  Users,
} from "lucide-react"
import { generateInsurancePDF, generateFamilyMemberPDF } from "@/lib/pdf-generator"

interface FamilyMember {
  id: string
  name: string
  relationship: string
  dateOfBirth: string
  gender: string
  occupation: string
  annualIncome: string
  medicalHistory: string[]
  lifestyle: {
    smoking: boolean
    drinking: boolean
    exercise: string
  }
}

interface FormData {
  insuranceType: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    gender: string
    occupation: string
    annualIncome: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
    }
  }
  familyMembers: FamilyMember[]
  insuranceDetails: Record<string, any>
  preferences: {
    coverageAmount: string
    deductible: string
    paymentFrequency: string
  }
}

const insuranceTypes = [
  { id: "health", name: "Health Insurance", icon: Heart, color: "from-red-500 to-pink-500" },
  { id: "motor", name: "Motor Insurance", icon: Car, color: "from-blue-500 to-cyan-500" },
  { id: "home", name: "Home Insurance", icon: Home, color: "from-green-500 to-emerald-500" },
  { id: "travel", name: "Travel Insurance", icon: Plane, color: "from-purple-500 to-violet-500" },
  { id: "life", name: "Life Insurance", icon: User, color: "from-orange-500 to-amber-500" },
  { id: "business", name: "Business Insurance", icon: Building, color: "from-gray-500 to-slate-500" },
]

const relationships = ["Spouse", "Child", "Parent", "Sibling", "Grandparent", "Grandchild", "Other"]

const medicalConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Cancer",
  "Arthritis",
  "Depression",
  "Anxiety",
  "Allergies",
  "Thyroid Disorder",
  "None",
]

const aiSuggestions = {
  health: {
    personalInfo: "💡 Tip: Accurate health information helps us provide better coverage recommendations.",
    familyMembers: "👨‍👩‍👧‍👦 Add family members to get comprehensive family health coverage.",
    insuranceDetails: "🏥 Consider higher coverage if you have pre-existing conditions.",
  },
  motor: {
    personalInfo: "🚗 Your driving history affects premium calculations.",
    vehicleInfo: "🔧 Vehicle safety features may qualify for discounts.",
    insuranceDetails: "💰 Higher deductibles typically mean lower premiums.",
  },
  home: {
    personalInfo: "🏠 Property location affects coverage requirements.",
    propertyInfo: "🔒 Security systems may reduce your premium.",
    insuranceDetails: "🌪️ Consider natural disaster coverage based on your location.",
  },
}

export default function UniversalAIFormBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    insuranceType: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      occupation: "",
      annualIncome: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    familyMembers: [],
    insuranceDetails: {},
    preferences: {
      coverageAmount: "",
      deductible: "",
      paymentFrequency: "monthly",
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const steps = [
    { id: "type", title: "Insurance Type", description: "Choose your insurance type" },
    { id: "personal", title: "Personal Information", description: "Tell us about yourself" },
    { id: "family", title: "Family Members", description: "Add family members (optional)" },
    { id: "details", title: "Insurance Details", description: "Specific insurance information" },
    { id: "preferences", title: "Preferences", description: "Coverage and payment options" },
    { id: "review", title: "Review & Submit", description: "Review your application" },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: "",
      relationship: "",
      dateOfBirth: "",
      gender: "",
      occupation: "",
      annualIncome: "",
      medicalHistory: [],
      lifestyle: {
        smoking: false,
        drinking: false,
        exercise: "moderate",
      },
    }
    setFormData((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, newMember],
    }))
  }

  const removeFamilyMember = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((member) => member.id !== id),
    }))
  }

  const updateFamilyMember = (id: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)),
    }))
  }

  const generateApplicationPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generateInsurancePDF(formData)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const generateFamilyPDF = async (member: FamilyMember) => {
    try {
      await generateFamilyMemberPDF(member, formData.personalInfo)
    } catch (error) {
      console.error("Error generating family PDF:", error)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 0:
        if (!formData.insuranceType) {
          newErrors.insuranceType = "Please select an insurance type"
        }
        break
      case 1:
        if (!formData.personalInfo.firstName) newErrors.firstName = "First name is required"
        if (!formData.personalInfo.lastName) newErrors.lastName = "Last name is required"
        if (!formData.personalInfo.email) newErrors.email = "Email is required"
        if (!formData.personalInfo.phone) newErrors.phone = "Phone is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const renderInsuranceTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent mb-2">
          Choose Your Insurance Type
        </h2>
        <p className="text-vanilla-600">Select the type of insurance you need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insuranceTypes.map((type) => {
          const Icon = type.icon
          const isSelected = formData.insuranceType === type.id

          return (
            <Card3D
              key={type.id}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected ? "ring-2 ring-vanilla-500 shadow-xl scale-105" : "hover:shadow-lg"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, insuranceType: type.id }))}
            >
              <Card3DContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-vanilla-800 mb-2">{type.name}</h3>
                <p className="text-sm text-vanilla-600">Get comprehensive {type.name.toLowerCase()} coverage</p>
                {isSelected && (
                  <div className="mt-4">
                    <Badge variant="default" className="bg-vanilla-500">
                      <Check className="w-3 h-3 mr-1" />
                      Selected
                    </Badge>
                  </div>
                )}
              </Card3DContent>
            </Card3D>
          )
        })}
      </div>

      {errors.insuranceType && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.insuranceType}</AlertDescription>
        </Alert>
      )}
    </div>
  )

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent mb-2">
          Personal Information
        </h2>
        <p className="text-vanilla-600">Tell us about yourself</p>
      </div>

      {formData.insuranceType && aiSuggestions[formData.insuranceType as keyof typeof aiSuggestions] && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertDescription>
            {aiSuggestions[formData.insuranceType as keyof typeof aiSuggestions].personalInfo}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.personalInfo.firstName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, firstName: e.target.value },
              }))
            }
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.personalInfo.lastName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, lastName: e.target.value },
              }))
            }
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, email: e.target.value },
              }))
            }
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.personalInfo.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, phone: e.target.value },
              }))
            }
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.personalInfo.gender}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, gender: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.personalInfo.occupation}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, occupation: e.target.value },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualIncome">Annual Income</Label>
          <Select
            value={formData.personalInfo.annualIncome}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, annualIncome: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-25000">₹0 - ₹25,000</SelectItem>
              <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
              <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
              <SelectItem value="100000-500000">₹1,00,000 - ₹5,00,000</SelectItem>
              <SelectItem value="500000+">₹5,00,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-vanilla-800">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={formData.personalInfo.address.street}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    address: { ...prev.personalInfo.address, street: e.target.value },
                  },
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.personalInfo.address.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    address: { ...prev.personalInfo.address, city: e.target.value },
                  },
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.personalInfo.address.state}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    address: { ...prev.personalInfo.address, state: e.target.value },
                  },
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={formData.personalInfo.address.zipCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    address: { ...prev.personalInfo.address, zipCode: e.target.value },
                  },
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderFamilyMembersStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent mb-2">
          Family Members
        </h2>
        <p className="text-vanilla-600">Add family members to include in your coverage</p>
      </div>

      {formData.insuranceType && aiSuggestions[formData.insuranceType as keyof typeof aiSuggestions] && (
        <Alert>
          <Users className="h-4 w-4" />
          <AlertDescription>
            {aiSuggestions[formData.insuranceType as keyof typeof aiSuggestions].familyMembers}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-vanilla-800">Family Members ({formData.familyMembers.length})</h3>
        <Button3D onClick={addFamilyMember} icon={<Plus className="w-4 h-4" />}>
          Add Family Member
        </Button3D>
      </div>

      {formData.familyMembers.length === 0 ? (
        <Card3D className="p-8 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-vanilla-400" />
          <p className="text-vanilla-600 mb-4">No family members added yet</p>
          <Button3D onClick={addFamilyMember} variant="outline">
            Add Your First Family Member
          </Button3D>
        </Card3D>
      ) : (
        <div className="space-y-6">
          {formData.familyMembers.map((member, index) => (
            <Card3D key={member.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-vanilla-800">Family Member {index + 1}</h4>
                <div className="flex gap-2">
                  <Button3D
                    size="sm"
                    variant="outline"
                    onClick={() => generateFamilyPDF(member)}
                    icon={<Download className="w-3 h-3" />}
                  >
                    PDF
                  </Button3D>
                  <Button3D
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFamilyMember(member.id)}
                    icon={<Minus className="w-3 h-3" />}
                  >
                    Remove
                  </Button3D>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={member.name}
                    onChange={(e) => updateFamilyMember(member.id, "name", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Select
                    value={member.relationship}
                    onValueChange={(value) => updateFamilyMember(member.id, "relationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationships.map((rel) => (
                        <SelectItem key={rel} value={rel.toLowerCase()}>
                          {rel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={member.dateOfBirth}
                    onChange={(e) => updateFamilyMember(member.id, "dateOfBirth", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={member.gender}
                    onValueChange={(value) => updateFamilyMember(member.id, "gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Occupation</Label>
                  <Input
                    value={member.occupation}
                    onChange={(e) => updateFamilyMember(member.id, "occupation", e.target.value)}
                    placeholder="Enter occupation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Annual Income</Label>
                  <Select
                    value={member.annualIncome}
                    onValueChange={(value) => updateFamilyMember(member.id, "annualIncome", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-25000">₹0 - ₹25,000</SelectItem>
                      <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="100000-500000">₹1,00,000 - ₹5,00,000</SelectItem>
                      <SelectItem value="500000+">₹5,00,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h5 className="font-semibold text-vanilla-800">Medical History</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {medicalConditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${member.id}-${condition}`}
                        checked={member.medicalHistory.includes(condition)}
                        onCheckedChange={(checked) => {
                          const newHistory = checked
                            ? [...member.medicalHistory, condition]
                            : member.medicalHistory.filter((c) => c !== condition)
                          updateFamilyMember(member.id, "medicalHistory", newHistory)
                        }}
                      />
                      <Label htmlFor={`${member.id}-${condition}`} className="text-sm">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h5 className="font-semibold text-vanilla-800">Lifestyle</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${member.id}-smoking`}
                      checked={member.lifestyle.smoking}
                      onCheckedChange={(checked) =>
                        updateFamilyMember(member.id, "lifestyle", {
                          ...member.lifestyle,
                          smoking: checked,
                        })
                      }
                    />
                    <Label htmlFor={`${member.id}-smoking`}>Smoking</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${member.id}-drinking`}
                      checked={member.lifestyle.drinking}
                      onCheckedChange={(checked) =>
                        updateFamilyMember(member.id, "lifestyle", {
                          ...member.lifestyle,
                          drinking: checked,
                        })
                      }
                    />
                    <Label htmlFor={`${member.id}-drinking`}>Drinking</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Exercise Level</Label>
                    <Select
                      value={member.lifestyle.exercise}
                      onValueChange={(value) =>
                        updateFamilyMember(member.id, "lifestyle", {
                          ...member.lifestyle,
                          exercise: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="heavy">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      )}
    </div>
  )

  const renderInsuranceDetailsStep = () => {
    const selectedType = insuranceTypes.find((type) => type.id === formData.insuranceType)

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent mb-2">
            {selectedType?.name} Details
          </h2>
          <p className="text-vanilla-600">Provide specific information for your {selectedType?.name.toLowerCase()}</p>
        </div>

        {formData.insuranceType && aiSuggestions[formData.insuranceType as keyof typeof aiSuggestions] && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {aiSuggestions[formData.insuranceType as keyof typeof aiSuggestions].insuranceDetails}
            </AlertDescription>
          </Alert>
        )}

        <Card3D className="p-6">
          <div className="space-y-6">
            {formData.insuranceType === "health" && (
              <>
                <div className="space-y-2">
                  <Label>Pre-existing Medical Conditions</Label>
                  <Textarea
                    placeholder="List any pre-existing medical conditions..."
                    value={formData.insuranceDetails.medicalConditions || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        insuranceDetails: { ...prev.insuranceDetails, medicalConditions: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Hospital Network</Label>
                  <Select
                    value={formData.insuranceDetails.hospitalNetwork || ""}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        insuranceDetails: { ...prev.insuranceDetails, hospitalNetwork: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apollo">Apollo Hospitals</SelectItem>
                      <SelectItem value="fortis">Fortis Healthcare</SelectItem>
                      <SelectItem value="max">Max Healthcare</SelectItem>
                      <SelectItem value="manipal">Manipal Hospitals</SelectItem>
                      <SelectItem value="any">Any Network</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {formData.insuranceType === "motor" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Make</Label>
                    <Input
                      placeholder="e.g., Maruti Suzuki"
                      value={formData.insuranceDetails.vehicleMake || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, vehicleMake: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vehicle Model</Label>
                    <Input
                      placeholder="e.g., Swift"
                      value={formData.insuranceDetails.vehicleModel || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, vehicleModel: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Manufacturing Year</Label>
                    <Input
                      type="number"
                      placeholder="2020"
                      value={formData.insuranceDetails.manufacturingYear || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, manufacturingYear: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input
                      placeholder="MH01AB1234"
                      value={formData.insuranceDetails.registrationNumber || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, registrationNumber: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {formData.insuranceType === "home" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Select
                      value={formData.insuranceDetails.propertyType || ""}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, propertyType: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">Independent House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Property Value (₹)</Label>
                    <Input
                      type="number"
                      placeholder="5000000"
                      value={formData.insuranceDetails.propertyValue || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, propertyValue: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Built Year</Label>
                    <Input
                      type="number"
                      placeholder="2015"
                      value={formData.insuranceDetails.builtYear || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, builtYear: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Security Features</Label>
                    <Select
                      value={formData.insuranceDetails.securityFeatures || ""}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, securityFeatures: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select security level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (Locks only)</SelectItem>
                        <SelectItem value="standard">Standard (Alarm system)</SelectItem>
                        <SelectItem value="advanced">Advanced (CCTV + Alarm)</SelectItem>
                        <SelectItem value="premium">Premium (Smart security)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {formData.insuranceType === "travel" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Travel Destination</Label>
                    <Select
                      value={formData.insuranceDetails.destination || ""}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, destination: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="americas">Americas</SelectItem>
                        <SelectItem value="worldwide">Worldwide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Trip Duration (Days)</Label>
                    <Input
                      type="number"
                      placeholder="7"
                      value={formData.insuranceDetails.tripDuration || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, tripDuration: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Travel Purpose</Label>
                    <Select
                      value={formData.insuranceDetails.travelPurpose || ""}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, travelPurpose: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leisure">Leisure</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Travelers</Label>
                    <Input
                      type="number"
                      placeholder="2"
                      value={formData.insuranceDetails.travelers || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceDetails: { ...prev.insuranceDetails, travelers: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Card3D>
      </div>
    )
  }

  const renderPreferencesStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent mb-2">
          Coverage Preferences
        </h2>
        <p className="text-vanilla-600">Choose your coverage amount and payment options</p>
      </div>

      <Card3D className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Coverage Amount</Label>
            <Select
              value={formData.preferences.coverageAmount}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  preferences: { ...prev.preferences, coverageAmount: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select coverage amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100000">₹1,00,000</SelectItem>
                <SelectItem value="300000">₹3,00,000</SelectItem>
                <SelectItem value="500000">₹5,00,000</SelectItem>
                <SelectItem value="1000000">₹10,00,000</SelectItem>
                <SelectItem value="2000000">₹20,00,000</SelectItem>
                <SelectItem value="5000000">₹50,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Deductible Amount</Label>
            <Select
              value={formData.preferences.deductible}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  preferences: { ...prev.preferences, deductible: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select deductible" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">₹0 (No Deductible)</SelectItem>
                <SelectItem value="5000">₹5,000</SelectItem>
                <SelectItem value="10000">₹10,000</SelectItem>
                <SelectItem value="25000">₹25,000</SelectItem>
                <SelectItem value="50000">₹50,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Payment Frequency</Label>
            <RadioGroup
              value={formData.preferences.paymentFrequency}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  preferences: { ...prev.preferences, paymentFrequency: value },
                }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quarterly" id="quarterly" />
                <Label htmlFor="quarterly">Quarterly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annually" id="annually" />
                <Label htmlFor="annually">Annually (Save 10%)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card3D>

      <Card3D className="p-6 bg-gradient-to-r from-vanilla-50 to-vanilla-100">
        <h3 className="text-lg font-semibold text-vanilla-800 mb-4">Premium Estimate</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base Premium:</span>
            <span className="font-semibold">₹12,000</span>
          </div>
          <div className="flex justify-between">
            <span>Family Members ({formData.familyMembers.length}):</span>
            <span className="font-semibold">₹{formData.familyMembers.length * 3000}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Fees:</span>
            <span className="font-semibold">₹2,160</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total Annual Premium:</span>
            <span className="text-vanilla-600">₹{12000 + formData.familyMembers.length * 3000 + 2160}</span>
          </div>
        </div>
      </Card3D>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent mb-2">
          Review Your Application
        </h2>
        <p className="text-vanilla-600">Please review all information before submitting</p>
      </div>

      <div className="space-y-6">
        <Card3D className="p-6">
          <h3 className="text-lg font-semibold text-vanilla-800 mb-4">Insurance Type</h3>
          <div className="flex items-center gap-3">
            {(() => {
              const selectedType = insuranceTypes.find((type) => type.id === formData.insuranceType)
              if (!selectedType) return null
              const Icon = selectedType.icon
              return (
                <>
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedType.color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-medium">{selectedType.name}</span>
                </>
              )
            })()}
          </div>
        </Card3D>

        <Card3D className="p-6">
          <h3 className="text-lg font-semibold text-vanilla-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-vanilla-600">Name:</span>
              <p className="font-medium">
                {formData.personalInfo.firstName} {formData.personalInfo.lastName}
              </p>
            </div>
            <div>
              <span className="text-sm text-vanilla-600">Email:</span>
              <p className="font-medium">{formData.personalInfo.email}</p>
            </div>
            <div>
              <span className="text-sm text-vanilla-600">Phone:</span>
              <p className="font-medium">{formData.personalInfo.phone}</p>
            </div>
            <div>
              <span className="text-sm text-vanilla-600">Date of Birth:</span>
              <p className="font-medium">{formData.personalInfo.dateOfBirth || "Not provided"}</p>
            </div>
          </div>
        </Card3D>

        {formData.familyMembers.length > 0 && (
          <Card3D className="p-6">
            <h3 className="text-lg font-semibold text-vanilla-800 mb-4">
              Family Members ({formData.familyMembers.length})
            </h3>
            <div className="space-y-3">
              {formData.familyMembers.map((member, index) => (
                <div key={member.id} className="flex justify-between items-center p-3 bg-vanilla-50 rounded-lg">
                  <div>
                    <p className="font-medium">{member.name || `Family Member ${index + 1}`}</p>
                    <p className="text-sm text-vanilla-600">
                      {member.relationship} • {member.gender}
                    </p>
                  </div>
                  <Button3D
                    size="sm"
                    variant="outline"
                    onClick={() => generateFamilyPDF(member)}
                    icon={<Download className="w-3 h-3" />}
                  >
                    PDF
                  </Button3D>
                </div>
              ))}
            </div>
          </Card3D>
        )}

        <Card3D className="p-6">
          <h3 className="text-lg font-semibold text-vanilla-800 mb-4">Coverage Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-vanilla-600">Coverage Amount:</span>
              <p className="font-medium">₹{formData.preferences.coverageAmount || "Not selected"}</p>
            </div>
            <div>
              <span className="text-sm text-vanilla-600">Deductible:</span>
              <p className="font-medium">₹{formData.preferences.deductible || "Not selected"}</p>
            </div>
            <div>
              <span className="text-sm text-vanilla-600">Payment Frequency:</span>
              <p className="font-medium capitalize">{formData.preferences.paymentFrequency}</p>
            </div>
          </div>
        </Card3D>

        <div className="flex gap-4">
          <Button3D
            onClick={generateApplicationPDF}
            loading={isGeneratingPDF}
            icon={<FileText className="w-4 h-4" />}
            className="flex-1"
          >
            {isGeneratingPDF ? "Generating PDF..." : "Download Application PDF"}
          </Button3D>
          <Button3D variant="success" className="flex-1" icon={<Check className="w-4 h-4" />}>
            Submit Application
          </Button3D>
        </div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderInsuranceTypeStep()
      case 1:
        return renderPersonalInfoStep()
      case 2:
        return renderFamilyMembersStep()
      case 3:
        return renderInsuranceDetailsStep()
      case 4:
        return renderPreferencesStep()
      case 5:
        return renderReviewStep()
      default:
        return renderInsuranceTypeStep()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vanilla-50 to-vanilla-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-vanilla-800 to-vanilla-600 bg-clip-text text-transparent">
            AI Insurance Form Builder
          </h1>
          <p className="text-vanilla-600 text-lg mt-2">Get personalized insurance quotes with AI assistance</p>
        </div>

        {/* Progress Bar */}
        <Card3D className="mb-8">
          <Card3DContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-vanilla-800">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </h2>
              <Badge variant="outline" className="bg-vanilla-100">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between text-sm text-vanilla-600">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index <= currentStep ? "text-vanilla-800 font-medium" : ""}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      index < currentStep
                        ? "bg-vanilla-500 text-white"
                        : index === currentStep
                          ? "bg-vanilla-200 text-vanilla-800"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? <Check className="w-3 h-3" /> : <span className="text-xs">{index + 1}</span>}
                  </div>
                  <span className="hidden md:inline">{step.title}</span>
                </div>
              ))}
            </div>
          </Card3DContent>
        </Card3D>

        {/* Form Content */}
        <Card3D className="mb-8">
          <Card3DContent className="p-8">{renderCurrentStep()}</Card3DContent>
        </Card3D>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button3D
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            icon={<ChevronLeft className="w-4 h-4 bg-transparent" />}
          >
            Previous
          </Button3D>

          {currentStep < steps.length - 1 ? (
            <Button3D onClick={nextStep} icon={<ChevronRight className="w-4 h-4" />}>
              Next Step
            </Button3D>
          ) : (
            <Button3D
              variant="success"
              onClick={() => {
                // Handle form submission
                console.log("Form submitted:", formData)
              }}
              icon={<Check className="w-4 h-4" />}
            >
              Submit Application
            </Button3D>
          )}
        </div>
      </div>
    </div>
  )
}
