'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Stack, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import { getPropertyById } from '@/app/actions/property';
import { useParams } from 'next/navigation';
import { 
  CheckCircleOutlined as CheckCircleOutlineIcon, 
  SquareFoot as SquareFootIcon, 
  Hotel as HotelIcon, 
  Bathtub as BathtubIcon, 
  LocationOn as LocationOnIcon 
} from '@mui/icons-material';
import Image from 'next/image';

const PropertyDetailPage = () => {
  const params = useParams();
  const [property, setProperty] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProperty = async () => {
      if (params.id) {
        const data = await getPropertyById(params.id as string);
        setProperty(data);
      }
      setLoading(false);
    };
    fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h4">Loading...</Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h4">Property Not Found</Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  // Combine main_image with other images for the gallery
  const gallery = [
    ...(property.main_image ? [{ url: property.main_image, category: 'Main' }] : []),
    ...(property.images || [])
  ];

  const amenities = [
    '24/7 Security', 'Power Backup', 'Gated Community', 'Reserved Parking',
    'Swimming Pool', 'Gymnasium', 'Rain Water Harvesting', 'Intercom Facility'
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { md: 'flex-end' } }} spacing={2}>
            <Box>
              <Chip label={property.status} sx={{ bgcolor: 'warning.main', color: 'white', mb: 2, fontWeight: 700 }} />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{property.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="subtitle1">{property.location}, {property.area}</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: { md: 'right' } }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'warning.main' }}>{property.price_display}</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>{property.property_age || 'Ready to Move'}</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
          {/* Modern Image Carousel */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4, 
            overflow: 'hidden', 
            mb: 4, 
            position: 'relative', 
            height: { xs: 300, md: 550 },
            border: '1px solid #eee'
          }}
        >
           <Box 
            sx={{ 
              display: 'flex', 
              height: '100%', 
              overflowX: 'auto', 
              scrollSnapType: 'x mandatory', 
              '&::-webkit-scrollbar': { display: 'none' },
              cursor: 'grab'
            }}
           >
              {gallery.map((img: any, idx: number) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    flex: '0 0 100%', 
                    height: '100%', 
                    scrollSnapAlign: 'start',
                    position: 'relative'
                  }}
                >
                  <img
                    src={img.url}
                    alt={`${property.title} - ${img.category}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box sx={{ position: 'absolute', bottom: 20, right: 20, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', px: 2, py: 1, borderRadius: 2, fontSize: '0.85rem', fontWeight: 600 }}>
                    {idx + 1} / {gallery.length} • {img.category}
                  </Box>
                </Box>
              ))}
           </Box>
           
           <Box sx={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 1 }}>
            <Chip label={property.status} color="primary" sx={{ fontWeight: 700, px: 1 }} />
            <Chip label={property.property_type} sx={{ bgcolor: 'white', fontWeight: 700, px: 1 }} />
           </Box>

           <Typography variant="caption" sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', color: 'white', opacity: 0.8, fontWeight: 500, bgcolor: 'rgba(0,0,0,0.3)', px: 2, borderRadius: 10 }}>
             Swipe to see tour →
           </Typography>
        </Paper>

            {/* Quick Stats */}
            <Grid container spacing={2} sx={{ mb: 6 }}>
              {[
                { icon: <HotelIcon />, label: 'Bedrooms', value: property.bhk + ' BHK' },
                { icon: <BathtubIcon />, label: 'Bathrooms', value: property.bathrooms },
                { icon: <SquareFootIcon />, label: 'Build Area', value: property.sqft + ' sq.ft' },
                { icon: <CheckCircleOutlineIcon />, label: 'Status', value: property.status }
              ].map((stat, i) => (
                <Grid size={{ xs: 6, sm: 3 }} key={i}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{stat.label}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Description */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Property Description</Typography>
            <Typography variant="body1" sx={{ mb: 6, lineHeight: 1.8, color: 'text.secondary' }}>
              {property.description || `Experience luxury living in this premium ${property.title} located in the heart of ${property.location}. 
              This property features modern architecture, high-quality finishes, and ample natural light. 
              The spacious layout is designed for comfort and functionality, making it perfect for families seeking a modern lifestyle.`}
              <br /><br />
              Located in one of Pune's most desirable neighborhoods, you'll have easy access to top schools, hospitals, 
              shopping malls, and IT parks. The community offers top-notch amenities ensuring a secure and luxurious environment.
            </Typography>

            <Divider sx={{ mb: 6 }} />

            {/* Amenities */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Amenities</Typography>
            <Grid container spacing={1} sx={{ mb: 6 }}>
              {amenities.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: '1.2rem' }} />
                    <Typography variant="body1">{item}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <InquiryForm propertyTitle={property.title} propertyId={property.id} />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default PropertyDetailPage;
