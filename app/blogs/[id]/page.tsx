"use client";
import { assets } from "@/assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params?.id;

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/blog", {
        params: {
          id,
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blog data: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  return (
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
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-custom-shadow">
            Get started <Image src={assets.arrow} alt="arrow logo" />
          </button>
        </div>

        <div className="text-center my-24">
          {isLoading ? (
            <>
              <Skeleton height={40} width={300} />
              <Skeleton circle={true} height={60} width={60} className="mt-6" />
              <Skeleton width={200} height={20} className="mt-1" />
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
                {data?.title}
              </h1>
              <Image
                className="mx-auto mt-6 border border-white rounded-full"
                src={data?.authorImg || "/profile_icon.png"}
                alt="author image"
                width={60}
                height={60}
              />
              <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
                {data?.author}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        {isLoading ? (
          <Skeleton height={400} />
        ) : (
          <Image
            src={data?.image || "/profile_icon.png"}
            width={1280}
            height={720}
            alt="image"
            className="border-4 border-white"
          />
        )}
        <div className="blog-content mt-6">
          {isLoading ? (
            <Skeleton count={5} />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: data?.description || "" }}
            />
          )}
        </div>

        <div className="my-24">
          {isLoading ? (
            <Skeleton width={200} height={20} />
          ) : (
            <p className="text-black font-semibold my-4">
              Share this article on social media
            </p>
          )}

          <div className="flex gap-2">
            {isLoading ? (
              <Skeleton circle={true} height={50} width={50} count={3} />
            ) : (
              <>
                <Image
                  src={assets.facebook_icon}
                  width={50}
                  alt="facebook icon"
                />
                <Image
                  src={assets.twitter_icon}
                  width={50}
                  alt="twitter icon"
                />
                <Image
                  src={assets.googleplus_icon}
                  width={50}
                  alt="google icon"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
