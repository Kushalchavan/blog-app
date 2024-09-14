import { assets } from "@/assets/assets";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface Props {
  mongoId: string;
  title: string;
  author: string;
  authorImg: StaticImageData | string;
  date: Date;
  deleteBlog: (mongoId: string) => Promise<void>;
}

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}: Props) => {
  const BlogDate = new Date(date).toLocaleDateString();

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg || assets.profile_icon}
          alt="profile icon"
          width={40}
          height={40}
        />
        <p>{author || "No author"}</p>
      </th>
      <td className="px-6 py-4">{title || "No title"}</td>
      <td className="px-6 py-4">{BlogDate}</td>
      <td
        onClick={() => deleteBlog(mongoId)}
        className="px-6 py-4 cursor-pointer"
      >
        x
      </td>
    </tr>
  );
};

export default BlogTableItem;
