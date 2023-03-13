import { useState } from "react";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import schedule from "../../../../services/scheduleService";
import DataTable from "../../../Common/DataTable/DataTable";
import OurModal from "../../../Common/OurModal/OurModal";

function Filters(props) {
  const {
    editable,
    step,
    filters,
    getFilters,
    isLoading,
    setIsEditing,
    handleEdit,
    admintype,
  } = props;

  const [row, setRow] = useState([]);
  const [operation, setOperation] = useState("");
  const [modalTitle, setModalTitle] = useState();
  const [modalDesc, setModalDesc] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openModal = (thisRow, thisOperation) => {
    setRow(thisRow);
    setOperation(thisOperation);
    if (thisOperation === "edit") {
      setIsEditing(true);
      handleEdit(thisRow);
    }
    if (thisOperation === "delete") {
      setModalTitle("Delete Filter?");
      setModalDesc(
        "Do you really wish to Remove this Filter from Step with " +
          step.interfacename +
          " Interface from the System? This Filters's data will be lost. "
      );
      handleOpen();
    }
  };

  const handleOperation = () => {
    if (operation === "delete") {
      handleDelete();
    }
  };

  async function handleDelete() {
    const data = await schedule.deleteFilter(row.id);
    if (data.message === "filter deleted") {
      toast.success("Step was Deleted Successfully");
      getFilters(step.id);
    } else {
      toast.error("There was some Error while deleting this Step");
    }
    setOpen(false);
  }

  const columns = [
    { field: "field", headerName: "Field", flex: 1, width: 300 },
    {
      field: "operator",
      headerName: "Operator",
      flex: 0.8,
      width: 150,
    },
    {
      field: "filtervalue",
      headerName: "Value",
      flex: 1,
      width: 300,
    },
    // {
    //   field: "companyid",
    //   headerName: "Company Id",
    //   flex: 0.4,
    //   // width: 150,
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {editable && (
              <button
                type="button"
                className="btn btn-dark btn-icon-text btn-sm"
                onClick={() => openModal(params.row, "edit")}
              >
                {admintype === "Admin" ? "Edit" : "View"}
                <i className="mdi mdi-file-check btn-icon-append"></i>
              </button>
            )}
            {/* disabled for support */}
            {admintype === "Admin" && (
              <button
                type="button"
                className="btn btn-danger btn-icon-text btn-sm"
                onClick={() => openModal(params.row, "delete")}
              >
                Remove
                <i className="ti-trash btn-icon-append"></i>
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const rows =
    Object.keys([filters].flat()[0]).length === 0
      ? [].flat()
      : [filters].flat();

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].operator === "EQUALS") {
      rows[i].operator = "=";
    } else if (rows[i].operator === "LESS THAN") {
      rows[i].operator = "<";
    } else if (rows[i].operator === "GREATER THAN") {
      rows[i].operator = ">";
    } else if (rows[i].operator === "LESS THAN EQUALS TO") {
      rows[i].operator = "<=";
    } else if (rows[i].operator === "GREATER THAN EQUALS TO") {
      rows[i].operator = "<=";
    }
  }

  return (
    <div className="filters mt-3">
      <div className="title">
        <h4 className="card-title">Filters</h4>
      </div>
      <div className="body">
        {isLoading && (
          <Stack sx={{ width: "100%", color: "#f02632" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        )}
        <DataTable columns={columns} rows={rows} />
        <OurModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleYes={handleOperation}
          title={modalTitle}
          description={modalDesc}
        />
      </div>
    </div>
  );
}

export default Filters;
