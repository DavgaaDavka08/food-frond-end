"use client";
import { useState } from "react";
import FristPage from "./FristPage";
import SecondPage from "./SecondPage";

export default function Signup() {
  const [ChangePage, setChangePage] = useState<number>(0);
  const FormStep = [FristPage, SecondPage][ChangePage];
  const next = () => {
    setChangePage(ChangePage + 1);
  };
  return (
    <div>
      <FormStep next={next} />
    </div>
  );
}
