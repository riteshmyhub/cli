import React from "react";
import { useProducts } from "./use[Products]";

export default function Products() {
   const { text } = useProducts();
   return <div>{text} page work!</div>;
}
