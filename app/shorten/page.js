"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState(false);

  const generateURL = () => {
    if (!url || !shortUrl) {
      alert("Both fields are required!");
      return;
    }

    let validatedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      validatedUrl = "https://" + url;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    



    const raw = JSON.stringify({
      url: validatedUrl,
      shortUrl: shortUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUrl("");
        setShortUrl("");
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`);
        console.log(result);
        toast.success(result.message);
      })
      .catch((error) => console.error(error));


      

  };

  const copyToClipboard = async (text) => {
    if (!navigator.clipboard || !window.isSecureContext) {
      toast.error("Clipboard not supported. Try HTTPS or a newer browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text.toString());
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  return (
    <div className="h-screen w-full  flex justify-center items-center p-2">
      <div className="mx-auto w-lg flex flex-col gap-4 bg-blue-500 my-16 p-8 rounded-lg">
        <h1 className="text-xl font-bold">Let's shorten your url</h1>
        <input
          className="bg-white rounded-lg p-4 focus:outline-blue-300"
          type="text"
          value={url}
          placeholder="Enter your URL"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <input
          required
          className="bg-white rounded-lg p-4 focus:outline-blue-300"
          type="text"
          value={shortUrl}
          placeholder="Enter your preferred URL name"
          onChange={(e) => {
            setShortUrl(e.target.value);
          }}
        />
        <button
          className="p-3 py-2 bg-blue-700 text-white cursor-pointer rounded-lg shadow-lg w-fit"
          onClick={generateURL}
        >
          Generate
        </button>
        {generated && (
          <>
            <code className="text-white p-4 border border-white font-light ">
              <span className="font-black">Your link:</span>{" "}
              <Link href={generated} target="_blank">
                {generated}
              </Link>
            </code>
            <button
              className="p-3 py-2 bg-blue-700 text-white cursor-pointer rounded-lg shadow-lg w-fit"
              onClick={() => {copyToClipboard(generated)}
            >
              Copy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Shorten;
