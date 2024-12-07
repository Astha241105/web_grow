import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F1F1F1] w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <img src="/logo.svg" alt="WebGrow Logo" style={{height:"100px",width:"300px"}}className="h-8 md:h-10" />
          </div>

          <div className="md:col-span-4">
            <h3 className="text-base font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li className="text-sm font-medium">Quiz</li>
              <li className="text-sm font-medium">Hackathon</li>
              <li className="text-sm font-medium">Seminar</li>
              <li className="text-sm font-medium">Webinar</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-base font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li className="text-sm font-medium">About</li>
              <li className="text-sm font-medium">Join Us</li>
            </ul>
          </div>
        </div>

        <div id="footer-companies" className="mt-8"></div>
      </div>
    </footer>
  );
};

export default Footer;
