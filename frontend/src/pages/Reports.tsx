import { Typography, Container } from '@mui/material';
import Menu from '../components/Menu';

function Reports() {
  return (
    <>
      <Menu />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h1" color="secondary">
          Página Reports
        </Typography>
      </Container>
    </>
  );
}

export default Reports;