"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AboutUsBtn = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [shouldScroll, setShouldScroll] = useState(false);

  const handleClick = () => {
    if (pathname === "/") {
      scrollToAboutUs();
    } else {
      setShouldScroll(true);
      router.push("/#about-us-section");
    }
  };

  useEffect(() => {
    if (shouldScroll && pathname === "/") {
      scrollToAboutUs();
      setShouldScroll(false);
    }
  }, [shouldScroll, pathname]);

  const scrollToAboutUs = () => {
    const aboutSection = document.getElementById("about-us-section");
    if (aboutSection) {
      const yOffset = -150;
      const y =
        aboutSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <button className="hover:text-orange" onClick={handleClick}>
      درباره ما
    </button>
  );
};

export default AboutUsBtn;
