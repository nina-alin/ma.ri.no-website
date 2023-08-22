import { SVGProps } from "react";

const Hamburger = ({
  properties,
}: {
  properties?: SVGProps<SVGSVGElement>;
}) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <path
      d="M4 18L20 18"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M4 12L20 12"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M4 6L20 6"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export default Hamburger;