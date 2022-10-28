import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./index.css";

function Popup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [rating, setRating] = useState();
  const [place, setPlace] = useState();
  const [image, setImage] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Button variant="outline-primary" onClick={handleShow}>
        Upload
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>upload a new file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-div">
              <label>name</label>
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-div">
              <label>rating</label>
              <input
                type="number"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="form-div">
              <label>place</label>
              <input type="text" onChange={(e) => setPlace(e.target.value)} />
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
            variant="outline-primary"
            onClick={async () => {
              let userDetails = { name, rating, place, image };
              userDetails = JSON.stringify(userDetails);
              const apiUrl = "http://localhost:3000/";
              const options = {
                method: "POST",
                body: userDetails,
                headers: {
                  "Content-Type": "application/json",
                },
              };
              //console.log(options);
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
              alert("uploaded");
              window.location.reload();
            }}
          >
            upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
