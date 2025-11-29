import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

interface ItemType {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

const itemInitialState: ItemType = {
  nombre: '',
  marca: '',
  tipo: '',
  precio: 0
};

function Dashboard() {
  const [item, setItem] = useState<ItemType>(itemInitialState);
  const [tableData, setTableData] = useState<ItemType[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Cargar datos al iniciar
  useEffect(() => {
    fetchItems();
  }, []);

  // Obtener items de la base de datos
  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();
      setTableData(data.data || []);
    } catch (error) {
      console.error('Error al obtener items:', error);
    }
  };

  // Insertar item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const params = new URLSearchParams({
        nombre: item.nombre,
        marca: item.marca,
        tipo: item.tipo,
        precio: item.precio.toString()
      });

      const response = await fetch(`http://localhost:3030/addItem?${params}`);
      const result = await response.json();

      if (result > 0) {
        setSnackbarMessage('¡Datos guardados con éxito!');
        setOpenSnackbar(true);
        setItem(itemInitialState);
        fetchItems(); // Actualizar tabla
      }
    } catch (error) {
      console.error('Error al insertar item:', error);
      setSnackbarMessage('Error al guardar los datos');
      setOpenSnackbar(true);
    }
  };

  // Eliminar item
  const handleDeleteItem = async (row: ItemType) => {
    try {
      const response = await fetch(`http://localhost:3030/deleteItem?id=${row.id}`);
      const result = await response.json();

      if (result > 0) {
        setSnackbarMessage('Registro eliminado correctamente');
        setOpenSnackbar(true);
        fetchItems(); // Actualizar tabla
      }
    } catch (error) {
      console.error('Error al eliminar item:', error);
      setSnackbarMessage('Error al eliminar el registro');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Formulario */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Agregar Nuevo Item
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nombre"
              value={item.nombre}
              onChange={(e) => setItem({ ...item, nombre: e.target.value })}
              required
              fullWidth
            />
            
            <TextField
              label="Marca"
              value={item.marca}
              onChange={(e) => setItem({ ...item, marca: e.target.value })}
              required
              fullWidth
            />
            
            <TextField
              label="Tipo"
              value={item.tipo}
              onChange={(e) => setItem({ ...item, tipo: e.target.value })}
              required
              fullWidth
            />
            
            <TextField
              label="Precio"
              type="number"
              value={item.precio}
              onChange={(e) => setItem({ ...item, precio: Number(e.target.value) })}
              required
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />
            
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
            >
              Insertar Datos
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabla */}
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="Tabla de items de colección">
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Acciones</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Marca</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: ItemType) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteItem(row)}
                    color="error"
                    aria-label="eliminar"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>€{row.precio.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;