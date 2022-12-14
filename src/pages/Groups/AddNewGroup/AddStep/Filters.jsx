import DataTable from "../../../Common/DataTable/DataTable";

function Filters() {
  const columns = [
    { field: "field", headerName: "Field", flex: 1, width: 300 },
    {
      field: "operator",
      headerName: "Operator",
      flex: 0.5,
      width: 150,
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.2,
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" className="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-icon-text btn-sm"
            >
              Delete
              <i className="ti-trash btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [
    { id: 1, field: "CustomerId", operator: "=", value: 900425 },
    { id: 2, field: "ProductId", operator: "LIKE", value: 900425 },
  ];

  return (
    <div className="filters">
      <div className="title">
        <h4 className="card-title">Filters</h4>
      </div>
      <div className="body">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default Filters;
