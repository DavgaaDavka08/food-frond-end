"use client";
import { useState } from "react";

import SecondPageSLogin from "./LoginSecond";
import FristpageLogin from "./LoginFrist";

export default function Signup() {
  const [ChangePage, setChangePage] = useState<number>(0);
  const FormStep = [FristpageLogin, SecondPageSLogin][ChangePage];
  const next = () => {
    setChangePage(ChangePage + 1);
  };
  return (
    <div>
      <FormStep next={next} />
    </div>
  );
}
