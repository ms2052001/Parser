export default class Rule {

   /**
    * @param {Array} childrenRules 
    */
   constructor(ruleDefualtName, childrenRules, properties = {}) {
      properties.name = properties.name || ruleDefualtName;
      if (!properties.parser) throw new Error('Magical Parser Rule "' + properties.name + '" Must Contian Parser');
      Object.assign(this, Object.assign(properties, this)); /// setting properities with no ovrriding
      if (childrenRules.length !== this.rulesNum && this.rulesNum > -1) throw Error('rules num in ' + (this.name + ' ' || '') + 'must be ' + this.rulesNum);
      for (let rule of childrenRules) {
         rule.parentRule = this;
      }
      this.childRules = childrenRules;
   }


   getRegex(groubIndex, groubResult = false) {
      return '';
   }

}