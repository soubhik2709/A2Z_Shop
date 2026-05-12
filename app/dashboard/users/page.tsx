"use client";
// import ProtectedRoute from "@/components/ProtectedRoute";
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
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

// It delays execution until user stops typing
function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function UsersPage() {
  const { users, fetchUsers, loading, total } = useUserStore();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

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

  // if (loading && (!users || users.length === 0))
  //   return <p>Loading Users Details...</p>;

  // If it's NOT loading but users is still missing/null, show an error or empty state
  // if (!users) {
  //   return <p>Error: Could not retrieve users.</p>;
  // }

  // console.log("the userr in user page", users);
  console.log("The page number is", page);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Button
          component={Link}
          href="/dashboard"
          variant="text"
          size="small"
          sx={{ mb: 2 }}
        >
          / dashboard
        </Button>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Users
        </Typography>
        <TextField
          label="Search Users"
          fullWidth
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleSearch(e.target.value);
          }}
          sx={{ mb: 2 }}
        />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={28} />
          </Box>
        )}

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
                  <Box sx={{ py: 2 }}>
                    <Typography sx={{ mb: 1 }}>No users found.</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => fetchUsers(10, page * 10, search)} // ← manual retry
                    >
                      Retry
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            Page {page + 1}
          </Typography>
          <Button
            disabled={(page + 1) * 10 >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
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
