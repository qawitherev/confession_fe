import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    
    try {
        const res = await axios.post("http://localhost:3000/api/user/login", {username, password});
        console.info(res.data.data.token)
        if(res.data.success) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("uid", res.data.data.userId);
            navigate("/createConfession");
        } else if(res.data.message === "User not found") {
            setError("User not found");
        } else if (res.data.message === "Password is incorrect") {
            setError("Password is incorrect");
        } else {
            setError("500");
        }
    }catch {
        setError("500");
    }finally {
        setLoading(false);
    }

  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form onSubmit={handleLogin} className="w-1/5 flex flex-col gap-4 px-4 py-4">
        <h1 className="font-semibold text-xl">Confession</h1>
        <div className="flex flex-col items-start gap-1">
          <label className="text-sm">Username</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 w-full"
            value={username}
            required
            onChange={(e) => {
                setError("");
                setUsername(e.target.value)}}
          />
          {error === "User not found" && (
            <span className="text-red-500 text-xs">User not found</span>
          )}
        </div>
        <div className="flex flex-col items-start w-full gap-1">
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="border rounded-lg px-4 py-2 w-full"
            required
            onChange={(e) => {
                setError("");
                setPassword(e.target.value)}}
          />
            {error === "Password is incorrect" && (
                <span className="text-red-500 text-xs">Password is incorrect</span>
            )}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg
        hover:bg-blue-600 active:bg-blue-700
        disabled:opacity-50 disabled:cursor-not-allowed disabled:{loading}"
        >
            {loading ? "Loading..." : "Log in"}
        </button>
        <div className="text-xs text-gray-600">
          <span>Don't have an account? </span>
          <a href="/signUp" className="text-blue-500">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
