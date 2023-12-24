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
      subscription_data: {
        trial_from_plan: true,
        metadata: {
          ...metadata,
          studentIdStripe, // Add studentId to the metadata
        },
      },
      success_url: `${getURL()}/`,
      cancel_url: `${getURL()}/`,
    };

    // Handle recurring subscription logic
    if (price.type === "recurring") {
      sessionOptions.mode = "subscription";
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log("Error in create-checkout-session:", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
