"use client";
import React from "react";

const AboutUsBtn = () => {
  const scrollToAboutUs = () => {
    const aboutSection = document.getElementById("about-us-section");
    if (aboutSection) {
      const yOffset = -120;
      const y =
        aboutSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <button className="hover:text-orange" onClick={scrollToAboutUs}>
      درباره ما
    </button>
  );
};

export default AboutUsBtn;
