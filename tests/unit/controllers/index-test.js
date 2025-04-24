import { module, test } from 'qunit';
import { setupTest } from 'ember1/tests/helpers';

module('Unit | Controller | index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:index');
    assert.ok(controller);
  });
});
