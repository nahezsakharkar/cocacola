import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function DataTable(props) {
  const { columns, rows ,toolbar,rowsPerPageOptions,pageSize } = props;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize !== null || undefined ? pageSize : 5}
      rowsPerPageOptions={[rowsPerPageOptions !== null || undefined ? rowsPerPageOptions : 5]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
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
