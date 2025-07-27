import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Custom Shield Icon (as provided in the original file)
function Shield({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

export default function NewClaimPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-teal-600">
              <Shield className="h-6 w-6" />
              <span>EcoSure</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Policies
              </Link>
              <Link href="/claims/new" className="text-sm font-medium text-primary">
                Claims
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Payments
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?width=40&height=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-12">
          <Link href="/claims" className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Claims
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-800 mb-2">Submit a New Claim</h1>
              <p className="text-muted-foreground">
                Fill out the form below to submit a new insurance claim. We'll process your claim as quickly as
                possible.
              </p>
            </div>

            <form>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Claim Information</CardTitle>
                  <CardDescription>Provide details about your claim.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="policy-type">Policy Type</Label>
                      <Select>
                        <SelectTrigger id="policy-type">
                          <SelectValue placeholder="Select policy type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto Insurance</SelectItem>
                          <SelectItem value="home">Home Insurance</SelectItem>
                          <SelectItem value="health">Health Insurance</SelectItem>
                          <SelectItem value="life">Life Insurance</SelectItem>
                          <SelectItem value="business">Business Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="policy-number">Policy Number</Label>
                      <Select>
                        <SelectTrigger id="policy-number">
                          <SelectValue placeholder="Select your policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto-12345678">AUTO-12345678 (2022 Toyota Camry)</SelectItem>
                          <SelectItem value="home-87654321">HOME-87654321 (123 Main St)</SelectItem>
                          <SelectItem value="life-98765432">LIFE-98765432 (Term Life)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incident-date">Date of Incident</Label>
                      <Input id="incident-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incident-time">Time of Incident (Approximate)</Label>
                      <Input id="incident-time" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incident-location">Location of Incident</Label>
                    <Input id="incident-location" placeholder="Enter the address or location" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description of Incident</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide a detailed description of what happened, including the sequence of events, parties involved, and any damages."
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimated-damage">Estimated Damage Amount (if known)</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input id="estimated-damage" placeholder="0.00" type="number" className="pl-7" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Supporting Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload photos, police reports, medical reports, or any other relevant documents to support your
                      claim.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="photos">Photos of Damage</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="photos"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                              <Upload className="w-8 h-8 mb-2 text-gray-400" />
                              <p className="mb-1 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG (MAX. 10MB)</p>
                            </div>
                            <input id="photos" type="file" multiple className="hidden" />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="documents">Documents (e.g., Police Report)</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="documents"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                              <Upload className="w-8 h-8 mb-2 text-gray-400" />
                              <p className="mb-1 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF, DOCX (MAX. 10MB)</p>
                            </div>
                            <input id="documents" type="file" multiple className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-4 pt-6">
                  <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
                    Submit Claim
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this claim, you certify that all information provided is true and accurate to the best
                    of your knowledge.
                  </p>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-5 w-5 text-teal-600" />
            <span className="font-semibold text-gray-700">EcoSure</span>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
