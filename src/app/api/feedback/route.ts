import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface FeedbackRequestBody {
  message: string;
  email?: string;
  page?: string;
}

export async function POST(request: Request) {
  let body: FeedbackRequestBody;

  try {
    body = (await request.json()) as FeedbackRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Cererea nu este valida." },
      { status: 400 }
    );
  }

  const { message, email, page } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "Mesajul este obligatoriu." },
      { status: 400 }
    );
  }

  if (message.trim().length > 2000) {
    return NextResponse.json(
      { error: "Mesajul este prea lung (max 2000 caractere)." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("feedback").insert({
    message: message.trim(),
    email: email?.trim() || null,
    page: page?.trim() || null,
    user_id: user?.id || null,
  });

  if (error) {
    return NextResponse.json(
      { error: "A aparut o eroare. Te rugam sa incerci din nou." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Multumim pentru feedback!" },
    { status: 201 }
  );
}
