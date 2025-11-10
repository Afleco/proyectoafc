import { Container, Typography, Button, Box } from '@mui/material';
import { useRouteError, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function ErrorPage() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h1" color="error" gutterBottom>
          ¡Oops!
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          Ha ocurrido un error
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Lo sentimos, parece que la página que buscas no existe.
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          <i>{error.statusText || error.message}</i>
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
}

export default ErrorPage;