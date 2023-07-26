import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const [totalUsers, setTotalUsers] = useState(0);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Fetch users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3069/user?page=${currentPage}&perPage=${usersPerPage}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [currentPage, usersPerPage]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setUsersPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center mt-4">
        <p className="mr-4">Items per page:</p>
        <select
          value={usersPerPage}
          onChange={(e) => handlePerPageChange(e.target.value)}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <p className="mx-4">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-600"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-600 ml-4"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersTable;
