'use client';
import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  Paper, Stack, Alert, CircularProgress, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://balajiproperties-backend.onrender.com/api/admin/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', data.username);
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('Connection failed. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F5F7F9' }}>
      <Navbar />
      
      <Container maxWidth="xs" sx={{ py: 12, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Paper elevation={10} sx={{ p: 4, width: '100%', borderRadius: 4, textAlign: 'center' }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', w: 60, h: 60, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 2, p: 1.5 }}>
            <LockIcon fontSize="large" />
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Admin Login</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Enter your credentials to manage Balaji Properties</Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
              />
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default LoginPage;
