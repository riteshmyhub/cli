import { Component } from "@angular/core";

@Component({
   selector: "PlaceHolder-root",
   templateUrl: `<p>{title} Component work</p>`,
})
export class PlaceHolderComponent {
   title = "PlaceHolder";
}
