import { NextResponse } from "next/server";
import "dotenv/config"
import { getClientIp } from "@lib/utils/getClientIp";

interface RequestBody {
    provider?: "roblox" | "discord";
    redirectUri?: string;
    state?: string;
};

interface ResponseBody {
    targetUrl: string;
    userState: string;
}

interface SecondResponseBody {
    accessSecret: string;
}

export async function POST(
  request: Request
) {
  const body = await request.json() as RequestBody;

  if((!body || !body.provider) && !body.state) {
    return NextResponse.json({ success: false, error: "Did not provide any Authentication provider in the request body." });
  }

  const { provider, redirectUri, state } = body;
  
  if(!state) {
    try {
        const response = await fetch(`https://api.cacolombia.com/v1/oauth/${provider}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.CA_COLOMBIA_AUTH_TOKEN!}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            redirectUri
          })
        });

        if(!response.ok) {
          // console.error("Error while trying to retrieve the oauth link to api.cacolombia.com.", response);
          return NextResponse.json({ success: false, error: "API replied with a non-200 status code." });
        }

        const jsonResponse = await response.json() as ResponseBody;

        if(!jsonResponse.targetUrl) {
          return  NextResponse.json({ success: false, error: "API did not provide a target URL" });
        }

        return NextResponse.json({ success: true, redirect: jsonResponse.targetUrl });
    } catch(e) {
        // console.error(e);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }

  } else {
    const clientIp = getClientIp(request);

    try {
      const response = await fetch(`https://api.cacolombia.com/v1/oauth?state=${state}&login=true&requester=${clientIp ?? ""}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.CA_COLOMBIA_AUTH_TOKEN!}`,
          "Content-Type": "application/json"
        },
      });

      if(!response.ok) {
        // console.error("Error while trying to retrieve the oauth information from api.cacolombia.com.", response, await response.json());
        return NextResponse.json({ success: false, error: "API replied with a non-200 status code." });
      }

      const jsonResponse = await response.json() as SecondResponseBody;

      if(!jsonResponse.accessSecret) {
        return  NextResponse.json({ success: false, error: "API did not provide a target URL" });
      }

      const res = NextResponse.json({ success: true })
      res.cookies.set("AUTH_TOKEN", jsonResponse.accessSecret, {
        httpOnly: true,
        path: "/",
        domain: ".cacolombia.com",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        priority: "high",
        maxAge: 60 * 60 * 24 * 365 * 100
      });
      return res;

    } catch (e) {
        // console.error(e);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
  }
  
}