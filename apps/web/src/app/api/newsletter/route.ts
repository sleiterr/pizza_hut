import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import mailchimp from "@/utils/mailchimp";

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

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

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          message:
            "Newsletter backend is not configured: missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and/or SUPABASE_SERVICE_ROLE_KEY.",
        },
        {
          status: 500,
        },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({
        email,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            message: "This email is already subscribed.",
          },
          {
            status: 200,
          },
        );
      }

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
