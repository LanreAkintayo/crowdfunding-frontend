import { useEffect, useState } from "react";
import BorderLayout from "./BorderLayout";
import { GiCheckMark } from "react-icons/gi";

import { Signature, ethers } from "ethers";

import { TfiWallet } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";
import { BsArrowRight } from "react-icons/bs";
import { displayToast } from "./Toast";
import { IoMdInfinite } from "react-icons/io";

export default function ModalSuccess({ message, transactionHash, closeModal }) {
  return (
    <BorderLayout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-t">
          <h3 className="text-xl font-medium text-gray-800">Successful</h3>
          <button
            placeholder="0.00"
            onClick={() => {
              closeModal();
            }}
            type="button"
            className={`text-gray-400 bg-transparent ${
              false
                ? "text-gray-200"
                : "dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900"
            }  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center `}
            data-modal-toggle="small-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* <!-- Modal body --> */}
      <div className="w-full max-w-md pt-1 space-y-3">
        <div className="flex flex-col justify-center items-center">
          <GiCheckMark className="w-10 h-10 rounded-full text-green-200 bg-green-800 p-2" />

          <div className="font-bold mt-4">All Done!</div>
          <p className="text-gray-800 px-4 text-center">{message}</p>

          <button
            onClick={() => {
              window.open(
                `https://testnet.bscscan.com/tx/${transactionHash}`,
                "_blank"
              );
            }}
            className="text-sm self-end pr-3 mt-3 text-gray-400 hover:text-gray-500"
          >
            Review tx details
          </button>

          <div className="flex w-full items-center p-6 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
            <button
              onClick={() => {
                closeModal();
              }}
              data-modal-toggle="small-modal"
              type="button"
              className="text-gray-800 w-full bg-gray-300  hover:bg-gray-400 rounded-md p-3"
            >
              <div className="flex justify-center ">Ok, Close.</div>
              {/*  */}
            </button>
          </div>
        </div>
      </div>
    </BorderLayout>
  );
}
