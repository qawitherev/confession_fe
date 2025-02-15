import TimeUtil from "../utils/TimeUtils";

const UserTable = ({ data, paginationData }) => {
  return <div className="overflow-x-auto" >
    <table className="min-w-full divide-y divide-y-gray-200">
        <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">User Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Nickname</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Created At</th>
            </tr></thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(data) ? data.map((d, index) => (
            <tr key={index} className="transition-all duration-100 hover:bg-gray-100">
              <td className='px-6 whitespace-nowrap text-sm text-gray-900'>{
              (paginationData.currentPage - 1) * paginationData.pageSize + (index + 1)
              }</td>
              <td className='px-6 whitespace-nowrap text-sm text-gray-900'>{d.userId}</td>
              <td className='px-6 whitespace-nowrap text-sm text-gray-900'>{d.userType}</td>
              <td className='px-6 whitespace-nowrap text-sm text-gray-900'>{d.username}</td>
              <td className='px-6 whitespace-nowrap text-sm text-gray-900'>{d.nickname}</td>
              <td className='px-6 whitespace-nowrap text-sm text-gray-900'>{TimeUtil.findWhenPosted(d.createdAt)}</td>
            </tr>
          )) :(
            <tr>
              <td colSpan='6' className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No data available</td>
            </tr>
          )}
        </tbody>
    </table>
  </div>;
};

export default UserTable; 
