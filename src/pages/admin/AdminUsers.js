import { useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import UserTable from "../../component/UserTable";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../component/Pagination";
import { debounce } from "@mui/material";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    pageSize: 50,
    totalItems: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const getData = async (currentPage = page, search = searchKeyword) => {
    setLoading(true);
    try {
      const res = await UserService.getUsers(search, currentPage, pageSize);
      const data = res.users.map((user) => {
        return {
          userId: user.id,
          userType: user.userType,
          username: user.username,
          nickname: user.nickname,
          createdAt: user.createdAt,
        };
      });
      setPaginationData(res.pagination);
      setUsers(data);
    } catch (err) {
      if (err.statusCode == 403) {
        navigate("/unauthorized");
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async (newPage) => {
    await getData(newPage);
    setPage(newPage);
    console.info(newPage);
  };

  const inputOnChange = (e) => {
    setSearchKeyword(e.target.value);
    debouncedGetData(e.target.value); 
  };

  const debouncedGetData = useCallback(
    debounce((searchTerm) => {
      getData(page, searchTerm); 
    }, 500), [page]
  )

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-5 py-5 flex flex-col w-full">
        <h1 className="text-xl font-semibold mb-5">Uers Management</h1>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search user"
            value={searchKeyword}
            onChange={inputOnChange}
            className="px-4 py-2 border-gray-500 rounded-l
            focus:ring-blue-500 focus:border-transparent"
          ></input>
        </div>
        <UserTable data={users} paginationData={paginationData} />
        <div className="flex flex-row justify-end">
          <Pagination
            paginationData={paginationData}
            refreshData={refreshData}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
