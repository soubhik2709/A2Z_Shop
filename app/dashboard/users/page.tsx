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
import UserRow from "@/components/dashboardComponent/UserRow";
import { useShallow } from "zustand/shallow";
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
  const { users, fetchUsers, loading, total } = useUserStore(
    useShallow((state) => ({
      users: state.users,
      fetchUsers: state.fetchUsers,
      loading: state.loading,
      total: state.total,
    })),
  );
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

          {/* ussers   */}
          <TableBody>
            {users.map((user: User) => (
              <UserRow key={user.id} user={user} />
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

        {/* Pagination */}
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


How useShallow works?
useShallow prevents unnecessary rerenders

NOT:

prevent state changes

State can still change normally.

Your understanding now (corrected)
Outer object
obj1 !== obj2

because:

new wrapper object created every render

Different outer reference.

Inner properties
obj1.users === obj2.users

because:

both point to SAME users array reference
So useShallow says:
"I don't care that outer wrapper object changed."

Instead it checks:

Did actual selected values change?
Since:
users reference same
loading same
total same
fetchUsers same

then:

skip rerender
WITHOUT useShallow

Zustand only checks:

oldObject === newObject

FALSE.

Because wrapper recreated.

So:

rerender happens unnecessarily
WITH useShallow

Zustand checks:

old.users === new.users
old.loading === new.loading
...

All same.

So:

no rerender needed
BIG IMPORTANT CONCEPT

useShallow optimizes:

selector result comparison

NOT actual state updates.

Final perfect mental model

Without shallow:

new wrapper object
→ rerender

With shallow:

ignore wrapper object
check inner top-level references/values
→ rerender only if actual selected data changed
*/
