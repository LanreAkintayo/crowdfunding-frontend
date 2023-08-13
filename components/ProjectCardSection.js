import { useMoralis, useWeb3Contract, useChain } from "react-moralis";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi, DEPLOYER } from "../constants";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import {
  RotateLoader,
  ClipLoader,
  PacmanLoader,
  ScaleLoader,
} from "react-spinners";

export default function ProjectCardSection() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();
  const router = useRouter();

  // console.log("This is the path name: ", router.pathname);

  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;
  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const {
    runContractFunction: getAllProjects,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdfundAddress,
    functionName: "getAllProjects",
    params: {},
  });

  //   const {
  //     data: amountRaisedInDollars,
  //     runContractFunction: getTotalAmountRaisedInDollars,
  //   } = useWeb3Contract();

  const {
    data: allProjects,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/projects" : null),
    async () => {
      // console.log("We are here again");
      const projects = await getAllProjects({
        onSuccess: (tx) => console.log("all Project", tx),
        onError: (error) => console.log(error),
      });

      console.log("Projects:::", projects)

      const provider = await enableWeb3();
      const crowdfundContract = new ethers.Contract(
        crowdfundAddress,
        abi,
        provider
      );

      const allProjects = projects.map(async (project) => {
        const amountRaisedInDollars =
          await crowdfundContract.getTotalAmountRaisedInDollars(project.id);
        const backers = await crowdfundContract.getBackers(project.id);

        const editedBackers = backers.map((backer) => {
        
          return [backer[0], backer[1], backer[2].toString(), backer[3].toString()];
        });

        const currentProject = await crowdfundContract.projects(project.id)

        const isFinalized = (await crowdfundContract.projects(project.id))[9];
        const isClaimed = (await crowdfundContract.projects(project.id))[10];
        const isRefunded = (await crowdfundContract.projects(project.id))[11];

        let secondsLeft;
        let status;

        if (
          Math.floor(Number(new Date().getTime() / 1000)) >
          Number(project.endDay)
        ) {
          if (project.contractStatus == 1) {
            status = "Successful";
          } else if (project.contractStatus == 2 || Number(amountRaisedInDollars) == 0) {
            status = "Unsuccessful";
          } else {
            status = "Closed";
          }
          secondsLeft = 0;
        } else if (
          Number(Math.floor(Number(new Date().getTime() / 1000))) >=
          Number(project.startDay)
        ) {
          status = "Active";
          secondsLeft =
            Number(project.endDay) -
            Number(Math.floor(Number(new Date().getTime() / 1000)));
        } else {
          status = "Pending";
          secondsLeft = 0;
        }

        const percentFunded =
          (Number(amountRaisedInDollars) / Number(project.goal)) * 100;

        return {
          ...project,
          amountRaisedInDollars: amountRaisedInDollars.toString(),
          endDay: project.endDay.toString(),
          goal: project.goal.toString(),
          id: project.id.toString(),
          startDay: project.startDay.toString(),
          secondsLeft,
          status,
          percentFunded: percentFunded >= 100 ? 100 : Math.floor(percentFunded),
          backers: editedBackers,
          isFinalized,
          isClaimed,
          isRefunded,
        };
      });

      const resolved = await Promise.all(allProjects);

      return resolved.reverse();
    }
  );

  // console.log("All Projects::::::::::::::::: ",allProjects)

  return (
    <section className=" px-5 lg:px-5 w-full">
      <div className="flex flex-col w-full items-center my-10 mb-14">
        {isWeb3Enabled && chainId != "97" && (
          <button
            className="w-8/12 p-2 test-lg bg-red-100 hover:bg-red-200 text-red-700 rounded-md hover:text-red-900"
            onClick={() => {
              switchNetwork("0x61");
            }}
          >
            Switch to Binance Smart Chain Testnet
          </button>
        )}
        {(isLoading || isFetching) && (
          <div className="flex flex-col w-full my-4 items-center">
            <div className="my-1">
              <ScaleLoader color="black" loading="true" size={20} />
            </div>

            <p className="text-gray-500">Please Wait a few seconds</p>
          </div>
        )}
        {allProjects && chainId == "97" && (
          <div
            className={`grid ${
              allProjects.length >= 4
                ? "grid-rows-4"
                : `grid-rows-${allProjects.length}`
            } grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 xs:grid-rows-1 xs:grid-cols-4 gap-2 justify-start w-full`}
          >
            {router.pathname == "/"
              ? allProjects?.slice(0, 4).map((projectInfo) => {
                  return (
                    <ProjectCard
                      key={projectInfo.id}
                      projectInfo={projectInfo}
                    />
                  );
                })
              : allProjects?.map((projectInfo) => {
                  return (
                    <ProjectCard
                      key={projectInfo.id}
                      projectInfo={projectInfo}
                    />
                  );
                })}
          </div>
        )}

        {allProjects?.length >= 4 && router.pathname == "/" && chainId == "97" && (
          <button
            className="text-green-800 p-2 text-xl mt-5 border rounded-md border-green-800"
            onClick={() => {
              if (isWeb3Enabled) {
                window.open("/projects", "_self");
              } else {
                window.alert("Connect your wallet");
              }
            }}
          >
            See more
          </button>
        )}
      </div>
    </section>
  );
}
