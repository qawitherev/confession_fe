import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiHelper";
import TimeUtil from "../../utils/TimeUtils";
import GreyPill from "../../component/Pill";

const RejectedConfessions = () => {
    const navigate = useNavigate();
    const [confessions, setConfessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erorr, setError] = useState("");

    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await apiClient.get('/confession/getRejectedConfessions');
            const data = result[0]; 
            if (Array.isArray(data)) {
                const rc = data.map(c => ({
                    username: c.username, 
                    title: c.title, 
                    body: c.body, 
                    tags: c.tags.split(',').map(a=>a.trim()), 
                    submittedOn: new Date(c.submittedOn).toLocaleDateString('en-US', {
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: true
                    }), 
                    rejectedBy: c.rejectedBy,
                    rejectedAt: new Date(c.rejectedAt).toLocaleDateString('en-US', {
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: true
                    })
                }));
                setConfessions(rc); 
            }
        } catch (err) {
            if(err.response.status === 403) {
                navigate('/unauthorize');
            }
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full overflow-y-auto p-4">
            <h1 className="text-xl font-semibold">Rejected Confessions</h1>
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
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Rejected By</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Rejected At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, index) => (
                        <tr key={index}>
                            <td className="p-2 border border-gray-400">{index + 1}</td>
                            <td className="p-2 border border-gray-400">{d.username}</td>
                            <td className="p-2 border border-gray-400">{d.title}</td>
                            <td className="p-2 border border-gray-400">{d.body}</td>
                            <td className="p-2 border border-gray-400"><div className="flex flex-wrap gap-1">{d.tags.map((tag, index)=>(<GreyPill key={index} textData={tag}/>))}</div></td>
                            <td className="p-2 border border-gray-400">{d.rejectedBy}</td>
                            <td className="p-2 border border-gray-400">{d.rejectedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RejectedConfessions;