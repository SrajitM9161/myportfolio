import Link from "next/link";
import { FaGithub, FaLinkedin, FaCode, FaGraduationCap } from "react-icons/fa"; 
const socials = [
  { icon: <FaGithub />, path: "https://github.com/SrajitM9161" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/srajit-mishra-a40497214/" },
  { icon: <FaCode />, path: "" },
  { icon: <FaGraduationCap />, path: "" }, 
];

const Socials = ({ containerStyle, iconStyles }) => {
  return (
    <div className={containerStyle}>
      {socials.map((item, index) => (
        <Link 
          key={index} 
          href={item.path}
          target="_blank"
          className={iconStyles}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
