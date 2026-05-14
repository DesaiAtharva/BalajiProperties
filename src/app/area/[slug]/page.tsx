'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Breadcrumbs, Link as MuiLink, Paper, Button } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProperties } from '@/app/actions/property';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const AreaSEOPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const areaName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  const [filteredProperties, setFilteredProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchByArea = async () => {
      // Area in Django is either 'Pune' or 'PCMC' or the specific location
      // We try fetching by area first
      const data = await getProperties({ area: areaName });
      setFilteredProperties(data);
      setLoading(false);
    };
    fetchByArea();
  }, [areaName]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <MuiLink component={Link} underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <MuiLink component={Link} underline="hover" color="inherit" href="/properties">
            Properties
          </MuiLink>
          <Typography color="text.primary">{areaName}</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 6, p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Properties in {areaName}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            Explore the best residential and commercial real estate in {areaName}, {filteredProperties[0]?.area || 'Pune'}.
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          {loading ? 'Searching for listings...' : `${filteredProperties.length} Listings found in ${areaName}`}
        </Typography>

        <Grid container spacing={4}>
          {!loading && filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={property.id}>
                <PropertyCard property={property} />
              </Grid>
            ))
          ) : !loading ? (
            <Grid size={12}>
              <Paper sx={{ p: 10, textAlign: 'center', borderRadius: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  We currently don't have active listings in {areaName}. 
                  Please check back later or contact us for off-market opportunities.
                </Typography>
                <Button variant="contained" component={Link} href="/properties" sx={{ mt: 3 }}>
                  View All Properties
                </Button>
              </Paper>
            </Grid>
          ) : null}
        </Grid>

        {/* SEO Text Section */}
        <Box sx={{ mt: 10, p: 4, bgcolor: 'white', borderRadius: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Why Choose Properties in {areaName}?</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {areaName} is one of the fastest-growing residential and commercial hubs in the region. 
            With excellent connectivity to major IT parks, educational institutions, and healthcare facilities, 
            it offers a perfect balance of lifestyle and convenience. Investing in real estate in {areaName} 
            has historically shown great appreciation, making it a favorite among home buyers and investors alike.
          </Typography>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default AreaSEOPage;
