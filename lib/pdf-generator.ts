import jsPDF from "jspdf"
import "jspdf-autotable"

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

export const generateInsurancePDF = async (formData: FormData) => {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(255, 248, 220) // Vanilla background
  doc.rect(0, 0, 210, 40, "F")

  // Company Logo and Title
  doc.setFontSize(24)
  doc.setTextColor(139, 69, 19) // Vanilla-800
  doc.text("Trusted Protection Insurance", 20, 25)

  doc.setFontSize(16)
  doc.setTextColor(101, 163, 13) // Vanilla-600
  doc.text("Insurance Application Form", 20, 35)

  // Application Details
  let yPosition = 60

  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text("Application Details", 20, yPosition)
  yPosition += 10

  doc.setFontSize(10)
  doc.text(`Application Date: ${new Date().toLocaleDateString()}`, 20, yPosition)
  yPosition += 5
  doc.text(
    `Insurance Type: ${formData.insuranceType.charAt(0).toUpperCase() + formData.insuranceType.slice(1)} Insurance`,
    20,
    yPosition,
  )
  yPosition += 15

  // Personal Information
  doc.setFontSize(14)
  doc.setTextColor(139, 69, 19)
  doc.text("Personal Information", 20, yPosition)
  yPosition += 10

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)

  const personalInfo = [
    ["Name", `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`],
    ["Email", formData.personalInfo.email],
    ["Phone", formData.personalInfo.phone],
    ["Date of Birth", formData.personalInfo.dateOfBirth || "Not provided"],
    ["Gender", formData.personalInfo.gender || "Not provided"],
    ["Occupation", formData.personalInfo.occupation || "Not provided"],
    ["Annual Income", formData.personalInfo.annualIncome || "Not provided"],
    [
      "Address",
      `${formData.personalInfo.address.street}, ${formData.personalInfo.address.city}, ${formData.personalInfo.address.state} ${formData.personalInfo.address.zipCode}`,
    ],
  ]
  ;(doc as any).autoTable({
    startY: yPosition,
    head: [["Field", "Value"]],
    body: personalInfo,
    theme: "grid",
    headStyles: { fillColor: [255, 248, 220], textColor: [139, 69, 19] },
    styles: { fontSize: 9 },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 20

  // Family Members
  if (formData.familyMembers.length > 0) {
    doc.setFontSize(14)
    doc.setTextColor(139, 69, 19)
    doc.text(`Family Members (${formData.familyMembers.length})`, 20, yPosition)
    yPosition += 10

    const familyData = formData.familyMembers.map((member, index) => [
      `Member ${index + 1}`,
      member.name || "Not provided",
      member.relationship || "Not provided",
      member.dateOfBirth || "Not provided",
      member.gender || "Not provided",
      member.occupation || "Not provided",
      member.medicalHistory.length > 0 ? member.medicalHistory.join(", ") : "None",
    ])
    ;(doc as any).autoTable({
      startY: yPosition,
      head: [["#", "Name", "Relationship", "DOB", "Gender", "Occupation", "Medical History"]],
      body: familyData,
      theme: "grid",
      headStyles: { fillColor: [255, 248, 220], textColor: [139, 69, 19] },
      styles: { fontSize: 8 },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 20
  }

  // Insurance Details
  if (Object.keys(formData.insuranceDetails).length > 0) {
    doc.setFontSize(14)
    doc.setTextColor(139, 69, 19)
    doc.text("Insurance Specific Details", 20, yPosition)
    yPosition += 10

    const detailsData = Object.entries(formData.insuranceDetails).map(([key, value]) => [
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      String(value),
    ])
    ;(doc as any).autoTable({
      startY: yPosition,
      head: [["Field", "Value"]],
      body: detailsData,
      theme: "grid",
      headStyles: { fillColor: [255, 248, 220], textColor: [139, 69, 19] },
      styles: { fontSize: 9 },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 20
  }

  // Coverage Preferences
  doc.setFontSize(14)
  doc.setTextColor(139, 69, 19)
  doc.text("Coverage Preferences", 20, yPosition)
  yPosition += 10

  const preferencesData = [
    ["Coverage Amount", `₹${formData.preferences.coverageAmount || "Not selected"}`],
    ["Deductible", `₹${formData.preferences.deductible || "Not selected"}`],
    [
      "Payment Frequency",
      formData.preferences.paymentFrequency.charAt(0).toUpperCase() + formData.preferences.paymentFrequency.slice(1),
    ],
  ]
  ;(doc as any).autoTable({
    startY: yPosition,
    head: [["Preference", "Value"]],
    body: preferencesData,
    theme: "grid",
    headStyles: { fillColor: [255, 248, 220], textColor: [139, 69, 19] },
    styles: { fontSize: 9 },
  })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(`Page ${i} of ${pageCount}`, 190, 285)
    doc.text("Generated by Trusted Protection Insurance AI Form Builder", 20, 285)
  }

  // Save the PDF
  doc.save(`insurance-application-${formData.personalInfo.firstName}-${formData.personalInfo.lastName}.pdf`)
}

export const generateFamilyMemberPDF = async (member: FamilyMember, primaryInfo: any) => {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(255, 248, 220)
  doc.rect(0, 0, 210, 40, "F")

  doc.setFontSize(24)
  doc.setTextColor(139, 69, 19)
  doc.text("Trusted Protection Insurance", 20, 25)

  doc.setFontSize(16)
  doc.setTextColor(101, 163, 13)
  doc.text("Family Member Details", 20, 35)

  let yPosition = 60

  // Member Information
  doc.setFontSize(14)
  doc.setTextColor(139, 69, 19)
  doc.text("Family Member Information", 20, yPosition)
  yPosition += 10

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 20, yPosition)
  yPosition += 5
  doc.text(`Primary Applicant: ${primaryInfo.firstName} ${primaryInfo.lastName}`, 20, yPosition)
  yPosition += 15

  const memberInfo = [
    ["Full Name", member.name || "Not provided"],
    ["Relationship", member.relationship || "Not provided"],
    ["Date of Birth", member.dateOfBirth || "Not provided"],
    ["Gender", member.gender || "Not provided"],
    ["Occupation", member.occupation || "Not provided"],
    ["Annual Income", member.annualIncome || "Not provided"],
  ]
  ;(doc as any).autoTable({
    startY: yPosition,
    head: [["Field", "Value"]],
    body: memberInfo,
    theme: "grid",
    headStyles: { fillColor: [255, 248, 220], textColor: [139, 69, 19] },
    styles: { fontSize: 10 },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 20

  // Medical History
  doc.setFontSize(14)
  doc.setTextColor(139, 69, 19)
  doc.text("Medical History", 20, yPosition)
  yPosition += 10

  if (member.medicalHistory.length > 0) {
    const medicalData = member.medicalHistory.map((condition, index) => [`${index + 1}`, condition])
    ;(doc as any).autoTable({
      startY: yPosition,
      head: [["#", "Medical Condition"]],
      body: medicalData,
      theme: "grid",
      headStyles: { fillColor: [255, 248, 220], textColor: [139, 69, 19] },
      styles: { fontSize: 10 },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 20
  } else {
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text("No medical conditions reported", 20, yPosition)
    yPosition += 20
  }

  // Lifestyle Information
  doc.setFontSize(14)
  doc.setTextColor(139, 69, 19)
  doc.text("Lifestyle Information", 20, yPosition)
  yPosition += 10

  const lifestyleData = [
    ["Smoking", member.lifestyle.smoking ? "Yes" : "No"],
    ["Drinking", member.lifestyle.drinking ? "Yes" : "No"],
    ["Exercise Level", member.lifestyle.exercise.charAt(0).toUpperCase() + member.lifestyle.exercise.slice(1)],
  ]
  ;(doc as any).autoTable({
    startY: yPosition,
    head: [["Lifestyle Factor", "Status"]],
    body: lifestyleData,
    theme: "grid",
    headStyles: { fillColor: [255, 248, 220], textColor: [139, 69, 19] },
    styles: { fontSize: 10 },
  })

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text("Page 1 of 1", 190, 285)
  doc.text("Generated by Trusted Protection Insurance AI Form Builder", 20, 285)

  // Save the PDF
  const memberName = member.name || `family-member-${member.id}`
  doc.save(`family-member-${memberName.replace(/\s+/g, "-").toLowerCase()}.pdf`)
}
