
/**
   sNode stands for structural node, used to represent the structure of the input text.,,,
   you can use the result (which is tree node of sNode with particular properities to do incredible things),
   it is used as a parse in mathpackage: {<https://github.com/ms2052001/mathpackage>}
*/

export default class Node {

   /**
    * @param {string} type is a on of these
    *  'id', 'func', 'num', 'bool_op', 'binray_op', 'bool', op = {'+', '-', '*', '/', '^', '=', ...}
    * 
    * @param {*} args array of sNode
    * @param {*} attributes object contains attributes names and values.
    */
   constructor(type, args = [], attributes = {}) {
      Object.assign(this, attributes);
      this.args = args instanceof Array ? args : [args];
      this.type = type;
      // if (type === 'op') {
      //    let boolOps = ['and', 'or', 'xor', 'not', '&&', '||', '!'];
      //    if (this.__contains(this.name, ...boolOps)) {
      //       this.type = 'bool_op';
      //    }
      //    else if (this.name == ' ==') {
      //       this.type = 'assign_op';
      //    }
      //    else {
      //       this.type = type;
      //    }
      // } else {
      //    this.type = type;
      // }
      // if (this.type === 'id') {
      //    if (this.name === 'true' || this.name === 'false') {
      //       this.type = 'bool';
      //    }
      // }
   }

   get isLiteral() {
      return this.type === 'literal';
   }

   check(props, argsCount = this.args.length) {
      for (let prop in props) {
         if (this[prop] !== props[prop]) return false;
      }
      return true;
      // return (this.type === type || (this.type === 'op' && this.name === type)) && this.args.length === argsCount && this.type === type_;
   }

   contains(check) {
      if(this.check(check)){
         return true;
      }
      if(this.args)
         for (let i = 0; i < this.args.length; i++){
            if (this.args[i].contains(check)) return true;
         }
      return false;
   }

}
