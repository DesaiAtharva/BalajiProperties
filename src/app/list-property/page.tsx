'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Paper, 
  Breadcrumbs, 
  Link as MuiLink,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { NavigateNext as NavigateNextIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

import { addProperty } from '@/app/actions/property';

const ListPropertyPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await addProperty(formData);
      
      if (result.success) {
        setSuccess(true);
        (event.target as HTMLFormElement).reset();
      } else {
        setError('Failed to list property. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
      <Navbar />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <MuiLink component={Link} underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <Typography color="text.primary">List Your Property</Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: '1px solid #eee' }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}>
              List Your Property
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill in the details below to list your property with Balaji Properties.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Property Title</Typography>
                <TextField 
                  fullWidth 
                  name="title" 
                  placeholder="e.g. Luxury 3 BHK Apartment in Baner" 
                  required 
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Price</Typography>
                <TextField 
                  fullWidth 
                  name="price" 
                  placeholder="e.g. ₹1.2 Cr or ₹35,000 / mo" 
                  required 
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Status</Typography>
                <TextField select fullWidth name="status" defaultValue="For Sale" required>
                  <MenuItem value="For Sale">For Sale</MenuItem>
                  <MenuItem value="For Rent">For Rent</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Property Type</Typography>
                <TextField select fullWidth name="type" defaultValue="Apartment" required>
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
                  <MenuItem value="Plot">Plot</MenuItem>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Location (e.g. Baner, Wakad)</Typography>
                <TextField 
                  fullWidth 
                  name="location" 
                  placeholder="Specific Area" 
                  required 
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Area (Pune or PCMC)</Typography>
                <TextField select fullWidth name="area" defaultValue="Pune" required>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="PCMC">PCMC</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>BHK</Typography>
                <TextField 
                  fullWidth 
                  name="bhk" 
                  type="number" 
                  defaultValue={2} 
                  required 
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Baths</Typography>
                <TextField 
                  fullWidth 
                  name="bathrooms" 
                  type="number" 
                  defaultValue={2} 
                  required 
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Sq.Ft</Typography>
                <TextField 
                  fullWidth 
                  name="sqft" 
                  type="number" 
                  placeholder="1200" 
                  required 
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Property Image</Typography>
                <Button
                  component="label"
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  sx={{ 
                    py: 4, 
                    borderStyle: 'dashed', 
                    color: fileName ? 'primary.main' : 'text.secondary',
                    borderColor: fileName ? 'primary.main' : 'divider',
                    bgcolor: fileName ? 'rgba(47, 72, 88, 0.05)' : 'transparent',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(0,0,0,0.02)'
                    }
                  }}
                >
                  {fileName ? fileName : 'Upload Image'}
                  <input
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                  />
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                  Supported formats: JPG, PNG, WEBP
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    disabled={loading}
                    sx={{ py: 2, fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Listing'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Footer />

      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Your property has been listed successfully! It will appear in the listings after review.
        </Alert>
      </Snackbar>

      {error && (
        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ListPropertyPage;
