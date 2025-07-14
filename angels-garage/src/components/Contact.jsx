import Navbar from "./Navbar";

const Contact = () => (
  <>
    <Navbar />
    <main className=" m-20 p-5 
     rounded-3xl flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
        <h2 className="bg-amber-800 text-white font-semibold flex justify-center rounded-full text-3xl p-2 mb-6">Contact Seller</h2>
        <form className="space-y-4">
          <div>
          <label htmlFor="name" className="block text-amber-800 font-semibold mb-1">Name</label>
          <input id="name" name="name" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800" />
        </div>
        <div>
          <label htmlFor="email" className="block text-amber-800 font-semibold mb-1">Email</label>
          <input id="email" name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-amber-800 font-semibold mb-1">Phone Number</label>
          <input id="phone" name="phone" type="tel" required pattern="[0-9]{10,15}" placeholder="e.g. 08012345678" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800" />
        </div>
        <div>
          <label htmlFor="message" className="block text-amber-800 font-semibold mb-1">Message</label>
          <textarea id="message" name="message" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 resize-none min-h-[100px]" />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button type="submit" className="px-8 py-3 bg-amber-800 text-white font-bold rounded-full shadow-lg hover:bg-amber-950 transition-colors duration-300 text-lg w-full sm:w-auto">Send</button>
          <button type="button" className="px-8 py-3 bg-white text-amber-800 font-bold rounded-full shadow-lg hover:bg-amber-200 transition-colors duration-300 text-lg w-full sm:w-auto">Cancel</button>
        </div>
      </form>
    </div>
  </main>
 </> 
);

export default Contact;
