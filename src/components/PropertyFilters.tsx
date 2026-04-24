'use client';
import React from 'react';
import { Box, Paper, Typography, TextField, MenuItem, Button, Stack, Slider, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const PropertyFilters = () => {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: 3, position: 'sticky', top: 100 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Filters
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Location</Typography>
        <TextField select fullWidth size="small" defaultValue="All">
          <MenuItem value="All">All Areas</MenuItem>
          <MenuItem value="Baner">Baner</MenuItem>
          <MenuItem value="Wakad">Wakad</MenuItem>
          <MenuItem value="Kothrud">Kothrud</MenuItem>
          <MenuItem value="Hinjewadi">Hinjewadi</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Property Type</Typography>
        <TextField select fullWidth size="small" defaultValue="All">
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
          <FormControlLabel control={<Checkbox size="small" />} label="1 BHK" />
          <FormControlLabel control={<Checkbox size="small" />} label="2 BHK" />
          <FormControlLabel control={<Checkbox size="small" />} label="3 BHK" />
          <FormControlLabel control={<Checkbox size="small" />} label="4 BHK+" />
        </FormGroup>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Price Range (Lakhs)</Typography>
        <Slider
          value={[20, 150]}
          min={0}
          max={500}
          valueLabelDisplay="auto"
          sx={{ color: 'primary.main' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption">0</Typography>
          <Typography variant="caption">5 Cr+</Typography>
        </Box>
      </Box>

      <Button variant="contained" fullWidth sx={{ mb: 2 }}>
        Apply Filters
      </Button>
      <Button variant="text" fullWidth color="secondary">
        Reset All
      </Button>
    </Paper>
  );
};

export default PropertyFilters;
