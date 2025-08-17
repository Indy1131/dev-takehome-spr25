type ChipProps = {
  children: string;
  dotColor: string;
  textColor: string;
  bgColor: string;
};

export default function Chip({
  children,
  dotColor,
  textColor,
  bgColor,
}: ChipProps) {
  return (
    <div
      className={`rounded-full px-2 py-[2px] flex items-center gap-2 select-none`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div
        className="h-[.5em] w-[.5em] rounded-full inline"
        style={{ backgroundColor: dotColor }}
      />
      {children}
    </div>
  );
}
