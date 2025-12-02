import React, { useMemo } from 'react';
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useTheme } from '@mui/material/styles'; 
import { Theme } from '@mui/material'; 

// --- Tipos ---
interface ItemType {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

interface InformeColeccionProps {
  datos: ItemType[];
}

// --- Constante de Columnas Simplificada ---
const COLLECTION_COLUMNS: Array<Column<ItemType>> = [
  { title: "Nombre", field: "nombre", filtering: false },
  { title: "Marca", field: "marca", filtering: true, filterPlaceholder: "Filtrar marca" },
  { title: "Tipo", field: "tipo", filtering: true, filterPlaceholder: "Filtrar tipo" },
  { 
    title: "Precio", 
    field: "precio", 
    type: "numeric",
    filtering: false,
    render: (rowData) => `€${rowData.precio.toFixed(2)}` 
  }
];

function InformeColeccion({ datos }: InformeColeccionProps) {
  const theme: Theme = useTheme();
  
  // Cálculo total precio
  const sumaTotal = useMemo(() => 
    datos.reduce((acc, item) => acc + item.precio, 0),
    [datos]
  );

  return (
    <div style={{ marginTop: theme.spacing(3) }}>
      <MaterialTable
        columns={COLLECTION_COLUMNS} 
        data={datos}
        title="Informe de Colección"
        options={{
          exportMenu: [
            { label: 'Exportar a PDF', exportFunc: (cols, datas) => ExportPdf(cols, datas, 'informe_coleccion') },
            { label: 'Exportar a CSV', exportFunc: (cols, datas) => ExportCsv(cols, datas, 'informe_coleccion') }
          ],
          draggable: true,
          columnsButton: true,
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 50],
          
          // Estilos de Header y Fila
          headerStyle: {
            backgroundColor: theme.palette.primary.main, 
            color: theme.palette.primary.contrastText, 
            fontWeight: 'bold',
            fontSize: '16px'
          },
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 !== 0 ? theme.palette.action.hover : theme.palette.background.paper
          }),
          searchFieldStyle: {
            marginRight: theme.spacing(2) 
          }
        }}
        // Localización
        localization={{
          header: { actions: 'Acciones' },
          body: {
            emptyDataSourceMessage: 'No hay registros para mostrar',
            filterRow: { filterTooltip: 'Filtrar' }
          },
          toolbar: {
            searchTooltip: 'Buscar',
            searchPlaceholder: 'Buscar',
            exportTitle: 'Exportar',
            exportAriaLabel: 'Exportar',
            exportCSVName: 'Exportar como CSV',
            exportPDFName: 'Exportar como PDF',
            nRowsSelected: '{0} fila(s) seleccionada(s)',
            showColumnsTitle: 'Mostrar columnas',
            showColumnsAriaLabel: 'Mostrar columnas'
          },
          pagination: {
            labelRowsPerPage: 'Filas por página:',
            labelDisplayedRows: '{from}-{to} de {count}',
            firstTooltip: 'Primera página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Página siguiente',
            lastTooltip: 'Última página'
          }
        }}
      />
      
      {/* Estilo del Total Integrado */}
      <div style={{ 
        marginTop: theme.spacing(3), 
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light, // Ejemplo de color de tema
        color: theme.palette.secondary.contrastText,
        borderRadius: theme.shape.borderRadius,
        textAlign: 'right',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        Total de la Colección:   **{sumaTotal.toFixed(2)}€**
      </div>
    </div>
  );
}

export default InformeColeccion;