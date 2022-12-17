import Modal from "@mui/material/Modal";

function Loader(props) {
  return (
    <Modal open={props.open}>
      <div className="loader">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="spinner-border text-danger"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          ></div>
        </div>
      </div>
    </Modal>
  );
}

export default Loader;
