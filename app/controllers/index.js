import Controller from '@ember/controller';

export default class IndexController extends Controller {
  isLoading = true;

  // in a controller or component
  get hasTableData() {
    return Array.isArray(this.model.table) && this.model.table.length > 0;
  }
}
