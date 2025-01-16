import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Confessions = () => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState("false");
  const [erorr, setError] = useState("");
  const navigate = useNavigate();

  const getPublishedConfessions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/confession/getPublishedConfessions",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const { publishedConfessions } = res.data;
      console.info(`Confessions>getPublishedConfessions(): ${publishedConfessions}`);
      if (publishedConfessions) {
        const temp = publishedConfessions.map(z => (
            {
                username: z.username, 
                title: z.title, 
                body: z.body, 
                createdAt: new Date(z.createdAt).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true // Use 12-hour format
                }), 
                tags: z.tags ? z.tags.split(",").map(y=> y.trim()) : [], 
            }
        ));
        setConfessions(temp);
      }
    } catch (err) {
      if (err.response.status === 403) {
        navigate("/unauthorize");
      }
    }
  };

  useEffect(() => {
    getPublishedConfessions();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col align-middle items-center p-10">
      <div className="w-1/2 flex flex-row justify-start mb-3">
        <h1 className="text-xl font-semibold">Read Confessions</h1>
      </div>
      <div className="w-1/2 gap-3 flex flex-col justify-start items-start align-middle">
       {confessions.map((data, index) => (
        <div key={index} className="w-full">
            <ConfessionItem data={data} index={index} />
        </div>
       ))}
      </div>
    </div>
  );
};

const ConfessionItem = ({ data }, index) => {
    return (
        <div key={index} className="w-full flex flex-col justify-between rounded-lg border p-4 mb-4 shadow-sm">
            <h1 className="text-lg font-semibold">{data.title}</h1>
            <h1 className="text-sm mb-2">{data.body}</h1>
            <div className="flex flex-row justify-start gap-1 mb-2">
            {data.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {tag}
                </span>
            ))}
            </div>
            <div className="mb-2 text-sm">{`By: ${data.username}`}</div>
            <div className="flex flex-row justify-end text-xs">
                {data.createdAt}
            </div>
        </div>
    );
}

export default Confessions;
