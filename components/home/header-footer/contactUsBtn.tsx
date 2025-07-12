"use client";
import React from "react";

const ContactUsBtn = () => {
  const scrollToFooter = () => {
    const footerSection = document.getElementById("footer");
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <button className="hover:text-orange" onClick={scrollToFooter}>
      تماس با ما
    </button>
  );
};

export default ContactUsBtn;
