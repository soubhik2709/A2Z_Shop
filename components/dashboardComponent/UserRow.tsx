import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import { User } from "@/store/userStore";

const UserRow = React.memo(
  ({ user }: { user: User }) => {
    console.log("Rendering:", user.firstName);
    return (
      <TableRow key={user.id}>
        <TableCell>
          {user.firstName} {user.lastName}
        </TableCell>
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
    );
  },
  (prev, next) => prev.user.id === next.user.id,
);

UserRow.displayName = "UserRow"; //determine  the name to clearly know  eslint and reactdev tool.
export default UserRow;