import Card from "react-bootstrap/Card";
import "./index.css";
import { AiFillStar } from "react-icons/ai";

import Popup2 from "../delete/index";
import Popup3 from "../update/index";

function CardView(props) {
  //console.log(props.props._id);
  const { name, rating, place, image, _id } = props.props;
  const item = { name, rating, image, place, _id };

  //console.log(props.props.name);
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={image} className="card-image" />
      <Card.Body>
        <div className="card-row1">
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {rating}
            <AiFillStar />
          </Card.Text>
        </div>
        <div className="card-row1">
          <Card.Text>{place}</Card.Text>
          <div className="card-options">
            <Popup3 details={item} />
            <Popup2 id={_id} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardView;
