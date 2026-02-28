import { ComponentProps } from "react";
const SvgComponent = ({ ...props }: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={38}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M21.49.006C31.757.266 40 8.67 40 19c0 10.493-8.507 19-19 19h-2C8.507 38 0 29.493 0 19 0 8.67 8.243.266 18.51.006L19 0h2l.49.006ZM19 1C9.059 1 1 9.059 1 19s8.059 18 18 18h2c9.941 0 18-8.059 18-18S30.941 1 21 1h-2Zm-5.447 20.932a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm13 0a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9ZM13.5 8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm13.053 0a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
    />
  </svg>
);
export default SvgComponent;
