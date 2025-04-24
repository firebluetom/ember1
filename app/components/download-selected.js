import Component from '@glimmer/component';
import { action } from '@ember/object';
import handleAccessibleKeyDown from '../util/keydown';

export default class DownloadSelected extends Component {
  /**
   * on clicking the download button run the pass though function
   * allow for any customization?
   */
  @action
  download() {
    this.args.onClick?.();
  }

   
  @action
  handleKeyDown(event) {
    handleAccessibleKeyDown(event, this.args.onClick);
  }
}
