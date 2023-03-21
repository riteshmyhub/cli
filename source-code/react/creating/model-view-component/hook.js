import React, { useState } from "react";

export default function usePlaceHolder() {
   const [test, setTest] = useState("PlaceHolder component page!");
   return { test };
}
