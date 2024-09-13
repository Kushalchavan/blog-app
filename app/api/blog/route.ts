import { connectDb } from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/blogModal";
const fs = require("fs");

const LoadDB = async () => {
  await connectDb();
};
LoadDB();

// api endpoints to get all blogs
export async function GET(request: NextRequest) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json(blogs);
  }
}

// api end point for uploading blogs
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");

  if (!image || typeof image === "string") {
    return NextResponse.json(
      { message: "Invalid image file" },
      { status: 400 }
    );
  }

  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  const path = `./public/uploads/${timestamp}_${image.name}`;
  await writeFile(path, buffer);

  const imgUrl = `/uploads/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  console.log("blog saved");

  return NextResponse.json(
    { success: true, message: "Blog Added" },
    { status: 200 }
  );
}

// creating api endpoint to delte blog
export async function DELETE(request: NextRequest) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public/uploads${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Blog Deleted" });
}
