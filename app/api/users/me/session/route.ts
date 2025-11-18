import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const AUTH_TOKEN = cookieStore.get("AUTH_TOKEN")?.value;

    return NextResponse.json({ token: AUTH_TOKEN });
}