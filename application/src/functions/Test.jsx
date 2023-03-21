import React from "react";
import { useTest } from "./useTest";

export default function Test() {
   const { text } = useTest();
   return <div>{text} page work</div>;
}
