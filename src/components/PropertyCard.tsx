'use client';
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Button, Divider, IconButton } from '@mui/material';
import { 
  LocationOn as LocationOnIcon, 
  Hotel as HotelIcon, 
  Bathtub as BathtubIcon, 
  SquareFoot as SquareFootIcon, 
  FavoriteBorder as FavoriteBorderIcon 
} from '@mui/icons-material';
import Link from 'next/link';

export type Property = {
  id: string;
  title: string;
  price_display: string;
  price_amount?: number;
  location: string;
  area: string;
  property_type: string;
  bhk: number;
  bathrooms: number;
  sqft: number;
  main_image: string;
  status: 'For Sale' | 'For Rent';
  featured?: boolean;
};

const PropertyCard = ({ property }: { property: Property }) => {
  const getImageUrl = (url: string | null) => {
    if (!url) return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800';
    
    // If the URL contains 'http' multiple times or is nested
    const lastHttpIndex = url.lastIndexOf('http');
    if (lastHttpIndex !== -1 && lastHttpIndex > 0) {
      // It's a nested URL, take only the last part
      let realUrl = decodeURIComponent(url.substring(lastHttpIndex));
      return realUrl.replace(/https:\/+(?!\/)/g, 'https://').replace(/http:\/+(?!\/)/g, 'http://');
    }
    
    // If it's already a clean external URL
    if (url.startsWith('http')) return url;

    // Normal uploaded files from backend
    return `https://balajiproperties-backend.onrender.com${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
        },
        position: 'relative'
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={getImageUrl(property.main_image)}
          alt={property.title}
        />
        <Chip 
          label={property.status} 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            bgcolor: property.status === 'For Sale' ? 'primary.main' : 'warning.main',
            color: 'white',
            fontWeight: 600
          }} 
        />
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'white' }
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
            {property.price_display}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
            {property.property_type}
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, lineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {property.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 0.5 }}>
          <LocationOnIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
          <Typography variant="body2" color="text.secondary">
            {property.location}, {property.area}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
              <HotelIcon fontSize="small" color="disabled" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{property.bhk}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">BHK</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
              <BathtubIcon fontSize="small" color="disabled" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{property.bathrooms}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">Baths</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
              <SquareFootIcon fontSize="small" color="disabled" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{property.sqft}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">Sq.Ft</Typography>
          </Box>
        </Box>

        <Button 
          fullWidth 
          variant="outlined" 
          component={Link} 
          href={`/properties/${property.id}`}
          sx={{ mb: 1 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
