import Navbar from "../components/Navbar";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white p-10">
            <Navbar />
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 mt-2">DeviceLab Client Portal</p>
        </div>
    );
}