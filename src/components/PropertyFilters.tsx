'use client';
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, MenuItem, Button, Stack, Slider, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

interface FilterProps {
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const PropertyFilters = ({ onFilterChange, onReset }: FilterProps) => {
  const [filters, setFilters] = useState({
    status: 'All',
    location: 'All',
    type: 'All',
    bhk: [] as number[],
    priceRange: [0, 500] as number[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleBhkChange = (bhk: number) => {
    const newBhk = filters.bhk.includes(bhk)
      ? filters.bhk.filter(b => b !== bhk)
      : [...filters.bhk, bhk];
    setFilters({ ...filters, bhk: newBhk });
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilters({ ...filters, priceRange: newValue as number[] });
  };

  const handleApply = () => {
    const apiFilters: any = {};
    if (filters.status !== 'All') {
        apiFilters.status = filters.status === 'Buy' ? 'For Sale' : 'For Rent';
    }
    if (filters.location !== 'All') apiFilters.area = filters.location;
    if (filters.type !== 'All') apiFilters.type = filters.type;
    if (filters.bhk.length > 0) apiFilters.bhk = filters.bhk.join(',');
    
    // Convert lakhs to actual amount for API
    apiFilters.min_price = filters.priceRange[0] * 100000;
    apiFilters.max_price = filters.priceRange[1] * 100000;
    
    onFilterChange(apiFilters);
  };

  const handleReset = () => {
    setFilters({
      status: 'All',
      location: 'All',
      type: 'All',
      bhk: [],
      priceRange: [0, 500],
    });
    onReset();
  };

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: 3, position: 'sticky', top: 100 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Filters
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Purpose</Typography>
        <TextField select fullWidth size="small" name="status" value={filters.status} onChange={handleChange}>
          <MenuItem value="All">All Properties</MenuItem>
          <MenuItem value="Buy">Buy (For Sale)</MenuItem>
          <MenuItem value="Rent">Rent (For Lease)</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Location</Typography>
        <TextField select fullWidth size="small" name="location" value={filters.location} onChange={handleChange}>
          <MenuItem value="All">All Regions</MenuItem>
          <MenuItem value="Pune">Pune</MenuItem>
          <MenuItem value="PCMC">PCMC</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Property Type</Typography>
        <TextField select fullWidth size="small" name="type" value={filters.type} onChange={handleChange}>
          <MenuItem value="All">All Types</MenuItem>
          <MenuItem value="Apartment">Apartment</MenuItem>
          <MenuItem value="Villa">Villa</MenuItem>
          <MenuItem value="Plot">Plot</MenuItem>
          <MenuItem value="Commercial">Commercial</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>BHK Type</Typography>
        <FormGroup>
          {[1, 2, 3, 4].map((n) => (
            <FormControlLabel 
              key={n}
              control={
                <Checkbox 
                  size="small" 
                  checked={filters.bhk.includes(n)} 
                  onChange={() => handleBhkChange(n)} 
                />
              } 
              label={`${n} BHK${n === 4 ? '+' : ''}`} 
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Price Range (Lakhs)</Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          min={0}
          max={500}
          valueLabelDisplay="auto"
          sx={{ color: 'primary.main' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption">{filters.priceRange[0]}L</Typography>
          <Typography variant="caption">{filters.priceRange[1]}L+</Typography>
        </Box>
      </Box>

      <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleApply}>
        Apply Filters
      </Button>
      <Button variant="text" fullWidth color="secondary" onClick={handleReset}>
        Reset All
      </Button>
    </Paper>
  );
};

export default PropertyFilters;
