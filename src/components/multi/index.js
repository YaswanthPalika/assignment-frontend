import React, { useState } from "react";
import "./index.css";

const Multi = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return <img className="multi-image" src={photo} alt="" key={photo} />;
    });
  };

  return (
    <div className="multi-container">
      <h1 className="heading">Multi Image Upload Field</h1>
      <div>
        <input type="file" id="file" multiple onChange={handleImageChange} />
        <div className="label-holder"></div>
        <div className="result">{renderPhotos(selectedFiles)}</div>
      </div>
    </div>
  );
};

export default Multi;
