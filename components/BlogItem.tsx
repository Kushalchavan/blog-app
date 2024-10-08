import { assets } from "@/assets/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  category: string;
  image: StaticImageData;
  id: number;
}

const BlogItem = ({ title, description, category, image, id }: Props) => {
  return (
    <div className="max-w-[30px] sm:max-w-[300px] max-sm:max-w-[300px] bg-white border border-black hover:shadow-custom-shadow transition-shadow duration-300">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt="blog image"
          width={400}
          height={400}
          className="border-b border-black"
        />

        <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
          {category}
        </p>
        <div className="p-5">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
            {title}
          </h5>
          <p
            className="mb-3 text-sm tracking-tight text-gray-700"
            dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
          ></p>
          <div className="inline-flex items-center py-2 font-semibold text-center">
            Read more{" "}
            <Image
              src={assets.arrow}
              alt="arrow icon"
              width={12}
              className="ml-2"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;
