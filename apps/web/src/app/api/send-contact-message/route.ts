import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Initialize the Resend client with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json(
      { success: false, error: "Supabase server configuration is missing" },
      { status: 500 },
    );
  }

  // Check if the Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { success: false, error: "RESEND_API_KEY is not configured" },
      { status: 500 },
    );
  }
  // try to process the contact message
  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // constants for the contact message
    const { name, phone, email, message } = await req.json();

    // validate the contact message fields
    if (!name || !phone || !email || !message) {
      return Response.json(
        { success: false, error: "All fields are required" },
        { status: 400 },
      );
    }

    // insert the contact message into the database
    const { data, error: dbError } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          phone,
          email,
          message,
          status: "new",
        },
      ])
      .select()
      .single();

    // send a confirmation email to the user
    if (dbError || !data) {
      console.error("Contact message insert error:", dbError);
      return Response.json(
        { success: false, error: "Failed to insert contact message" },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: "orders@resend.dev",
      to: email,
      subject: "We received your message",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f3274c;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We received your message and will get back to you soon.</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p>${message}</p>
          </div>
          <p>Best regards,<br/>Pizza Hut Team</p>
        </div>
        `,
    });

    await resend.emails.send({
      from: "orders@resend.dev",
      to: "oleg4troian@gmail.com",
      subject: `New contact message from ${name}`,
      html: `
            <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Contact message error:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
