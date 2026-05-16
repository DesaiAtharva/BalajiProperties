'use client';
import React, { useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Button, 
  Chip, IconButton, Stack, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid
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

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleView = (prop: any) => {
    setSelectedProperty(prop);
    setViewDialogOpen(true);
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
                          color="info" 
                          size="small"
                          onClick={() => handleView(prop)}
                        >
                          <ViewIcon />
                        </IconButton>
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

      {/* View Details Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedProperty && (
          <>
            <DialogTitle sx={{ fontWeight: 800, bgcolor: '#f8f9fa' }}>
              {selectedProperty.title}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">Main Details</Typography>
                  <Typography variant="body1"><b>Price:</b> {selectedProperty.price_display}</Typography>
                  <Typography variant="body1"><b>Location:</b> {selectedProperty.location}, {selectedProperty.area}</Typography>
                  <Typography variant="body1"><b>Type:</b> {selectedProperty.property_type}</Typography>
                  <Typography variant="body1"><b>Specs:</b> {selectedProperty.bhk} BHK, {selectedProperty.bathrooms} Baths, {selectedProperty.sqft} sqft</Typography>
                  <Typography variant="body1"><b>Furnishing:</b> {selectedProperty.furnishing_status}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">Lister Information</Typography>
                  <Typography variant="body1"><b>Name:</b> {selectedProperty.lister_name}</Typography>
                  <Typography variant="body1"><b>Phone:</b> {selectedProperty.lister_phone}</Typography>
                  <Typography variant="body1"><b>Role:</b> {selectedProperty.lister_role}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                  <Typography variant="body2">{selectedProperty.description}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Gallery</Typography>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Box sx={{ border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
                        <img src={selectedProperty.main_image} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                        <Typography variant="caption" sx={{ p: 0.5, display: 'block', textAlign: 'center' }}>Hero Image</Typography>
                      </Box>
                    </Grid>
                    {selectedProperty.images?.map((img: any, idx: number) => (
                      <Grid size={{ xs: 6, sm: 3 }} key={idx}>
                        <Box sx={{ border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
                          <img src={img.url} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                          <Typography variant="caption" sx={{ p: 0.5, display: 'block', textAlign: 'center' }}>{img.category}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Button onClick={() => setViewDialogOpen(false)} variant="outlined">Close</Button>
              <Button 
                onClick={() => {
                  handleAction(selectedProperty.id, 'approve');
                  setViewDialogOpen(false);
                }}
                variant="contained" 
                color={selectedProperty.is_approved ? "warning" : "success"}
              >
                {selectedProperty.is_approved ? 'Hide Property' : 'Approve Now'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Footer />
    </Box>
  );
};

export default AdminPropertiesPage;
