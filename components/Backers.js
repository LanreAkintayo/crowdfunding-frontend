import { addressToToken, fromWei } from "../utils/helper";

export default function Backers({ backers }) {
  console.log(backers);
  return (
    <div>
      {backers.length == 0 ? (
        <div className="h-96 border mb-6 flex flex-col justify-center items-center border-gray-200 overflow-auto scrollbar-hide">
          <p>You have no backers yet</p>
        </div>
      ) : (
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
              <div
                className="text-gray-800 text-sm bg-gray-100 p-2 mb-4 m-2"
                key={backer.amount}
              >
                {amount && account && (
                  <>
                    <p className="pt-1">
                      <span className="text-gray-500 text-sm">Account: </span>
                      {account.toString().substring(0, 7)}...
                      {account
                        .toString()
                        .substring(
                          account.toString().length - 8,
                          account.toString().length
                        )}
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
      )}
    </div>
  );
}
