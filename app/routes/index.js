import Route from '@ember/routing/route';

export default class IndexRoute extends Route {

  async model() {
    const response = await fetch('/assets/data.json');
    const table = await response.json();

    return { table };
  }
}
