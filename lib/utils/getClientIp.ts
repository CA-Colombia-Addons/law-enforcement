export function getClientIp(request: Request): string | undefined {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf;

  const xReal = request.headers.get("x-real-ip");
  if (xReal) return xReal;

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map(p => p.trim()).filter(Boolean);
    if (parts.length) return parts[0];
  }

  return undefined;
}
