'use client';
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, Alert, Snackbar } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';

const InquiryForm = ({ propertyTitle }: { propertyTitle?: string }) => {
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setOpenSnackbar(true);
    }, 1000);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, position: 'sticky', top: 100 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Inquire Now
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Fill out the form below and our experts will get back to you shortly.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField 
            label="Full Name" 
            variant="outlined" 
            fullWidth 
            required 
            size="medium"
          />
          <TextField 
            label="Phone Number" 
            variant="outlined" 
            fullWidth 
            required 
          />
          <TextField 
            label="Email Address" 
            variant="outlined" 
            fullWidth 
          />
          <TextField 
            label="Message" 
            variant="outlined" 
            fullWidth 
            multiline 
            rows={4} 
            defaultValue={propertyTitle ? `Hi, I am interested in "${propertyTitle}". Please provide more details.` : "I am interested in this property. Please contact me."}
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth
            sx={{ py: 1.5, fontSize: '1.1rem' }}
          >
            Send Inquiry
          </Button>
          
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>- OR -</Typography>
          
          <Button 
            variant="outlined" 
            color="success" 
            size="large" 
            fullWidth
            startIcon={<WhatsAppIcon />}
            sx={{ py: 1.5, borderColor: '#25D366', color: '#128C7E', '&:hover': { bgcolor: '#f0fdf4', borderColor: '#128C7E' } }}
            onClick={() => window.open(`https://wa.me/9130000000?text=Hi, I am interested in ${propertyTitle || 'a property'}`)}
          >
            WhatsApp Expert
          </Button>
        </Stack>
      </form>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Thank you! Your inquiry has been sent successfully.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default InquiryForm;
