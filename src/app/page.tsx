'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Button, Stack, Paper, Avatar } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/properties';
import Link from 'next/link';
import { 
  WhatsApp as WhatsAppIcon, 
  HomeWork as HomeWorkIcon, 
  BusinessCenter as BusinessCenterIcon, 
  Gavel as GavelIcon, 
  MapsHomeWork as MapsHomeWorkIcon,
  Description as DescriptionIcon,
  SupportAgent as SupportAgentIcon
} from '@mui/icons-material';

const HomePage = () => {
  const featuredProperties = properties.filter(p => p.featured);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative', 
          height: { xs: 'auto', md: '85vh' },
          minHeight: '600px',
          display: 'flex', 
          alignItems: 'center',
          py: { xs: 8, md: 0 },
          backgroundImage: 'linear-gradient(rgba(47, 72, 88, 0.7), rgba(47, 72, 88, 0.7)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.2 }}>
                Find Your Perfect <Box component="span" sx={{ color: 'warning.main' }}>Home</Box> in Pune
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 400, opacity: 0.9, lineHeight: 1.6 }}>
                Balaji Properties is your trusted partner for buying, selling, and renting premium properties across Pune and PCMC.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                <Button 
                  component={Link} 
                  href="/properties" 
                  variant="contained" 
                  size="large" 
                  sx={{ bgcolor: 'warning.main', height: '56px', px: 4, fontSize: '1.1rem' }}
                >
                  Browse Listings
                </Button>
                <Button 
                  component={Link} 
                  href="/list-property" 
                  variant="outlined" 
                  size="large" 
                  sx={{ color: 'white', borderColor: 'white', height: '56px', px: 4, fontSize: '1.1rem', '&:hover': { borderColor: 'warning.main', color: 'warning.main' } }}
                >
                  List Your Property
                </Button>
              </Stack>
            </Grid>
          </Grid>
          
        </Container>
      </Box>

      {/* Featured Properties */}
      <Box sx={{ pt: { xs: 10, md: 18 }, pb: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Featured Properties
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Handpicked premium listings in prime locations of Pune & PCMC.
              </Typography>
            </Box>
            <Button component={Link} href="/properties" sx={{ fontWeight: 700 }}>
              View All Properties
            </Button>
          </Box>

          <Grid container spacing={3}>
            {featuredProperties.map((property) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={property.id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }} id="services">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Our Services
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              From finding your dream home to managing your property investments, we provide end-to-end real estate solutions.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { icon: <HomeWorkIcon fontSize="large" />, title: 'Residential', desc: 'Expert guidance for buying your next home in Pune\'s finest neighborhoods.' },
              { icon: <BusinessCenterIcon fontSize="large" />, title: 'Commercial', desc: 'Strategic office and retail spaces in Pune\'s growing business hubs.' },
              { icon: <DescriptionIcon fontSize="large" />, title: 'Loan & Documentation', desc: 'Hassle-free loan processing and complete documentation support.' },
              { icon: <GavelIcon fontSize="large" />, title: 'Legal Support', desc: 'Professional legal advice and property title verification services.' },
              { icon: <MapsHomeWorkIcon fontSize="large" />, title: 'Property Management', desc: 'End-to-end management for your rental properties and maintenance.' }
            ].map((service, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
                <Paper sx={{ p: 4, height: '100%', textAlign: 'center', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 10 } }}>
                  <Box sx={{ color: 'warning.main', mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{service.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              What Our Clients Say
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {[
              { name: 'Rahul Sharma', role: 'Home Buyer', text: 'Balaji Properties helped me find the perfect 3 BHK in Baner. Their market knowledge is exceptional!' },
              { name: 'Priya Patil', role: 'Property Owner', text: 'I have been using their management services for my flat in Wakad. Highly professional and reliable.' },
              { name: 'Amit Deshmukh', role: 'Investor', text: 'Best real estate consultants in Pune. They suggested a great commercial property that gave me excellent returns.' },
              { name: 'Sneha Kulkarni', role: 'Home Seller', text: 'Selling my property was so easy with Balaji Properties. They handled everything from marketing to legal paperwork.' },
              { name: 'Vikram Singh', role: 'Tenant', text: 'Found a great rental apartment through them. The process was transparent and quick.' },
              { name: 'Anjali Joshi', role: 'First-time Buyer', text: 'As a first-time buyer, I was nervous, but their team guided me through every step of the loan and documentation.' }
            ].map((t, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #eee', height: '100%' }}>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, fontSize: '1rem' }}>"{t.text}"</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{t.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{t.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sticky WhatsApp Button */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: 30, 
          right: 30, 
          zIndex: 1000 
        }}
      >
        <Button
          variant="contained"
          sx={{ 
            bgcolor: '#25D366', 
            borderRadius: '50px',
            p: '12px 24px',
            '&:hover': { bgcolor: '#128C7E' },
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
          }}
          startIcon={<WhatsAppIcon />}
        >
          Chat with Us
        </Button>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
