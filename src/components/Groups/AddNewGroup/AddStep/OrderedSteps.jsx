import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import DataTable from "../../../Common/DataTable/DataTable";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../Common/OurModal/OurModal";

function OrderedSteps(props) {
  const {
    editable,
    groupInfo,
    getGroupInfo,
    steps,
    sequence,
    isLoading,
    setIsEditing,
    handleEdit,
    admintype,
  } = props;
  const navigate = useNavigate();

  const [row, setRow] = useState([]);
  const [operation, setOperation] = useState("");
  const [modalTitle, setModalTitle] = useState();
  const [modalDesc, setModalDesc] = useState();

  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(0);
  const [eForReset, SetEForReset] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const arrayMove = (arr, fromIndex, toIndex) => {
    let newArray = arr;
    var element = newArray[fromIndex];
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
  };

  const handleSequenceChange = (e, row) => {
    SetEForReset(e);
    setFromIndex(row.stepSequence - 1);
    setToIndex(
      e.target.value > rows.length
        ? rows.length - 1
        : Number(e.target.value) === 0
        ? 0
        : e.target.value - 1
    );
  };

  const convertToArrayOfObjects = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({ id: arr[i], sequence: i + 1 });
    }
    return newArr;
  };

  async function handleSequenceSubmit() {
    const newSequence = arrayMove(sequence, fromIndex, toIndex);
    const data = await schedule.updateSequence(
      convertToArrayOfObjects(newSequence)
    );
    if (data.message === "sequence updated") {
      toast.success("Steps Sequence was Updated Successfully");
      getGroupInfo(groupInfo.id);
    } else {
      toast.error("There was some Error while Updating the Step Sequence");
    }
    eForReset.target.value = "";
  }

  const openModal = (thisRow, thisOperation) => {
    setRow(thisRow);
    setOperation(thisOperation);
    if (thisOperation === "edit") {
      setIsEditing(true);
      handleEdit(thisRow);
    }
    if (thisOperation === "delete") {
      setModalTitle(
        "Delete Step with " + thisRow.interfacename + " Interface?"
      );
      setModalDesc(
        "Do you really wish to Remove Step with " +
          thisRow.interfacename +
          " Interface from the System? This Step's data will be lost. "
      );
      handleOpen();
    }
  };

  const handleOperation = () => {
    if (operation === "delete") {
      handleDelete();
    } else if (operation === "disable") {
      // handleDisable();
    }
  };

  async function handleDelete() {
    const data = await schedule.deleteStep(row.id);
    if (data.message === "step deleted") {
      toast.success("Step was Deleted Successfully");
      getGroupInfo(groupInfo.id);
    } else {
      toast.error("There was some Error while deleting this Step");
    }
    setOpen(false);
  }

  const rows = !steps
    ? []
    : steps.map((items) => {
        const seq = sequence.findIndex((number) => number === items.id);
        return { ...items, stepSequence: seq + 1 };
      });

  const columns = [
    { field: "stepSequence", headerName: "Step", flex: 0.8, width: 150 },
    {
      field: "interfacename",
      headerName: "Interface",
      flex: 1.4,
      width: 350,
    },
    {
      field: "companyid",
      headerName: "Company Id",
      flex: 0.8,
      // width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.7,
      width: 400,
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
                Delete
                <i className="ti-trash btn-icon-append"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning btn-icon-text btn-sm"
              onClick={() =>
                navigate(
                  editable
                    ? "/ShowGroups/EditGroups/EditFilters"
                    : "/AddNewGroup/AddFilter",
                  {
                    state: {
                      step: params.row,
                      groupId: groupInfo.id,
                      group: groupInfo,
                    },
                  }
                )
              }
            >
              {admintype === "Admin" ? "Manage Filters" : "View Filters"}
              <i className="fa fa-filter btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
    {
      field: "order",
      headerName: "Sequence",
      flex: 1.3,
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {rows.length > 1 && (
              <>
                <form className="myForms">
                  <TextField
                    id="sequence"
                    placeholder="Enter Sequence Position"
                    key={params.row.id}
                    // defaultValue={params.row.stepSequence}
                    onChange={(e) => handleSequenceChange(e, params.row)}
                    inputProps={{
                      type: "number",
                      min: 1,
                      max: rows.length,
                    }}
                    variant="outlined"
                  />
                </form>
                <button
                  type="button"
                  className="btn btn-dark btn-icon-text btn-sm"
                  onClick={handleSequenceSubmit}
                >
                  Apply
                  <i className="mdi mdi-file-check btn-icon-append"></i>
                </button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="steps mt-3">
      <div className="title">
        <h4 className="card-title">Steps</h4>
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

export default OrderedSteps;
