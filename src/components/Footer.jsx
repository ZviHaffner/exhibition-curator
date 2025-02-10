import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Link href="/credits" className="flex-1 text-xs hover:text-gray-500">
      Credits
      </Link>
      <p className="text-sm">&copy; Zvi Haffner {new Date().getFullYear()}</p>
      <div className="flex-1 flex justify-end gap-5">
        <a
          href="https://www.linkedin.com/in/zvi-haffner-7697932a4/"
          target="_blank"
          className="hover:text-gray-500"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/ZviHaffner"
          target="_blank"
          className="hover:text-gray-500"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
