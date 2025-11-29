import { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper,
  Avatar,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

//Importamos el useDispatch del react-redux
import { useDispatch } from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';

function Login() {
  //Justo después de la definición de la función function Login(){ ponemos el hook useDispatch:
  const dispatch = useDispatch()

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Función asíncrona para verificar usuario con la API
  const isVerifiedUser = async () => {
    setCargando(true);
    try {
      const response = await fetch(`http://localhost:3030/login?user=${usuario}&password=${password}`);
      const data = await response.json();
      
      console.log('Lo que nos llega de la base de datos:');
      console.log(data.data);
      
      if (data.data && Object.keys(data.data).length !== 0) {
        // Si hay datos es que el usuario y contraseña son correctos
        console.log('✅ Acceso concedido');
        setMensajeError(false);  // Oculta Alert de error
        setMensajeExito(true);   // Muestra Alert de éxito
        
        // Dispatch para cambiar el estado a login en el store del redux
        dispatch(authActions.login({
          name: data.data.nombre, // Nombre que viene de la API
          rol: data.data.rol      // Rol que viene de la API
        }))

        // Navegar a Home después de 1.5 segundos (para que se vea el Alert)
        setTimeout(() => {
          navigate('/home');
        }, 1500);
      } else {
        // Si no hay datos, usuario/contraseña incorrectos
        console.log('❌ Acceso denegado');
        setMensajeExito(false);  // Oculta Alert de éxito
        setMensajeError(true);   // Muestra Alert de error
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setMensajeExito(false);
      setMensajeError(true);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    console.log('Usuario ingresado:', usuario);
    console.log('Contraseña ingresada:', password);

    // Llamar a la función que verifica con la API
    isVerifiedUser();
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Iniciar Sesión
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              autoComplete="username"
              autoFocus
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              disabled={cargando}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={cargando}
            />

            {/* Alert de ERROR - Credenciales incorrectas */}
            {mensajeError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.
              </Alert>
            )}

            {/* Alert de ÉXITO - Credenciales correctas */}
            {mensajeExito && (
              <Alert severity="success" sx={{ mt: 2 }}>
                ¡Acceso concedido! Redirigiendo...
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
              disabled={cargando}
            >
              {cargando ? 'Verificando...' : 'Acceder'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;