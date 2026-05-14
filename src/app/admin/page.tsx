'use client';
import React, { useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, Stack, 
  Button, CircularProgress, Divider
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Chat as ChatIcon, 
  PendingActions as PendingIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ properties: 0, pending: 0, inquiries: 0 });
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchStats = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const headers = { 
        'Accept': 'application/json',
        'Authorization': `Token ${token}` 
      };
      // Fetching properties to count
      const pRes = await fetch('https://balajiproperties-backend.onrender.com/api/admin/properties/', { headers });
      const iRes = await fetch('https://balajiproperties-backend.onrender.com/api/admin/inquiries/', { headers });
      
      const properties = await pRes.json();
      const inquiries = await iRes.json();

      const pList = properties.results || properties;
      const iList = inquiries.results || inquiries;

      setStats({
        properties: pList.length,
        pending: pList.filter((p: any) => !p.is_approved).length,
        inquiries: iList.length
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { 
      title: 'Total Properties', 
      value: stats.properties, 
      icon: <HomeIcon fontSize="large" />, 
      color: '#1A237E',
      link: '/admin/properties'
    },
    { 
      title: 'Pending Approval', 
      value: stats.pending, 
      icon: <PendingIcon fontSize="large" />, 
      color: '#E65100',
      link: '/admin/properties'
    },
    { 
      title: 'Total Inquiries', 
      value: stats.inquiries, 
      icon: <ChatIcon fontSize="large" />, 
      color: '#1B5E20',
      link: '/admin/inquiries'
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
      <Navbar />

      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Welcome, Admin</Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400 }}>Here is what's happening with Balaji Properties today.</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6, mt: -6, flexGrow: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {statCards.map((card, i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                  <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                    <Box sx={{ position: 'absolute', right: -20, top: -20, opacity: 0.1, color: card.color, transform: 'scale(3)' }}>
                      {card.icon}
                    </Box>
                    <Stack spacing={1}>
                      <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>{card.title}</Typography>
                      <Typography variant="h2" sx={{ fontWeight: 800, color: card.color }}>{card.value}</Typography>
                      <Button 
                        component={Link} 
                        href={card.link} 
                        size="small" 
                        endIcon={<ArrowForwardIcon />}
                        sx={{ alignSelf: 'flex-start', color: card.color, fontWeight: 700 }}
                      >
                        Manage
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 8 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Quick Actions</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Add New Property</Typography>
                      <Typography variant="body2" color="text.secondary">Manually add a listing to the database</Typography>
                    </Box>
                    <Button component={Link} href="/admin/properties" variant="contained">Go</Button>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Review Leads</Typography>
                      <Typography variant="body2" color="text.secondary">Check recent customer messages</Typography>
                    </Box>
                    <Button component={Link} href="/admin/inquiries" variant="contained" color="success">Review</Button>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default AdminDashboard;
