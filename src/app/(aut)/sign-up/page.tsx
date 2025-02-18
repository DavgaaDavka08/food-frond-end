"use client";

import { useState } from "react";
import FristPage from "./FristPage";
import SecondPage from "./SecondPage";

export default function Signup() {
  const [changePage, setChangePage] = useState(0);
  const FormSteps = [FristPage, SecondPage][changePage];
  const [formValues, setFormValues] = useState({
    email: "",
    Password: "",
  });
  const [formValuesEror, setFormValuesError] = useState({
    email: "",
    Password: "",
  });

  return (
    <div>
      <FormSteps />
    </div>
  );
}
