import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import DataTable from "../../../components/Common/DataTable/DataTable";
import schedule from "../../../services/scheduleService";
import OurModal from "../../../components/Common/OurModal/OurModal";
import Loader from "../../../components/Common/Loader/Loader";
import "../../../custom/css/custom.css";

function ShowGroups() {
  const navigate = useNavigate();
  const [groupList, setGroupList] = useState([]);
  const [row, setRow] = useState([]);
  const [operation, setOperation] = useState("");
  const [modalTitle, setModalTitle] = useState();
  const [modalDesc, setModalDesc] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function getGroupsData(queryParams) {
    const data = await schedule.getGroupsByScheduleStatus(queryParams);
    setGroupList(data.payload);
    setIsLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      getGroupsData("Active,Disabled");
    }, 5000);
  }, [groupList]);

  const openModal = (thisRow, thisOperation) => {
    setRow(thisRow);
    setOperation(thisOperation);
    if (thisOperation === "delete") {
      setModalTitle("Delete " + thisRow.groupname + " Job Group?");
      setModalDesc(
        "Do you really wish to Remove " +
          thisRow.groupname +
          " from the System? This Group's data will be lost. "
      );
      handleOpen();
    }
  };

  const handleOperation = () => {
    if (operation === "delete") {
      handleDelete();
    } else if (operation === "run") {
      // handleRun();
    } else if (operation === "disable") {
      // handleDisable();
    }
  };

  async function handleDelete() {
    const data = await schedule.deleteGroup(row.id);
    if (data.message === "group deleted") {
      toast.success("Schedule was Deleted Successfully");
    } else {
      toast.error("There was some Error while deleting a Schedule");
    }
    setOpen(false);
  }

  // async function handleRun() {
  //   const data = await schedule.runGroup(row.id);
  //   if (data.message === "group deleted") {
  //     toast.success("Schedule was Deleted Successfully");
  //   } else {
  //     toast.error("There was some Error while deleting a Schedule");
  //   }
  //   setOpen(false);
  // }

  // async function handleDisable() {
  //   const data = await schedule.disableGroup(row.id);
  //   if (data.message === "group deleted") {
  //     toast.success("Schedule was Deleted Successfully");
  //   } else {
  //     toast.error("There was some Error while deleting a Schedule");
  //   }
  //   setOpen(false);
  // }

  const columns = [
    { field: "id", headerName: "Id", flex: 0.2, width: 80 },
    {
      field: "groupname",
      headerName: "Job Group",
      flex: 0.8,
      // width: 270,
      editable: true,
    },
    {
      field: "scheduled",
      headerName: "Schedule",
      flex: 0.5,
      // width: 210,
      editable: true,
    },
    {
      field: "scheduledstatus",
      headerName: "Status",
      flex: 0.5,
      // width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" className="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-icon-text btn-sm"
            >
              Disable
              <i className="fa fa-ban btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-warning btn-icon-text btn-sm"
            >
              Run
              <i className="fa fa-flash btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-icon-text btn-sm"
              onClick={() => openModal(params.row, "delete")}
            >
              Delete
              <i className="ti-trash btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const rows = groupList;
  return (
    <div className="data existingGroups">
      <Loader open={isLoading} handleClose={isLoading} />
      <div className="title">
        <h1 className="Heading">Jobs Group</h1>
        <button
          onClick={() => navigate("/AddNewGroup/AddGroup")}
          type="button"
          className="btn btn-outline-secondary btn-icon-text"
        >
          Add New Group
          <i className="mdi mdi-file-check btn-icon-append"></i>
        </button>
      </div>
      <div className="body">
        {isLoading && (
          <Stack sx={{ width: "100%", color: "#f02632" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        )}
        <DataTable pageSize={15} columns={columns} rows={rows} toolbar />
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

export default ShowGroups;
