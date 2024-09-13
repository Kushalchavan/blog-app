"use client";
import BlogTableItem from "@/components/adminComponents/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Blog {
  _id: string;
  title: string;
  author: string;
  authorImg: string;
  date: string;
}

const page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const deleteBlog = async (mongoId: string) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: {
          id: mongoId,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting blog: ", error);
      toast.error("Error while deleting blog");
    }
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author name
              </th>
              <th scope="col" className=" px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className=" px-6 py-3">
                Date
              </th>
              <th scope="col" className=" px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => {
              return (
                <BlogTableItem
                  key={item._id}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={new Date(item.date)}
                  delteBlog={deleteBlog}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
