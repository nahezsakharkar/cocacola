import Modal from "@mui/material/Modal";

function EmptyModal(props) {
  return (
    <Modal open={props.open} className="emptiness">
      <div className="loader"></div>
    </Modal>
  );
}

export default EmptyModal;
