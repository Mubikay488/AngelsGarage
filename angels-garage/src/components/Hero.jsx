import { useEffect, useState } from "react";
import { FaArrowRight } from 'react-icons/fa';
import {AnimatePresence, motion} from "framer-motion"
import image1 from "../assets/images/back1.png"
import image2 from "../assets/images/back2.png"
import image3 from "../assets/images/back3.png"
import Navbar from "./Navbar";

const heroData = [
    {
        text: "Become a car owner today!",
        image: image1,
    }, 
    {
        text: "Experience Luxury",
        image: image2,
    },
    {
        text: "Drive with confidence",
        image: image3,
    },
]
 

function Hero() {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex(prevIndex => prevIndex < heroData.length - 1 ? prevIndex + 1 : 0);
        }, 5000)
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            
            <Navbar />
            <section className='min-h-screen relative flex items-center px-34'>
                {/* Animated background images with fade transition */}
                <div className='absolute inset-0 w-full h-full'>
                    <AnimatePresence>
                        <motion.div
                            key={slideIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                backgroundImage: `url(${heroData[slideIndex].image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                            }}
                            className="z-0"
                        >
                            <div className='absolute inset-0 bg-black-900 opacity-20'></div>
                            {/* Amber shadow at bottom */}
                            <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-amber-950 to-transparent shadow-3xl"></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className='z-10 grid gap-15'>
                    <AnimatePresence>
                        <motion.p className='text-5xl text-white font-bold' key={slideIndex}
                            initial={{ opacity: 0, y:30}}
                            animate={{ opacity: 1,  y:0}}
                            exit={{ opacity: 0, y:30 }}
                            transition={{duration:0.6}}
                        >
                            {heroData[slideIndex].text}
                        </motion.p>
                    </AnimatePresence>
                    <div>
                        <a href="/buy" className='bg-white inline-flex justify-center items-center p-2  rounded-full gap-10 pl-4'>
                            <span className='text-xl font-semibold'>Browse Cars</span>
                            <span className='bg-amber-900 p-4 text-white rounded-full'><FaArrowRight /></span>
                        </a>
                    </div>
                    {/* Buy and Sell Buttons */}
                    <div className="flex justify-center relative gap-8 mt-16">
                      <a href="/buy" className="px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-lg hover:bg-amber-950 transition-colors duration-300 text-xl">Buy</a>
                      <a href="/sell" className="px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-lg hover:bg-amber-200 transition-colors duration-300 text-xl">Sell</a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
