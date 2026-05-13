import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [clients, SetClients] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        progress: 0,
        dueDate: "",
        client: ""

    });



    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProjects();
        fetchClients()
    }, []);

    async function fetchProjects() {
        try {
            const res = await api.get("/projects");
            setProjects(res.data.projects);
        } catch (err) {
            setError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    }
    async function fetchClients() {
        try {
            const res = await api.get("/users");
            SetClients(res.data.users);
        } catch (error) {
            console.log("Not admin or failed to load clients");
        }
    }
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setCreating(true);

        try {
            console.log(formData)
            const res = await api.post("/projects", formData);

            setProjects([res.data.project, ...projects]);

            setFormData({
                title: "",
                description: "",
                status: "not-started",
                progress: 0,
                dueDate: "",
                client: "",

            });

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to create project.");
        } finally {
            setCreating(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950" >
            <Navbar />

            <div className="p-8 text-white">
                <h1 className="text-4xl font-bold">Projects</h1>
                <p className="text-zinc-400 mt-2 mb-8">Manage your active projects</p>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 space-y-4"
                >
                    <h2 className="text-2xl font-semibold">Create New Project</h2>
                    <select
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-green-500"
                        required
                    >
                        <option value="">Select client</option>

                        {clients.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.fullName} - {client.email}
                            </option>
                        ))}
                    </select>

                    <input
                        name="title"
                        placeholder="Project title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-green-500"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Project description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-green-500 min-h-28"
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-green-500"
                        >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <input
                            name="progress"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={handleChange}
                            className="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-green-500"
                        />

                        <input
                            name="dueDate"
                            type="date"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={creating}
                        className="rounded-lg bg-green-500 hover:bg-green-600 disabled:opacity-60 text-black font-semibold px-6 py-3 transition"
                    >
                        {creating ? "Creating..." : "Create Project"}
                    </button>
                </form>

                {loading ? (
                    <p className="text-zinc-400">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-400">No projects found.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" >
                        {projects.map((project) => (
                            <Link

                                to={`/projects/${project._id}`}
                                key={project._id}
                                className="block bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-green-500 transition"
                            >
                                <h2 className="text-2xl font-semibold mb-3">
                                    {project.title}
                                </h2>

                                <p className="text-zinc-400 mb-4">
                                    {project.description || "No description"}
                                </p>

                                <p className="text-sm text-zinc-400">
                                    Status: <span className="text-white">{project.status}</span>
                                </p>

                                <p className="text-sm text-zinc-400">
                                    Progress:{" "}
                                    <span className="text-white">{project.progress}%</span>
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}