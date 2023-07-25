import Dropdown from "./Dropdown";
import { RotateLoader, ClipLoader } from "react-spinners";
import { usePromiseTracker } from "react-promise-tracker";
import { contractAddresses, abi, erc20Abi, wbnbAbi } from "../constants";
import { tokenToAddress, fromWei } from "../utils/helper";
import {useState} from "react"
import { useMoralis, useWeb3Contract } from "react-moralis";
import {ethers} from "ethers"


export default function SupportModal({
  handleCloseSupportModal,
  handleSelectToken,
  selectedToken,
  handleOnChange,
  isValidAmount,
  handlePledge,
  isFetching,
  isLoading,
  currentBalance,
  isPledging,
  pledgeText
}) {
  // const handleOnChange = (event) => {
  //   const pledgeAmount = event.target.value
  const { promiseInProgress } = usePromiseTracker();
  const {
    Moralis,
    isWeb3Enabled,
    chainId: chainIdHex,
    enableWeb3,
    account,
  } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;
  


  // const handleMax = async (tokenName) => {

  //   console.log(tokenName)
  //   console.log(selectedToken)
  //   const tokenAddress = tokenToAddress[selectedToken.name]
  //   // const tokeknAbi = ["BUSD", "DAI", "XRP"].includes(selectedTokenName) 
    
  //   const provider = await enableWeb3();


  //   const tokenContract = new ethers.Contract(
  //     tokenAddress,
  //     erc20Abi,
  //     provider
  //   );

  //   const balance = await tokenContract.balanceOf(account)
  //   const dollarUSLocale = Intl.NumberFormat("en-US");
  //   const formattedBalance = dollarUSLocale
  //   .format(fromWei(balance.toString()))
  //   .toString();

  //   setCurrentBalance(formattedBalance)
  // }
  // }

  console.log("isPledging || ....", isPledging || !isValidAmount || !selectedToken)

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 bg-opacity-75 transition-opacity">
      <div
        tabIndex="-1"
        className="inline-block align-bottom h-5/6  rounded-lg w-full scrollbar-hide text-left outline-none overflow-auto transform max-w-sm mt-16 sm:max-w-md"
      >
        <div className="relative  h-full md:h-auto">
          {/* <!-- Modal content --> */}

          <div className="relative mx-3 rounded-lg shadow dark:bg-gray-700">
            <div className="p-5 font-hand text-xl dark:bg-black bg-white">
              <div className="flex justify-between items-center rounded-t">
                <div className="sm:text-2xl text-3xl text-center text-gray-700">
                  Support Project
                </div>
                <button
                  onClick={handleCloseSupportModal}
                  type="button"
                  className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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

              <div className="my-5 w-full flex flex-col ">
                <p className="text-gray-600 text-sm py-2">
                  Select Token to Pledge with
                </p>
                <Dropdown
                  handleSelectToken={handleSelectToken}
                  selectedToken={selectedToken}
                  isValidAmount={isValidAmount}
                />
                {/* <Dropdown3 /> */}
              </div>
              <div className="my-5 w-full flex flex-col ">
                <p className="text-gray-600 text-sm py-2">Enter Amount</p>
                <div className="w-full flex flex-col border rounded-md p-2">
                  <input
                    onChange={(event) => handleOnChange(event)}
                    type="text"
                    name="text"
                    id="pledgeAmount"
                    placeholder="0.00"
                    className="w-80 block pl-2 font-medium text-lg focus:outline-none rounded-md"
                  />
                  <p className="self-end text-sm text-gray-600 font-medium">
                    MAX: {currentBalance} {selectedToken.name} 
                  </p>
                </div>
                {!isValidAmount && (
                  <p className="text-red-700 test-sm">
                    <small>
                      <small>Invalid Amount</small>
                    </small>
                  </p>
                )}

                {/* <Dropdown3 /> */}
              </div>

              <button
                className={`p-2 w-full text-green-800 text-center rounded-md font-medium text-xl disabled:cursor-not-allowed disabled:opacity-50`}
                onClick={handlePledge}
                disabled={isPledging || !isValidAmount || !selectedToken}
              >
                {isPledging ? (
                  <div className="flex flex-col w-full justify-between bg-green-300 rounded-md items-center px-3 py-3">
                    <div className="flex">
                      <ClipLoader color="#004d00" loading="true" size={30} />
                      <p className="ml-2"> {pledgeText} </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full bg-green-300 rounded-md items-center px-3 py-3">
                    <p className="w-full">{pledgeText}</p>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
