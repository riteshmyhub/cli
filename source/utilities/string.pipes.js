export default function stringPipe(str, type) {
   if (type === "t-t-l") {
      if (str.includes("-")) {
         let x = "";
         str.split("-").forEach((letter, i) => {
            if (i == 0) {
               x += letter[0].toLowerCase() + letter.substring(1);
            } else {
               x += letter[0].toUpperCase() + letter.substring(1);
            }
         });
         return x;
      } else {
         return str[0] + str.substring(1);
      }
   }
   if (type === "t-t-c") {
      if (str.includes("-")) {
         let x = "";
         str.split("-").forEach((letter, i) => {
            x += letter[0].toUpperCase() + letter.substring(1);
         });
         return x;
      } else {
         return str[0].toUpperCase() + str.substring(1);
      }
   }
   if (type === "t-t-u") {
      if (str.includes("-")) {
         return str.toUpperCase().replace(/-/g, "_");
      } else {
         return str.toUpperCase();
      }
   }
}

//let x = stringPipe('user-name', "t-t-l");
//let x = stringPipe('user-name', "t-t-c");
//let x = stringPipe('user-name', "t-t-u");
