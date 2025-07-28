import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Image1 from "../assets/images/image1.jpg";
import Image2 from "../assets/images/image2.jpg";
import Image3 from "../assets/images/image3.jpg";
import Image4 from "../assets/images/image4.jpg";
import Image5 from "../assets/images/image5.jpg";
import Image6 from "../assets/images/image6.jpg";	



// Get cars from localStorage (approved by admin)
const getApprovedCars = () => {
	return JSON.parse(localStorage.getItem('approvedCars') || '[]');
};

const CarListing = () => {
	const [search, setSearch] = useState("");
	const [filteredCars, setFilteredCars] = useState(getApprovedCars());
	const navigate = useNavigate();

	// Sync with localStorage changes (e.g., after admin approves/removes cars)
	useEffect(() => {
		const handleStorage = () => {
			setFilteredCars(getApprovedCars().filter((car) =>
				car.name.toLowerCase().includes(search) ||
				car.brand.toLowerCase().includes(search) ||
				car.model.toLowerCase().includes(search) ||
				car.price.toLowerCase().includes(search) ||
				car.year.toString().includes(search)
			));
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, [search]);

	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase();
		setSearch(value);
		setFilteredCars(getApprovedCars().filter((car) =>
			car.name.toLowerCase().includes(value) ||
			car.brand.toLowerCase().includes(value) ||
			car.model.toLowerCase().includes(value) ||
			car.price.toLowerCase().includes(value) ||
			car.year.toString().includes(value)
		));
	};

	return (
		<div>
			<Navbar /> 
	  <br />
	  <br />
			<div className="container mx-auto py-8">
		<br />
				<h1 className="text-3xl font-bold mb-6 text-center">
					Welcome to Angels Garage
				</h1>
				<div className="flex justify-center mb-8">
					<input
						type="text"
						value={search}
						onChange={handleSearch}
						placeholder="Search by price, brand, model, year..."
						className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{filteredCars.length > 0 ? (
						filteredCars.map((car) => (
							<div
								key={car.id}
								className="bg-white rounded-2xl border border-gray-200 shadow-md p-0 flex flex-col items-stretch overflow-hidden min-h-[480px]"
							>
								<img
									src={car.image}
									alt={car.name}
									className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-t-2xl"
								/>
								<div className="flex-1 flex flex-col justify-between p-6">
									<div>
										<h3 className="text-2xl font-bold mb-2 tracking-wide">{car.name.toUpperCase()}</h3>
										<span className="text-green-600 font-bold text-2xl mb-2 block">{car.price}</span>
										<p className="text-gray-500 text-base mb-4 leading-snug">
											{car.description}
										</p>
									</div>
										<div className="w-11/12 mx-auto md:w-full flex gap-4 mt-4">
										<button
											className="flex-1 px-8 py-4 text-white font-bold rounded-2xl text-xl bg-[#3B1220] hover:opacity-90 transition-all"
											onClick={() => window.open('https://wa.me/233596670153?text=I%20am%20interested%20in%20buying%20the%20' + encodeURIComponent(car.name), '_blank')}
										>
											Buy now
										</button>
										<button
											className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-2xl text-2xl hover:bg-gray-300 transition-all"
											title="Bookmark"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4a2 2 0 00-2 2v14l8-5 8 5V6a2 2 0 00-2-2H6z" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-3 text-center text-gray-500 text-xl">
							No cars found.
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CarListing;
