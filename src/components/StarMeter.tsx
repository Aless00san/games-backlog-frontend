import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

function StarMeter() {
  return (
    <div className="starmeter">
      <p style={{ color: "yellow", marginTop: "0.5rem" }}>
        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
      </p>
    </div>
  );
}

export default StarMeter;
