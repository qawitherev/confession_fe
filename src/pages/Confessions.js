import { useEffect, useState } from "react";
import ConfessionService from "../services/confessionService";
import TimeUtil from "../utils/TimeUtils";
import { useFetcher, useNavigate } from "react-router-dom";
import ConfessionItem from "../component/ConfessionItem";

const Confessions = () => {
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const [confessions, setConfessions] = useState([]);
    const navigate = useNavigate(); 

    const getData = async () => {
        try {
            setLoading(true);
            const res = await ConfessionService.getConfessions(); 
            const c = res.map(d => ({
                title: d.title, 
                body: d.body, 
                submittedOn: d.submittedOn, 
                tags: d.tags.split(',').map(t=> t.trim()), 
                relateCount: d.relateCount, 
                notRelateCount: d.notRelateCount
            }))
            setConfessions(c);
        } catch (err) {
            setError(err.message); 
            if (err.statusCode === 403 || err.statusCode == 401) {
                navigate('/unauthorized');
            }
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        getData(); 
    }, [])

    return (<>
        <div className='text-3xl font-bold'>Confessions</div>
        {confessions.map((confession, index) => (<ConfessionItem key={index} confession={confession} />))}
    </>);
}

export default Confessions; 