import mongoose, { Document, Schema } from "mongoose";

interface BlogType extends Document {
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImg: string;
  date: Date;
}

const blogSchema = new Schema<BlogType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel =
  mongoose.models.BlogModel ||
  mongoose.model<BlogType>("BlogModel", blogSchema);

export default BlogModel;
