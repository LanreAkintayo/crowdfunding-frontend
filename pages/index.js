import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CryptoCards, Button } from "@web3uikit/core";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import useSWR, { useSWRConfig } from "swr";
import ProjectCardSection from "../components/ProjectCardSection";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  const [enabled, setEnabled] = useState(false);

  const { mutate } = useSWRConfig();
  // const [collapsed, setCollapsed] = useState(true);

  // useEffect(() => {
  //   console.log(collapsed);
  // }, [collapsed]);
  // const handleSidebar = () => {
  //   setCollapsed((prevCollapsed) => !prevCollapsed);
  // };

  return (
    <div className="">
      <section>
        <Header />

        <div className=" w-full h-screen">
          <div className="w-full h-full grid grid-cols-12 bg-gradient-to-tr from-[#e7e0ce] via-white  to-white px-20">
            <div className="col-span-7 mt-20  ">

            <div className="font-medium">
              <p className="text-5xl">
                Decentralized
              </p>

              <p className="w-full text-5xl py-2">
                Crowdfunding Platform
              </p>

            </div>
            <p className="my-4 text-sm leading-6 w-8/12">This platform automate the process of project funding, 
            execution, and payout, reducing the need for manual intervention and enhancing efficiency. </p>
            <div className="flex text-base ss:text-xl mt-6">
              <button
                className="bg-orange-700 w-40 rounded-full text-white p-2 py-4 hover:bg-orange-800"
                onClick={() => {
                  if (isWeb3Enabled) {
                    window.open("/launch", "_self");
                  } else {
                    window.alert("Connect your wallet");
                  }
                }}
              >
                <div className="flex items-center justify-center ">
                <p className="text-[12px] font-bold px-2">Get Funded</p>
                <FaChevronRight className="text-black w-5 h-5 bg-yellow-400 rounded-full p-1" />
                </div>
                
                
              </button>

              <button
                className="bg-orange-100 w-40 text-orange-800 rounded-full ml-4 p-2 py-4 hover:bg-orange-200"
                onClick={() => {
                  if (isWeb3Enabled) {
                    window.open("/projects", "_self");
                  } else {
                    window.alert("Connect your wallet");
                  }
                }}
              >
                <p className="text-[12px]">
                Browse Project
                </p>
                
              </button>
            </div>
      

            </div>
            <div className="col-span-5">
              <img src="/crowfund_clip_art.jpg" alt="crowdfund clip art" width={450} height={450}/>
            </div>
         
          </div>
         
        </div>
      </section>
      <section>
        <h1 className="text-3xl mt-10 px-5">Explore Projects</h1>
        <ProjectCardSection />
      </section>
      <Footer />
    </div>
  );
}
