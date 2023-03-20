import React, { useState, useEffect } from "react";

export default function Component() {
   const [text, setText] = useState(null);

   useEffect(() => {
      setText("component page work!");
      return () => {};
   }, []);

   return (
      <div>
         <p>{text}</p>
      </div>
   );
}
