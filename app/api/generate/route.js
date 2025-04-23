import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body =  await request.json();

    const client = await clientPromise;
    const db = client.db("shorty");
    const collection = db.collection("url");

    const doc = await collection.findOne({
        shortUrl: body.shortUrl
    })

    if(doc) {
        return new Response(JSON.stringify({ success: false, error: true, message: "Short url exists" }), {status:403});
    }

    const result = await collection.insertOne({
      url: body.url,
      shortUrl: body.shortUrl,
    });

    return Response.json({ success: true, error: false, message: "url generated" }) ;
  } catch (error) {
    console.error("Error inserting URL:", error);
    return new Response(JSON.stringify({ success: false, error: true, message: "Internal Server Error" }), {
      status: 500,
    });
  }
}