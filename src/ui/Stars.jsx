/* eslint-disable react/prop-types */
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function Stars({ star }) {
  const maxStars = 5;
  const fullStars = Math.floor(star);
  const hasHalfStar = star % 1 !== 0;

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, index) => {
        if (index < fullStars) {
          return <FaStar key={index} className="text-[#012854]" />;
        } else if (index === fullStars && hasHalfStar) {
          return <FaStarHalfAlt key={index} className="text-[#012854]" />;
        } else {
          return <FaStar key={index} className="text-gray-300" />;
        }
      })}
    </div>
  );
}

export default Stars;
