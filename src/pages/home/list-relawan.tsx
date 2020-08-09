import React from "react";
import { Relawan, RelawanData } from "../../model/relawan";
import ModalEdit from "./modal-edit";
import ModalDelete from "./modal-delete";

const ListRelawan = (result: RelawanData) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenDelete, setIsOpenDelete] = React.useState(false);
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState(0);

  const openModal = (id: number) => {
    setIsOpen(true);
    setId(id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalDelete = (id: number, val: string) => {
    setIsOpenDelete(true);
    setId(id);
    setName(val);
  };
  const closeModalDelete = () => {
    setIsOpenDelete(false);
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">Skill</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {result?.allRelawan &&
            result.allRelawan.map((res: Relawan, index: number) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{res.name}</td>
                <td>{res.email}</td>
                <td>{res.city}</td>
                <td>{res.skill}</td>
                <td>
                  <div className="row">
                    <a
                      className="text-primary"
                      onClick={() => openModal(res.id)}
                    >
                      Edit
                    </a>
                    <span>/</span>
                    <a
                      className="text-danger"
                      onClick={() => openModalDelete(res.id, res.name)}
                    >
                      Hapus
                    </a>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ModalEdit modalIsOpen={modalIsOpen} closeModal={closeModal} id={id} />
      <ModalDelete
        modalIsOpen={modalIsOpenDelete}
        closeModal={closeModalDelete}
        id={id}
        name={name}
      />
    </div>
  );
};

export default ListRelawan;
