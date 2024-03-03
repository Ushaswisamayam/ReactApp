import React from "react";
import "../App.css";

const TableComponent = ({
  data,
  currentPage,
  totalPages,
  handlePaginationClick,
  handleSort,

  sortBy,
  itemsPerPage,
}) => {
  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  // Get data for the current page
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("sno")}>Sno</th>
            <th onClick={() => handleSort("customer_name")}>Customer Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("location")}>Location</th>
            <th onClick={() => handleSort("date")}>Date</th>
            <th onClick={() => handleSort("time")}>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((customer) => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        {/* Pagination */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePaginationClick(page)}
              disabled={currentPage === page} // Disable current page button
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TableComponent;
