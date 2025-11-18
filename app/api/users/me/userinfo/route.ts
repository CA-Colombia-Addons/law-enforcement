import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const AUTH_TOKEN = cookieStore.get("AUTH_TOKEN")?.value;

    const data = await fetch("https://api.cacolombia.com/v1/users/@me/userinfo", {
        method: "GET",
        next: { revalidate: 300 },
        headers: {
            "Authorization": `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json"
        }
    }).then(r => r.json()).catch(e => {
        console.error(e);
        return;
    });

    if(!data || data.error) return NextResponse.json({ error: "Unknown User", message: data.error ?? "" });

    return NextResponse.json(data);
}