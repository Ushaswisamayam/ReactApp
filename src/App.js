// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/TableComponent";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState(null); // null for no sorting, 'date' for sorting by date, 'time' for sorting by time

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/customers?searchTerm=${searchTerm}&page=${currentPage}&sortBy=${sortBy}`
        );
        console.log(response.data.length);
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / 20));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData immediately after defining it
  }, [currentPage, searchTerm, sortBy]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (sortField) => {
    console.log(sortField);
    if (sortField === sortBy) {
      setSortBy(null); // Toggle sorting order
    } else {
      console.log(sortField);
      setSortBy(sortField);
    }
  };

  return (
    <div className="app-container">
      <h1>Customer Data</h1>

      <input
        type="text"
        placeholder="Search by name or location"
        class="input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableComponent
        data={data}
        handlePaginationClick={handlePaginationClick}
        currentPage={currentPage}
        totalPages={totalPages}
        handleSort={handleSort}
        sortBy={sortBy}
        itemsPerPage={20}
      />
    </div>
  );
}

export default App;
