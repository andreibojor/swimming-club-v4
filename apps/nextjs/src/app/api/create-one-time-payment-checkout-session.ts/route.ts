import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getURL } from "@/libs/helpers";
import { stripe } from "@/libs/stripe";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {
  const {
    price,
    quantity = 1,
    metadata = {},
    studentIdStripe,
  } = await request.json();

  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    const sessionOptions = {
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      allow_promotion_codes: true,
      metadata: {
        ...metadata,
        studentIdStripe, // Add studentId to the metadata
      },
      success_url: `${getURL()}/`,
      cancel_url: `${getURL()}/`,
    };

    // Handle one time payment logic
    if (price.type === "one_time") {
      const { data: studentData } = await supabase
        .from("students")
        .select("id, lessons_left")
        .eq("id", studentIdStripe)
        .single();

      if (studentData) {
        const lessonsLeft = studentData.lessons_left || 0;

        // Update the line items quantity in sessionOptions
        sessionOptions.line_items[0].quantity = quantity;

        // Set the mode to 'payment' for one-time payments
        sessionOptions.mode = "payment";

        // Update the lessons_left in the students table
        await supabase
          .from("students")
          .update({
            lessons_left: lessonsLeft + quantity,
          })
          .eq("id", studentIdStripe);
      } else {
        // Handle the case where the student is not found
        throw new Error("Student not found");
      }
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log("Error in create-checkout-session:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
