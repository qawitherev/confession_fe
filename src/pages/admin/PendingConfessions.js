import { useEffect, useState } from "react";
import LogoutBtn from "../../component/LogoutBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingConfessions = () => {
  const [loading, setLoading] = useState(false)
  const [pendingConfessions, setPendingConfessions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getPendingConfessions = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/confession/getPendingConfessions', {
        headers: {
          authorization: localStorage.getItem('token'),
        }
      });
      const { confessions } = res.data;
      
      if(confessions) {
        const data = confessions.map(confession => ({
          userId: confession.userId, 
          username: confession.username,
          confessionId: confession.confessionId, 
          title: confession.title,
          body: confession.body,
          tags: confession.tags ? confession.tags.split(',').map(tag => tag.trim()) : []
        }));
        setPendingConfessions(data);
      }
    } catch (err) {
      if(err.response.status === 403) {
        navigate('/confession');
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
    </div>
  );
};

const ListItem = ({item, refreshData}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePublish = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/confession/publishConfession', 
        {
          confessionId: item.confessionId
        }, 
        {headers: {
          authorization: localStorage.getItem('token')
        }}
      );
      refreshData();
    } catch (err) {
      setError(err); 
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/confession/rejectConfession', 
        {
          confessionId: item.confessionId
        }, 
        {headers: {
          authorization: localStorage.getItem('token')
        }}
      );
      refreshData();
    } catch (err) {
      setError(err); 
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <p className="text-sm">{`By: ${item.username} (${item.userId})`}</p>
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
  );
};

export default PendingConfessions;
