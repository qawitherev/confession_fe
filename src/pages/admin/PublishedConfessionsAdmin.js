import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const PublishedConfessionsAdmin = () => {
    const navigate = useNavigate();
    const [confessions, setConfessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erorr, setError] = useState("");

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.get('http://localhost:3000/api/confession/getPublishedConfessionsAdmin',
                {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                }
            );
           const confessions = res.data.publishedConfessions;
           setConfessions(confessions);
           setLoading(false);
        } catch (err) {
            if(err.response.status === 403) {
                navigate('/unauthorize');
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full overflow-y-auto p-4">
            <h1 className="text-xl font-semibold">Published Confessions</h1>
            <TheTable data={confessions} />
        </div>
    );
}

const TheTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-400">
                <thead>
                    <tr>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">No</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Username</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Title</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Body</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Tags</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Published By</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Published At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, index) => (
                        <tr key={index}>
                            <td className="p-2 border border-gray-400">{index + 1}</td>
                            <td className="p-2 border border-gray-400">{d.username}</td>
                            <td className="p-2 border border-gray-400">{d.title}</td>
                            <td className="p-2 border border-gray-400">{d.body}</td>
                            <td className="p-2 border border-gray-400">{d.tags}</td>
                            <td className="p-2 border border-gray-400">{d.executedBy}</td>
                            <td className="p-2 border border-gray-400">{new Date(d.executedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PublishedConfessionsAdmin;