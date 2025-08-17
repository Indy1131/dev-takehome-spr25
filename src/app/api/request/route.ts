import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import clientPromise from "@/lib/mongodb";
import { HTTP_STATUS_CODE, ResponseType } from "@/lib/types/apiResponse";
import { ObjectId } from "mongodb";

export async function PUT(request: Request) {
  try {
    const req = await request.json();
    const requestorName = req.requestorName;
    const itemRequested = req.itemRequested;

    if (!requestorName || !itemRequested) {
      return new Response(ResponseType.INVALID_INPUT, {
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    const client = await clientPromise;
    const db = client.db();

    const entry = {
      requestorName,
      itemRequested,
      requestCreatedDate: new Date(),
      lastEditedDate: new Date(),
      status: "pending",
    };

    const result = await db.collection("requests").insertOne(entry);

    if (!result.acknowledged) throw new Error();

    return new Response(ResponseType.CREATED, {
      status: HTTP_STATUS_CODE.CREATED,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(ResponseType.UNKNOWN_ERROR, {
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  const page = parseInt(params.get("page") || "1");
  if (page < 1) {
    return new Response(ResponseType.INVALID_INPUT, {
      status: HTTP_STATUS_CODE.BAD_REQUEST,
    });
  }

  const status = params.get("status");

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("requests");

    const skip = ((page as number) - 1) * PAGINATION_PAGE_SIZE;

    const query = status ? { status } : {};

    const data = (
      await collection
        .find(query)
        .skip(skip)
        .limit(PAGINATION_PAGE_SIZE)
        .sort({ requestCreatedDate: -1 })
        .toArray()
    ).map(({ _id, ...rest }) => {
      return { id: _id, ...rest };
    });

    const totalRecords = await collection.countDocuments(query);

    return new Response(JSON.stringify({ data, totalRecords }), {
      status: HTTP_STATUS_CODE.OK,
    });
  } catch {
    return new Response(ResponseType.UNKNOWN_ERROR, {
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function PATCH(request: Request) {
  const req = await request.json();

  const id = req.id;
  const status = req.status;

  if (!id || !status) {
    return new Response(ResponseType.INVALID_INPUT, {
      status: HTTP_STATUS_CODE.BAD_REQUEST,
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection("requests")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, lastEditedDate: new Date() } }
      );

    if (res.matchedCount === 0) throw new Error();

    return new Response(ResponseType.SUCCESS, { status: HTTP_STATUS_CODE.OK });
  } catch {
    return new Response(ResponseType.UNKNOWN_ERROR, {
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
}
