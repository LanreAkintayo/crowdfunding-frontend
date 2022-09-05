import { useState } from "react";

export default function Dropdown() {
  const [dropdownState, setDropdownState] = useState(false);
  const [selectedToken, setSelectedToken] = useState({});

  const onButtonClick = () => {
    console.log("I am here")
    // setDropdownState((prev) => !prev);
  };

  const supportedTokens = [
    { name: "BNB", src: "/bnb.svg" },
    { name: "BUSD", src: "/busd.svg" },
    { name: "DAI", src: "/dai.png" },
    { name: "XRP", src: "/xrp.png" },
  ];

  console.log(selectedToken)
  const Token = () => {
    return (
      <>
        {supportedTokens.map((item) => {
          return (
            <li
              key={item[0]}
              className="mt-2 hover:bg-gray-200"
              // onClick={setSelectedToken({ name: item.name, src: item.src })}
            >
              <div className="flex px-2 items-center">
                <div className="w-7 h-7">
                  <img
                    alt="..."
                    src={item.src}
                    className="object-cover w-full h-full"
                  />
                </div>
                <a className="block py-2 px-2">{item.name}</a>
              </div>
            </li>
          );
        })}
      </>
    );
  };

  return (
    <>
      <button
        id="dropdownDefault"
        onClick={onButtonClick}
        data-dropdown-toggle="dropdown"
        className="focus:ring-1 focus:outline-none bg-gray-100 text-gray-800 font-medium rounded-t-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {!selectedToken ? (
          <div className="mt-2 hover:bg-gray-200">
            <div className="flex px-2 items-center">
              <div className="w-7 h-7">
                <img
                  alt="..."
                  src={selectedToken.src}
                  className="object-cover w-full h-full"
                />
              </div>
              <a className="block py-2 px-2">{selectedToken.name}</a>
            </div>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <p>Select Token</p>
            <svg
              className="ml-2 w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        )}
      </button>

      <div
        id="dropdown"
        className={`w-full ${
          dropdownState == true && "hidden"
        } bg-white rounded-b-lg divide-y divide-gray-100 border dark:bg-gray-700 `}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <Token />
          {/* <li className="mt-2 hover:bg-gray-200">
            <div className="flex px-2 items-center">
              <div className="w-7 h-7">
                <img
                  alt="..."
                  src="/bnb.svg"
                  className="object-cover w-full h-full"
                />
              </div>
              <a className="block py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                BNB
              </a>
            </div>
          </li>

          <li className="mt-2">
            <div className="flex px-2 items-center">
              <div className="w-7 h-7">
                <img
                  alt="..."
                  src="/busd.svg"
                  className="object-cover w-full h-full"
                />
              </div>

              <a className="block py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                BUSD
              </a>
            </div>
          </li>

          <li className="mt-2">
            <div className="flex px-2 items-center">
              <div className="w-7 h-7">
                <img
                  alt="..."
                  src="/dai.png"
                  className="object-cover w-full h-full"
                />
              </div>

              <a className="block py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                DAI
              </a>
            </div>
          </li>

          <li className="mt-2">
            <div className="flex px-2 items-center">
              <div className="w-7 h-7">
                <img
                  alt="..."
                  src="/xrp.png"
                  className="object-cover w-full h-full"
                />
              </div>

              <a className="block py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                XRP
              </a>
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
}