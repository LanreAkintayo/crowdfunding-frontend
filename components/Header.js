import Link from "next/link";
import { CryptoCards, Button } from "@web3uikit/core";
import { ConnectButton } from "web3uikit";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import NavigationDropdown from "./NavigationDropdown";
import { useEffect, useState, useCallback } from "react";
import { useMoralis, useWeb3Contract, useChain } from "react-moralis";
import { abi } from "../constants";
import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { FaBars, FaTimes } from "react-icons/fa";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

export default function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const isBreakpoint = useMediaQuery(912);
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  // console.log(chainIdHex)
  const chainId = parseInt(chainIdHex);

  const router = useRouter();
  const currentUrl = router.asPath;

  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);
  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <div className={`ss:${chainId != 97 ? "h-30" : "h-20"} h-30 `}>
      {/* Navbar */}

      {!collapsed && isBreakpoint && (
        <div className={`z-50 h-screen ${!collapsed && "fixed inset-0"}`}>
          <ProSidebar
            breakPoint="0px"
            open={false}
            collapsedWidth="0px"
            collapsed={collapsed}
          >
            <div
              className="px-4 pt-4 w-full flex justify-end text-end cursor-pointer text-xl"
              onClick={handleSidebar}
            >
              <FaTimes />
            </div>
            <Menu iconShape="square">
              <div className="text-xl text-white hover:text-green-700">
                <MenuItem>
                  <Link href="/">
                    <p
                      className={`text-white font-semibold ${
                        currentUrl == "/" && "border-b-2 border-orange-700"
                      } hover:text-orange-500 sm:text-xl text-lg`}
                    >
                      Home
                    </p>
                  </Link>
                </MenuItem>
              </div>
              <MenuItem>
                <Link href="/projects">
                  <p
                    className={`text-white ${
                      currentUrl == "/projects" &&
                      "border-b-2 border-orange-700"
                    } font-semibold hover:text-orange-500 text-lg`}
                  >
                    Projects
                  </p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/launch">
                  <p
                    className={`w-full text-white ${
                      currentUrl == "/launch" && "border-b-2 border-orange-700"
                    } font-semibold hover:text-orange-500 text-lg `}
                  >
                    Get Funded
                  </p>
                </Link>
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
      )}

      <nav className="flex  items-end flex-row w-full justify-between hh:justify-between hh:items-center px-2 py-2 sm:px-4 sm:py-4 h-full text-white bg-zinc-800 ">
        <img
          src="./my_logo.svg"
          width={200}
          height={30}
          className="object-cover p-0 lt:block hidden"
        />
        <img
          src="./my_icon.svg"
          width={40}
          height={10}
          className="object-cover p-0 lt:hidden block"
        />
        <div className="flex items-center justify-end self-end ss:self-auto">
          <div className="flex justify-between items-center text-lg ">
            {!isBreakpoint && (
              <>
                <Link href="/">
                  <a
                    className={`text-white font-semibold ${
                      currentUrl == "/" && "border-b-2 border-orange-700"
                    } hover:text-orange-500 sm:text-xl text-lg`}
                  >
                    Home
                  </a>
                </Link>
                <Link href="/projects">
                  <a
                    className={`sm:ml-8 ml-6 text-white ${
                      currentUrl == "/projects" &&
                      "border-b-2 border-orange-700"
                    } font-semibold hover:text-orange-500 text-lg`}
                  >
                    Projects
                  </a>
                </Link>

                <Link href="/launch">
                  <a
                    className={`sm:mx-4 mx-2 w-full text-white ${
                      currentUrl == "/launch" && "border-b-2 border-orange-700"
                    } font-semibold hover:text-orange-500 `}
                  >
                    Get Funded
                  </a>
                </Link>
              </>
            )}

            <div className="text-white flex flex-col w-full sc:py-10 items-start">
              {/* <Button type="button" text="Connect Wallet" /> */}
              <div className="px-0">
                {" "}
                <ConnectButton text="This is a button" />
              </div>
              {chainId != "97" && isWeb3Enabled && (
                <button
                  className=" ml-4 text-red-700 text-sm my-2 cursor-pointer bg-red-100 rounded-lg p-1 px-2"
                  onClick={() => {
                    switchNetwork("0x61");
                  }}
                >
                  Switch to BSC Testnet
                </button>
              )}
            </div>
            {isBreakpoint && (
              <div
                className="w-8 h-8 text-white hover:text-green-500 cursor-pointer"
                onClick={handleSidebar}
              >
                {/* <img
                  alt="..."
                  src="./menubar.svg"
                  className="object-cover w-full h-full cursor-pointer hover:text-green-500"
                /> */}

                <FaBars className="mr-3 w-9 h-9 bg-orange-100 rounded-full text-orange-800 p-2" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
