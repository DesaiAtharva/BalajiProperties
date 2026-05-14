'use client';
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, Alert, Snackbar, CircularProgress } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { addInquiry } from '@/app/actions/property';

const InquiryForm = ({ propertyTitle, propertyId }: { propertyTitle?: string; propertyId?: string }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Capture the form reference immediately
    setLoading(true);
    setError(null);

    const formData = new FormData(form);
    const result = await addInquiry(formData);

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
      setOpenSnackbar(true);
      form.reset(); // Use the captured reference
    } else {
      setError(result.message || 'Failed to send inquiry');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, position: 'sticky', top: 100 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Inquire Now
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Fill out the form below and our experts will get back to you shortly.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* Hidden field for property association */}
        {propertyId && <input type="hidden" name="property" value={propertyId} />}
        
        <Stack spacing={2.5}>
          <TextField 
            label="Full Name" 
            name="full_name"
            variant="outlined" 
            fullWidth 
            required 
            size="medium"
          />
          <TextField 
            label="Phone Number" 
            name="phone_number"
            variant="outlined" 
            fullWidth 
            required 
          />
          <TextField 
            label="Email Address" 
            name="email"
            variant="outlined" 
            fullWidth 
          />
          <TextField 
            label="Message" 
            name="message"
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
            disabled={loading}
            sx={{ py: 1.5, fontSize: '1.1rem' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Inquiry'}
          </Button>
          
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>- OR -</Typography>
          
          <Button 
            variant="outlined" 
            color="success" 
            size="large" 
            fullWidth
            startIcon={<WhatsAppIcon />}
            sx={{ py: 1.5, borderColor: '#25D366', color: '#128C7E', '&:hover': { bgcolor: '#f0fdf4', borderColor: '#128C7E' } }}
            onClick={() => window.open(`https://wa.me/919890468329?text=Hi, I am interested in ${propertyTitle || 'a property'}`)}
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
