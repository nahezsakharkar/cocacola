import "./OurModal.scss";
import Modal from '@mui/material/Modal';

const OurModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modalDiv">
                <h2 className="modalTitle" style={{ color: props.titleType === "error" ? "red" : "" }}>
                    {props.title}
                </h2>
                <h4 className="modalDescription">
                    {props.description}
                </h4>
                <div className="buttons">
                    <button className="btn btn-outline-success btn-lg" onClick={props.handleYes}>Yes</button>
                    <button className="btn btn-outline-danger btn-lg" onClick={props.handleClose}>No</button>
                </div>
            </div>
        </Modal>
    )
}

export default OurModal