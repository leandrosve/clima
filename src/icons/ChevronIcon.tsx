const ChevronIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke-linecap="square"
        stroke-miterlimit="10"
        stroke-width="48"
        d="m112 184 144 144 144-144"
      ></path>
    </svg>
  );
};

export default ChevronIcon;
