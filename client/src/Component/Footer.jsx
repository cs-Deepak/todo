import React from "react";
import "./footer.css";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { FiZap } from "react-icons/fi";
import { BiBarChartAlt2 } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import Document from "./Document";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleDocumentClick = () => {
    navigate("/document");  // yaha redirect ho jayega
  };
  return (
    

    <footer className="footer">
         <MdOutlineLibraryBooks onClick={handleDocumentClick} style={{ cursor: "pointer" }} />
       <AiOutlineLineChart onClick={() => navigate("/linechart")} style={{ cursor: "pointer" }}/>
        <div className="icon"><FiZap className="FiZap" onClick={() => navigate("/zip")} style={{ cursor: "pointer" }}  /> </div>
       <BiBarChartAlt2 onClick={() => navigate("/chartbar")} style={{ cursor: "pointer" }}  />
       <IoIosSettings onClick={() => navigate("/setting")} style={{ cursor: "pointer" }} />
      {/* <p>© {new Date().getFullYear()} Todo App. All rights reserved.</p> */}
    </footer>
  );
};

export default Footer;
