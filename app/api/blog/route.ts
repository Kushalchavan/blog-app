import { connectDb } from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/blogModal";
import fs from "fs/promises";

const LoadDB = async () => {
  await connectDb();
};

// Get all blogs or a specific blog by ID
export async function GET(request: NextRequest) {
  try {
    await LoadDB();
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

// API endpoint for uploading blogs
export async function POST(request: NextRequest) {
  try {
    await LoadDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    // Handling the image file
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
      title: formData.get("title")?.toString(),
      description: formData.get("description")?.toString(),
      category: formData.get("category")?.toString(),
      author: formData.get("author")?.toString(),
      image: imgUrl,
      authorImg: formData.get("authorImg")?.toString(),
    };

    // Validation check for required fields
    if (!blogData.title || !blogData.author) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await BlogModel.create(blogData);
    return NextResponse.json(
      { success: true, message: "Blog Added" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading blog:", error);
    return NextResponse.json(
      { message: "Error while uploading blog" },
      { status: 500 }
    );
  }
}

// Creating API endpoint to delete blog
export async function DELETE(request: NextRequest) {
  try {
    await LoadDB();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Delete the associated image
    const imagePath = `./public${blog.image}`;
    try {
      await fs.unlink(imagePath); // Handle file removal
    } catch (err) {
      console.error("Error deleting image file:", err);
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Blog Deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Error while deleting blog" },
      { status: 500 }
    );
  }
}
