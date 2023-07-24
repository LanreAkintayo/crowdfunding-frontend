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
import { sDuration } from "../utils/helper";

import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "sassy-datepicker";

/* Create an instance of the client */
// const client = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
// const client = create('https://ipfs.infura.io:5001/api/v0')

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_API_SECRET_KEY;


console.log(projectId)
console.log(projectSecret)

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default function Launch() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const {
    runContractFunction: launch,
    isFetching,
    isLoading,
  } = useWeb3Contract();
  const { promiseInProgress } = usePromiseTracker();

  const dispatch = useNotification();

  const chainId = parseInt(chainIdHex);
  const [currentUrl, setCurrentUrl] = useState("");

  const length = contractAddresses[chainId]?.length;
  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const hiddenFileInput = React.useRef(null);
  const [imageFile, setImageFile] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [allValid, setAllValid] = useState(false);
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    subtitle: "",
    note: "",
    imageSrc: "",
    launchDate: new Date(),
    duration: "",
    goal: "",
  });
  const [isValidDuration, setIsValidDuration] = useState(true);
  const [isValidLaunchDate, setIsValidLaunchDate] = useState(true);
  const [isValidGoal, setIsValidGoal] = useState(true);

  const [launchText, setLaunchText] = useState("Publish Your Project")
  const [isLaunching, setIsLaunching] = useState(false)

  useEffect(() => {
    console.log("Here is the current url: ", currentUrl);
  }, [currentUrl]);

  useEffect(() => {
    setAllValid(
      Object.values(projectInfo).every(
        (item) => ![false, 0, null, "", {}].includes(item)
      ) &&
        isValidDuration &&
        // isValidLaunchDate &&
        isValidGoal
    );
  }, [projectInfo, isValidDuration, isValidLaunchDate]);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleOnChange = async (event) => {
    console.log("Thread is here");
    let imagePath;
    let amount;

    if (event.target.id == "imageSrc") {
      imagePath = event.target.files[0] || "";
      setImageFile(imagePath);
      console.log("imagePath: ", imagePath);

      // const uploadedImage = await trackPromise(client.add(imageFile));
      // const url = `https://cloudflare-ipfs.com/ipfs/${uploadedImage.path}`;
      // console.log("This must display: ", url);
      // setCurrentUrl(url);

      // let promise = new Promise(async (resolve, reject) => {
      //   const uploadedImage = await client.add(imageFile);
      //   console.log("Inside promise: ", uploadedImage)
      //   resolve(uploadedImage);
      // });

      // promise
      //   .then((uploadedImage) => {
      //     console.log("Iniside then: ", uploadedImage)
      //     const url = `https://cloudflare-ipfs.com/ipfs/${uploadedImage.path}`;
      //     console.log(url);
      //     setCurrentUrl(url);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }

    if (event.target.id == "duration") {
      const duration = event.target.value;
      setIsValidDuration(() => {
        if (
          /[^0-9]/g.test(duration.toString()) ||
          Number(duration) > 1000 ||
          Number(duration) < 1
        ) {
          return false;
        }
        return true;
      });
    }
    if (event.target.id == "goal") {
      const price = event.target.value;
      let dollarUSLocale = Intl.NumberFormat("en-US");
      // amount = dollarUSLocale.format(price).toString();
      amount = price;

      setIsValidGoal(() => {
        if (/^\$?\d+(,\d{3})*(\.\d*)?$/.test(amount.toString())) {
          return true;
        }
        return false;
      });
    }

    setProjectInfo((prevProjectInfo) => {
      return {
        ...prevProjectInfo,
        [event.target.id]:
          event.target.id == "goal" ? amount : event.target.value,
        [event.target.id]:
          event.target.id == "imageSrc"
            ? URL.createObjectURL(imagePath)
            : event.target.value,
      };
    });
  };

  // useEffect(() => {
  //   console.log("Project: ", project);
  // }, [project]);

  const handleLaunch = async () => {
    setIsLaunching(true)
    setLaunchText("Publishing Project")

    const goalInDollars = projectInfo.goal.replace(/[^0-9]/g, "");
    const startDayInSeconds = Math.floor(
      projectInfo.launchDate.getTime() / 1000
    );
    
    const duration = sDuration.minutes(Number(projectInfo.duration))

    console.log("duration is", duration)
    // console.log(startDayInSeconds);

    try {
      setLaunchText("Uploading data to IPFS")
      const uploadedImage = await trackPromise(client.add(imageFile));
      const url = `https://cloudflare-ipfs.com/ipfs/${uploadedImage.path}`;

      setLaunchText("Publishing Project")

      launch({
        params: {
          abi: abi,
          contractAddress: crowdfundAddress, // specify the networkId
          functionName: "launch",
          params: {
            startDay: startDayInSeconds,
            // startDay: 1662728516,
            duration,
            // duration: "1662813871",
            goal: ethers.utils.parseEther(goalInDollars),
            projectTitle: projectInfo.title,
            projectSubtitle: projectInfo.subtitle,
            projectNote: projectInfo.note,
            projectImageUrl: url,
            // projectImageUrl: currentUrl,
          },
        },
        onSuccess: handleSuccess,
        onError: (error) => {
          handleFailure(error);
        },
      });
    } catch (error) {
      console.log(error);
      window.alert("Make sure you have an internet connection");
    }

    // const { runContractFunction: getAllProjects } = useWeb3Contract({
    //   abi: abi,
    //   contractAddress: crowdfundAddress, // specify the networkId
    //   functionName: "getAllProjects",
    //   params: {},
    // });

    // const projects = await getAllProjects({
    //   onSuccess: () => {console.log("Successful")},
    //   onError: (error) => console.log(error),
    // })

    // console.log(projects)

    //   await launch({
    //     // onComplete:
    //     // onError:
    //     onSuccess: () => {console.log("Successful")},
    //     onError: (error) => console.log(error),
    // })
  };

  // Probably could add some error handling
  const handleSuccess = async (tx) => {
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));
    // updateUIValues()
    setLaunchText("Publish Your Project")
    setIsLaunching(false)
    dispatch({
      type: "success",
      message: "Transaction Completed!",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  const handleFailure = async (error) => {
    console.log("Error: ", error);
    setLaunchText("Publish Your Project")
    setIsLaunching(false)

    dispatch({
      type: "error",
      message: "Transation Failed",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  return (
    <>
      <Header />
      <section>
        <div className="w-full flex my-5 text-base px-3  md:text-xl flex-col items-center">
          <h1 className="text-center">
            Make it easy for people to learn about your project
          </h1>
        </div>
        <div className="flex flex-col md:flex-row border-t my-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Project Title</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Write a clear, brief title and subtitle to help people quickly
              understand your project. Both will appear on your project and
              pre-launch pages. <br />
              <br />
              Potential backers will also see them if your project appears on
              category pages, search results, or in emails we send to our
              community.
            </p>
          </div>
          <div className="w-12/12 md:w-7/12 md:px-11 mt-5 md:mt-0">
            <div className="items-start">
              <h1>Title</h1>

              <input
                onChange={handleOnChange}
                type="text"
                maxLength="80"
                name="text"
                id="title"
                placeholder="Write a short Title"
                className="md:w-96 w-full block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              />
            </div>

            <div className="mt-7">
              <h1>Subtitle</h1>

              <input
                onChange={handleOnChange}
                type="text"
                name="text"
                id="subtitle"
                maxLength="100"
                placeholder="A short subtitle is going to help"
                className="md:w-96 w-full block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t my-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1 className="">Description (Why do you need this fund)</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Write a note on why you choose to launch a campaign. This is
              really going to help in getting the attention of potential
              backers.
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 mt-4 md:mt-0">
            <div>
              <h1>Note</h1>
              <textarea
                onChange={handleOnChange}
                cols="50"
                wrap="soft"
                placeholder="Write a short note"
                id="note"
                className="w-full h-40 md:h-60 text-clip block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t my-11 border-gray-300 py-4 md:px-16 px-5">
          <div className="md:w-5/12 ">
            <h1>Project Image</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Add an image that clearly represents your project. Choose one that
              looks good at different sizes—it’ll appear on your project page,
              across the website
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div className="">
              <div className="border border-gray-300 h-40 md:h-80 w-full hover:bg-gray-200">
                <button
                  className="w-full h-full"
                  id="image"
                  onClick={handleClick}
                >
                  {projectInfo.imageSrc ? (
                    <div className="w-full h-full">
                      <img
                        alt="..."
                        src={projectInfo.imageSrc}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm">Select a File</p>
                      <p className="text-sm text-gray-500 px-2">
                        <small>It must be a JPG, PNG, GIF, TIFF, or BMP.</small>
                      </p>
                    </div>
                  )}
                </button>
                <input
                  type="file"
                  id="imageSrc"
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  onChange={handleOnChange}
                  className="w-80 block p-2 text-sm mt-1 border border-gray-300 focus:outline-none rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t my-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Launch Date</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Select a date you want your project to be launched. Project will
              not appear on the website until the launch date.
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="flex flex-col md:ml-4 my-2">
                  <p className="text-sm">Use Calendar</p>
                  <div>
                    <div className="flex bg-gray-50 border px-2 border-gray-300 items-center p-2">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>

                      {/* <DatePicker /> */}

                      <DatePicker
                        id="launchDate"
                        className=" text-gray-900 md:w-60 w-40 bg-gray-50 p-2 sm:text-sm outline-none "
                        selected={projectInfo.launchDate}
                        onChange={(date) => {
                          const dateInMilliseconds = date.getTime();
                          const currentDateInMilliseconds =
                            new Date().getTime();

                          setIsValidLaunchDate(
                            dateInMilliseconds > currentDateInMilliseconds
                              ? true
                              : false
                          );

                          setProjectInfo((prevProjectInfo) => {
                            return {
                              ...prevProjectInfo,
                              launchDate: date,
                            };
                          });
                          // setLaunchDate(date);
                        }}
                      />
                    </div>
                    {/* {!isValidLaunchDate && (
                      <p className="text-red-700 text-sm">
                        <small>
                          The Launch date should be greater than the current
                          date
                        </small>
                      </p>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t mt-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Campaign Duration</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Set a time limit for your campaign. You won’t be able to change
              this after you launch.
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div>
              <h1 className="md:text-auto text-sm">
                Enter number of minutes (1 - 1000){" "}
              </h1>

              <input
                onChange={handleOnChange}
                type="text"
                name="text"
                id="duration"
                placeholder="1"
                className="md:w-80 w-full block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              />
              {!isValidDuration && (
                <p className="text-red-700 md:text-sm text-xs">
                  <small>Duration should be within 1 and 1000</small>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t mt-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Goal (Amount to raise)</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Set the amount to be funded. Note that if the goal is not reached
              after the specified campaign duration, money will be refunded to
              the backers.
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div>
              <h1>Enter amount to raise in dollars </h1>
              <div className="flex border border-gray-300 rounded-md items-center p-2">
                <p>$</p>
                <input
                  onChange={handleOnChange}
                  type="text"
                  value={projectInfo.goal || ""}
                  name="text"
                  id="goal"
                  // placeholder="$50,000"
                  className="md:w-80 w-full block md:text-sm text-xs ml-1  focus:outline-none rounded-md"
                />
              </div>

              {!isValidGoal && (
                <p className="text-red-700 md:text-sm text-xs">
                  <small>Invalid amount</small>
                </p>
              )}
            </div>
          </div>
        </div>

        {allValid && (
          <button
            className="flex flex-col w-full items-center my-5 mb-14 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleLaunch}
            disabled={isLaunching}
          >
            {isLaunching ? (
              <div className="flex bg-green-300 text-green-800 rounded-md items-center px-3 py-3">
                <ClipLoader color="#004d00" loading="true" size={30} />
                <p className="ml-2">
                 {launchText}
                </p>
              </div>
            ) : (
              <div className="flex bg-green-300 text-green-800 rounded-md items-center px-3 py-3">
                <p className="">{launchText}</p>
              </div>
            )}
          </button>
        )}
      </section>
      <Footer />
    </>
  );
}
