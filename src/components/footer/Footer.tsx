"use client";
import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 ">
      <div
        className="
          container
          mx-auto
          px-4
          sm:px-6
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
        "
      >
        {/* Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.facebook.com/share/1AaNwGxADs/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="
              hover:text-green-400
              transition
              duration-300
            "
          >
            <FaFacebook size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/mohamed-elkot-a0123a2a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="
              hover:text-green-400
              transition
              duration-300
            "
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Email */}
        <div className="text-sm text-center break-all sm:break-normal">
          Contact us:{" "}
          <a
            href="mailto:amiralgotali@gmail.com"
            className="text-blue-400 hover:underline"
          >
            amiralgotali@gmail.com
          </a>
        </div>

        {/* Copyright */}
        <div
          className="
            text-xs
            text-gray-400
            text-center
            md:text-right
          "
        >
          © {new Date().getFullYear()} All rights reserved | Your Site
        </div>
      </div>
    </footer>
  );
}
