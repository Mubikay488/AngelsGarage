import Navbar from "./Navbar";

const carsForSale = [
  {
    id: 1,
    name: "Toyota Camry",
    price: "$12,000",
    image: "/src/assets/images/image 1.jpg",
    description: "2018 model, low mileage, excellent condition.",
  },
  {
    id: 2,
    name: "Honda Accord",
    price: "$10,500",
    image: "/src/assets/images/image 2.jpg",
    description: "2017 model, well maintained, single owner.",
  },
  {
    id: 3,
    name: "Ford Mustang",
    price: "$22,000",
    image: "/src/assets/images/image 3.jpg",
    description: "2020 model, sporty, like new.",
  },
];

const CarListing = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to Angels Garage
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Cars for Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {carsForSale.map((car) => (
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
              <p className="text-gray-700 mb-2">{car.description}</p>
              <span className="text-blue-600 font-semibold text-lg">
                {car.price}
              </span>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarListing;
