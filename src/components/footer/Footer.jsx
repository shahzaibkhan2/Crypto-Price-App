import { Link } from "react-router-dom";
import appStore from "../../assets/app_store.png";
import playStore from "../../assets/play_store.png";
import { footerNavData } from "../../data/footerData";

const Footer = () => {
  return (
    <footer className="max-w-[80%] m-auto py-7">
      <section className="flex justify-start mb-4">
        <h2 className="font-bold text-2xl flex items-center justify-center gap-1">
          <span className="rounded-md bg-[#403a3e] py-1 px-3">Crypto</span>Cave
        </h2>
      </section>
      <hr className="border-t-2 border-[#656565]" />
      <section className="flex flex-col-reverse mm:flex-row gap-4 mm:justify-between items-start text-sm mt-4">
        <div className="flex flex-col gap-6">
          <p>&copy; Copyright 2024 CryptoCave. All Rights Reserved.</p>
          <div className="size-40 flex flex-col gap-5">
            <Link>
              <img src={appStore} alt="app store" className="w-full" />
            </Link>
            <Link>
              <img src={playStore} alt="play store" className="w-full" />
            </Link>
          </div>
        </div>
        <nav className="flex gap-8 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              {footerNavData.product.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-lg  font-semibold">Company</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              {footerNavData.company.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-lg  font-semibold">Support</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              {footerNavData.support.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-lg  font-semibold">Socials</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              {footerNavData.socials.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
