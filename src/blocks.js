
// for exmaple brackets and quotations
//{ openingChar: '{', closingChar: '}', num: 0, opened: false }
export default class block{

   constructor(options = {}) {

      this.openingChar = options.openingChar;
      this.closingChar = options.closingChar;
      this.zIndex = options.zIndex;
      this.handleContent = options.handleContent;

      this.opened = false;
      this.num = 0;
      
   }

}