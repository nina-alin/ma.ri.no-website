import React, { SVGProps } from "react";

const ArrowLeft = ({
  properties,
  color,
}: {
  properties?: SVGProps<SVGSVGElement>;
  color: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    {...properties}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M11.707 4.293a1 1 0 0 1 0 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ArrowLeft;
