import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDelete } from "react-icons/md";
import "./index.css";

function Popup2(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <MdDelete onClick={handleShow} className="item-delete" />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Really want to delete the file?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline-danger"
            onClick={async () => {
              //console.log("delete button");
              const { id } = props;
              const apiUrl = `http://localhost:3000/${id}`;
              const options = {
                method: "delete",
              };
              await fetch(apiUrl, options)
                .then((res) => {
                  console.log(res);
                  handleClose();
                  alert("deleted the record");
                  window.location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup2;
