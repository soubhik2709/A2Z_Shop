"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState, useMemo } from "react";
import { useUserStore, User } from "@/store/userStore";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

// It delays execution until user stops typing
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function UsersPage() {
  const { users, fetchUsers, loading } = useUserStore();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  // fetch users when page or search changes
  useEffect(() => {
    fetchUsers(10, page * 10, search);
  }, [page, search, fetchUsers]);

  // debounce search
  const handleSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
        setPage(0);
      }, 400),
    [],
  );

  if (loading && (!users || users.length === 0))
    return <p>Loading Users Details...</p>;

  // If it's NOT loading but users is still missing/null, show an error or empty state
  // if (!users) {
  //   return <p>Error: Could not retrieve users.</p>;
  // }

  return (
    <ProtectedRoute>
      <Box p={3}>
        <Typography variant="h4" mb={2}>
          Users
        </Typography>
        <TextField
          label="Search Users"
          fullWidth
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company?.name}</TableCell>
                <TableCell>
                  <Button
                    href={`/dashboard/users/${user.id}`}
                    size="small"
                    variant="outlined"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!loading && users?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box mt={2}>
          <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </Button>

          <Button onClick={() => setPage(page + 1)}>Next</Button>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

/* 
This component does 3 things:

Fetch users from Zustand store
Handle pagination (page)
Handle search with debounce



Parameters<T> = [string, number]
It extracts argument types from original function as a tuple 


function debounce<T>(fn: T, delay: number)
It means:
“I will use a flexible type (T), decided when function is called”
we always define generic function previously

T extends (...args:unknown[]) 
any type of args will expect as an array format
*/
