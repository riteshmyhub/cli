import React, { useState } from "react";

export default function useTest() {
   const [test, setTest] = useState("Test component page!");
   return { test };
}
