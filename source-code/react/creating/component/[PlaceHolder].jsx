import React, { useState, useEffect } from "react";

export default function PlaceHolder() {
   const [text, setText] = useState(null);

   useEffect(() => {
      setText("PlaceHolder page work!");
      return () => {};
   }, []);

   return (
      <div>
         <p>{text}</p>
      </div>
   );
}
