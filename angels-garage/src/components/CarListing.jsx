import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const carsForSale = [
	{
		id: 1,
		name: "Toyota Camry",
		price: "GH₵12,000",
		image: "/src/assets/images/image 1.jpg",
		description: "2018 model, low mileage, excellent condition.",
		brand: "Toyota",
		model: "Camry",
		year: 2018,
	},
	{
		id: 2,
		name: "Honda Accord",
		price: "GH₵10,500",
		image: "/src/assets/images/image 2.jpg",
		description: "2017 model, well maintained, single owner.",
		brand: "Honda",
		model: "Accord",
		year: 2017,
	},
	{
		id: 3,
		name: "Ford Mustang",
		price: "GH₵22,000",
		image: "/src/assets/images/image 3.jpg",
		description: "2020 model, sporty, like new.",
		brand: "Ford",
		model: "Mustang",
		year: 2020,
	},
];

const CarListing = () => {
	const [search, setSearch] = useState("");
	const [filteredCars, setFilteredCars] = useState(carsForSale);
	const navigate = useNavigate();

	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase();
		setSearch(value);
		setFilteredCars(
			carsForSale.filter((car) =>
				car.name.toLowerCase().includes(value) ||
				car.brand.toLowerCase().includes(value) ||
				car.model.toLowerCase().includes(value) ||
				car.price.toLowerCase().includes(value) ||
				car.year.toString().includes(value)
			)
		);
	};

	return (
		<div>
			<Navbar />
			<div className="container mx-auto py-8">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Welcome to Angels Garage
				</h1>
				<h2 className="text-2xl font-semibold mb-4">Cars for Sale</h2>
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
								className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
							>
								<img
									src={car.image}
									alt={car.name}
									className="w-full h-80 object-cover rounded-lg mb-4 aspect-video"
								/>
								<h3 className="text-xl font-bold mb-2">{car.name}</h3>
								<div className="relative w-full">
									<p
										className="text-gray-700 mb-2 truncate cursor-pointer hover:whitespace-normal hover:bg-amber-50 hover:shadow-lg transition-all duration-300 px-2 py-1 rounded"
										title={car.description}
										onClick={e => {
											const el = e.currentTarget;
											el.classList.toggle('whitespace-normal');
											el.classList.toggle('truncate');
										}}
									>
										{car.description}
									</p>
								</div>
								<span className="text-blue-600 font-semibold text-lg">
									{car.price}
								</span>
								<div className="flex gap-4 mt-4">
									<button
										className="px-4 py-2 bg-amber-950 text-white rounded hover:bg-amber-700"
										onClick={() => window.open('https://wa.me/233596670153?text=I%20am%20interested%20in%20buying%20the%20' + encodeURIComponent(car.name), '_blank')}
									>
										Buy Now
									</button>
									<button
										className="px-4 py-2 bg-white text-amber-950 border border-amber-950 rounded hover:bg-amber-100"
										onClick={() => navigate('/sell')}
									>
										Sell Now
									</button>
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
