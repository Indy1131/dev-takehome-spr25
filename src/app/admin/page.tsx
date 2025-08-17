"use client";

import TabButton from "@/components/atoms/TabButton";
import Pagination from "@/components/molecules/Pagination";
import Table from "@/components/tables/Table";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { MockItemRequest } from "@/lib/types/mock/request";
import { useEffect, useState } from "react";

const statusTypes = ["Pending", "Approved", "Completed", "Rejected"];

type ItemRequestResponse = {
  data: MockItemRequest[];
  totalRecords: number;
};

export default function ItemRequestsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | null>(null);
  const [data, setData] = useState<ItemRequestResponse | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  function handleStatusButtonClick(type: string | null) {
    setPage(1);
    setStatus(type);
  }

  function handlePageChangeClick(newPage: number) {
    setPage(newPage);
  }

  async function refreshData() {
    const url = `/api/request/?page=${page}${
      status ? `&status=${status}` : ""
    }`;

    const req = await fetch(url, {
      method: "GET",
    });
    const json = await req.json();

    setData(json);
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const url = `/api/request/?page=${page}${
        status ? `&status=${status}` : ""
      }`;

      const req = await fetch(url, {
        method: "GET",
      });
      const json = await req.json();

      setData(json);
      setLoading(false);
    }
    getData();
  }, [page, status]);

  return (
    <div className="">
      <div className="w-full p-6">
        <h1 className="font-medium text-2xl">Item Requests</h1>
      </div>
      <div className="flex gap-2 justify-center sm:justify-start sm:px-6">
        <TabButton
          active={status === null}
          onClick={() => handleStatusButtonClick(null)}
        >
          All
        </TabButton>
        {statusTypes.map((type) => {
          return (
            <TabButton
              key={type}
              onClick={() => handleStatusButtonClick(type.toLowerCase())}
              active={type.toLowerCase() == status}
            >
              {type}
            </TabButton>
          );
        })}
      </div>
      <Table
        data={!loading && data ? data.data : undefined}
        refresh={refreshData}
      />
      <div className="w-full flex justify-end h-12 items-center px-8">
        <Pagination
          pageNumber={page}
          pageSize={PAGINATION_PAGE_SIZE}
          totalRecords={data ? data.totalRecords : 0}
          onPageChange={handlePageChangeClick}
        />
      </div>
    </div>
  );
}
