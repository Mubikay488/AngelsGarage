import Navbar from "./Navbar";

const Contact = () => {
  // admin WhatsApp number (international, no +). Reuse the project's admin number.
  const adminPhone = '233596670153';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const name = fd.get('name') || '';
    const email = fd.get('email') || '';
    const phone = fd.get('phone') || '';
    const message = fd.get('message') || '';

    // send to server-side email endpoint
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) throw new Error('server error');
      // optional: show confirmation (simple alert for now)
      alert('Message sent to admin successfully. Opening WhatsApp...');
    } catch (err) {
      // if server fails, proceed to open WhatsApp as fallback
      console.warn('Server contact failed, falling back to WhatsApp', err);
      alert('Server send failed — opening WhatsApp to send directly.');
    }

    const payload = `Contact from Angels Garage (web app)\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(payload)}`;
    window.open(url, '_blank');
    form.reset();
  };

  const handleCancel = (e) => {
    const form = e.target.closest('form');
    if (form) form.reset();
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <main className="m-4 sm:m-10 p-2 sm:p-5 rounded-3xl flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-2xl shadow-xl p-4 sm:p-8">
          <h2 className="text-white font-semibold flex justify-center rounded-full text-3xl p-2 mb-6" style={{ backgroundColor: '#3B1220' }}>Contact Seller</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-black font-semibold mb-1">Name</label>
              <input id="name" name="name" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800" />
            </div>
            <div>
              <label htmlFor="email" className="block text-black font-semibold mb-1">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-black font-semibold mb-1">Phone Number</label>
              <input id="phone" name="phone" type="tel" required pattern="[0-9]{6,15}" placeholder="e.g. 0244123456" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800" />
            </div>
            <div>
              <label htmlFor="message" className="block text-black font-semibold mb-1">Message</label>
              <textarea id="message" name="message" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 resize-none min-h-[100px]" />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button type="submit" className="px-8 py-3 text-white font-bold rounded-full shadow-lg transition-colors duration-300 text-lg w-full sm:w-auto" style={{ backgroundColor: '#3B1220' }}>Send</button>
              <button type="button" onClick={handleCancel} className="px-8 py-3 bg-white text-amber-800 font-bold rounded-full shadow-lg hover:bg-amber-200 transition-colors duration-300 text-lg w-full sm:w-auto">Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Contact;
