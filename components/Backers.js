import { addressToToken, fromWei } from "../utils/helper";

export default function Backers({ backers }) {
  console.log(backers);
  return (
    <div className="h-96 border mb-6 border-gray-100 overflow-auto scrollbar-hide">
      {backers.map((backer) => {
        const account = backer[0];

        const tokenName = addressToToken[backer[1]];
        let amount = fromWei(backer[2]);
        let dollarUSLocale = Intl.NumberFormat("en-US");
        let formattedAmount = dollarUSLocale
          .format(amount.toString())
          .toString();

        return (
          <div className="text-gray-800 text-sm bg-gray-100 p-2 mb-4 m-2" key={backer.amount}>
            {amount && account && (
              <>
                <p className="pt-1">
                  <span className="text-gray-500 text-sm">Account: </span>
                  {account}
                </p>
                <p className="pt-1">
                  <span className="text-gray-500 text-sm">
                    Amount Backed with:
                  </span>{" "}
                  {formattedAmount} {tokenName}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
