import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import DataTable from "../../../components/Common/DataTable/DataTable";
import schedule from "../../../services/scheduleService";
import OurModal from "../../../components/Common/OurModal/OurModal";
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
    getGroupsData("Active,Disabled");
  }, []);

  // console.log(groupList)

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
    } else if (thisOperation === "run") {
      setModalTitle("Start " + thisRow.groupname + " Job Group?");
      setModalDesc(
        "Do you really wish to Start " +
          thisRow.groupname +
          " Job Group? This Group's Scheduler will start running. "
      );
      handleOpen();
    }
  };

  const handleOperation = () => {
    if (operation === "delete") {
      handleDelete();
    } else if (operation === "run") {
      handleRun();
      getGroupsData("Active,Disabled");
    } else if (operation === "disable") {
      // handleDisable();
    }
  };

  async function handleDelete() {
    const data = await schedule.deleteGroup(row.id);
    if (data.message === "group deleted") {
      toast.success("Schedule was Deleted Successfully");
      getGroupsData("Active,Disabled");
    } else {
      toast.error("There was some Error while deleting a Schedule");
    }
    setOpen(false);
  }

  function handleRun() {
    toast.success("Schedule was Started Successfully");
    setOpen(false);
    schedule.schedulerStart(row.id);
    getGroupsData("Active,Disabled");
    // setTimeout(() => {
    // }, 300);
    // console.log(data)
    // if (data.message === "completed") {
    //   toast.success("Schedule was Completed Successfully");
    //   // getGroupsData("Active,Disabled");
    // } else {
    //   toast.error("There was some Error while Completing a Schedule");
    // }
  }

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
      field: "groupnameStatus",
      headerName: "Job Group",
      flex: 0.8,
      // width: 270,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {params.row.groupname && <span>{params.row.groupname}</span>}
            {params.row.runningstatus === "Running" && (
              <span style={{ color: "gray" }}>Running...</span>
            )}
          </div>
        );
      },
    },
    {
      field: "scheduled",
      headerName: "Schedule",
      flex: 0.5,
      // width: 210,
    },
    {
      field: "scheduledstatus",
      headerName: "Status",
      flex: 0.5,
      // width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              type="button"
              className="btn btn-dark btn-icon-text btn-sm"
              onClick={() =>
                navigate("/ShowGroups/EditGroups/EditGroup", {
                  state: { groupId: params.row.id },
                })
              }
            >
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
            <Tooltip
              title={
                params.row.runningstatus === "Running"
                  ? "Schedule is already running."
                  : ""
              }
              placement="top"
              arrow
            >
              <span>
                <button
                  type="button"
                  disabled={
                    params.row.runningstatus === "Running" ? true : false
                  }
                  style={
                    params.row.runningstatus === "Running"
                      ? { pointerEvents: "none" }
                      : {}
                  }
                  className="btn btn-warning btn-icon-text btn-sm"
                  onClick={() => openModal(params.row, "run")}
                >
                  Run
                  <i className="fa fa-flash btn-icon-append"></i>
                </button>
              </span>
            </Tooltip>
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
