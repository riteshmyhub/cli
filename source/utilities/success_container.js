import figlet from "figlet";

export default function success_container(text) {
   figlet(text, (error, data) => {
      if (error) {
         console.log("Something went wrong...");
         console.dir(err);
         return;
      }
      console.log(data);
   });
}
