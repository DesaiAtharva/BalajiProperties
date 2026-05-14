'use client';
import React, { useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Button, 
  Chip, IconButton, Stack, CircularProgress, Alert
} from '@mui/material';
import { 
  CheckCircle as CheckIcon, 
  Delete as DeleteIcon, 
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  Cancel as CancelIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminPropertiesPage = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchAdminProperties = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://balajiproperties-backend.onrender.com/api/admin/properties/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        },
      });
      if (!response.ok) throw new Error('Not authorized. Please login.');
      const data = await response.json();
      setProperties(data.results || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProperties();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'delete') => {
    if (action === 'delete' && !confirm('Are you sure you want to delete this property?')) return;
    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch(`https://balajiproperties-backend.onrender.com/api/admin/properties/${id}/action/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        fetchAdminProperties(); // Refresh list
      }
    } catch (err) {
      alert('Action failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F8F9FA' }}>
      <Navbar />
      
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Property Approval Dashboard</Typography>
            <Button 
              variant="outlined" 
              color="inherit" 
              startIcon={<RefreshIcon />} 
              onClick={fetchAdminProperties}
            >
              Refresh
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>
            {error} - <a href="https://balajiproperties-backend.onrender.com/admin/" target="_blank" style={{ color: 'inherit' }}>Login here</a>
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#eee' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Property</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Approval</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {properties.map((prop) => (
                  <TableRow key={prop.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{prop.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{prop.property_type} • {prop.bhk} BHK</Typography>
                    </TableCell>
                    <TableCell>{prop.location}</TableCell>
                    <TableCell>{prop.price_display}</TableCell>
                    <TableCell>
                      <Chip label={prop.status} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      {prop.is_approved ? (
                        <Chip label="Approved" color="success" size="small" icon={<CheckIcon />} />
                      ) : (
                        <Chip label="Pending" color="warning" size="small" />
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                        <IconButton 
                          component={Link} 
                          href={`/admin/properties/${prop.id}/edit`}
                          color="primary" 
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <Button 
                          size="small" 
                          variant={prop.is_approved ? "outlined" : "contained"}
                          color={prop.is_approved ? "warning" : "success"}
                          onClick={() => handleAction(prop.id, 'approve')}
                          startIcon={prop.is_approved ? <CancelIcon /> : <CheckIcon />}
                        >
                          {prop.is_approved ? 'Hide' : 'Approve'}
                        </Button>
                        <IconButton color="error" onClick={() => handleAction(prop.id, 'delete')}>
                          <DeleteIcon />
                        </IconButton>
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

export default AdminPropertiesPage;
