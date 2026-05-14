'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { getProperties } from '@/app/actions/property';
import Link from 'next/link';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const PropertyListingPage = () => {
  const [allProperties, setAllProperties] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchProperties = async (currentFilters = {}) => {
    setLoading(true);
    const dynamicProperties = await getProperties(currentFilters);
    setAllProperties(dynamicProperties);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProperties(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

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
            {loading ? 'Searching...' : `Showing ${allProperties.length} properties matching your search.`}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <PropertyFilters onFilterChange={handleFilterChange} onReset={handleReset} />
          </Grid>

          {/* Listings Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h6">Loading properties...</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {allProperties.map((property) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={property.id}>
                    <PropertyCard property={property} />
                  </Grid>
                ))}
                
                {allProperties.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 10, width: '100%' }}>
                    <Typography variant="h6">No properties found matching your criteria.</Typography>
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default PropertyListingPage;
