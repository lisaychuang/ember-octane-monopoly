import { get } from '@ember/object';
import { helper } from '@ember/component/helper';
import allNames from '../utils/names';


export function getName(params/*, hash*/) {
  const key = params[0];
  const path = params[1];
  if (typeof path === 'undefined') {
    return allNames[key];
  } else {
    return get(allNames[key], path);
  }
}

export default helper(getName);
