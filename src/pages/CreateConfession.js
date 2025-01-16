import { useEffect } from "react";
import tokenValid from "../utils/checkToken";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import LogoutBtn from "../component/LogoutBtn";

const CreateConfession = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [confession, setConfession] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("uid");

  const dropdownChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const submitOnClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/confession/createConfession",
        {
          userId,
          title,
          body: confession,
          tagIds: selectedOptions.map((option) => option.value),
        },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        console.info("confession created");
        navigate("/confession");
      }
    } catch (err) {
      console.error(err);
      setError("500");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tokenValid()) {
      navigate("/login");
      return;
    }
    const getTags = async () => {
      const data = await getTagsFromAPI();
      if (data) {
        const options = data.tags.map((tag) => ({
          value: tag.id,
          label: tag.label,
        }));
        setTags(options);
      } else {
        console.error("tags not found");
      }
    };
    getTags();
  }, []);

  return (
    <>
      <LogoutBtn />
      <form
        onSubmit={submitOnClick}
        className="bg-slate-100 h-screen w-screen flex flex-col justify-center items-center gap-4"
      >
        <h1 className="text-2xl font-semibold">Confess Now</h1>
        <div className="flex flex-col gap-1 w-1/3">
          <label>Title</label>
          <input
            type="text"
            required
            className="border rounded-lg px-4 py-2 w-full"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/3">
          <label>Confession</label>
          <textarea
            required
            id="message"
            rows="6"
            className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
            resize-none overflow-y-auto"
            onChange={(e) => setConfession(e.target.value)}
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div className="w-1/3 flex flex-col gap-1">
          <label>Select Category</label>
          <Select
            required
            options={tags}
            isMulti
            value={selectedOptions}
            onChange={dropdownChange}
            className="basic-multi-select w-full"
            classNamePrefix="select"
          ></Select>
        </div>
        <div className="flex flex-col items-end w-1/3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg
              hover:bg-blue-600 active:bg-blue-700
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Confessing..." : "Confess"}
          </button>
        </div>
      </form>
    </>
  );
};

const getTagsFromAPI = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/confession/getTags"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default CreateConfession;
