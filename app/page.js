"use client";
import { useState } from "react";
import { useEffect } from "react";

function Page() {
  const [data, setData] = useState("waiting...");

  async function getData() {
    const res = await fetch("/api/pincode/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ pincode: "75033" }),
    });

    const data = await res.json();

    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}

export default Page;
