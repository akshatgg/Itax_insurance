"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, User, Heart, AlertTriangle } from "lucide-react"

interface MedicalRecord {
  id: string
  name: string
  relationship: string
  dateOfBirth: string
  gender: string
  height: string
  weight: string
  bloodGroup: string
  preExistingConditions: string[]
  medications: string
  allergies: string
  lastCheckup: string
  smokingStatus: string
  alcoholConsumption: string
  exerciseFrequency: string
  chronicDiseases: string[]
  surgicalHistory: string
  familyHistory: string
}

interface FamilyMedicalRecordsProps {
  onRecordsUpdate?: (records: MedicalRecord[]) => void
}

const relationshipOptions = [
  "Self",
  "Spouse",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Father-in-law",
  "Mother-in-law",
  "Other",
]

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"]

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Thyroid",
  "Arthritis",
  "High Cholesterol",
  "Kidney Disease",
  "Liver Disease",
  "Cancer",
  "Stroke",
  "Depression",
  "Anxiety",
]

const chronicDiseaseOptions = [
  "Diabetes Type 1",
  "Diabetes Type 2",
  "Hypertension",
  "Heart Disease",
  "COPD",
  "Asthma",
  "Kidney Disease",
  "Liver Disease",
  "Arthritis",
  "Osteoporosis",
  "Thyroid Disorders",
  "Epilepsy",
]

export default function FamilyMedicalRecords({ onRecordsUpdate }: FamilyMedicalRecordsProps) {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      name: "",
      relationship: "Self",
      dateOfBirth: "",
      gender: "",
      height: "",
      weight: "",
      bloodGroup: "",
      preExistingConditions: [],
      medications: "",
      allergies: "",
      lastCheckup: "",
      smokingStatus: "",
      alcoholConsumption: "",
      exerciseFrequency: "",
      chronicDiseases: [],
      surgicalHistory: "",
      familyHistory: "",
    },
  ])

  const [expandedRecord, setExpandedRecord] = useState<string>("1")

  const addNewRecord = () => {
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      name: "",
      relationship: "Spouse",
      dateOfBirth: "",
      gender: "",
      height: "",
      weight: "",
      bloodGroup: "",
      preExistingConditions: [],
      medications: "",
      allergies: "",
      lastCheckup: "",
      smokingStatus: "",
      alcoholConsumption: "",
      exerciseFrequency: "",
      chronicDiseases: [],
      surgicalHistory: "",
      familyHistory: "",
    }

    const updatedRecords = [...records, newRecord]
    setRecords(updatedRecords)
    setExpandedRecord(newRecord.id)

    if (onRecordsUpdate) {
      onRecordsUpdate(updatedRecords)
    }
  }

  const removeRecord = (id: string) => {
    if (records.length > 1) {
      const updatedRecords = records.filter((record) => record.id !== id)
      setRecords(updatedRecords)

      if (expandedRecord === id) {
        setExpandedRecord(updatedRecords[0]?.id || "")
      }

      if (onRecordsUpdate) {
        onRecordsUpdate(updatedRecords)
      }
    }
  }

  const updateRecord = (id: string, field: keyof MedicalRecord, value: any) => {
    const updatedRecords = records.map((record) => (record.id === id ? { ...record, [field]: value } : record))
    setRecords(updatedRecords)

    if (onRecordsUpdate) {
      onRecordsUpdate(updatedRecords)
    }
  }

  const toggleCondition = (recordId: string, condition: string) => {
    const record = records.find((r) => r.id === recordId)
    if (!record) return

    const updatedConditions = record.preExistingConditions.includes(condition)
      ? record.preExistingConditions.filter((c) => c !== condition)
      : [...record.preExistingConditions, condition]

    updateRecord(recordId, "preExistingConditions", updatedConditions)
  }

  const toggleChronicDisease = (recordId: string, disease: string) => {
    const record = records.find((r) => r.id === recordId)
    if (!record) return

    const updatedDiseases = record.chronicDiseases.includes(disease)
      ? record.chronicDiseases.filter((d) => d !== disease)
      : [...record.chronicDiseases, disease]

    updateRecord(recordId, "chronicDiseases", updatedDiseases)
  }

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return ""
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age > 0 ? `${age} years` : ""
  }

  const calculateBMI = (height: string, weight: string) => {
    if (!height || !weight) return ""

    const heightInM = Number.parseFloat(height) / 100
    const weightInKg = Number.parseFloat(weight)

    if (heightInM > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInM * heightInM)
      return bmi.toFixed(1)
    }

    return ""
  }

  const getBMICategory = (bmi: string) => {
    const bmiValue = Number.parseFloat(bmi)
    if (bmiValue < 18.5) return { category: "Underweight", color: "text-blue-600" }
    if (bmiValue < 25) return { category: "Normal", color: "text-green-600" }
    if (bmiValue < 30) return { category: "Overweight", color: "text-yellow-600" }
    return { category: "Obese", color: "text-red-600" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-vanilla-900">Family Medical Records</h3>
          <p className="text-sm text-muted-foreground">Add medical information for all family members to be covered</p>
        </div>
        <Button onClick={addNewRecord} className="bg-vanilla-600 hover:bg-vanilla-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-6">
        {records.map((record) => (
          <Card key={record.id} className="border-vanilla-200">
            <CardHeader
              className="cursor-pointer"
              onClick={() => setExpandedRecord(expandedRecord === record.id ? "" : record.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-vanilla-100 rounded-full">
                    <User className="h-4 w-4 text-vanilla-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{record.name || `${record.relationship} (Unnamed)`}</CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span>{record.relationship}</span>
                      {record.dateOfBirth && (
                        <>
                          <span>•</span>
                          <span>{calculateAge(record.dateOfBirth)}</span>
                        </>
                      )}
                      {record.gender && (
                        <>
                          <span>•</span>
                          <span>{record.gender}</span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {record.preExistingConditions.length > 0 && (
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {record.preExistingConditions.length} Condition
                      {record.preExistingConditions.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                  {records.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeRecord(record.id)
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedRecord === record.id && (
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${record.id}`}>Full Name *</Label>
                    <Input
                      id={`name-${record.id}`}
                      value={record.name}
                      onChange={(e) => updateRecord(record.id, "name", e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`relationship-${record.id}`}>Relationship *</Label>
                    <Select
                      value={record.relationship}
                      onValueChange={(value) => updateRecord(record.id, "relationship", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {relationshipOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dob-${record.id}`}>Date of Birth *</Label>
                    <Input
                      id={`dob-${record.id}`}
                      type="date"
                      value={record.dateOfBirth}
                      onChange={(e) => updateRecord(record.id, "dateOfBirth", e.target.value)}
                    />
                    {record.dateOfBirth && (
                      <p className="text-sm text-muted-foreground">Age: {calculateAge(record.dateOfBirth)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gender-${record.id}`}>Gender *</Label>
                    <Select value={record.gender} onValueChange={(value) => updateRecord(record.id, "gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`height-${record.id}`}>Height (cm)</Label>
                    <Input
                      id={`height-${record.id}`}
                      type="number"
                      value={record.height}
                      onChange={(e) => updateRecord(record.id, "height", e.target.value)}
                      placeholder="e.g., 170"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`weight-${record.id}`}>Weight (kg)</Label>
                    <Input
                      id={`weight-${record.id}`}
                      type="number"
                      value={record.weight}
                      onChange={(e) => updateRecord(record.id, "weight", e.target.value)}
                      placeholder="e.g., 70"
                    />
                    {record.height && record.weight && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">BMI: </span>
                        <span className={getBMICategory(calculateBMI(record.height, record.weight)).color}>
                          {calculateBMI(record.height, record.weight)} (
                          {getBMICategory(calculateBMI(record.height, record.weight)).category})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`bloodGroup-${record.id}`}>Blood Group</Label>
                    <Select
                      value={record.bloodGroup}
                      onValueChange={(value) => updateRecord(record.id, "bloodGroup", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroupOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`lastCheckup-${record.id}`}>Last Health Checkup</Label>
                    <Input
                      id={`lastCheckup-${record.id}`}
                      type="date"
                      value={record.lastCheckup}
                      onChange={(e) => updateRecord(record.id, "lastCheckup", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`smoking-${record.id}`}>Smoking Status</Label>
                    <Select
                      value={record.smokingStatus}
                      onValueChange={(value) => updateRecord(record.id, "smokingStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select smoking status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Never">Never</SelectItem>
                        <SelectItem value="Former">Former Smoker</SelectItem>
                        <SelectItem value="Occasional">Occasional</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Pre-existing Conditions */}
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-red-500" />
                    Pre-existing Medical Conditions
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {commonConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`${record.id}-${condition}`}
                          checked={record.preExistingConditions.includes(condition)}
                          onChange={() => toggleCondition(record.id, condition)}
                          className="rounded border-gray-300 text-vanilla-600 focus:ring-vanilla-500"
                        />
                        <Label htmlFor={`${record.id}-${condition}`} className="text-sm font-normal cursor-pointer">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chronic Diseases */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Chronic Diseases</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {chronicDiseaseOptions.map((disease) => (
                      <div key={disease} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`${record.id}-chronic-${disease}`}
                          checked={record.chronicDiseases.includes(disease)}
                          onChange={() => toggleChronicDisease(record.id, disease)}
                          className="rounded border-gray-300 text-vanilla-600 focus:ring-vanilla-500"
                        />
                        <Label
                          htmlFor={`${record.id}-chronic-${disease}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {disease}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`medications-${record.id}`}>Current Medications</Label>
                    <Textarea
                      id={`medications-${record.id}`}
                      value={record.medications}
                      onChange={(e) => updateRecord(record.id, "medications", e.target.value)}
                      placeholder="List current medications, dosage, and frequency"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`allergies-${record.id}`}>Allergies</Label>
                    <Textarea
                      id={`allergies-${record.id}`}
                      value={record.allergies}
                      onChange={(e) => updateRecord(record.id, "allergies", e.target.value)}
                      placeholder="Food allergies, drug allergies, environmental allergies"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`surgical-${record.id}`}>Surgical History</Label>
                    <Textarea
                      id={`surgical-${record.id}`}
                      value={record.surgicalHistory}
                      onChange={(e) => updateRecord(record.id, "surgicalHistory", e.target.value)}
                      placeholder="Previous surgeries, dates, and outcomes"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`family-history-${record.id}`}>Family Medical History</Label>
                    <Textarea
                      id={`family-history-${record.id}`}
                      value={record.familyHistory}
                      onChange={(e) => updateRecord(record.id, "familyHistory", e.target.value)}
                      placeholder="Hereditary conditions, family medical history"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Lifestyle Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`alcohol-${record.id}`}>Alcohol Consumption</Label>
                    <Select
                      value={record.alcoholConsumption}
                      onValueChange={(value) => updateRecord(record.id, "alcoholConsumption", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select alcohol consumption" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Never">Never</SelectItem>
                        <SelectItem value="Rarely">Rarely</SelectItem>
                        <SelectItem value="Social">Social Drinker</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Heavy">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`exercise-${record.id}`}>Exercise Frequency</Label>
                    <Select
                      value={record.exerciseFrequency}
                      onValueChange={(value) => updateRecord(record.id, "exerciseFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exercise frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Never">Never</SelectItem>
                        <SelectItem value="Rarely">Rarely (1-2 times/month)</SelectItem>
                        <SelectItem value="Sometimes">Sometimes (1-2 times/week)</SelectItem>
                        <SelectItem value="Regular">Regular (3-4 times/week)</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="border-vanilla-200 bg-vanilla-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-vanilla-900">Medical Records Summary</h4>
              <p className="text-sm text-muted-foreground">
                {records.length} family member{records.length !== 1 ? "s" : ""} added
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                Pre-existing conditions:{" "}
                {records.reduce((total, record) => total + record.preExistingConditions.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Chronic diseases: {records.reduce((total, record) => total + record.chronicDiseases.length, 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
