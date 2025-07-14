import logo from "/src/assets/images/AngelsGarage logo.png"
import { useState } from "react";

export default function Secondbar (){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <header className="flex justify-between items-center text-black py-4 px-6 md:px-32 bg-amber-800 drop-showdow-md">
            <a href="#">
                <img src={logo} alt="logo "  className="w-20 hover:scale-105 transition-all"/>
            </a>
            <ul className="hidden xl:flex item-center gap-12 font-semibold tex-base ">
                <li className="p-1 hover:bg-amber-200 hover:text-white rounded-md  transition-all cursor-pointer">Buy</li>
                <li className="p-1 hover:bg-amber-200 hover:text-white rounded-md  transition-all cursor-pointer">Sell</li>
                <li className="p-1 hover:bg-amber-200 hover:text-white rounded-md  transition-all cursor-pointer">Contact</li>
                <li className="p-1 hover:bg-amber-200 hover:text-white rounded-md  transition-all cursor-pointer">Home</li>
            </ul>
            <div className="relative hidden md:flex item-center justify-center gap-3 ">
                <i className="bx bx-search absolute left-3 text-2xl text-amber-300"></i>
                <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-amber-300 focus:bg-slate-200 focus:outline-amber-500 " />
            </div>
            <i className="bx bx-menu xl:hidden block  text-4xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
            <div className={`absolute xl:hidden top-24 left-0 w-full bg-amber-100 flex flex-col items-center gap-6 font-semibold text-lg transfrom transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
                <li className="list-none w-full text-center p-4 hover:bg-amber-300 hover:text-white transition-all cursor-pointer">Home</li>
                <li className="list-none w-full text-center p-4 hover:bg-amber-300 hover:text-white transition-all cursor-pointer">Buy</li>
                <li className="list-none w-full text-center p-4 hover:bg-amber-300 hover:text-white transition-all cursor-pointer">Sell</li>
                <li className="list-none w-full text-center p-4 hover:bg-amber-300 hover:text-white transition-all cursor-pointer">Contact</li>
            </div>
        </header>
    )
}