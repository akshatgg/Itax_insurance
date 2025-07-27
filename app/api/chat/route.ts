import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // Simple response logic - in production, this would integrate with a proper AI service
    const response = generateResponse(message.toLowerCase())

    return NextResponse.json({
      message: response.content,
      type: response.type,
      quickReplies: response.quickReplies,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        message:
          "I'm sorry, I'm having trouble responding right now. Please call us at 8770877270 for immediate assistance.",
        type: "text",
      },
      { status: 500 },
    )
  }
}

function generateResponse(message: string) {
  // Insurance quote requests
  if (message.includes("quote") || message.includes("price") || message.includes("cost")) {
    return {
      content: "I'd be happy to help you get a quote! What type of insurance are you interested in?",
      type: "quick-reply",
      quickReplies: ["Health Insurance", "Motor Insurance", "Home Insurance", "Travel Insurance"],
    }
  }

  // Claim related queries
  if (message.includes("claim") || message.includes("file claim")) {
    return {
      content: "For claims assistance, I can guide you through the process. What type of claim do you need to file?",
      type: "quick-reply",
      quickReplies: ["Health Claim", "Motor Claim", "Home Claim", "Check Claim Status"],
    }
  }

  // Policy status queries
  if (message.includes("policy") || message.includes("status") || message.includes("my policy")) {
    return {
      content:
        "To check your policy status, please provide your policy number or login to your dashboard. Would you like me to help you with something specific?",
      type: "quick-reply",
      quickReplies: ["Policy Details", "Premium Due", "Renewal", "Download Policy"],
    }
  }

  // Agent/contact queries
  if (message.includes("agent") || message.includes("contact") || message.includes("speak")) {
    return {
      content: "You can connect with our team in several ways. How would you prefer to get in touch?",
      type: "quick-reply",
      quickReplies: ["Find Local Agent", "Call Support", "Email Support", "Schedule Callback"],
    }
  }

  // Specific insurance types
  if (message.includes("health")) {
    return {
      content:
        "Our health insurance plans offer comprehensive coverage including:\n• Hospitalization expenses\n• Pre & post hospitalization\n• Day care procedures\n• Ambulance charges\n• Annual health check-ups\n\nWould you like a personalized quote?",
      type: "quick-reply",
      quickReplies: ["Get Health Quote", "Compare Plans", "Coverage Details", "Premium Calculator"],
    }
  }

  if (message.includes("motor") || message.includes("car") || message.includes("vehicle")) {
    return {
      content:
        "Our motor insurance provides complete protection:\n• Own Damage Cover\n• Third Party Liability\n• Personal Accident Cover\n• Add-on covers available\n\nDo you need a quote for your vehicle?",
      type: "quick-reply",
      quickReplies: ["Get Motor Quote", "Add-on Covers", "Claim Process", "Renewal"],
    }
  }

  if (message.includes("home") || message.includes("house")) {
    return {
      content:
        "Home insurance protects your property against:\n• Fire and allied perils\n• Burglary and theft\n• Natural disasters\n• Public liability\n\nInterested in protecting your home?",
      type: "quick-reply",
      quickReplies: ["Get Home Quote", "Coverage Details", "Premium Calculator", "Claim Process"],
    }
  }

  if (message.includes("travel")) {
    return {
      content:
        "Travel insurance covers you during your trips:\n• Medical emergencies abroad\n• Trip cancellation/interruption\n• Lost baggage protection\n• Flight delays\n• Emergency evacuation\n\nPlanning a trip?",
      type: "quick-reply",
      quickReplies: ["Get Travel Quote", "Coverage Areas", "Emergency Assistance", "Claim Process"],
    }
  }

  // Greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return {
      content:
        "Hello! Welcome to Amar IMF Services. I'm here to help you with all your insurance needs. What can I assist you with today?",
      type: "quick-reply",
      quickReplies: ["Get a Quote", "File a Claim", "Policy Information", "Find an Agent"],
    }
  }

  // Premium/payment queries
  if (message.includes("premium") || message.includes("payment") || message.includes("pay")) {
    return {
      content:
        "For premium payments and related queries:\n• Online payment options available\n• Auto-debit facility\n• Premium due reminders\n• Payment history\n\nWhat would you like to know?",
      type: "quick-reply",
      quickReplies: ["Pay Premium", "Payment History", "Auto-debit Setup", "Due Reminders"],
    }
  }

  // Renewal queries
  if (message.includes("renew") || message.includes("renewal")) {
    return {
      content:
        "Policy renewal is easy with us:\n• Online renewal available\n• No-claim bonus benefits\n• Flexible payment options\n• Instant policy issuance\n\nNeed help with renewal?",
      type: "quick-reply",
      quickReplies: ["Renew Policy", "Renewal Benefits", "Payment Options", "Check Eligibility"],
    }
  }

  // Default response
  return {
    content:
      "I'm here to help you with insurance-related queries. For specific assistance, you can also:\n\n📞 Call: 8770877270\n📧 Email: support@amarimf.com\n🏢 Visit: G41, Gandhi Nagar, Padav, Gwalior\n\nOur team is available 24/7 to assist you.",
    type: "quick-reply",
    quickReplies: ["Get a Quote", "File a Claim", "Find an Agent", "Contact Support"],
  }
}
