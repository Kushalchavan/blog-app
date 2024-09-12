"use client";
import { assets } from "@/assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BlogData {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  date: number;
  category: string;
  author: string;
  authorImg: StaticImageData;
}

const BlogPage = () => {
  const [data, setData] = useState<BlogData | null>(null);

  const params = useParams();
  const id = params?.id;

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: {
          id,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt="logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black  shadow-custom-shadow">
            Get started <Image src={assets.arrow} alt="arrow logo" />
          </button>
        </div>
        <div className="text-center my-24 ">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.authorImg}
            alt="author image"
            width={60}
            height={60}
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt="image"
          className="border-4 border-white"
        />
        <h1 className="py-8 text-[26px] font-semibold">Introduction:</h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[28px] font-semibold">
          Step 1: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          eaque ut laboriosam, facere nostrum sed non dicta tenetur unde id ab
          temporibus explicabo beatae rerum.
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aut
          nostrum recusandae ut quod veniam nulla hic eaque ex quo obcaecati,
          quae, officia accusamus dolorem rem sed. Pariatur, animi iusto.
        </p>
        <h3 className="my-5 text-[28px] font-semibold">
          Step 2: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          eaque ut laboriosam, facere nostrum sed non dicta tenetur unde id ab
          temporibus explicabo beatae rerum.
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aut
          nostrum recusandae ut quod veniam nulla hic eaque ex quo obcaecati,
          quae, officia accusamus dolorem rem sed. Pariatur, animi iusto.
        </p>
        <h3 className="my-5 text-[28px] font-semibold">
          Step 3: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          eaque ut laboriosam, facere nostrum sed non dicta tenetur unde id ab
          temporibus explicabo beatae rerum.
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aut
          nostrum recusandae ut quod veniam nulla hic eaque ex quo obcaecati,
          quae, officia accusamus dolorem rem sed. Pariatur, animi iusto.
        </p>

        <h3 className="my-5 text-[28px] font-semibold">Conclusion:</h3>
        <p className="my-3">
          Managing your lifestyle is journey that requires and self-awareness.
          by following this step-by-step guide, you can take control of you life
          make meaningful changes that lead to a more balanced and fullfiling
          lifestyle. Remember that it's okay to seek support and guidance from
          professionals or mentor along the way you well-being and happines are
          worth the effort.
        </p>
        <div className="my-24 ">
          <p className="text-black font-semibold my-4">
            Share this articles on social media
          </p>

          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="facebook icon" />
            <Image src={assets.twitter_icon} width={50} alt="twitter icon" />
            <Image src={assets.googleplus_icon} width={50} alt="google icon" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default BlogPage;
