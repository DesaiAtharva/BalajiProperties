import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Phone as PhoneIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Properties', path: '/properties' },
  { name: 'Services', path: '/#services' },
  { name: 'About Us', path: '/#about' },
  { name: 'Contact', path: '/#contact' },
];

const browseOptions = ['Buy', 'Sell', 'Rent'];
const listOptions = ['Buy', 'Sell', 'Rent'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElBrowse, setAnchorElBrowse] = useState<null | HTMLElement>(null);
  const [anchorElList, setAnchorElList] = useState<null | HTMLElement>(null);
  
  // Mobile sub-menu states
  const [mobileBrowseOpen, setMobileBrowseOpen] = useState(false);
  const [mobileListOpen, setMobileListOpen] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setMobileBrowseOpen(false);
    setMobileListOpen(false);
  };

  const handleOpenBrowseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElBrowse(event.currentTarget);
  };

  const handleCloseBrowseMenu = () => {
    setAnchorElBrowse(null);
  };

  const handleOpenListMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElList(event.currentTarget);
  };

  const handleCloseListMenu = () => {
    setAnchorElList(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'primary.main', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/logo.jpg" alt="Balaji Properties Logo" width={60} height={60} style={{ objectFit: 'contain' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: 'primary.main',
                  textDecoration: 'none',
                }}
              >
                Balaji Properties
              </Typography>
            </Link>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* Home */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/" style={{ width: '100%' }}>
                  <Typography sx={{ textAlign: 'left' }}>Home</Typography>
                </Link>
              </MenuItem>

              {/* Mobile Browse Dropdown */}
              <MenuItem onClick={() => setMobileBrowseOpen(!mobileBrowseOpen)} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Browse</Typography>
                {mobileBrowseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <Collapse in={mobileBrowseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {browseOptions.map((option) => (
                    <ListItemButton key={option} sx={{ pl: 4 }} onClick={handleCloseNavMenu} component={Link} href={`/properties?type=${option.toLowerCase()}`}>
                      <ListItemText primary={option} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              {/* Mobile List Dropdown */}
              <MenuItem onClick={() => setMobileListOpen(!mobileListOpen)} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>List</Typography>
                {mobileListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <Collapse in={mobileListOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {listOptions.map((option) => (
                    <ListItemButton key={option} sx={{ pl: 4 }} onClick={handleCloseNavMenu} component={Link} href="/#contact">
                      <ListItemText primary={option} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              {pages.slice(1).map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.path} style={{ width: '100%' }}>
                    <Typography sx={{ textAlign: 'left' }}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center' }}>
            <Image src="/logo.jpg" alt="Balaji Properties Logo" width={40} height={40} style={{ objectFit: 'contain' }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 1,
                fontWeight: 700,
                fontSize: '1rem',
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              Balaji Properties
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <Button component={Link} href="/" sx={{ my: 2, color: 'primary.main', display: 'block', mx: 1, fontWeight: 500 }}>
              Home
            </Button>

            {/* Browse Dropdown */}
            <Button
              onClick={handleOpenBrowseMenu}
              endIcon={<ExpandMoreIcon />}
              sx={{ my: 2, color: 'primary.main', display: 'flex', mx: 1, fontWeight: 500 }}
            >
              Browse
            </Button>
            <Menu
              anchorEl={anchorElBrowse}
              open={Boolean(anchorElBrowse)}
              onClose={handleCloseBrowseMenu}
            >
              {browseOptions.map((option) => (
                <MenuItem key={option} onClick={handleCloseBrowseMenu} component={Link} href={`/properties?type=${option.toLowerCase()}`}>
                  {option}
                </MenuItem>
              ))}
            </Menu>

            {/* List Dropdown */}
            <Button
              onClick={handleOpenListMenu}
              endIcon={<ExpandMoreIcon />}
              sx={{ my: 2, color: 'primary.main', display: 'flex', mx: 1, fontWeight: 500 }}
            >
              List
            </Button>
            <Menu
              anchorEl={anchorElList}
              open={Boolean(anchorElList)}
              onClose={handleCloseListMenu}
            >
              {listOptions.map((option) => (
                <MenuItem key={option} onClick={handleCloseListMenu} component={Link} href="/#contact">
                  {option}
                </MenuItem>
              ))}
            </Menu>

            {pages.slice(1).map((page) => (
              <Button
                key={page.name}
                component={Link}
                href={page.path}
                sx={{ my: 2, color: 'primary.main', display: 'block', mx: 1, fontWeight: 500 }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Contact Button */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="contained"
              startIcon={<PhoneIcon />}
              component="a"
              href="tel:9890468329"
              sx={{ 
                backgroundColor: 'warning.main', 
                '&:hover': { backgroundColor: '#B89240' },
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              9890468329
            </Button>
            <IconButton 
              component="a" 
              href="tel:9890468329"
              sx={{ display: { xs: 'flex', sm: 'none' }, color: 'warning.main' }}
            >
              <PhoneIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
