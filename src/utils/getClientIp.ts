import { Request } from "express";

export function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];

  let ip: string | undefined;

  if (typeof forwarded === "string") {
    const first = forwarded.split(",")[0];
    ip = first ? first.trim() : undefined;
  } else if (Array.isArray(forwarded)) {
    ip = forwarded[0];
  } else {
    ip = req.socket.remoteAddress;
  }

  if (!ip) return "unknown";

  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }

  return ip;
}