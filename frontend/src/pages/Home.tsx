import { Typography, Container, Button } from '@mui/material';
//Importamos el useSelector del react-redux
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// Importamos lo que necesitamos para el tipo del selector()
import type { RootState} from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';


function Home() {
  //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
const userData = useSelector((state: RootState) => state.authenticator)
//Comprobamos por la consola qué obtenemos del store
console.log(userData)

  // Hook para poder despachar acciones a Redux
  const dispatch = useDispatch();
  // Hook para navegar entre rutas
  const navigate = useNavigate();

   // Función que maneja el cierre de sesión
  const handleLogout = () => {
    // Se despacha la acción logout al store
    dispatch(authActions.logout());
    // Se redirige al usuario a la página principal
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h1" color="primary">
        Página Home de Alejandro Fleitas Correa
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Soy el usuario <strong>{userData.userName}</strong> y tengo el rol de <strong>{userData.userRol}</strong>.
      </Typography>

      {/* Botón para cerrar sesión */}
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        SALIR
      </Button>

    </Container>
  );
}

export default Home;