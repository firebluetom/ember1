import Component from '@glimmer/component';
import { action } from '@ember/object';
import handleAccessibleKeyDown from '../util/keydown';

export default class TableRow extends Component {
  @action
  handleKeyDown(event) {
    handleAccessibleKeyDown(event, this.args.onClick);
  }
}
