import { MockItemRequest } from "@/lib/types/mock/request";
import Dropdown from "../atoms/Dropdown";

type TableEntryProps = {
  request: MockItemRequest;
  refresh: () => void;
};

export default function TableEntry({ request, refresh }: TableEntryProps) {
  const created = new Date(request.requestCreatedDate).toLocaleDateString(
    "en-US"
  );
  const updated = request.lastEditedDate
    ? new Date(request.lastEditedDate).toLocaleDateString("en-US")
    : created;

  async function handleOnSelect(status: string) {
    if (status != request.status) {
      await fetch("/api/request/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: request.id,
          status,
        }),
      });
      refresh();
    }
  }

  return (
    <div className="w-full border-t-[#EAECF0] border-t-[1px] md:grid grid-cols-[2fr_2fr_1fr_1fr_10rem] gap-2 h-auto md:h-[3.5rem] py-2 md:py-0 box-border items-center text-[#667085] px-6">
      <div>{request.requestorName}</div>
      <div>{request.itemRequested}</div>
      <div>{created}</div>
      <div>{updated}</div>
      <Dropdown status={request.status} onSelect={handleOnSelect} />
    </div>
  );
}
