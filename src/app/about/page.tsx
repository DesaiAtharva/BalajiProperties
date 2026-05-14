'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  VerifiedUser as VerifiedIcon, 
  Handshake as HandshakeIcon, 
  Timeline as TimelineIcon,
  Groups as GroupsIcon
} from '@mui/icons-material';

const AboutPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        minHeight: '120px', 
        display: 'flex', 
        alignItems: 'center', 
        textAlign: 'center' 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, textAlign: 'center', width: '100%', fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
            About Balaji Properties
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, textAlign: 'center', maxWidth: '800px', mx: 'auto', fontSize: '1.1rem' }}>
            Your trusted partner in Pune's real estate journey since 2014.
          </Typography>
        </Container>
      </Box>

      {/* Story Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component="img" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" sx={{ width: '100%', borderRadius: 4, boxShadow: 10 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Our Story</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
              Founded with a vision to redefine transparency in real estate, Balaji Properties has grown from a small consultancy to one of Pune's most respected property firms. We understand that a home is more than just a transaction; it's a dream and a long-term commitment.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
              Over the last decade, we have successfully assisted over 1,000 families in finding their perfect homes across Baner, Wakad, Kothrud, and Hinjewadi. Our deep roots in Pune and PCMC give us an unparalleled edge in understanding market trends and property valuations.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Stats/Values Section */}
      <Box sx={{ bgcolor: '#F5F7F9', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { icon: <VerifiedIcon fontSize="large" />, title: 'Integrity', desc: 'Every listing is verified for legal compliance and accuracy.' },
              { icon: <HandshakeIcon fontSize="large" />, title: 'Trust', desc: 'We prioritize long-term relationships over short-term sales.' },
              { icon: <TimelineIcon fontSize="large" />, title: 'Experience', desc: '10+ years of navigating the complex Pune real estate market.' },
              { icon: <GroupsIcon fontSize="large" />, title: 'Customer First', desc: 'Tailored solutions based on your budget and lifestyle needs.' }
            ].map((value, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Paper sx={{ p: 4, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                  <Box sx={{ color: 'warning.main', mb: 2 }}>{value.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{value.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{value.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Leadership Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>Our Leadership</Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4, bgcolor: '#F5F7F9', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Rushikesh Yede</Typography>
              <Typography variant="subtitle1" color="primary.main" sx={{ mb: 2, fontWeight: 600 }}>Founder & Managing Director</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                With a passion for urban development and client satisfaction, Rushikesh leads the team with a focus on ethical practices and innovation.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default AboutPage;
