import { helper } from '@ember/component/helper';

export function equalsIgnoreCase([str1, str2]) {
  return str1.toLowerCase() === str2.toLowerCase();
};

export default helper(equalsIgnoreCase);
