import React from "react";
import "./TabletLaoding.css";
const TabletLaoding = () => {
  return (
    <div className="absCenter z-10 bg-[#fff] h-screen w-screen flex flex-col items-center justify-center">
      <div className="loaderPill">
        <div className="loaderPill-anim">
          <div className="loaderPill-anim-bounce">
            <div className="loaderPill-anim-flop">
              <div className="loaderPill-pill"></div>
            </div>
          </div>
        </div>
        <div className="loaderPill-floor">
          <div className="loaderPill-floor-shadow"></div>
        </div>
        <div className="loaderPill-text">Loading your Tensai-pharm...</div>
      </div>
    </div>
  );
};

export default TabletLaoding;
