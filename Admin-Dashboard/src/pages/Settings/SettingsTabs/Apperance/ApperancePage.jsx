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
  const [usersPerPage, setUsersPerPage] = useState(7);
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
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {selectedUser && selectedUser.userId === user._id ? (
                  <>
                     <Select
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
                    </Select>
                   {/*  <Select
                      value={selectedUser.newRole}
                      onChange={(e) =>
                        setSelectedUser({
                          userId: selectedUser.userId,
                          newRole: e.target.value,
                        })
                      }
                    >
                      <SelectContent>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="manager">manager</SelectItem>
                        <SelectItem value="employee">employee</SelectItem>
                      </SelectContent>
                    </Select> */}
                    <button onClick={confirmRoleChange}>Confirm</button>
                    <button onClick={cancelRoleChange}>Cancel</button>
                  </>
                ) : (
                  <div>
                    {user.role}{" "}
                    <Button
                      onClick={() => handleRoleChange(user._id, user.role)}
                    >
                      Edit Role
                    </Button>
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
