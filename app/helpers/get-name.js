import { helper } from '@ember/component/helper';
import allNames from '../utils/names';
export function getName(params/*, hash*/) {
  const key = params[0];
  return allNames[key];
}

export default helper(getName);
