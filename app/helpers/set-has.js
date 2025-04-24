import { helper } from '@ember/component/helper';

export function setHas([map, item]) {
  return map.has(item)
};

export default helper(setHas);
