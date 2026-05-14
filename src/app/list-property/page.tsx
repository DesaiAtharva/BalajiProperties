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
  Snackbar,
  FormGroup,
  FormControlLabel,
  Checkbox
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

  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas to Blob failed'));
          }, 'image/jpeg', 0.7);
        };
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    
    // Compress image if present
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      try {
        const compressedBlob = await compressImage(imageFile);
        formData.set('image', compressedBlob, imageFile.name);
      } catch (err) {
        console.error('Compression failed:', err);
      }
    }

    try {
      const result = await addProperty(formData);
      
      if (result.success) {
        setSuccess(true);
        setFileName(null);
        formElement.reset();
      } else {
        setError(result.error || 'Failed to list property. Please try again.');
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
              {/* 1. Lister Information */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  Lister Details
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Your Name</Typography>
                <TextField fullWidth name="lister_name" placeholder="John Doe" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Phone / WhatsApp</Typography>
                <TextField fullWidth name="lister_phone" placeholder="9876543210" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>I am the...</Typography>
                <TextField select fullWidth name="lister_role" defaultValue="Owner" required>
                  <MenuItem value="Owner">Owner</MenuItem>
                  <MenuItem value="Agent">Agent</MenuItem>
                  <MenuItem value="Builder">Builder</MenuItem>
                </TextField>
              </Grid>

              {/* 2. Property Basics */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  Property Basics
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Property Title</Typography>
                <TextField fullWidth name="title" placeholder="e.g. Luxury 3 BHK Apartment in Baner" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Description</Typography>
                <TextField fullWidth name="description" multiline rows={4} placeholder="Describe the property features, nearby landmarks, etc." required />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Price</Typography>
                <TextField fullWidth name="price_display" placeholder="e.g. ₹1.2 Cr or ₹35,000 / mo" required />
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

              {/* 3. Location */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  Location Details
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Specific Area</Typography>
                <TextField fullWidth name="location" placeholder="e.g. Baner" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Region</Typography>
                <TextField select fullWidth name="area" defaultValue="Pune" required>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="PCMC">PCMC</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Full Address</Typography>
                <TextField fullWidth name="address" placeholder="Flat No, Building, Society Name" />
              </Grid>

              {/* 4. Specifications */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  Specifications
                </Typography>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>BHK</Typography>
                <TextField fullWidth name="bhk" type="number" defaultValue={2} required />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Baths</Typography>
                <TextField fullWidth name="bathrooms" type="number" defaultValue={2} required />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Sq.Ft</Typography>
                <TextField fullWidth name="sqft" type="number" placeholder="1200" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Furnishing</Typography>
                <TextField select fullWidth name="furnishing_status" defaultValue="Unfurnished" required>
                  <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                  <MenuItem value="Semi-furnished">Semi-furnished</MenuItem>
                  <MenuItem value="Fully-furnished">Fully-furnished</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Facing</Typography>
                <TextField select fullWidth name="facing" defaultValue="East">
                  <MenuItem value="East">East</MenuItem>
                  <MenuItem value="West">West</MenuItem>
                  <MenuItem value="North">North</MenuItem>
                  <MenuItem value="South">South</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Floor No.</Typography>
                <TextField fullWidth name="floor_number" type="number" />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Total Floors</Typography>
                <TextField fullWidth name="total_floors" type="number" />
              </Grid>

              {/* 5. Amenities */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  Amenities
                </Typography>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox name="has_parking" />} label="Parking" />
                  <FormControlLabel control={<Checkbox name="has_lift" />} label="Lift" />
                  <FormControlLabel control={<Checkbox name="has_power_backup" />} label="Power Backup" />
                  <FormControlLabel control={<Checkbox name="has_gym" />} label="Gym" />
                  <FormControlLabel control={<Checkbox name="has_security" />} label="Security" />
                  <FormControlLabel control={<Checkbox name="has_swimming_pool" />} label="Swimming Pool" />
                </FormGroup>
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                  Media
                </Typography>
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
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box sx={{ mt: 4 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    disabled={loading}
                    sx={{ py: 2, fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Listing for Review'}
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
