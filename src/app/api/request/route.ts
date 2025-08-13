import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request: Request) {
  try {
    const req = await request.json();
    const requestorName = req.requestorName;
    const itemRequested = req.itemRequested;

    if (!requestorName || !itemRequested) throw new Error();

    const client = await clientPromise;
    const db = client.db();

    const entry = {
      requestorName,
      itemRequested,
      created: new Date(),
      updated: new Date(),
      status: "pending",
    };

    const result = await db.collection("requests").insertOne(entry);

    if (!result.acknowledged) throw new Error();

    return new Response("request added", {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response("Operation unsuccessful", { status: 404 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  const page = params.get("page") || 1;
  const status = params.get("status");

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("requests");

  const skip = ((page as number) - 1) * PAGINATION_PAGE_SIZE;

  const data = await collection
    .find(status ? { status } : {})
    .skip(skip)
    .limit(PAGINATION_PAGE_SIZE)
    .sort({ created: -1 })
    .toArray();

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

export async function PATCH(request: Request) {
  try {
    const req = await request.json();

    const id = req.id;
    const status = req.status;

    if (!id || !status) throw new Error();

    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection("requests")
      .updateOne(
        { _id: new ObjectId("689cb3dd77f9a1908c911df1") },
        { $set: { status, updated: new Date() } }
      );

    if (res.matchedCount === 0) throw new Error();

    return new Response("request updated", { status: 200 });
  } catch {
    return new Response("Operation unsuccessful", { status: 404 });
  }
}
