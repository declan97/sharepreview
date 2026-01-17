import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  if (!stripe) {
    return NextResponse.json(
      { error: "Payments are not configured yet" },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { error: "Customer portal requires account setup. Coming soon!" },
    { status: 503 }
  );
}
