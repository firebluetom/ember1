import Route from '@ember/routing/route';

export default class IndexRoute extends Route {

  async model() {
    const response = await fetch('/assets/data.json');
    const table = await response.json();

    return { table };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('isLoading', false);
  }

  beforeModel() {
    this.controllerFor('index').set('isLoading', true);
  }
}
