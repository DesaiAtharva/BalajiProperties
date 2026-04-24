'use client';
import React, { useState } from 'react';
import { Paper, Tabs, Tab, Box, TextField, MenuItem, Button, Grid, Autocomplete } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Office'];
const budgets = [
  'Below 20L', '20L - 50L', '50L - 1Cr', '1Cr - 2Cr', 'Above 2Cr'
];
const areas = [
  'Kothrud', 'Baner', 'Hinjewadi', 'Wakad', 'Ravet', 'Moshi', 'Bavdhan', 'Pashan', 'Aundh'
];

const SearchBar = ({ horizontal = true }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Paper 
      elevation={6} 
      sx={{ 
        p: 2, 
        width: '100%', 
        maxWidth: horizontal ? '1000px' : '400px', 
        borderRadius: 4,
        overflow: 'hidden'
      }}
    >
      <Tabs 
        value={tab} 
        onChange={handleTabChange} 
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Buy" sx={{ fontWeight: 600 }} />
        <Tab label="Rent" sx={{ fontWeight: 600 }} />
      </Tabs>

      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: horizontal ? 4 : 12 }}>
          <Autocomplete
            options={areas}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Location" 
                placeholder="Enter area (e.g. Wakad)" 
                variant="outlined" 
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: horizontal ? 3 : 12 }}>
          <TextField
            select
            label="Property Type"
            fullWidth
            defaultValue=""
          >
            {propertyTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: horizontal ? 3 : 12 }}>
          <TextField
            select
            label="Budget"
            fullWidth
            defaultValue=""
          >
            {budgets.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: horizontal ? 2 : 12 }}>
          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            startIcon={<SearchIcon />}
            sx={{ py: 1.8, fontSize: '1.1rem' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchBar;
