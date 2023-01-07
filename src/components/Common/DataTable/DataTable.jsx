import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function DataTable(props) {
  const { columns, rows, toolbar, pageSize, onPageChange } = props;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize ? pageSize : 5}
      rowsPerPageOptions={[pageSize ? pageSize : 5]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      onPageChange={onPageChange}
      components={{ Toolbar: toolbar ? GridToolbar : "" }}
      sx={{
        ".MuiButton-root span svg": {
          color: "#f02632",
        },
        ".MuiButton-root": {
          color: "#6f7580",
        },
        ".MuiButton-root:hover": {
          color: "#f02632",
        },
      }}
    />
  );
}

export default DataTable;
