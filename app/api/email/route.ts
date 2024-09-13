import { connectDb } from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextRequest, NextResponse } from "next/server";

const loadDB = async () => {
  await connectDb();
};
loadDB();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, message: "Email Subscribe" });
}
