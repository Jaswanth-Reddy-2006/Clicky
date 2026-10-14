import { NextResponse } from "next/server";
import { demoStore } from "@/lib/store/demo-store";

export async function POST() {
  demoStore.resetDemoData();
  return NextResponse.json({
    success: true,
    message: "Demo state successfully reset to initial seed values!",
  });
}
