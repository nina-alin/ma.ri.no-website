import * as React from "react";
import { SVGProps } from "react";
const ArrowRight = ({
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
    stroke={color}
    {...properties}
  >
    <path
      fill={color}
      d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"
    />
  </svg>
);
export default ArrowRight;