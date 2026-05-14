'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import { 
  Phone as PhoneIcon, 
  Email as EmailIcon, 
  LocationOn as LocationOnIcon,
  WhatsApp as WhatsAppIcon
} from '@mui/icons-material';

const ContactPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        minHeight: '120px', 
        display: 'flex', 
        alignItems: 'center', 
        textAlign: 'center' 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>Contact Us</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, fontSize: '1.1rem' }}>
            Have questions? We're here to help you find your dream property.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>
          {/* Contact Details */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Get in Touch</Typography>
            
            <Stack spacing={4}>
              <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Box sx={{ bgcolor: 'warning.main', p: 1.5, borderRadius: 2, color: 'primary.main', height: 'fit-content' }}>
                  <PhoneIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Call Us</Typography>
                  <Typography variant="body1" color="text.secondary">+91-9890468329</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Box sx={{ bgcolor: 'warning.main', p: 1.5, borderRadius: 2, color: 'primary.main', height: 'fit-content' }}>
                  <WhatsAppIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>WhatsApp</Typography>
                  <Typography variant="body1" color="text.secondary">+91-9890468329</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Box sx={{ bgcolor: 'warning.main', p: 1.5, borderRadius: 2, color: 'primary.main', height: 'fit-content' }}>
                  <EmailIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Email Us</Typography>
                  <Typography variant="body1" color="text.secondary">rushiyede4005@gmail.com</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Box sx={{ bgcolor: 'warning.main', p: 1.5, borderRadius: 2, color: 'primary.main', height: 'fit-content' }}>
                  <LocationOnIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Office Address</Typography>
                  <Typography variant="body1" color="text.secondary">
                    s.no 6/2 room no 3356 khori hingne khurd <br />
                    sinhgad road pune city maharshatra 411051
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Map Placeholder */}
            <Box sx={{ mt: 6, borderRadius: 4, overflow: 'hidden', height: '300px', bgcolor: '#eee' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15136.319717770857!2d73.81845175!3d18.47999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67410913%3A0x1b5e3230acc4678d!2sHingne%20Khurd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715615000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ bgcolor: '#F5F7F9', p: 4, borderRadius: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Send us a Message</Typography>
              <InquiryForm />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default ContactPage;
