import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { create } from "ipfs-http-client";
import { contractAddresses, abi } from "../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { RotateLoader, ClipLoader } from "react-spinners";
import { useNotification } from "web3uikit";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import ProjectCardSection from "../components/ProjectCardSection";
import Layout from "./layout";

const Projects = () => {
  return (
    <div className="flex flex-col w-full justify-between">
      <div>
        <h1 className="text-center w-full mt-8 text-3xl">All Projects</h1>
        <ProjectCardSection />
      </div>
    </div>
  );
}

Projects.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Projects;