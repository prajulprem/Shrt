import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { mongo } from "mongoose";

export default async function Page({ params }) {
  const { shortUrl } =  params;


    const client = await clientPromise;
    const db = client.db("shorty");
    const collection = db.collection("url");

    const doc = await collection.findOne({
      shortUrl: shortUrl
    })
    console.log(doc)

    if(doc) {
        redirect(doc.url);
    }
    else{
        redirect(`${process.env.NEXT_PUBLIC_HOST}`);
    }

}