import { helper } from '@ember/component/helper';

export function equalsIgnoreCase([str1, str2]) {
  return String(str1).toLowerCase() === String(str2).toLowerCase();
};

export default helper(equalsIgnoreCase);
