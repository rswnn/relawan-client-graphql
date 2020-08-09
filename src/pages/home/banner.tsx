import React from "react";
import ModalAdd from "./modal-add";

const Banner = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="text-center">
        <img
          src={require("../../assets/img/3652872.jpg")}
          alt="hello"
          className="img-fluid"
          width="50%"
        />
        <h3 className="mb-3">Data Relawan Covid</h3>
      </div>
      <div className=" text-right mb-3">
        <a className="btn btn-primary text-light" onClick={openModal}>
          Tambah Relawan
        </a>
      </div>
      <ModalAdd modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default Banner;
