import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex items-center justify-between p-5">
      <div />
      <p className="text-sm">&copy; {new Date().getFullYear()} Zvi Haffner</p>
      <div className="flex gap-5">
        <div className="flex flex-col items-center hover:text-gray-500">
          <a
            href="https://www.linkedin.com/in/zvi-haffner-7697932a4/"
            target="_blank"
          >
            <FaLinkedin size={32} />
          </a>
          <span className="text-xs mt-2">LinkedIn</span>
        </div>
        <div className="flex flex-col items-center hover:text-gray-500">
          <a href="https://github.com/ZviHaffner" target="_blank">
            <FaGithub size={32} />
          </a>
          <p className="text-xs mt-2">GitHub</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
