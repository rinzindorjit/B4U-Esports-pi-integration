import { type NextRequest, NextResponse } from "next/server"

const PI_API_KEY = process.env.PI_API_KEY
const PI_API_BASE_URL = "https://api.minepi.com/v2"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, paymentData } = await request.json()

    if (!PI_API_KEY) {
      return NextResponse.json({ error: "Pi API key not configured" }, { status: 500 })
    }

    // Call Pi Network API to approve the payment
    const response = await fetch(`${PI_API_BASE_URL}/payments/${paymentId}/approve`, {
      method: "POST",
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Pi API approval error:", errorData)
      return NextResponse.json({ error: "Payment approval failed", details: errorData }, { status: response.status })
    }

    const result = await response.json()

    // Log the payment for your records
    console.log("Payment approved:", {
      paymentId,
      paymentData,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      paymentId,
      result,
    })
  } catch (error) {
    console.error("Payment approval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
