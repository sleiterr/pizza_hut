import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

import mailchimp from "@/utils/mailchimp";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        },
      );
    }

    console.log("EMAIL:", email);
    console.log("SUPABASE URL:", process.env.SUPABASE_URL);
    console.log("HAS KEY:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }

    try {
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
        email_address: email,
        status: "subscribed",
      });
    } catch (error) {
      console.log("Mailchimp error:", error);
    }

    return NextResponse.json(
      {
        message: "Subscribed successfully",
        data,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("NEWSLETTER ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
