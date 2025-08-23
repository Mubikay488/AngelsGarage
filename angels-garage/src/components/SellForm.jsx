import React, { useState } from "react";
import Navbar from "./Navbar";

const SellForm = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
  priceAmount: "",
  priceCurrency: "GHS",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for admin review
    const pendingCars = JSON.parse(localStorage.getItem('pendingCars') || '[]');

    const saveCar = (imageDataUrl) => {
      const amount = parseFloat(form.priceAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
      const priceStr = form.priceCurrency === 'USD' ? `$${amount}` : `GH₵${amount}`;
      const carData = {
        ...form,
        price: priceStr,
        id: Date.now(),
        image: imageDataUrl || null,
      };
      pendingCars.push(carData);
      localStorage.setItem('pendingCars', JSON.stringify(pendingCars));
      setSubmitted(true);
    };

    // If an image File is present, convert to Base64 Data URL so it persists
    if (form.image && form.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveCar(reader.result);
      };
      reader.readAsDataURL(form.image);
    } else {
      // already a data URL or null
      saveCar(form.image);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Sell Your Car</h1>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
          {submitted ? (
            <div className="text-green-700 text-xl font-semibold text-center">
              Your car details have been submitted for review!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Car Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    required
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="col-span-1">
                  <label className="block font-semibold mb-1">Currency</label>
                  <select
                    name="priceCurrency"
                    value={form.priceCurrency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                  >
                    <option value="GHS">GH₵ (Cedis)</option>
                    <option value="USD">$ (USD)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Amount</label>
                  <input
                    type="number"
                    name="priceAmount"
                    value={form.priceAmount}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
              </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Car Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded shadow"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white rounded font-semibold"
                style={{ backgroundColor: '#3B1220' }}
              >
                Submit for Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellForm;
