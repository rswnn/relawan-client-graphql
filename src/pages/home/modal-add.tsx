import React, { useState } from "react";
import Modal from "react-modal";
import { CREATE_RELAWAN } from "../../queries/home";
import { Relawan } from "../../model/relawan";
import { useMutation } from "@apollo/react-hooks";

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
}

const ModalAdd = ({ modalIsOpen, closeModal }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [skill, setSkill] = useState("");

  const [createRelawan, { error, loading, data }] = useMutation<{
    createRelawan: Relawan;
  }>(CREATE_RELAWAN, {
    variables: {
      name: name,
      email: email,
      city: city,
      skill: skill,
    },
  });

  let buttonHandle = name !== "" && email !== "" && city !== "" && skill !== "";
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nama</label>
            <input
              className="form-control"
              placeholder="Name"
              name={name}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Email</label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Email"
              name={email}
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Kota</label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Kota"
              name={city}
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Skill</label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Skill"
              name={skill}
              value={skill}
              onChange={(e: any) => setSkill(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => createRelawan()}
            disabled={!buttonHandle}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ModalAdd;
