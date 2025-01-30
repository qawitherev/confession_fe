import { useEffect, useState } from "react";
import LogoutBtn from "../../component/LogoutBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfessionService from "../../services/confessionService";
import TimeUtil from "../../utils/TimeUtils";
import { toast, ToastContainer } from "react-toastify";

const PendingConfessions = () => {
  const [loading, setLoading] = useState(false)
  const [pendingConfessions, setPendingConfessions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getPendingConfessions = async () => {
    try {
      const res = await ConfessionService.getPendingConfessions(); 
      if (Array.isArray(res)) {
        const data = res[0].map(t=> ({
          confessionId: t.confessionId,
          username: t.username, 
          title: t.title, 
          body: t.body,
          submittedOn: TimeUtil.findWhenPosted(t.submittedOn),
          tags: t.tags.split(',').map(tt=>tt.trim())
        })
      )
      setPendingConfessions(data); 
      }

    } catch (err) {
      console.error(err.message); 
      if(err.statusCode === 403) {
        navigate('/unauthorized');
      }
    }
  }

  useEffect(() => {
    getPendingConfessions();
  }, []);

  return (
    <div className="flex flex-col px-4 py-4">
      <LogoutBtn />
      <h1 className="text-xl mb-6">Pending Confession</h1>
      {pendingConfessions.map((data, index) => (
        <div key={index} className="flex flex-col gap-1">
          <ListItem item={data} refreshData={getPendingConfessions} />
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

const ListItem = ({item, refreshData}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePublish = async () => {
    setLoading(true);
    try {
      await ConfessionService.publishConfession(item.confessionId);
      toast.success(`Confession published`); 
      refreshData();
    } catch (err) {
      setError(err); 
      toast.error(`Something went wrong. Try again later`);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await ConfessionService.rejectConfession(item.confessionId); 
      toast.success(`Confession rejected`);
      refreshData();
    } catch (err) {
      toast.error(`Someting went wrong. Please try again later`);
      setError(err); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between rounded-lg border p-4 mb-4 shadow-sm">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-semibold">{item.title}</h1>
          <p className="text-sm">{item.body}</p>
          <div className="flex flex-row gap-1">
            {item.tags && Array.isArray(item.tags) && item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm">{`By: ${item.username}`}</p>
          <p className="text-sm">{`Submitted On: ${item.submittedOn}`}</p>
        </div>
        <div className="flex flex-col">
          <button
          disabled={loading}
          onClick={handlePublish} className={'bg-green-500 text-white font-bold py-2 px-4 rounded m-2 hover:bg-green-700 mb-1'}>
            {loading ? `Publishing` : `Publish`}
          </button>
          <button onClick={handleReject} className="bg-red-500 text-white font-bold py-2 px-4 rounded m-2 hover:bg-red-700">
            Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default PendingConfessions;
