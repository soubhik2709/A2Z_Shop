"use client";
import Link  from "next/link";
import {Box,Typography,Grid,Card, CardContent,Button} from '@mui/material';

export default function DashboardPage(){
  return(
    <Box
    p={4}
    >
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Admin Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome to the Help Study Abroad admin panel.
      </Typography>
      {/* color="text.secondary" ?? */}

      <Grid container spacing={3} mb={4}>
     <Grid size={{ xs: 12, sm: 6, md: 4 }}>

          <Card>
            <CardContent>
              <Typography variant="h6">
                Total Users
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                100
              </Typography>
            </CardContent>
          </Card>
     </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Total Products
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                50
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Active Admins
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" mb={2}>
        Management
      </Typography>
      <Grid container spacing={3}>
        {/* Users */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={1}
              >
                Users Management
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
              >
                View, search, and manage users.
              </Typography>

              <Button
                component={Link}
                href="/dashboard/users"
                variant="contained"
              >
                Go to Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Products */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={1}
              >
                Products Management
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
              >
                View, filter, and manage products.
              </Typography>

              <Button
                component={Link}
                href="/dashboard/products"
                variant="contained"
              >
                Go to Products
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Box>
  )
}

