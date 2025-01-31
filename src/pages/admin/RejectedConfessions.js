import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiHelper";
import GreyPill from "../../component/Pill";
import TheTable from "../../component/AdminConfessionsTable";
import ConfessionService from "../../services/confessionService";
import TimeUtil from "../../utils/TimeUtils";

const RejectedConfessions = () => {
    const navigate = useNavigate();
    const [confessions, setConfessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erorr, setError] = useState("");

    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await ConfessionService.getRejectedConfessions(); 
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
            <h1 className="text-xl font-semibold">Rejected Confessions</h1>
            <TheTable data={confessions} isRejected={true}/>
        </div>
    );
}

export default RejectedConfessions;