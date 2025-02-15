import { useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import UserTable from "../../component/UserTable";
import { useEffect, useState } from "react";
import Pagination from "../../component/Pagination";

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

  const getData = async (currentPage = page) => {
    setLoading(true);
    try {
      const res = await UserService.getUsers(currentPage, pageSize);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-5 py-5 flex flex-col w-full">
        <h1 className="text-xl font-semibold mb-5">Published Confessions</h1>
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
