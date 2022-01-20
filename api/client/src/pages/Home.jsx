import React from "react";
import Annoucement from "../component/Annoucement";
import Categories from "../component/Categories";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Header2 from "../component/Header2";
import NewRelease from "../component/NewRelease";
import Header3 from "../component/Header3";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Annoucement />
      <Header />
      <Categories />
      <Header2 />
      <NewRelease />
      <Header3 />
      <Footer />
    </div>
  );
}
