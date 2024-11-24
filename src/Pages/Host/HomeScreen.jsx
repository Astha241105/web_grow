import React from "react";
import "./HomeScreen.css";
import Footer from "../../component-2/footer/footer";
import NavHost from "./NavHost";
const HHomeScreen = () => {
  const categories = [
    {
      id: 1,
      title: "Quizzes",
      description: "Create Quizes",
      icon: <img src="online-quiz.svg"></img>,
    },
    {
      id: 2,
      title: "Seminars",
      description: "Host Seminars",
      icon: <img src="meeting.svg"></img>,
    },
    {
      id: 3,
      title: "Webinars",
      description: "Host Webinars",
      icon: <img src="webinar.svg"></img>,
    },
    {
      id: 4,
      title: "Hackathons",
      description: "Host Hackathons",
      icon: <img src="hackathon.svg"></img>,
    },
  ];

  return (
    <div className="page-wrapper">
      <div>
        <div
          className="min-h-screen relative"
          style={{
            backgroundImage: 'url("../../component-2/description/Group.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            // backgroundColor: "#FDF8EE",
            backgroundBlendMode: "overlay",
          }}
        >
          <NavHost></NavHost>

          <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-2xl font-semibold mb-2">
                  <span className="text-[#008080] font-semibold">Host</span> an
                  Opportunity
                </h1>
                <p className="text-l font-semibold mt-2 ">
                  Choose your opportunity category from below
                </p>
              </div>
              <img src="host.svg" alt="Host illustration" className="w-48" />
            </div>

            <h1 className="text-2xl font-semibold mb-4">
              What do you want to host
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-[#D9D9D9] p-4 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer flex items-start"
                >
                  <div className="mr-3">{category.icon}</div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-[#008080] font-semibold mb-1">
                      {category.title}
                    </h3>
                    <div className="flex items-center">
                      <p className="text-sm text-[#008080] mr-1">
                        {category.description}
                      </p>
                      <img src="Arrow12.svg" alt="arrow" className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Events</h2>
                <a href="#" className="text-sm text-black font-medium">
                  See all
                </a>
              </div>

              <div className="bg-white p-4 rounded-[10px] border max-w-md border-black ">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">General Knowledge</h3>
                  <span className="text-xs px-2 py-1 rounded-[10px] border border-black">
                    Free
                  </span>
                </div>
                <p className="text-sm text-black mb-2 font-medium">
                  Ajay Kumar Garg Engineering College
                </p>

                <p className="text-xs text-black mb-2 font-medium">Online</p>
                <p className="text-xs text-black mb-2 font-medium">
                  <span className="text-xs text-black mb-2 font-bold">
                    Updated on:
                  </span>{" "}
                  15 Dec 2023
                </p>
                <button className="text-sm mt-3 px-2 py-2 rounded-[10px] border border-black">
                  Coding Challenge
                </button>
              </div>
            </div>
          </main>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default HHomeScreen;
