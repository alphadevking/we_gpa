import Link from "next/link";
import React from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { FiLinkedin, FiMail } from "react-icons/fi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="grid gap-3 px-5 md:px-10 mx-auto max-w-screen-lg md:justify-items-center select-none">
      <div className="grid gap-5 pb-5">

        <Link className="text-sm hover:underline underline-offset-8 w-fit" href="https://github.com/alphadevking/we_gpa/blob/master/README.md" target="_blank">
          Project Documentation
        </Link>

        <div className="flex flex-wrap gap-3 text-left md:justify-center">
          <ul className="">
            <Link href="mailto:alphadevking@gmail.com" className="" target="_blank">
              <FiMail className="text-2xl hover:scale-150 duration-500" />
            </Link>
          </ul>
          <ul className="">
            <Link href="https://linkedin.com/in/favour-orukpe-31432725b" className="" target="_blank">
              <FiLinkedin className="text-2xl hover:scale-150 duration-500" />
            </Link>
          </ul>
          <ul className="">
            <Link href="https://x.com/alphadevking_1" className="" target="_blank">
              <FaTwitter className="text-2xl hover:scale-150 duration-500" />
            </Link>
          </ul>
          <ul className="">
            <Link href="https://github.com/alphadevking/we_gpa" className="" target="_blank">
              <FaGithub className="text-2xl hover:scale-150 duration-500" />
            </Link>
          </ul>
        </div>
      </div>

      <div className="flex gap-x-3 items-center">
        <div className="">
          &copy; All Rights Reserved | weGPA {currentYear}
        </div>
      </div>
    </div>
  );
};

export default Footer;
