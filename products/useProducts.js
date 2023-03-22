import React, { useState } from "react";

export default function useProducts() {
   const [test, setTest] = useState("Products component page!");
   return { test };
}
