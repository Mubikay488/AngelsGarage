import React, { useState, useEffect, useRef } from "react";
// remove unused useNavigate import
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
	const [brandFilter, setBrandFilter] = useState('');
	const [modelFilter, setModelFilter] = useState('');
	const [yearFilter, setYearFilter] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [currencyFilter, setCurrencyFilter] = useState('ALL'); // ALL | GHS | USD
	const [filtersOpen, setFiltersOpen] = useState(false);
	const panelRef = useRef(null);

	// count active filters to show a badge on the Filters button
	const activeFiltersCount = [brandFilter, modelFilter, yearFilter, minPrice, maxPrice, currencyFilter !== 'ALL' ? 'currency' : ''].filter(Boolean).length;

	// close filters panel when clicking outside
	useEffect(() => {
		const onDocClick = (e) => {
			if (!filtersOpen) return;
			if (panelRef.current && !panelRef.current.contains(e.target)) {
				setFiltersOpen(false);
			}
		};
		document.addEventListener('mousedown', onDocClick);
		return () => document.removeEventListener('mousedown', onDocClick);
	}, [filtersOpen]);

	const parsePrice = (priceStr) => {
		if (!priceStr) return { value: 0, currency: null };
		const s = String(priceStr).trim();
		let currency = null;
		let cleaned = s.replace(/\s/g, '');
		if (/^(GH|GH₵|GHS)/i.test(cleaned)) {
			currency = 'GHS';
			cleaned = cleaned.replace(/[^0-9.,]/g, '');
		} else if (cleaned.startsWith('$')) {
			currency = 'USD';
			cleaned = cleaned.replace(/[^0-9.,]/g, '');
		} else {
			cleaned = cleaned.replace(/[^0-9.,]/g, '');
		}
		cleaned = cleaned.replace(/,/g, '');
		const value = parseFloat(cleaned) || 0;
		return { value, currency };
	};

	useEffect(() => {
		const all = getApprovedCars();
		const q = search.trim().toLowerCase();
		const results = all.filter(car => {
			if (q) {
				const matchText = (car.name || '').toLowerCase().includes(q) ||
					(car.brand || '').toLowerCase().includes(q) ||
					(car.model || '').toLowerCase().includes(q) ||
					(String(car.price || '').toLowerCase().includes(q)) ||
					((car.year || '') + '').includes(q);
				if (!matchText) return false;
			}
			if (brandFilter && (car.brand || '') !== brandFilter) return false;
			if (modelFilter && (car.model || '') !== modelFilter) return false;
			if (yearFilter && String(car.year) !== String(yearFilter)) return false;
			const parsed = parsePrice(car.price || '');
			if (currencyFilter !== 'ALL' && parsed.currency && parsed.currency !== currencyFilter) return false;
			if (minPrice) { const min = parseFloat(minPrice) || 0; if (parsed.value < min) return false; }
			if (maxPrice) { const max = parseFloat(maxPrice) || 0; if (parsed.value > max) return false; }
			return true;
		});
		setFilteredCars(results);
	}, [search, brandFilter, modelFilter, yearFilter, minPrice, maxPrice, currencyFilter]);

	// derive options for dropdowns from approved cars
	const allCars = getApprovedCars();
	const brands = Array.from(new Set(allCars.map(c => (c.brand || '').trim()).filter(Boolean))).sort();
	const allModels = Array.from(new Set(allCars.map(c => (c.model || '').trim()).filter(Boolean))).sort();
	const models = brandFilter ? Array.from(new Set(allCars.filter(c => (c.brand||'').trim() === brandFilter).map(c => (c.model||'').trim()).filter(Boolean))).sort() : allModels;
	const years = Array.from(new Set(allCars.map(c => c.year).filter(Boolean))).sort((a,b) => b - a);

	useEffect(() => {
		const handleStorage = () => setFilteredCars(getApprovedCars());
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	const handleSearch = (e) => setSearch(e.target.value);

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
				<div className="mb-6">
					<div className="flex items-center justify-center gap-4 flex-wrap">
						<div className="relative flex-1 min-w-0 w-full md:w-2/3 lg:w-1/2 max-w-3xl">
							<svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
							</svg>
							<input aria-label="Search cars" type="text" value={search} onChange={handleSearch} placeholder="Search by name, brand, model, year..." className="w-full pl-10 pr-4 py-3 text-base border rounded-lg focus:outline-none focus:shadow-md focus:ring-2 focus:ring-amber-800 transition" />
						</div>
						<div className="flex-shrink-0">
							<div className="relative" ref={panelRef}>
								<button onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} aria-controls="filters-panel" className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-md flex items-center gap-2 transition">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" viewBox="0 0 20 20" fill="currentColor">
										<path d="M3 5a1 1 0 011-1h12a1 1 0 01.707 1.707L12 11.414V16a1 1 0 01-1.447.894L7 15l-3.553 1.894A1 1 0 012 15.894V6a1 1 0 011-1z" />
									</svg>
									<span className="font-medium">Filters</span>
									{activeFiltersCount > 0 && (
										<span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-amber-800 text-white rounded-full">{activeFiltersCount}</span>
									)}
								</button>
								{filtersOpen && (
									<div id="filters-panel" className="absolute right-0 mt-2 bg-white p-4 shadow-xl rounded w-screen sm:w-80 z-50">
										<div className="grid grid-cols-1 gap-3">
											<div>
												<label className="block text-sm text-gray-600 mb-1">Brand</label>
												<select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none">
													<option value="">All brands</option>
													{brands.map(b => <option key={b} value={b}>{b}</option>)}
												</select>
											</div>
											<div>
												<label className="block text-sm text-gray-600 mb-1">Model</label>
												<select value={modelFilter} onChange={e => setModelFilter(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none">
													<option value="">All models</option>
													{models.map(m => <option key={m} value={m}>{m}</option>)}
												</select>
											</div>
											<div>
												<label className="block text-sm text-gray-600 mb-1">Year</label>
												<select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none">
													<option value="">Any year</option>
													{years.map(y => <option key={y} value={y}>{y}</option>)}
												</select>
											</div>
											<div className="flex gap-2">
												<div className="flex-1">
													<label className="block text-sm text-gray-600 mb-1">Min price</label>
													<input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none" />
												</div>
												<div className="flex-1">
													<label className="block text-sm text-gray-600 mb-1">Max price</label>
													<input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none" />
												</div>
											</div>
											<div>
												<label className="block text-sm text-gray-600 mb-1">Currency</label>
												<select value={currencyFilter} onChange={e => setCurrencyFilter(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none">
													<option value="ALL">All Currencies</option>
													<option value="GHS">GH₵</option>
													<option value="USD">$</option>
												</select>
											</div>
											<div className="flex justify-between mt-2">
												<button onClick={() => { setBrandFilter(''); setModelFilter(''); setYearFilter(''); setMinPrice(''); setMaxPrice(''); setCurrencyFilter('ALL'); }} className="px-4 py-2 border rounded text-sm hover:bg-gray-50">Reset</button>
												<div className="flex gap-2">
													<button onClick={() => { setFiltersOpen(false); }} className="px-4 py-2 bg-amber-800 text-white rounded text-sm">Apply</button>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{filteredCars.length > 0 ? (
						filteredCars.map((car) => (
							<div
								key={car.id}
								className="bg-white rounded-2xl border border-gray-200 shadow-md p-0 flex flex-col items-stretch overflow-hidden min-h-[480px]"
							>
								{(() => {
									const imageSrc = car.image || (car.carImages && car.carImages.length > 0 && car.carImages[0]) || (car.imageFiles && car.imageFiles.length > 0 && car.imageFiles[0]) || Image1;
									return (
										<img
											src={imageSrc}
											alt={car.name}
											className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-t-2xl"
											onError={(e) => {
												e.target.onerror = null;
												e.target.src = Image1;
												console.warn('Car image failed to load, replaced with fallback for car id', car.id);
											}}
										/>
									);
								})()}
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
