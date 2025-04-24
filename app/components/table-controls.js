import Component from '@glimmer/component';

/**
 * @param onClick
 * @param numberOfOptions
 * @param numberSelected
 */
export default class TableControls extends Component {

    get showEmpty() {
        return this.args.selectedRows.size === 0;
    }

    get showPartial() {
        return this.args.selectedRows.size > 0 && this.args.selectedRows.size < this.args.numberOfOptions;
    }

    get showFull() {
        return this.args.selectedRows.size !== 0 && this.args.selectedRows.size === this.args.numberOfOptions;
    }

    get selectedText() {
        if (this.args.selectedRows.size) {
            return `Selected ${this.args.selectedRows.size}`;
        }
        return "None Selected";
    }
}