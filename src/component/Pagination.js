import { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ paginationData, refreshData }) => {
    const [page, setPage] = useState(1); 
    const { currentPage, pageSize, totalItems, totalPages } = paginationData; 

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; //uses 0-based index 
        setPage(selectedPage); 
        refreshData(selectedPage);
    }

    return (<div>
        <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="flex items-center justify-center gap-2 my-4"
            pageClassName="border rounded px-3 py-1 hover:bg-gray-100"
            previousClassName="border rounded px-3 py-1 hover:bg-gray-100"
            nextClassName="border rounded px-3 py-1 hover:bg-gray-100"
            activeClassName="!bg-blue-500 text-white"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="border rounded px-3 py-1"
        ></ReactPaginate>
    </div>);
    
}

export default Pagination; 