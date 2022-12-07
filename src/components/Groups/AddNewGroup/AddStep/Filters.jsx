import DataTable from "../../../Common/DataTable/DataTable";

function Filters() {
  const columns = [
    { field: "field", headerName: "Field", width: 300 },
    {
      field: "operator",
      headerName: "Operator",
      width: 150,
    },
    {
      field: "value",
      headerName: "Value",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" class="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i class="mdi mdi-file-check btn-icon-append"></i>
            </button>
            <button type="button" class="btn btn-danger btn-icon-text btn-sm">
              Delete
              <i class="ti-trash btn-icon-append"></i>
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
