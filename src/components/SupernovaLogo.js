import React from "react";

const SupernovaLogo = ({ width = "100px", height = "auto", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 119.06 473.39"
      width={width}
      height={height}
      className={className}
    >
      <g id="Calque_2" data-name="Calque 2">
        <polygon fill="#fff" points="119.06 408.44 0 462.12 0 0 119.06 0 119.06 408.44"/>
      </g>
      <g id="Calque_1" data-name="Calque 1">
        <text
          fill="#1d1d1b"
          fontFamily="'LEMONMILK Medium', sans-serif"
          fontSize="49.38px"
          fontWeight="700"
          transform="translate(40.8 56.37) rotate(90)"
        >
          <tspan x="0" y="0">SUPERN</tspan>
          <tspan x="211.48" y="0">O</tspan>
          <tspan x="254.01" y="0">V</tspan>
          <tspan x="285.82" y="0">A.</tspan>
        </text>
      </g>
    </svg>
  );
};

export default SupernovaLogo;
