import React from "react";
import { usePlaceHolder } from "./usePlaceHolder";

export default function PlaceHolder() {
   const { text } = usePlaceHolder();
   return <div>{text} page work</div>;
}
