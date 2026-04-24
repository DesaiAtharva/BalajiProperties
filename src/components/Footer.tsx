'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon, 
  WhatsApp as WhatsAppIcon, 
  Phone as PhoneIcon, 
  Email as EmailIcon, 
  LocationOn as LocationOnIcon 
} from '@mui/icons-material';
import Image from 'next/image';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', pt: 8, pb: 4, mt: 0 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Image src="/logo.jpg" alt="Balaji Properties" width={50} height={50} style={{ filter: 'brightness(0) invert(1)' }} />
              <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
                Balaji Properties
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2, pr: { md: 4 } }}>
              Providing premium real estate services in Pune and PCMC. We specialize in residential and commercial properties, property management, and investment advisory.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="WhatsApp">
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="/" color="inherit" underline="hover">Home</Link>
              <Link href="/properties" color="inherit" underline="hover">Properties</Link>
              <Link href="/#services" color="inherit" underline="hover">Services</Link>
              <Link href="/#about" color="inherit" underline="hover">About Us</Link>
              <Link href="/#contact" color="inherit" underline="hover">Contact</Link>
            </Box>
          </Grid>

          {/* Areas */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Popular Areas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="/area/kothrud" color="inherit" underline="hover">Kothrud</Link>
              <Link href="/area/baner" color="inherit" underline="hover">Baner</Link>
              <Link href="/area/hinjewadi" color="inherit" underline="hover">Hinjewadi</Link>
              <Link href="/area/wakad" color="inherit" underline="hover">Wakad (PCMC)</Link>
              <Link href="/area/ravet" color="inherit" underline="hover">Ravet (PCMC)</Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOnIcon fontSize="small" sx={{ color: 'warning.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Office No. 101, Business Hub, Pune, Maharashtra 411001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon fontSize="small" sx={{ color: 'warning.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +91-9130000000
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon fontSize="small" sx={{ color: 'warning.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@balajiproperties.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.5 }}>
            © {new Date().getFullYear()} Balaji Properties. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.5 }}>
            Designed for Excellence
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
