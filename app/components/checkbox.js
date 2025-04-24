import Component from '@glimmer/component';
import { action } from '@ember/object';
import handleAccessibleKeyDown from '../util/keydown';

export default class CheckboxToggleComponent extends Component {
  
  /**
   * computes what state the checkbox is in. 
   * there are 3 options; undefined, true, and indeterminate.
   * true shows check, mixed shows a dash, undefined shows empty box
   */
  get checkedState() {
    if (this.args.checked) return "true";
    if (this.args.partial) return "mixed"; // indeterminate
    return false;
  }

  /**
   * pass through on click
   */
  @action
  onClick() {
    this.args.onClick?.();
  }

  @action
  handleKeyDown(event) {
    handleAccessibleKeyDown(event, this.args.onClick);
  }
}