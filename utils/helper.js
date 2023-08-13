import { ethers } from "ethers";

export const tokenToAddress = {
  BNB: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  BUSD: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
  DAI: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
  XRP: "0xa83575490D7df4E2F47b7D38ef351a2722cA45b9",
};

export const addressToToken = {
  "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd": "BNB",
  "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee": "BUSD",
  "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867": "DAI",
  "0xa83575490D7df4E2F47b7D38ef351a2722cA45b9": "XRP",
};



export const toWei = (value) => {
  return ethers.utils.parseEther(value.toString());
};

export const fromWei = (value) => {
  return ethers.utils.formatEther(value.toString());
};

export const allValid = (data) => {
  if ([null, undefined, {}].includes(data)) {
    return false;
  }

  return Object.values(data).every((item) => {
    if ([null, undefined, {}].includes(item)) {
      return false;
    } else {
      return true;
    }
  });
};

export const sDuration = {
  seconds: function (val) {
    return val;
  },
  minutes: function (val) {
    return val * this.seconds(60);
  },
  hours: function (val) {
    return val * this.minutes(60);
  },
  days: function (val) {
    return val * this.hours(24);
  },
  weeks: function (val) {
    return val * this.days(7);
  },
  years: function (val) {
    return val * this.days(365);
  },
};

export const now2 = async () => {
  const blockNumber = await ethers.providers.getBlockNumber();
  const block = await ethers.providers.getBlock(blockNumber);

  console.log("Now 2: ", block)

  return block.timestamp;

};

export const now = () => {
  
  const time = new Date().getTime();
  console.log("Now: ", time)
  return time;

};

export const time = ((milliseconds) => {
  const SEC = 1e3;
  const MIN = SEC * 60;
  const HOUR = MIN * 60;
  const DAY = HOUR * 24;
  return (time) => {
    const ms = Math.abs(time);
    const d = (ms / DAY) | 0;
    const h = ((ms % DAY) / HOUR) | 0;
    const m = ((ms % HOUR) / MIN) | 0;

    return {
      minute: m,
      hour: h,
      day: d,
    };
    //   const s = ((ms % MIN) / SEC) | 0;
    //   return `${time < 0 ? "-" : ""}${d} Days ${h} Hours ${
    //     h == 0 ? `${m} Minutes` : ""
    //   }`;
    // ${m}Minute(s) ${s}Second(s)
  };
})();
