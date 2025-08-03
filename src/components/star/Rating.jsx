
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

const Rating = ({ fullstarrating, halfstar, emptystars }) => {
  return (
    <div className="flex ">
      {/* Full stars */}
      {Array.from({ length: fullstarrating }).map((_, index) => (
        <FaStar key={`full-${index}`} className="text-yellow-500" />
      ))}
      {/* Half star */}

      <FaRegStarHalfStroke
        key="half"
        className={`text-yellow-500 ${!halfstar ? "hidden" : ""} `}
      />
      {/* Empty stars */}
      {Array.from({ length: emptystars }).map((_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
    </div>
  );
};

export default Rating;
