import React from "react";
import NavBar from "../Components/NavBar";
import Maincomp from "../Components/Maincomp";
import Work from "../Components/Work";
function Project() {
  return (
    <div>
      <NavBar />
      <Maincomp heading="Project" text="Dec" />
     <Work/>
    </div>
  );
}

export default Project;
