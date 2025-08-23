import React, { useState } from "react";
import Navbar from "./Navbar";

// Dummy admin authentication (replace with real auth in production)
const isAdmin = () => {
  // For demo: check localStorage for 'isAdmin' flag
  return localStorage.getItem("isAdmin") === "true";
};

// Initial hardcoded cars (must be outside the component and not merged into getApprovedCars)
import Image1 from "../assets/images/image1.jpg";
import Image2 from "../assets/images/image2.jpg";
import Image3 from "../assets/images/image3.jpg";
import Image4 from "../assets/images/image4.jpg";
import Image5 from "../assets/images/image5.jpg";
import Image6 from "../assets/images/image6.jpg";

const initialCars = [
  {
    id: 1,
    name: "Toyota Camry",
    price: "GH₵12,000",
    image: Image1,
    description: "2018 model, low mileage, excellent condition.",
    brand: "Toyota",
    model: "Camry",
    year: 2018,
  },
  {
    id: 2,
    name: "Honda Accord",
    price: "GH₵10,500",
    image: Image2,
    description: "2017 model, well maintained, single owner.",
    brand: "Honda",
    model: "Accord",
    year: 2017,
  },
  {
    id: 3,
    name: "Ford Mustang",
    price: "GH₵22,000",
    image: Image3,
    description: "2020 model, sporty, like new.",
    brand: "Ford",
    model: "Mustang",
    year: 2020,
  },
  {
    id: 4,
    name: "Ford Mustang",
    price: "GH₵22,000",
    image: Image4,
    description: "2020 model, sporty, like new.",
    brand: "Ford",
    model: "Mustang",
    year: 2020,
  },
  {
    id: 5,
    name: "Ford Mustang",
    price: "GH₵22,000",
    image: Image5,
    description: "2020 model, sporty, like new.",
    brand: "Ford",
    model: "Mustang",
    year: 2020,
  },
  {
    id: 6,
    name: "Ford Mustang",
    price: "GH₵22,000",
    image: Image6,
    description: "2020 model, sporty, like new.",
    brand: "Ford",
    model: "Mustang",
    year: 2020,
  },
];

// Use localStorage for persistent approved cars only
const getApprovedCars = () => {
  return JSON.parse(localStorage.getItem('approvedCars') || '[]');
};

const AdminPage = () => {
  const [cars, setCars] = useState(getApprovedCars());
  const [archivedCars, setArchivedCars] = useState(() => JSON.parse(localStorage.getItem('archivedCars') || '[]'));
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState('listed'); // listed | pending | available | archived | all
  const [toasts, setToasts] = useState([]); // {id, message, undoCallback}

  const [form, setForm] = useState({
    name: "",
  priceAmount: "",
  priceCurrency: "GHS",
    carImages: [], // Array of Base64 strings
    description: "",
    brand: "",
    model: "",
    year: "",
    imageFiles: []
  });
  const [error, setError] = useState("");
  const [pendingCars, setPendingCars] = useState(() => {
    return JSON.parse(localStorage.getItem('pendingCars') || '[]');
  });
  const [editCarId, setEditCarId] = useState(null);
  const [editPending, setEditPending] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
  priceAmount: "",
  priceCurrency: "GHS",
    carImages: [],
    description: "",
    brand: "",
    model: "",
    year: "",
    imageFiles: []
  });

  // helper to show a toast with optional undo
  const showToast = (message, undoCallback) => {
    const id = Date.now() + Math.random();
    const t = { id, message, undoCallback };
    setToasts(prev => [...prev, t]);
    // auto-dismiss after 5s
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id));
    }, 5000);
    return id;
  };

  // archive (soft-delete) a car
  const archiveCar = (id) => {
    const car = cars.find(c => c.id === id);
    if (!car) return;
    const updated = cars.filter(c => c.id !== id);
    setCars(updated);
    const newArchived = [{ ...car, archivedAt: Date.now() }, ...archivedCars];
    setArchivedCars(newArchived);
    localStorage.setItem('approvedCars', JSON.stringify(updated));
    localStorage.setItem('archivedCars', JSON.stringify(newArchived));

    // show undo toast
    const undo = () => {
      // restore
      const restored = [car, ...updated];
      setCars(restored);
      setArchivedCars(prev => prev.filter(a => a.id !== id));
      localStorage.setItem('approvedCars', JSON.stringify(restored));
      localStorage.setItem('archivedCars', JSON.stringify(archivedCars.filter(a => a.id !== id)));
    };
    showToast('Car archived', undo);
  };

  const restoreArchived = (id) => {
    const car = archivedCars.find(c => c.id === id);
    if (!car) return;
    const newArchived = archivedCars.filter(a => a.id !== id);
    const newCars = [car, ...cars];
    setArchivedCars(newArchived);
    setCars(newCars);
    localStorage.setItem('archivedCars', JSON.stringify(newArchived));
    localStorage.setItem('approvedCars', JSON.stringify(newCars));
  };

  const permanentlyDeleteArchived = (id) => {
    if (!confirm('Permanently delete this archived car? This cannot be undone.')) return;
    const newArchived = archivedCars.filter(a => a.id !== id);
    setArchivedCars(newArchived);
    localStorage.setItem('archivedCars', JSON.stringify(newArchived));
  };
  // Approve a pending car: move to cars list and remove from pending, update localStorage
  const handleApprove = (id) => {
    const car = pendingCars.find((c) => c.id === id);
    if (car) {
      const updatedCars = [...cars, car];
      setCars(updatedCars);
      localStorage.setItem('approvedCars', JSON.stringify(updatedCars));
      const updatedPending = pendingCars.filter((c) => c.id !== id);
      setPendingCars(updatedPending);
      localStorage.setItem('pendingCars', JSON.stringify(updatedPending));
    }
  };

  // Reject a pending car: just remove from pending
  const handleReject = (id) => {
    const updatedPending = pendingCars.filter((c) => c.id !== id);
    setPendingCars(updatedPending);
    localStorage.setItem('pendingCars', JSON.stringify(updatedPending));
  };

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <h2 className="text-2xl font-bold mt-10">Access Denied</h2>
        <p className="text-gray-500">You do not have permission to view this page.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFiles" && files && files.length > 0) {
      const fileReaders = [];
      let imagesArr = [];
      for (let i = 0; i < files.length; i++) {
        fileReaders[i] = new FileReader();
        fileReaders[i].onloadend = () => {
          imagesArr[i] = fileReaders[i].result;
          if (imagesArr.filter(Boolean).length === files.length) {
            setForm((prev) => ({ ...prev, carImages: imagesArr, imageFiles: imagesArr }));
          }
        };
        fileReaders[i].readAsDataURL(files[i]);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // compute filters
  const matchesQuery = (car) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (car.name && car.name.toLowerCase().includes(q)) ||
      (car.brand && car.brand.toLowerCase().includes(q)) ||
      (car.model && car.model.toLowerCase().includes(q)) ||
      (car.price && car.price.toLowerCase().includes(q)) ||
      (car.year && car.year.toString().includes(q))
    );
  };

  const filteredApproved = cars.filter(car => matchesQuery(car));
  const filteredPending = pendingCars.filter(car => matchesQuery(car));
  const filteredAvailable = initialCars.filter(car => !cars.some(c => c.id === car.id) && matchesQuery(car));

  const handleAddCar = (e) => {
    e.preventDefault();
    if (!form.name || !form.priceAmount || !form.carImages || form.carImages.length === 0) {
      setError("Name, price (amount + currency), and at least one image are required.");
      return;
    }
    const amount = parseFloat(form.priceAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
    const priceStr = form.priceCurrency === 'USD' ? `$${amount}` : `GH₵${amount}`;
    const newCars = [
      ...cars,
      { ...form, price: priceStr, id: Date.now() },
    ];
    setCars(newCars);
    // persist approved cars so Listing page can read them
    localStorage.setItem('approvedCars', JSON.stringify(newCars));
    setForm({ name: "", priceAmount: "", priceCurrency: "GHS", carImages: [], description: "", brand: "", model: "", year: "", imageFiles: [] });
    setError("");
  };

  // Remove car from approved list and update localStorage
  

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
  {/* Summary counts: approved/listed, pending, available initial cars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>
              <div className="text-sm text-gray-500">Listed</div>
            </div>
            <div className="text-2xl font-bold">{cars.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="text-2xl font-bold">{pendingCars.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-6 h-6 text-[#3B1220]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" /></svg>
              <div className="text-sm text-gray-500">Available</div>
            </div>
            <div className="text-2xl font-bold">{filteredAvailable.length}</div>
          </div>
        </div>

        {/* Search & filter controls */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name, brand, model..." className="px-4 py-2 border rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-amber-800" />
          <select value={filterMode} onChange={e => setFilterMode(e.target.value)} className="px-4 py-2 border rounded-lg bg-white">
            <option value="listed">Listed</option>
            <option value="pending">Pending</option>
            <option value="available">Available</option>
            <option value="archived">Archived</option>
            <option value="all">All</option>
          </select>
          <div className="ml-auto text-sm text-gray-500">Showing results for <span className="font-semibold">{searchQuery || 'all'}</span></div>
        </div>

        {/* Toasts */}
        <div className="fixed right-4 top-4 flex flex-col gap-3 z-50">
          {toasts.map(t => (
            <div key={t.id} className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-lg border border-gray-200 flex items-center gap-4">
              <div className="text-sm">{t.message}</div>
              {t.undoCallback && (
                <button onClick={() => { t.undoCallback(); setToasts(prev => prev.filter(x => x.id !== t.id)); }} className="text-amber-700 font-semibold">Undo</button>
              )}
              <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-auto text-gray-400">✕</button>
            </div>
          ))}
        </div>
        {/* Pending Cars for Approval */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Pending Car Submissions</h2>
          {pendingCars.length === 0 ? (
            <div className="text-gray-500">No pending submissions.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPending.map((car) => (
                <div key={car.id} className="border rounded-lg p-4 flex flex-col">
                  {editCarId === car.id && editPending ? (
                    <form
                      className="space-y-2 mb-2"
                      onSubmit={e => {
                        e.preventDefault();
                        const updatedPending = pendingCars.map(c =>
                          c.id === car.id ? (() => {
                            const updated = { ...c, ...editForm };
                            if (editForm.priceAmount) {
                              const amount = parseFloat(editForm.priceAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
                              updated.price = editForm.priceCurrency === 'USD' ? `$${amount}` : `GH₵${amount}`;
                            }
                            return updated;
                          })() : c
                        );
                        setPendingCars(updatedPending);
                        localStorage.setItem('pendingCars', JSON.stringify(updatedPending));
                        setEditCarId(null);
                        setEditPending(false);
                      }}
                    >
                      <input name="name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Car Name" />
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="col-span-1">
                          <select name="priceCurrency" value={editForm.priceCurrency} onChange={e => setEditForm({ ...editForm, priceCurrency: e.target.value })} className="border rounded px-2 py-1 w-full">
                            <option value="GHS">GH₵ (Cedis)</option>
                            <option value="USD">$ (USD)</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <input name="priceAmount" value={editForm.priceAmount} onChange={e => setEditForm({ ...editForm, priceAmount: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Amount" />
                        </div>
                      </div>
                      <input name="image" value={editForm.image} onChange={e => setEditForm({ ...editForm, image: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Image URL" />
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="col-span-1">
                          <select name="priceCurrency" value={editForm.priceCurrency} onChange={e => setEditForm({ ...editForm, priceCurrency: e.target.value })} className="border rounded px-2 py-1 w-full">
                            <option value="GHS">GH₵ (Cedis)</option>
                            <option value="USD">$ (USD)</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <input name="priceAmount" value={editForm.priceAmount} onChange={e => setEditForm({ ...editForm, priceAmount: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Amount" />
                        </div>
                      </div>
                      <input name="brand" value={editForm.brand} onChange={e => setEditForm({ ...editForm, brand: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Brand" />
                      <input name="model" value={editForm.model} onChange={e => setEditForm({ ...editForm, model: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Model" />
                      <input name="year" value={editForm.year} onChange={e => setEditForm({ ...editForm, year: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Year" />
                      <textarea name="description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Description" />
                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white font-semibold">Save</button>
                        <button type="button" className="px-3 py-1 rounded bg-gray-400 text-white font-semibold" onClick={() => { setEditCarId(null); setEditPending(false); }}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      {car.image && <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded mb-2" />}
                      <div className="font-bold text-lg">{car.name}</div>
                      <div className="text-green-600 font-bold">{car.price}</div>
                      <div className="text-gray-500 text-sm mb-2">{car.brand} {car.model} {car.year}</div>
                      <div className="text-gray-700 text-sm mb-2">{car.description}</div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleApprove(car.id)} className="px-3 py-1 rounded bg-green-600 text-white font-semibold hover:bg-green-700">Approve</button>
                        <button onClick={() => handleReject(car.id)} className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600">Reject</button>
                        <button onClick={() => { setEditCarId(car.id); setEditPending(true); setEditForm(car); }} className="px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600">Edit</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Add New Car (Admin) */}
        <form onSubmit={handleAddCar} className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">Add New Car</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Car Name" className="border rounded-lg px-3 py-2" />
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="col-span-1">
                <select name="priceCurrency" value={form.priceCurrency} onChange={handleChange} className="border rounded-lg px-3 py-2 w-full">
                  <option value="GHS">GH₵ (Cedis)</option>
                  <option value="USD">$ (USD)</option>
                </select>
              </div>
              <div className="col-span-2">
                <input name="priceAmount" value={form.priceAmount} onChange={handleChange} placeholder="Amount" type="number" min="0" step="0.01" className="border rounded-lg px-3 py-2 w-full" />
              </div>
            </div>
            <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border rounded-lg px-3 py-2" />
            <input name="model" value={form.model} onChange={handleChange} placeholder="Model" className="border rounded-lg px-3 py-2" />
            <input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="border rounded-lg px-3 py-2" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded-lg px-3 py-2" />
            <input type="file" name="imageFiles" accept="image/*" multiple onChange={handleChange} className="border rounded-lg px-3 py-2" />
            {form.carImages && form.carImages.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {form.carImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`Car Preview ${idx + 1}`} className="w-full h-32 object-cover rounded" />
                ))}
              </div>
            )}
            <button type="submit" className="bg-[#3B1220] text-white rounded-lg px-4 py-2 font-bold hover:opacity-90">Add Car</button>
          </div>
        </form>
        {/* Approved/Added Cars (Buy Page Cars) */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Cars Listed for Sale (Buy Page)</h2>
          {filteredApproved.length === 0 ? (
            <div className="text-gray-500">No cars listed yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredApproved.map((car) => (
                <div key={car.id} className="border rounded-lg p-4 flex flex-col">
                  {editCarId === car.id && !editPending ? (
                    <form
                      className="space-y-2 mb-2"
                      onSubmit={e => {
                        e.preventDefault();
                            const updatedCars = cars.map(c =>
                              c.id === car.id ? (() => {
                                const updated = { ...c, ...editForm };
                                if (editForm.priceAmount) {
                                  const amount = parseFloat(editForm.priceAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
                                  updated.price = editForm.priceCurrency === 'USD' ? `$${amount}` : `GH₵${amount}`;
                                }
                                return updated;
                              })() : c
                            );
                        setCars(updatedCars);
                        localStorage.setItem('approvedCars', JSON.stringify(updatedCars));
                        setEditCarId(null);
                      }}
                    >
                      <input name="name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Car Name" />
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="col-span-1">
                          <select name="priceCurrency" value={editForm.priceCurrency} onChange={e => setEditForm({ ...editForm, priceCurrency: e.target.value })} className="border rounded px-2 py-1 w-full">
                            <option value="GHS">GH₵ (Cedis)</option>
                            <option value="USD">$ (USD)</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <input name="priceAmount" value={editForm.priceAmount} onChange={e => setEditForm({ ...editForm, priceAmount: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Amount" />
                        </div>
                      </div>
                      <input type="file" name="imageFiles" accept="image/*" multiple onChange={e => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const fileReaders = [];
                          let imagesArr = [];
                          for (let i = 0; i < files.length; i++) {
                            fileReaders[i] = new FileReader();
                            fileReaders[i].onloadend = () => {
                              imagesArr[i] = fileReaders[i].result;
                              if (imagesArr.filter(Boolean).length === files.length) {
                                setEditForm((prev) => ({ ...prev, carImages: imagesArr, imageFiles: imagesArr }));
                              }
                            };
                            fileReaders[i].readAsDataURL(files[i]);
                          }
                        }
                      }} className="border rounded px-2 py-1 w-full" />
                      {editForm.carImages && editForm.carImages.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {editForm.carImages.map((img, idx) => (
                            <img key={idx} src={img} alt={`Car Preview ${idx + 1}`} className="w-full h-32 object-cover rounded" />
                          ))}
                        </div>
                      )}
                      <input name="brand" value={editForm.brand} onChange={e => setEditForm({ ...editForm, brand: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Brand" />
                        <input name="model" value={editForm.model} onChange={e => setEditForm({ ...editForm, model: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Model" />
                      <input name="year" value={editForm.year} onChange={e => setEditForm({ ...editForm, year: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Year" />
                      <textarea name="description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="border rounded px-2 py-1 w-full" placeholder="Description" />
                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white font-semibold">Save</button>
                        <button type="button" className="px-3 py-1 rounded bg-gray-400 text-white font-semibold" onClick={() => setEditCarId(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      {car.carImages && car.carImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          {car.carImages.map((img, idx) => (
                            <img key={idx} src={img} alt={`Car Preview ${idx + 1}`} className="w-full h-40 object-cover rounded" />
                          ))}
                        </div>
                      ) : (
                        <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded mb-2" />
                      )}
                      <div className="font-bold text-lg">{car.name}</div>
                      <div className="text-green-600 font-bold">{car.price}</div>
                      <div className="text-gray-500 text-sm mb-2">{car.brand} {car.model} {car.year}</div>
                      <div className="text-gray-700 text-sm mb-2">{car.description}</div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => archiveCar(car.id)} className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600">Archive</button>
                        <button onClick={() => { setEditCarId(car.id); setEditPending(false); setEditForm(car); }} className="px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600">Edit</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add initial cars to Buy Page if not already present */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Available Cars (Not Yet on Buy Page)</h2>
      {filteredAvailable.length === 0 ? (
            <div className="text-gray-500">All initial cars are listed.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAvailable.map((car) => (
                <div key={car.id} className="border rounded-lg p-4 flex flex-col">
                  <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded mb-2" />
                  <div className="font-bold text-lg">{car.name}</div>
                  <div className="text-green-600 font-bold">{car.price}</div>
                  <div className="text-gray-500 text-sm mb-2">{car.brand} {car.model} {car.year}</div>
                  <div className="text-gray-700 text-sm mb-2">{car.description}</div>
                  <button onClick={() => {
                    const updatedCars = [...cars, car];
                    setCars(updatedCars);
                    localStorage.setItem('approvedCars', JSON.stringify(updatedCars));
                  }} className="bg-[#3B1220] text-white rounded px-3 py-1 mt-auto self-end hover:bg-[#5a1a32]">Add to Buy Page</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Archived Cars */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Archived Cars</h2>
        {archivedCars.length === 0 ? (
          <div className="text-gray-500">No archived cars.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {archivedCars.map(car => (
              <div key={car.id} className="border rounded-lg p-4 flex flex-col">
                {car.image && <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded mb-2" />}
                <div className="font-bold text-lg">{car.name}</div>
                <div className="text-green-600 font-bold">{car.price}</div>
                <div className="text-gray-500 text-sm mb-2">{car.brand} {car.model} {car.year}</div>
                <div className="text-gray-700 text-sm mb-2">{car.description}</div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => restoreArchived(car.id)} className="px-3 py-1 rounded bg-green-600 text-white font-semibold">Restore</button>
                  <button onClick={() => permanentlyDeleteArchived(car.id)} className="px-3 py-1 rounded bg-red-500 text-white font-semibold">Delete Permanently</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
