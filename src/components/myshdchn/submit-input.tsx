"use client";
import { FoodType } from "@/lib/Type-Props";
import Image from "next/image";
import { useEffect, useState } from "react";

export function InputWithButton() {
  const [postDatas, setPostDatas] = useState<FoodType[]>([]);
  const [getData, setGetData] = useState<FoodType[]>([]);
  console.log(getData);
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch("http://localhost:9999/food");
        const fetchData = await response.json();
        setPostDatas(fetchData.response);
        console.log("Fetched Data", fetchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    postData();
  }, []);
  const postData = async () => {
    try {
      const response = await fetch("http://localhost:9999/food");
      const fetchData = await response.json();
      setPostDatas(fetchData.response);
      console.log("Fetched Data", fetchData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const getData = await fetch("http://localhost:9999/food", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ FoodName: "banshtai tsai" }),
        });
        if (!getData.ok) {
          throw new Error(`getdata status:${getData.status}`);
        }

        const getJson = await getData.json();
        setGetData(getJson.getData);
        postData();
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, []);
  const addHandler = () => {};
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div>
        <div>
          <input
            type="email"
            placeholder="search"
            value={postDatas}
            onChange={() => setPostDatas(postDatas)}
          />
          <button onClick={addHandler}>add</button>
        </div>
        {postDatas?.map((data, index) => (
          <div key={index}>
            <p>{data.FoodName}</p>
            fjekoah
            <Image alt="" src={data.image} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
