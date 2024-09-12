import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
import { StaticImageData } from "next/image";

interface Blog {
  _id: number;
  id: string;
  image: StaticImageData;
  category: string;
  title: string;
  description: string;
}

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All"
              ? "bg-black text-white py-1 px-4 rounded-sm transition-colors duration-500"
              : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm transition-colors duration-500"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup"
              ? "bg-black text-white py-1 px-4 rounded-sm transition-colors duration-500"
              : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm transition-colors duration-500"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                image={item.image}
                category={item.category}
                title={item.title}
                description={item.description}
                id={item._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
