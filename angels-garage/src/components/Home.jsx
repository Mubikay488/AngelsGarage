import Hero from "./Hero"

export default function Home() {
    const handleAdminLogin = () => {
        localStorage.setItem("isAdmin", "true");
        window.location.reload();
    };
    return (
        <div>
            {localStorage.getItem("isAdmin") !== "true" && (
                <div className="w-full flex justify-end p-4">
                    <button onClick={handleAdminLogin} className="bg-[#3B1220] text-white px-4 py-2 rounded-lg shadow-lg font-bold">Admin Login</button>
                </div>
            )}
            <Hero />
        </div>
    );
}
