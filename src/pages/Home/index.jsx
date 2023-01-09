import React from "react";
import FABWhatsApp from "../../components/global/FABWhatsApp";
import FlowOrder from "./FlowOrder";
import Hero from "./Hero";
import OurProduct from "./OurProduct";
import PAD from "./PAD";
import WhyUs from "./WhyUs";

const Home = () => {
  return (
    <>
      <FABWhatsApp />
      <main>
        <Hero />
        <WhyUs />
        <FlowOrder />
        <OurProduct />
        <PAD />
      </main>
    </>
  );
};

export default Home;
