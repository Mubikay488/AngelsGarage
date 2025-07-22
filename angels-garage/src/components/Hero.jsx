import { useEffect, useState } from "react";
import {motion, AnimatePresence} from "framer-motion";
import image1 from "../assets/images/back1.png"
import image2 from "../assets/images/back2.png"
import image3 from "../assets/images/back3.png"
import Navbar from "./Navbar";

const images = [image1, image2, image3];
function Hero() {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        // Slideshow interval
        const interval = setInterval(() => {
            setSlideIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);
        return () => {
            document.body.style.overflow = '';
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Navbar />
            <section className='min-h-screen w-full relative flex items-center px-4 md:px-34'>
                {/* Animated background images with fade transition */}
                <div className='fixed inset-0 w-full h-full min-h-screen'>
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={slideIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                backgroundImage: `url(${images[slideIndex]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: '100vw',
                                height: '100vh',
                                minHeight: '100vh',
                                position: 'fixed',
                                inset: 0,
                                backgroundColor: 'black',
                            }}
                            className="z-0"
                        >
                            <div className='absolute inset-0 bg-black-900 opacity-20'></div>
                            {/* Amber shadow at bottom */}
                            <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-amber-950 to-transparent shadow-3xl"></div>
                            {/* Amber shadow at left */}
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-amber-950 to-transparent"></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className='z-10 w-full flex flex-col items-center justify-end absolute bottom-0 pb-32'>
                    <h1 className='text-3xl md:text-3xl text-white font-bold text-center mb-4'>Buy and Sell Cars on Commission</h1>
                    <p className='text-sm md:text-xl text-white text-center mb-8 max-w-2xl'>Looking to buy or sell a car? We can help you make the best deals as your trusted agent</p>
                    {/* Buy and Sell Buttons */}
                    <div className="flex justify-center relative gap-8 mt-2">
                      <a href="/buy" className="px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-lg hover:bg-amber-950 transition-colors duration-300 text-xl">Buy</a>
                      <a href="/sell" className="px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-lg hover:bg-amber-200 transition-colors duration-300 text-xl">Sell</a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
