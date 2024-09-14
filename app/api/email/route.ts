import { connectDb } from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextRequest, NextResponse } from "next/server";

const loadDB = async () => {
  await connectDb();
};
loadDB();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, message: "Email Subscribe" });
  } catch (error) {
    console.error("Erro subscribing email: ", error);
    return NextResponse.json(
      { message: "Error subscribing email" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { message: "Error fetching emails" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Email Deleted" });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json(
      { message: "Error deleting email" },
      { status: 500 }
    );
  }
}
