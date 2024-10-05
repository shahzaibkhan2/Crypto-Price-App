import { FaEthereum } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import Loader from "../loader/Loader";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { logged } = useSelector((state) => state.crypto);
  const [userBalance, setUserBalance] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const addressRef = useRef(null);
  const amountRef = useRef(null);
  const commonStyles =
    "flex justify-center items-center text-sm font-light text-white border-[0.5px] border-gray-400 min-h-[70px] sm:min-w-[120px] px-2 sm:px-0";

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChanged(res[0]));
    } else {
      toast.error(
        "Sorry ! Install MetaMask or similar extension to use wallet services."
      );
    }

    const accountChanged = (accName) => {
      setDefaultAccount(accName);
      getUserBalance(accName);
    };

    const getUserBalance = async (accAddress) => {
      await window.ethereum
        .request({
          method: "eth_getBalance",
          params: [String(accAddress), "latest"],
        })
        .then((balance) => setUserBalance(ethers.utils.formatEther(balance)));
    };
  };

  const onSubmitTransactionHandler = async () => {
    let addressRefValue = addressRef.current.value;
    let amountRefValue = amountRef.current.value;
    let parameters = [
      {
        from: "address",
        to: String(addressRefValue),
        gas: Number(33000).toString(16),
        gasPrice: Number(4000200).toString(16),
        value: Number(amountRefValue).toString(16),
      },
    ];

    let res = await window.ethereum
      .request({ method: "eth_sendTransaction" }, parameters)
      .catch((err) => toast.error("Transaction failed ! ", err));
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col mf:flex-row justify-between items-start px-4 py-12 md:p-20">
        <div className="flex flex-1 flex-col mf:mr-10 justify-start gap-1">
          <h1 className="text-3xl sm:text-5xl text-gradient py-1 text-white">
            Send and receive Crypto <br /> across the world
          </h1>
          <p className="mt-5 text-white font-light md:w-9/12 w-11/12 text-base text-left">
            Buy and sell cryptocurrencies with great ease on CryptoCave
          </p>
          {!logged && <p>Signin to have full access !</p>}

          <button
            type="button"
            disabled={!logged}
            onClick={connectWalletHandler}
            className={`${
              logged ? "bg-[#94404e]" : "bg-gray-500"
            } --hero-btn rounded-full mt-6`}
          >
            <p className="font-semibold text-white text-base">Connect Wallet</p>
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 mt-10 w-full">
            <div className={`${commonStyles} rounded-tl-2xl`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`${commonStyles} rounded-tr-2xl`}>Ethereum</div>
            <div className={`${commonStyles} rounded-bl-2xl`}>Web 3.0</div>
            <div className={commonStyles}>Low Gas</div>
            <div className={`${commonStyles} rounded-br-2xl`}>Blockchain</div>
          </div>
        </div>
        <div className="flex w-full mt-10 mf:mt-0 justify-start items-center flex-1 flex-col">
          <div className="flex-col justify-end items-start eth-card white-glassmorphism rounded-xl w-full sm:w-72 my-5 h-40 p-3">
            <div className="flex flex-col w-full h-full justify-between">
              <div className="flex items-start justify-between">
                <div className="flex justify-center items-center size-10 border-2 border-white rounded-full">
                  <FaEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircleFill fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="font-light text-sm text-white">
                  0x3f780dd......3982jd32
                </p>
                <p className="font-semibold mt-1 text-lg text-white">
                  ETHEREUM
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={onSubmitTransactionHandler}
            className="flex flex-col justify-start items-center blue-glassmorphism w-full sm:w-96 p-5"
          >
            <input
              ref={addressRef}
              type="text"
              name="sendTo"
              placeholder="Send to..."
              step="0.0001"
              className="p-2 w-full rounded-sm border-none white-glassmorphism text-sm my-2 text-white outline-none bg-transparent"
            />
            <input
              ref={amountRef}
              type="number"
              name="amount"
              placeholder="Amount in Wei"
              step="0.0001"
              className="p-2 w-full rounded-sm border-none white-glassmorphism text-sm my-2 text-white outline-none bg-transparent"
            />

            <div className="my-2 bg-gray-400 h-[1px] w-full" />
            {false ? (
              <Loader />
            ) : (
              <button
                type="submit"
                disabled={!logged}
                className={`cursor-pointer border-[#3d4f7c] border-[1px] rounded-full p-2 w-full text-white mt-2 ${
                  logged && "hover:bg-[#94404e]"
                } transition duration-300`}
              >
                Send now
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
