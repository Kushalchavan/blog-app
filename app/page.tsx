"use client";

import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <>
      <Toaster />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
};

export default Home;
