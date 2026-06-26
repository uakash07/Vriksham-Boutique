import Razorpay from "razorpay";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, productName } = await req.json();

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return Response.json(
        { error: "Razorpay keys not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `vb_${Date.now()}`,
      notes: { productName },
    });

    return Response.json({ orderId: order.id });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return Response.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
