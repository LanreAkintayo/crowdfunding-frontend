import { ethers } from "ethers";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi } from "../constants";
import Link from "next/link";

export default function ProjectCard({ projectInfo }) {
  /*
  
  daysLeft, percentFunded, backers, amountRaisedInDollars, 
   */
  const goal = ethers.utils.formatEther(projectInfo.goal.toString());

  let color;
  let statusBgColor;
  let statusTextColor;

  if (projectInfo.percentFunded > 70) {
    color = "bg-green-700";
  } else if (projectInfo.percentFunded > 50) {
    color = "bg-yellow-600";
  } else {
    color = "bg-red-600";
  }

  if (["Active", "Successful"].includes(projectInfo.status)){
    statusBgColor = "bg-green-200"
    statusTextColor = "text-green-700"
  } else if (projectInfo.status == "Pending"){
    statusBgColor = "bg-yellow-200"
    statusTextColor="text-yellow-700"
  } else if (["Closed", "Unsuccessful"].includes(projectInfo.status)){
    statusBgColor = "bg-red-200"
    statusTextColor = "text-red-700"
  }

  let dollarUSLocale = Intl.NumberFormat("en-US");

  const formattedGoal = dollarUSLocale.format(goal).toString();
  return (
    <>
      <Link
        href={{
          pathname: `/${projectInfo.projectTitle}`,
          query: {
            ...projectInfo,
            backers: JSON.stringify(projectInfo.backers)

          },
          // the data
        }}
        as={`/${projectInfo.projectTitle}`}
      >
        <div className="mx-3 relative w-auto h-auto mb-5 lg:mb-0 bg-white-200 shadow-lg cursor-pointer">
        <p className={`px-2 py-1 absolute left-1 top-1 rounded-md ${statusBgColor} ${statusTextColor}`}><small>{projectInfo.status}</small></p>
          <div className="w-full h-56 ">
            <img
              alt="..."
              src={projectInfo.projectImageUrl}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full bg-neutral-300 h-2.5 dark:bg-gray-700">
            <div
              className={`${color} h-2.5 `}
              style={{ width: `${projectInfo.percentFunded}%` }}
            ></div>
          </div>
          <div className=" px-2">
            <h1 className="text-xl text-green-900 py-3">
              {projectInfo.projectTitle}
            </h1>
            <p className="text-sm text-gray-800">{projectInfo.projectNote}</p>
            <p className="py-4 text-green-900">
              {projectInfo.percentFunded}% of ${formattedGoal} Raised{" "}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
