import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    let body = await req.formData();
    body = Object.fromEntries(body); 

    console.log("Received payment callback:", body);

    // Check if payment exists
    const p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
      console.error("Order ID not found in DB");
      return NextResponse.json({ success: false, message: "Order ID not found" });
    }

    //fetch the secret of the user who is getting the payment
    let user= await User.findOne({username: p.to_user})
    const secret = user.razorpaySecret


    // Verify payment
    const isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id, // ✅ use correct payment_id
      },
      body.razorpay_signature,
      secret
    );

    if (isValid) {
      // Update payment status
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: "true" },
        { new: true }
      );

      console.log("Payment verified & updated:", updatedPayment);

      // Optionally redirect (if your flow expects it)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?payment=true`
      );
    } else {
      console.error("Payment verification failed");
      return NextResponse.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("API /api/razorpay error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
};
