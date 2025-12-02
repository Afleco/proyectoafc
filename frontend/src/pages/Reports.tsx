import { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Menu from '../components/Menu';
import InformeColeccion from '../components/InformeColeccion';

interface ItemType {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

function Reports() {
  const [mostrarInforme, setMostrarInforme] = useState(false);
  const [datosInforme, setDatosInforme] = useState<ItemType[]>([]);

  const handleGenerarInforme = async () => {
    try {
      // Obtener datos de la base de datos
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();
      
      // Almacenamos los datos
      setDatosInforme(data.data || []);
      
      // Activar la visualización del informe
      setMostrarInforme(true);
    } catch (error) {
      console.error('Error al obtener datos para el informe:', error);
    }
  };

  return (
    <>
      <Menu />
      <Container maxWidth='xl' sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Página de Informes
        </Typography>

        {!mostrarInforme && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AssessmentIcon />}
              onClick={handleGenerarInforme}
              sx={{ px: 4, py: 2 }}
            >
              Informe Colección
            </Button>
          </Box>
        )}

        {/* Renderizado condicional: mostrar informe solo si se ha generado */}
        {mostrarInforme && <InformeColeccion datos={datosInforme} />}
      </Container>
    </>
  );
}

export default Reports;