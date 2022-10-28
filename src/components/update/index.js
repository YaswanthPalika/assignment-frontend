import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrEdit } from "react-icons/gr";

import "./index.css";

function Popup3(details) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState();
  const [rating, setRating] = useState();
  const [place, setPlace] = useState();
  const [image, setImage] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setDefaults = (data) => {
    setName(data.name);
    setRating(data.rating);
    setImage(data.image);
    setPlace(data.place);
    setId(data._id);
  };

  useEffect(() => {
    const data = details.details;
    setDefaults(data);
    // eslint-disable-next-line
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    //console.log(file);
    const base64 = await base64Converter(file);
    setImage(base64);
  };

  const base64Converter = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <GrEdit onClick={handleShow} className="edit" />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>update the record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-div">
              <label>name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-div">
              <label>rating</label>
              <input
                value={rating}
                type="number"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="form-div">
              <label>place</label>
              <input
                value={place}
                type="text"
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div className="form-div">
              <label>image</label>
              <input
                type="file"
                className="file"
                onChange={(e) => uploadImage(e)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline-success"
            onClick={async () => {
              let userDetails = { name, rating, place, image };
              userDetails = JSON.stringify(userDetails);
              const apiUrl = `http://localhost:3000/${id}`;
              const options = {
                method: "PUT",
                body: userDetails,
                headers: {
                  "Content-Type": "application/json",
                },
              };
              console.log(apiUrl, options);
              await fetch(apiUrl, options)
                .then((response) => {
                  let data = response.json();
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
              setName("");
              setRating(0);
              setPlace("");
              setImage("");
              handleClose();
              alert("updated");
              window.location.reload();
            }}
          >
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup3;
