"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function InputWithButton() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await fetch("http://localhost:6000/food");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchData = await response.json();
        console.log("Fetched Data:", fetchData); // Fetch хариуг шалгах

        if (fetchData && Array.isArray(fetchData.data)) {
          setDatas(fetchData.data);
        } else {
          console.error("Fetched data is not an array:", fetchData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getdata();
  }, []);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
      <div>
        бөый
        {datas.map((data, index) => (
          <div key={index}>
            <p>{data.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
