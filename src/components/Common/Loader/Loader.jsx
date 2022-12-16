import Modal from "@mui/material/Modal";

function Loader(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <div className="loader">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="spinner-border text-danger"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        </div>
      </div>
    </Modal>
  );
}

export default Loader;
