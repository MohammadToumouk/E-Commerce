import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const [totalUsers, setTotalUsers] = useState(0);
  const [role, setRole] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedRoles, setSelectedRoles] = useState({});

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
      console.log(users[0].role);
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

  // Handle role change for a specific user
  const handleRoleChange = (userId, newRole) => {
    setSelectedUser({ userId, newRole });
    setSelectedRoles((prevSelectedRoles) => ({
      ...prevSelectedRoles,
      [userId]: newRole,
    }));
  };

  const confirmRoleChange = () => {
    const { userId, newRole } = selectedUser;

    // Update the role in the local state first
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);

    // Send the role update request to the server
    axios
      .put(
        `http://localhost:3069/user/${userId}`,
        { role: newRole },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Role updated successfully:", response.data);
        // You may add a success message or perform additional actions on success
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        // Revert the role in the local state if the request fails
        const revertedUsers = users.map((user) =>
          user._id === userId ? { ...user, role } : user
        );
        setUsers(revertedUsers);
      });

    // Reset the selectedUser after the update
    setSelectedUser(null);
  };

  const cancelRoleChange = () => {
    // Clear the selectedUser without updating the role
    setSelectedUser(null);
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
              <TableCell class = "uppercase">{user.name}</TableCell>
              <TableCell class = "uppercase">{user.email}</TableCell>
              <TableCell class = "uppercase">
                {selectedUser && selectedUser.userId === user._id ? (
                  <>
                     {/* <Select
                        value={selectedRoles[user._id] || user.role}
                        onChange={(e) =>
                          setSelectedUser({
                            userId: selectedUser.userId,
                            newRole: e.target.value,
                          })
                        }
                      >
                      <SelectTrigger className="w-[180px] mr-11">
                      <SelectValue placeholder="Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="manager">manager</SelectItem>
                        <SelectItem value="employee">employee</SelectItem>
                      </SelectContent>
                    </Select> */}
                    <label for="Roles" class="block mb-2 text-sm font-medium text-white dark:text-white">Select a Role</label>
                     <select
                      value={selectedUser.newRole}
                      class="bg-gray-800 border mb-4 text-white border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) =>
                        setSelectedUser({
                          userId: selectedUser.userId,
                          newRole: e.target.value,
                        })
                      }
                    >
                      
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                      
                    </select>
                   
                    <button class = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={confirmRoleChange}>Confirm</button>
                    <button  class = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={cancelRoleChange}>Cancel</button>
                  </>
                ) : (
                  <div>
                    {user.role}{" "}
                    <button
                    className = " text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ml-2 "
                      onClick={() => handleRoleChange(user._id, user.role)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center mt-4">
        <p className="mr-4">Items per page:</p>
        <select
          value={usersPerPage}
          class="bg-gray-800 border mb-4 text-white border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          class = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          class = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
