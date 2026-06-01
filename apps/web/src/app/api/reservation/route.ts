import { NextResponse } from "next/server";

import { client } from "@/sanity/client";
import { RESERVATIONS_QUERY } from "@/sanity/queries";

// Define the expected shape of the reservation payload
function validateReservationPayload(payload: Partial<ReservationPayload>) {
  if (!payload.name || typeof payload.name !== "string") {
    return "Name is required";
  }

  // Validate guest count
  if (!payload.guestCount || Number(payload.guestCount) < 1) {
    return "Guest count must be at least 1";
  }

  // Validate date and time (basic check, can be enhanced with regex or date parsing)
  if (!payload.date || typeof payload.date !== "string") {
    return "Date is required";
  }

  // For time, we can do a basic check to ensure it's a string, but ideally, we should validate the format (e.g., HH:mm)
  if (!payload.time || typeof payload.time !== "string") {
    return "Time is required";
  }

  return null;
}

// GET /api/reservation - Fetch all reservations
export async function GET() {
  try {
    const data = await client.fetch(RESERVATIONS_QUERY);
    return NextResponse.json({ status: "ok", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch reservations",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST /api/reservation - Create a new reservation
export async function POST(req: Request) {
  try {
    // body is the parsed JSON payload from the request, we will validate it before processing
    const body = (await req.json()) as Partial<ReservationPayload>;
    const validationError = validateReservationPayload(body);

    // If there's a validation error, return a 400 Bad Request response with the error message
    if (validationError) {
      return NextResponse.json(
        { status: "error", message: validationError },
        { status: 400 },
      );
    }

    // Create a new Sanity client instance with write permissions using the API token
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    });

    // Ensure the write client is properly configured with the API token before attempting to create a reservation
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        {
          status: "error",
          message: "SANITY_API_WRITE_TOKEN is not configured",
        },
        { status: 500 },
      );
    }

    // Create a new reservation document in Sanity with the provided data
    const created = await writeClient.create({
      _type: "reservations",
      guestCount: Number(body.guestCount),
      name: body.name,
      date: body.date,
      time: body.time,
      phone: body.phone || "",
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    // Return a success response with the created reservation data
    return NextResponse.json({ status: "ok", data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        // status is "error" to indicate that the reservation creation failed, and we include an error message for debugging purposes
        status: "error",
        message: "Failed to create reservation",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

type ReservationPayload = {
  guestCount: number;
  name: string;
  date: string;
  time: string;
  phone?: string;
};
