import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Todo bien, Fernando" });
}