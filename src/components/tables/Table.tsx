import { MockItemRequest } from "@/lib/types/mock/request";
import TableEntry from "./TableEntry";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";

type TableProps = {
  data?: MockItemRequest[];
  refresh: () => void;
};

export default function Table({ data, refresh }: TableProps) {
  return (
    <div className="flex flex-col border-b-[#EAECF0] border-b-[1px]">
      <div className="hidden w-full border-t-[#EAECF0] bg-[#FCFCFD] border-t-[1px] md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr] py-2 md:py-0 md:grid-cols-[2fr_2fr_1fr_1fr_10rem] gap-2 h-[3.5rem] items-center text-[#667085] px-6">
        <div>Name</div>
        <div>Item Requested</div>
        <div>Created</div>
        <div>Updated</div>
        <div className="hidden md:block">Status</div>
      </div>
      {data ? (
        data.length > 0 ? (
          data.map((request, i) => {
            return <TableEntry request={request} key={i} refresh={refresh} />;
          })
        ) : (
          <div className="w-full border-t-[#EAECF0] border-t-[1px] flex gap-2 h-[3.5rem] text-xs md:text-base items-center text-[#667085] px-6">
            There are no entries with the specified status.
          </div>
        )
      ) : (
        Array(PAGINATION_PAGE_SIZE)
          .fill(null)
          .map((_, i) => {
            return (
              <div
                key={i}
                className="w-full border-t-[#EAECF0] border-t-[1px] md:grid grid-cols-[2fr_2fr_1fr_1fr_10rem] gap-2 h-auto md:h-[3.5rem] py-2 md:py-0 md:pb-0 box-border items-center text-[#667085] px-6"
              >
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-full p-2 flex items-center"
                    >
                      <div className="rounded-full w-[50%] md:w-full h-4 bg-[#F2F2F2]" />
                    </div>
                  ))}
              </div>
            );
          })
      )}
    </div>
  );
}
