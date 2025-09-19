import { type NextRequest, NextResponse } from "next/server"

const PI_API_KEY = process.env.PI_API_KEY
const PI_API_BASE_URL = "https://api.minepi.com/v2"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, txid, paymentData } = await request.json()

    if (!PI_API_KEY) {
      return NextResponse.json({ error: "Pi API key not configured" }, { status: 500 })
    }

    // Call Pi Network API to complete the payment
    const response = await fetch(`${PI_API_BASE_URL}/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txid }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Pi API completion error:", errorData)
      return NextResponse.json({ error: "Payment completion failed", details: errorData }, { status: response.status })
    }

    const result = await response.json()

    // Log the completed payment for your records
    console.log("Payment completed:", {
      paymentId,
      txid,
      paymentData,
      timestamp: new Date().toISOString(),
    })

    // Here you would typically:
    // 1. Update your database with the completed payment
    // 2. Process the order (deliver UC/Diamonds/Services)
    // 3. Send confirmation email to user
    // 4. Update user's account balance or inventory

    return NextResponse.json({
      success: true,
      paymentId,
      txid,
      result,
    })
  } catch (error) {
    console.error("Payment completion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
