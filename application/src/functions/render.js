import fs from "fs";

// export function _componentCreate({ name }) {
//    fs.readFile("./code/component/component.js", "utf-8", (error, dataRes) => {
//       if (error) {
//          console.log(error);
//       }
//       if (dataRes) {
//          let folder = process.cwd() + "/" + name.toLowerCase();
//          fs.mkdir(folder, (error, data) => {
//             if (error) {
//                console.log(error);
//             }
//          });
//          fs.writeFileSync(
//             `${folder}/${name}.jsx`, //
//             dataRes.replace(/_component_name_/g, name)
//          );
//          //
//       }
//    });
// }
// export function _hookCreate({ name }) {
//    fs.readFile(`./code/hook/hook.jsx`, "utf-8", (error, dataRes) => {
//       if (error) {
//          console.log(error);
//       }
//       if (dataRes) {
//          let folder = process.cwd() + "/" + name.toLowerCase();
//          fs.mkdir(folder, (error, data) => {
//             if (error) {
//                console.log(error);
//             }
//          });
//          fs.writeFileSync(
//             `${folder}/use${name}.js`, //
//             dataRes.replace(/_component_name_/g, name)
//          );
//          //
//       }
//    });
// }
// export function mode_view_component({ name }) {
//    _componentCreate({ name });
//    _hookCreate({ name });
// }

export default function render({ response, name }) {
   fs.createWriteStream(`${name}`);
   fs.appendFile(`${name}`, response, (error, data) => {
      console.log(data);
   });
   // fs.readFile(response, "utf-8", (error, dataRes) => {
   //    if (error) {
   //       console.log("error");
   //    }
   //    if (dataRes) {
   //       let folder = process.cwd() + "/" + name;
   //       fs.mkdir(folder, (error, data) => {
   //          if (error) {
   //             console.log(error);
   //          }
   //       });
   //       fs.writeFileSync(`${folder}/${name}`, dataRes);
   //       //
   //    }
   // });
}
