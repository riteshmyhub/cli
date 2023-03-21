export class PlaceHolderService {
   private heroes: any[] = [];

   constructor() {}

   getHeroes() {
      this.heroes.push([1, 2, 3, 4]);
      return this.heroes;
   }
}
