import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { UPDATE_RELAWAN, GET_RELAWAN } from "../../queries/home";
import { Relawan, Relawans } from "../../model/relawan";
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
}

interface RelawanId {
  id: number;
}

const ModalEdit = ({ modalIsOpen, closeModal, id }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [skill, setSkill] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [updateRelawan, result] = useMutation<{
    updateRelawan: [];
  }>(UPDATE_RELAWAN, {
    variables: {
      id: id,
      name: name,
      email: email,
      city: city,
      skill: skill,
    },
  });

  useEffect(() => {
    if (result.called) {
      result.data?.updateRelawan.map((res) => {
        if (res === 0) {
          setNotFound(true);
        }
      });
    }
  }, [result]);

  const { data, loading, error } = useQuery<Relawans, RelawanId>(GET_RELAWAN, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    if (data !== null && data?.relawan) {
      setName(data.relawan.name);
      setEmail(data.relawan.email);
      setCity(data.relawan.city);
      setSkill(data.relawan.skill);
    }
  }, [data]);

  let buttonHandle = name !== "" && email !== "" && city !== "" && skill !== "";

  if (notFound) {
    return <h1>Error</h1>;
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
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
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
            <label htmlFor="exampleInputPassword1">City</label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              placeholder="City"
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
            onClick={() => updateRelawan()}
            disabled={!buttonHandle}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ModalEdit;
