'use client';
import React, { useEffect, useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  Paper, Grid, Stack, CircularProgress, Alert, MenuItem
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const EditPropertyPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchProperty = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }
      try {
        const res = await fetch(`https://balajiproperties-backend.onrender.com/api/admin/properties/${id}/update/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch property data');
        const data = await res.json();
        setFormData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`https://balajiproperties-backend.onrender.com/api/admin/properties/${id}/update/`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/admin/properties');
      } else {
        throw new Error('Failed to update property');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
      <Navbar />
      
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="md">
          <Button 
            component={Link} 
            href="/admin/properties" 
            startIcon={<ArrowBackIcon />} 
            sx={{ color: 'white', mb: 2 }}
          >
            Back to List
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Edit Property</Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>Update pricing, description, and details for "{formData.title}"</Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6, flexGrow: 1 }}>
        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, borderRadius: 4 }}>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth label="Property Title" name="title" 
                value={formData.title || ''} onChange={handleChange} required 
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth label="Price (in Rupees)" name="price" type="number"
                value={formData.price || ''} onChange={handleChange} required 
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth select label="Status" name="status"
                value={formData.status || 'For Sale'} onChange={handleChange}
              >
                <MenuItem value="For Sale">For Sale</MenuItem>
                <MenuItem value="For Rent">For Rent</MenuItem>
                <MenuItem value="Sold">Sold</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField 
                fullWidth label="BHK" name="bhk" type="number"
                value={formData.bhk || ''} onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField 
                fullWidth label="Bathrooms" name="bathrooms" type="number"
                value={formData.bathrooms || ''} onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField 
                fullWidth label="Area (sq ft)" name="area" type="number"
                value={formData.area || ''} onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth label="Location" name="location"
                value={formData.location || ''} onChange={handleChange} required 
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth multiline rows={4} label="Description" name="description"
                value={formData.description || ''} onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button 
              type="submit" variant="contained" size="large" 
              disabled={saving} startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button component={Link} href="/admin/properties" variant="outlined" size="large">
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default EditPropertyPage;
