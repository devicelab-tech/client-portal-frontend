import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function ProjectDetails() {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProject();
    }, [id]);

    async function fetchProject() {
        try {
            const res = await api.get(`/projects/${id}`);
            setProject(res.data.project);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to load project.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white">
                <Navbar />
                <div className="p-8">Loading project...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white">
                <Navbar />
                <div className="p-8 text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />

            <div className="p-8 max-w-4xl">
                <Link to="/projects" className="text-green-400 hover:underline">
                    ← Back to Projects
                </Link>

                <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                    <h1 className="text-4xl font-bold mb-3">{project.title}</h1>

                    <p className="text-zinc-400 mb-6">
                        {project.description || "No description provided."}
                    </p>

                    <div className="space-y-4">
                        <p>
                            <span className="text-zinc-500">Status:</span>{" "}
                            {project.status}
                        </p>

                        <div>
                            <p className="mb-2">
                                <span className="text-zinc-500">Progress:</span>{" "}
                                {project.progress}%
                            </p>

                            <div className="w-full bg-zinc-800 rounded-full h-3">
                                <div
                                    className="bg-green-500 h-3 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {project.dueDate && (
                            <p>
                                <span className="text-zinc-500">Due Date:</span>{" "}
                                {new Date(project.dueDate).toLocaleDateString()}
                            </p>
                        )}

                        {project.client && (
                            <p>
                                <span className="text-zinc-500">Client:</span>{" "}
                                {project.client.fullName} - {project.client.email}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}