'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { properties } from '@/data/properties';
import Link from 'next/link';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const PropertyListingPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <MuiLink component={Link} underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <Typography color="text.primary">Properties</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Properties in Pune & PCMC
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Showing {properties.length} properties matching your search.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <PropertyFilters />
          </Grid>

          {/* Listings Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid spacing={3}>
              {properties.map((property) => (
                <Grid size={{ xs: 12, sm: 12 }} key={property.id}>
                  <PropertyCard property={property} />
                </Grid>
              ))}
            </Grid>
            
            {/* Show more / Pagination could go here */}
            {properties.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h6">No properties found matching your criteria.</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default PropertyListingPage;
