import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { TrackedSet } from 'tracked-maps-and-sets';

/**
 * @param data - data to add to table
 */
export default class Table extends Component {
  @tracked
  selectedRows = new TrackedSet();

  @tracked
  namedColumns = []

  constructor(...args) {
    super(...args);
    // validate table has some expected columns
    if (!this.args?.data?.[0]?.status) {
        console.warn(`expected "status" column to be present`);
    }

    // dynamic column names to avoid hard coding
    this.namedColumns = Object.keys(this.args.data?.[0] || {});
  }

  /**
   * Toggle a single row
   * @param {Integer} index 
   */
  @action
  toggleRow(index) {
    if (this.selectedRows.has(index)) {
      this.selectedRows.delete(index);
    } else {
      this.selectedRows.add(index);
    }
  }

  /**
   * Toggle all rows selected/deselected
   */
  @action
  toggleAll() {
    // if all are selected empty selections
    if (this.selectedRows.size === this.args.data.length) {
      this.selectedRows.clear();
    }

    // if none or some are selected, select all
    else {
      this.args.data.forEach((item, index) => {
        this.selectedRows.add(index);
      });
    }
  }

  /**
   * action to take when download button is clicked
   */
  @action
  onClickDownload() {
    let items = ``;
    this.selectedRows.forEach((index) => {
        const row = this.args.data[index];
        if (row.status === 'available') {
            items += `${row.device} - ${row.path}\n`
        }
    });

    if (items.trim()){
        alert(items);
    } else {
        alert('no available items selected')
    }
  }
}
