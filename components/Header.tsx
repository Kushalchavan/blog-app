import Image from "next/image";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);

    if (response.data.success) {
      toast.success(response.data.message);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="p-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          alt=""
          width={180}
          className="w-[130px] sm:w-auto"
        />
        <Link href="/admin">
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-custom-shadow">
            Get Started <Image src={assets.arrow} alt="arrow image" />
          </button>
        </Link>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xl sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero illum
          debitis, doloremque fugit quis illo odio eveniet deserunt, animi vel
          unde, consequuntur voluptatem repellendus quam.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-custom-shadow"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black p-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
