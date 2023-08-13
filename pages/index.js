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
import "animate.css";
import Layout from "./layout";

const Home = () => {
  const { isWeb3Enabled, chainId } = useMoralis();

  const [enabled, setEnabled] = useState(false);

  const { mutate } = useSWRConfig();


  return (
    <div className="">
      <section className="ft:flex ft:flex-col">
        <div className="w-full flex-1">
          <div className="w-full h-full flex flex-col justify-center items-center ft:gap-1  ft:grid ft:grid-cols-12 bg-gradient-to-tr from-[#e7e0ce] via-white  to-white px-5 sm:px-20">
            <div className="ft:col-span-7 flex flex-col justify-center ft:justify-start ft:items-left ">

            <div className="font-medium text-center ft:text-left ft:mt-0 mt-3 ">
              <p className="text-4xl ft:text-5xl">
                Decentralized
              </p>

              <p className="w-full py-2 text-4xl ft:text-5xl">
                Crowdfunding Platform
              </p>

            </div>
            <p className="my-4 animate__animated animate__backInDown  text-sm leading-6 ft:w-8/12 text-center ft:text-left">This platform automate the process of project funding, 
            execution, and payout, reducing the need for manual intervention and enhancing efficiency. </p>
            <div className="flex justify-center ft:justify-start text-base ss:text-xl mt-6">
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
            <div className="ft:col-span-5 ">
              <Image src="/homepage_clip_art.svg" alt="crowdfund clip art" width={800} height={900} objectFit="cover"/>
            </div>
         
          </div>
         
        </div>
      </section>
      <section className="">
        <h1 className="text-3xl mt-4 ft:mt-10 px-5">Explore Projects</h1>
        <ProjectCardSection />
      </section>
    </div>
  );
}


Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


export default Home;