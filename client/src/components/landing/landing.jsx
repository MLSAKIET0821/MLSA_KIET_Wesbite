import React from "react";
const Landing = () => {
  return (
    <main className="lg:h-screen overflow-hidden relative">
      <div
        id="left-img"
        className="lg:w-1/2 h-screen absolute z-30 right-0 bg-transparent"
      ></div>
      <div
        className="lg:h-screen w-5/12 overflow-hidden absolute z-20 bg-[#00070e] text-stone-50 rounded-r-full hover:w-full hover:rounded-none transition-all duration-500 ease-in-ease-out"
        id="left-box"
      >
        <div className="lg:w-screen h-screen flex flex-row justify-items-stretch absolute p-10 z-10">
          <img
            src="/l3.png"
            alt="logo"
            className="lg:w-auto justify-center items-center animate-pulse mix-blend-multiply transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          />
          <div className="hidden lg:flex flex-col items-center justify-center">
            <h1 className="lg:font-bold text-7xl my-6">
              At{" "}
              <span className="lg:code bg-clip-text text-transparent bg-gradient-to-r from-[#2afadf] to-sky-600">
                KIET
              </span>{" "}
              Ghaziabad
            </h1>
            <h3 className="lg:text-3xl font-mono items-center">
              Unchain Your Will
            </h3>
          </div>
        </div>
      </div>
      <div
        className="lg:h-screen w-screen flex flex-row overflow-hidden absolute z-10 justify-items-stretch p-10 bg-cyan-100 text-stone-950"
        id="right-box"
      >
        <img
          src="/l3.png"
          alt="logo"
          className="lg:w-auto justify-center items-center"
        />
        <div className="hidden lg:flex flex-col justify-center items-center">
          <h1 className="lg:font-bold text-7xl my-6">
            The{" "}
            <span className="lg:code bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
              MLSA
            </span>{" "}
            Community
          </h1>
          <h3 className="lg:text-3xl font-mono items-center">
            Liberate The Mind
          </h3>
        </div>
        <div id="right-img" className="lg:w-screen h-screen absolute z-0"></div>
        <div className="hidden lg:block absolute top-0 right-10 z-40 p-4">
          <div className="w-32 h-32 xl:w-40 xl:h-40 bg-cyan-100 flex justify-center items-center">
            <img
              src="/college-img.png"
              alt="Top Right Corner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div
        className="lg:hidden w-screen h-screen flex flex-col justify-center items-center p-10 bg-slate-950 text-stone-950 z-10 relative"
        id="mobile-box"
      >
        <img
          src="/l3.png"
          alt="logo"
          className="w-auto"
        />
        <div className="flex flex-col justify-center items-center text-slate-50">
          <h1 className="font-bold text-4xl my-6">
            AT{" "}
            <span className="code bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
              KIET
            </span>{" "}
            Ghaziabad
          </h1>
          <h3 className="text-3xl font-mono items-center">
            Liberate The Mind
          </h3>
        </div>
      </div>
    </main>
  );
};

export default Landing;
