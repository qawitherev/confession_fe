import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validatePassword from "../utils/validatePassword";

const SignUp = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SignUpContainer />
    </div>
  );
};

const SignUpContainer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password invalid");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/user/signUp", {
        username,
        nickname,
        password,
      });
      if (res.data.success) {
        navigate("/login");
      } else if (res.data.message === `Username ${username} already exists`) {
        setError("Username already exists");
      } else {
        setError("500");
      }
    } catch {
      setError("500");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSignUp}
      className="w-1/5 flex flex-col gap-4 px-4 py-4"
    >
      <h1 className="font-semibold text-xl">Confession</h1>
      <div className="flex flex-col items-start gap-1">
        <label className="text-sm">Username</label>
        <input
          type="text"
          value={username}
          className="border rounded-lg px-4 py-2 w-full"
          onChange={(e) => {
            setError("");
            setUsername(e.target.value);
          }}
          required
        />
        {error === "Username already exists" && (
          <span className="text-red-500 text-xs">Username already exists</span>
        )}
        <label className="text-sm">Nickname</label>
        <input
          type="text"
          value={nickname}
          className="border rounded-lg px-4 py-2 w-full"
          onChange={(e) => {
            setError("");
            setNickname(e.target.value);
          }}
          required
        />
      </div>
      <div className="flex flex-col items-start w-full gap-1">
        <label className="text-sm">Password</label>
        <input
          type="password"
          className="border rounded-lg px-4 py-2 w-full"
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
          required
        />
        {error === "Password invalid" && (
          <span className="text-red-500 text-xs">
            Password must contain at least 8 characters, 1 letter, 1 number, and
            1 special character
          </span>
        )}
      </div>
      <div className="flex flex-col items-start w-full gap-1">
        <label className="text-sm">Confirm Password</label>
        <input
          type="password"
          onChange={(e) => {
            setError("");
            setConfirmPassword(e.target.value);
          }}
          required
          className="border rounded-lg px-4 py-2 w-full"
        />
        {error === "Password does not match" && (
          <span className="text-red-500 text-xs">Password does not match</span>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4"
          value={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span className="text-xs text-gray-600">
          By signing up, you agree to our Terms of Service and Policy
        </span>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg
  hover:bg-blue-600 active:bg-blue-700 
  disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!agree || loading}
      >
        {loading ? "Loading..." : "Sign up"}
      </button>
      <div className="text-xs text-gray-600">
        <span>Already have an account? </span>
        <a href="/login" className="text-blue-500">
          Log in
        </a>
      </div>
    </form>
  );
};

export default SignUp;
