import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/index';
import { authActions } from '../store/authSlice';

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.authenticator);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate('/');
    }
  }, [userData.isAutenticated, navigate]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  // Determinar si el usuario es admin
  const isAdmin = userData.userRol === 'admin' || userData.userRol === 'administrador';

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'secondary.main' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'black', fontWeight: 'Bold' }}>
            {userData.userName}
          </Typography>
          
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {/* Renderizado condicional: icono diferente según el rol */}
            {isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Menú</Typography>
            <Typography variant="body2" color="text.secondary">
              Rol: {userData.userRol}
            </Typography>
          </Box>
          <Divider />
          
          <List>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* Renderizado condicional: solo mostrar Informes si es admin */}
            {isAdmin && (
              <Link to="/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Informes" />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
          </List>
          
          <Divider />
          
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Salir" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Menu;