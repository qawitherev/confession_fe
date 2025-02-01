import { useEffect, useState } from "react";
import ConfessionService from "../services/confessionService";
import { useFetcher, useNavigate } from "react-router-dom";
import ConfessionItem from "../component/ConfessionItem";
import { toast, ToastContainer } from "react-toastify";


const Confessions = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const navigate = useNavigate(); 

  const handleRelate = async (confessionId) => {
    try {
      await ConfessionService.relateConfession(confessionId); 
    } catch (err) {
      toast.error(`Something went wrong. Try again later`); 
      console.error(err.message); 
    }
  }

  const handleNotRelate = async (confessionId) => {
    try {
      await ConfessionService.notRelateConfession(confessionId); 
    } catch (err) {
      toast.error(`Something went wrong. Try again later`);
      console.error(err.message); 
    }
  }

  const getData = async () => {
    try {
      setLoading(true);
      const res = await ConfessionService.getConfessions();
      const c = res.map((d) => ({
        confessionId: d.confessionId,
        title: d.title,
        body: d.body,
        submittedOn: d.submittedOn,
        tags: d.tags.split(",").map((t) => t.trim()),
        relateCount: d.relateCount,
        notRelateCount: d.notRelateCount,
        reaction: d.reaction
      }));
      setConfessions(c);
    } catch (err) {
      setError(err.message);
      if (err.statusCode === 403 || err.statusCode == 401) {
        navigate("/unauthorized");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div className="px-3 py-5">
    <div className="flex flex-row justify-center">
        <div className="w-1/2">
        <div className="text-2xl font-bold">Confession</div>
        {confessions.map((confession, index) => (<ConfessionItem key={index} 
        handleRelate={handleRelate}
        handleNotRelate={handleNotRelate}
        confession={confession} />))}
        </div>
    </div>
    <ToastContainer />
  </div>;
};



export default Confessions;
