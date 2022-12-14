import { useState } from "react";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import schedule from "../../../../services/scheduleService";
import DataTable from "../../../Common/DataTable/DataTable";
import OurModal from "../../../Common/OurModal/OurModal";

function Filters(props) {
  const { step, filters, getFilters, isLoading } = props;

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
      flex: 0.5,
      width: 150,
    },
    {
      field: "filtervalue",
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
            {/* <button type="button" className="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button> */}
            <button
              type="button"
              className="btn btn-danger btn-icon-text btn-sm"
              onClick={() => openModal(params.row, "delete")}
            >
              Remove
              <i className="ti-trash btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const rows =
    Object.keys([filters].flat()[0]).length === 0
      ? [].flat()
      : [filters].flat();

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
