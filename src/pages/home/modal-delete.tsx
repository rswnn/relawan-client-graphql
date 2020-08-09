import React from "react";
import Modal from "react-modal";
import { DELETE_RELAWAN } from "../../queries/home";
import { useMutation, useQuery } from "@apollo/react-hooks";
const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
  },
};

interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  id: number;
  name: string;
}

const ModalDelete = ({ modalIsOpen, closeModal, id, name }: Props) => {
  const [deleteRelawan, result] = useMutation<{
    deleteRelawan: number;
  }>(DELETE_RELAWAN, {
    variables: {
      id: id,
    },
  });

  if (result.data?.deleteRelawan) {
    window.location.reload();
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Relawan {name}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteRelawan()}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalDelete;
