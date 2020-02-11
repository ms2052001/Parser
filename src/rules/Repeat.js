import Rule from './Rule.js';
import Node from '../Node.js';

export default class Repeat extends Rule {
   constructor(childRule, properties) {
      properties = {
         spaced: true,
         ...properties
      };
      super('Repeat', 1, [childRule], properties);
   }

   getRegex(groubIndex) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
            return this;
         }
      };
      this.index = groubIndex.num;

      let timesTOrepeat = !isNaN(this.length) ? `{${this.length}}` : `+`;

      let content = this.childrenRules[0].getRegex(groubIndex.increase());
      this.repeatedRegex = new RegExp(content, 'g');

      let regex;
      if (this.spaced) {
         regex = `(?:${content}\\s*)${timesTOrepeat}`;
      } else {
         regex = `${content}${timesTOrepeat}`;
      }

      this.regex = regex;
      return `(${regex})`;
   }

   parse(groups, useValue) {

      let value = useValue || groups[this.index + 1];
      let args = [];

      //#region getting args
      value.replace(this.repeatedRegex, (match) => {
         args.push(this.childrenRules[0].parse(groups, match));
         return '';
      });
      //#endregion

      if (this.blockState) {
         value = value.replace(this.rootParser.matchesTest, (match, id, index) => {
            return this.rootParser.matches[id][index].str;
         });
      }

      return new Node(this.name, args, {
         match: value,
      });

   }

}