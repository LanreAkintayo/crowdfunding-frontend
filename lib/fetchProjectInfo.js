import Moralis from "moralis"
import { abi, contractAddresses } from "../constants";
import { now, toMilliseconds } from "../utils/helper";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_APP_ID;
const masterKey = process.env.NEXT_PUBLIC_MASTER_KEY;


export async function getProjectInfo(id){
  // console.log("Fetching proposals data ........................................")

  try {
    //   await Moralis.start({ serverUrl, appId, masterKey });
      const chainId = "97"
      
    //   getAllProjects()   
    const crowdfundAddress = "0x3801a82A9EeA8f0d99d022C847C2A220760b82Eb";  

      const options = {
        chain: "0x61",
        address: crowdfundAddress,
        function_name: "getAllProjects",
        abi: abi,
        params: { }
      };

      const projects = await Moralis.Web3API.native.runContractFunction(options)
      // console.log("These are all voters: ", allVoters)

   

    // console.log("Final proposal: ", finalProposal)

    return projects
  } catch (error) {
    console.log(error)
  }
  

}