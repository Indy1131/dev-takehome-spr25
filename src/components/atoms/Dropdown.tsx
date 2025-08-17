import { ReactElement, useState } from "react";
import Chip from "./Chip";

type DropdownProps = {
  status: string;
  onSelect: (status: string) => void;
};

type Statuses = {
  [key: string]: ReactElement;
};

export default function Dropdown({ status, onSelect }: DropdownProps) {
  const [expanded, setExpanded] = useState(false);

  const statuses: Statuses = {
    ["pending"]: (
      <Chip dotColor="#FD8032" textColor="#A43E01" bgColor="#FFDAC3">
        Pending
      </Chip>
    ),
    ["approved"]: (
      <Chip dotColor="#FFBE4C" textColor="#7B5F2E" bgColor="#FFEAC8">
        Approved
      </Chip>
    ),
    ["completed"]: (
      <Chip dotColor="#13B86C" textColor="#057746" bgColor="#E8FAF1">
        Completed
      </Chip>
    ),
    ["rejected"]: (
      <Chip dotColor="#D40600" textColor="#8D0503" bgColor="#FFD2D2">
        Rejected
      </Chip>
    ),
  };

  function handleLabelClick() {
    setExpanded(!expanded);
  }

  function handleBackgroundClick() {
    setExpanded(false);
  }

  return (
    <>
      {expanded && (
        <div
          onClick={handleBackgroundClick}
          className="fixed w-screen h-screen top-0 left-0 z-10"
        />
      )}
      <div
        onClick={handleLabelClick}
        className={`relative border-[1px] rounded-md text-sm flex justify-between items-center p-2 w-40 cursor-pointer hover:bg-[#EFF6FF] ${
          expanded && "border-primary"
        } transition-all`}
      >
        <div>{statuses[status]}</div>
        <svg
          width="9"
          height="13"
          viewBox="0 0 9 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${expanded ? "rotate-[90deg]" : "rotate-[-90deg]"}`}
        >
          <path
            d="M8.16 1.91012L3.58 6.50012L8.16 11.0901L6.75 12.5001L0.750004 6.50012L6.75 0.500122L8.16 1.91012Z"
            fill="#667085"
          />
        </svg>
        {expanded && (
          <div
            className="absolute px-2 py-[.5rem] w-full top-[calc(100%+4px)] left-0 bg-white flex flex-col gap-2 z-10 rounded-b-md"
            style={{ boxShadow: "0px 4px 8px 0 #57575729" }}
          >
            {Object.keys(statuses).map((status) => {
              return (
                <div key={status}>
                  <button
                    onClick={() => {
                      setExpanded(false);
                      onSelect(status);
                    }}
                    className="block"
                  >
                    {statuses[status]}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
