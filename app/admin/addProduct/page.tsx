"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "kushal chavan",
    authorImg: "/author_image.png",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);

    // Only append image if it's not null
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "kushal chavan",
          authorImg: "/author_image.png",
        });
      } else {
        toast.error("Failed to add blog.");
      }
    } catch (error) {
      toast.error("Error submitting the form.");
      console.error("Error submitting blog data: ", error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload Area"
            width={140}
            height={70}
            className="mt-4 cursor-pointer"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          onChange={onChangeHandler}
          value={data.title}
          name="title"
          type="text"
          placeholder="Type title here"
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          onChange={onChangeHandler}
          value={data.description}
          name="description"
          placeholder="Write content here"
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        />

        <p className="text-xl mt-4">Blog category</p>
        <select
          onChange={onChangeHandler}
          value={data.category}
          name="category"
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
      <Toaster />
    </>
  );
};

export default Page;
