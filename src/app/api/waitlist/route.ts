import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface WaitlistRequestBody {
  email: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: WaitlistRequestBody;

  try {
    body = (await request.json()) as WaitlistRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Cererea nu este valida." },
      { status: 400 }
    );
  }

  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Adresa de email este obligatorie." },
      { status: 400 }
    );
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "Adresa de email nu este valida." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: trimmedEmail });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Acest email este deja inregistrat." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "A aparut o eroare. Te rugam sa incerci din nou." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Te-am adaugat pe lista!" },
    { status: 201 }
  );
}
