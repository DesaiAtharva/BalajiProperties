'use client';
import React, { useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Stack, CircularProgress, Alert, Link as MuiLink, Chip
} from '@mui/material';
import { 
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Event as EventIcon
} from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminInquiriesPage = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchInquiries = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    try {
      const response = await fetch('https://balajiproperties-backend.onrender.com/api/admin/inquiries/', {
        headers: { 
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        },
      });
      if (!response.ok) throw new Error('Unauthorized');
      const data = await response.json();
      setInquiries(data.results || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`https://balajiproperties-backend.onrender.com/api/admin/inquiries/${id}/action/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchInquiries();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F8F9FA' }}>
      <Navbar />
      
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Customer Leads & Inquiries</Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>Track everyone interested in your properties</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button component={Link} href="/admin/properties" variant="outlined">Manage Properties</Button>
          <Button variant="contained">Manage Inquiries</Button>
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#eee' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Client Details</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Property Interested In</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Message</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiries.map((iq) => (
                  <TableRow key={iq.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{iq.full_name}</Typography>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <PhoneIcon fontSize="inherit" color="action" />
                        <Typography variant="caption">{iq.phone_number}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {iq.property ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <HomeIcon fontSize="small" color="primary" />
                          <Typography variant="body2">{iq.property_title || 'View Property'}</Typography>
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">General Inquiry</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={iq.status} 
                        size="small" 
                        color={iq.status === 'New' ? 'primary' : iq.status === 'Contacted' ? 'success' : 'default'}
                        variant={iq.status === 'New' ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell sx={{ maxWidth: '200px' }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>"{iq.message}"</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                        {iq.status === 'New' && (
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="success"
                            onClick={() => handleStatusUpdate(iq.id, 'Contacted')}
                          >
                            Mark Contacted
                          </Button>
                        )}
                        {iq.status === 'Contacted' && (
                          <Button 
                            size="small" 
                            variant="outlined" 
                            onClick={() => handleStatusUpdate(iq.id, 'Closed')}
                          >
                            Close Lead
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

// Simple internal Button component for the Link
const Button = ({ children, ...props }: any) => (
  <MuiLink {...props} sx={{ 
    ...props.sx, 
    textDecoration: 'none', 
    px: 2, py: 1, 
    borderRadius: 2,
    bgcolor: props.variant === 'contained' ? 'primary.main' : 'transparent',
    color: props.variant === 'contained' ? 'white' : 'primary.main',
    border: props.variant === 'outlined' ? '1px solid' : 'none',
    borderColor: 'primary.main',
    display: 'inline-block',
    fontSize: '0.875rem',
    fontWeight: 600
  }}>
    {children}
  </MuiLink>
);

export default AdminInquiriesPage;
