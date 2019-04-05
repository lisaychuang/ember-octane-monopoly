import { helper } from '@ember/component/helper';
import { getValue } from './get-value'

// Custom ternary operator function 
// Look up board space data by @board-position `pos`
// Compare board space name to provided value `nameStr`
// decide to return valIfTrue or valIfFalse


export function ifNameEquals([pos, nameStr, valIfTrue, valIfFalse]/*, hash*/) {
  const dataAtPos = getValue([pos]);
  if (dataAtPos.name === nameStr) return valIfTrue;
  return valIfFalse;
}

export default helper(ifNameEquals);
