import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ConfessionService from "../../services/confessionService";
import TheTable from "../../component/AdminConfessionsTable";
import TimeUtil from "../../utils/TimeUtils";

const PublishedConfessions = () => {
    const navigate = useNavigate();
    const [confessions, setConfessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erorr, setError] = useState("");

    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await ConfessionService.getPublishedConfessions(); 
            const data = result[0]; 
            if (Array.isArray(data)) {
                const rc = data.map(c => ({
                    username: c.username, 
                    title: c.title, 
                    body: c.body, 
                    tags: c.tags.split(',').map(a=>a.trim()), 
                    submittedOn: new Date(c.submittedOn).toLocaleDateString('en-US', TimeUtil.timeConfig()), 
                    rejectedBy: c.rejectedBy,
                    rejectedAt: new Date(c.rejectedAt).toLocaleDateString('en-US', TimeUtil.timeConfig())
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
            <h1 className="text-xl font-semibold">Published Confessions</h1>
            <TheTable data={confessions} isRejected={false}/>
        </div>
    );
}

export default PublishedConfessions;