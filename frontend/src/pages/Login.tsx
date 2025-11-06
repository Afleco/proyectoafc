import { Container, Typography, Button, Box } from '@mui/material';

function Login() {
  return (
    <main> {/* Región principal de contenido*/}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h1" color="primary" gutterBottom>
          Página de Login de Alejandro Fleitas Correa
        </Typography>

        <section> {/* Sección de texto*/}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h2" color="secondary" gutterBottom>
              Título H2 - Heading 2
            </Typography>
            <Typography variant="h3" color="success.main" gutterBottom>
              Título H3 - Heading 3
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Subtítulo 1 - Subtitle 1
            </Typography>
            <Typography variant="body1" gutterBottom>
              Body 1 - Este es un texto de cuerpo normal que se usa para el contenido principal.
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Caption - Texto pequeño para anotaciones
            </Typography>
          </Box>
        </section>

        <section> {/* Sección de botones*/}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="text" color="primary">
              Text Primary
            </Button>
            <Button variant="contained" color="primary">
              Contained Primary
            </Button>
            <Button variant="outlined" color="primary">
              Outlined Primary
            </Button>

            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" color="error">
              Error
            </Button>
            <Button variant="contained" color="success">
              Success
            </Button>
            <Button variant="contained" color="warning">
              Warning
            </Button>
            <Button variant="contained" color="info">
              Info
            </Button>
          </Box>
        </section>
      </Container>
    </main>
  );
}

export default Login;