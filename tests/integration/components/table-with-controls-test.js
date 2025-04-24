/**
 * In reality each of the components would have a test of their own, but that takes time
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember1/tests/helpers';
import { render, click, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | table-with-controls', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders empty table', async function (assert) {
    this.data = [];
    await render(hbs`
      <TableWithControls @data={{this.data}} />
    `);

    assert.dom('tbody tr').doesNotExist('no rows in table');
    assert
      .dom('[data-test-custom-checkbox]')
      .isNotChecked('checkbox starts unchecked');
    assert.dom('[data-test-selected-count]').hasText('None Selected');
  });

  // skipping dynamic column generation for simplicity
  test.skip('it should render columns dynamically', async function (assert) {
    this.data = [
      {
        col1: 1,
      },
    ];
    await render(hbs`
      <TableWithControls @data={{this.data}} />
    `);

    assert
      .dom('thead tr th')
      .exists(
        { count: Object.keys(this.data[0]).length + 1 },
        'dynamic count of columns in table',
      );

    this.data = [
      {
        col1: 1,
        col2: 2,
        col3: 3,
        col4: 4,
        col5: 5,
      },
    ];

    await render(hbs`
        <TableWithControls @data={{this.data}} />
      `);

    assert
      .dom('thead tr th')
      .exists(
        { count: Object.keys(this.data[0]).length + 1 },
        'dynamic count of columns in table',
      );
  });

  test('selecting all rows should mark the main checkbox as checked', async function (assert) {
    this.data = [
      {
        col1: 1,
        col2: 2,
        col3: 3,
        col4: 4,
        status: 5,
      },
      {
        col1: 1,
        col2: 2,
        col3: 3,
        col4: 4,
        status: 5,
      },
    ];
    await render(hbs`
      <TableWithControls @data={{this.data}} />
    `);

    const rowCheckboxes = findAll('tbody tr [data-test-custom-checkbox]');

    await Promise.all(
      rowCheckboxes.map((element) => {
        return click(element);
      }),
    );

    assert
      .dom('[data-test-custom-checkbox]')
      .isChecked('main checkbox should be checked');
  });

  test('clicking the main checkbox should select and deselect all rows', async function (assert) {
    this.data = [
      {
        col1: 1,
        col2: 2,
        col3: 3,
        col4: 4,
        status: 5,
      },
      {
        col1: 1,
        col2: 2,
        col3: 3,
        col4: 4,
        status: 5,
      },
    ];
    await render(hbs`
      <TableWithControls @data={{this.data}} />
    `);

    await click('[data-test-custom-checkbox]');

    assert.dom('[data-test-custom-checkbox]').isChecked();

    const rowCheckboxes = findAll('tbody tr [data-test-custom-checkbox]');

    rowCheckboxes.forEach((element) => {
      assert.dom(element).isChecked('checkbox is checked');
    });
  });

  test('selecting one row sets the main checkbox into an intermediate state', async function (assert) {
    this.data = [
      {
        col1: 1,
        col2: 2,
        col3: 3,
        col4: 4,
        status: 5,
      },
      {
        col1: 1,
        col2: 2,
        col3: 3,
        col4: 4,
        status: 5,
      },
    ];
    await render(hbs`
      <TableWithControls @data={{this.data}} />
    `);

    // click one row
    await click('tbody tr [data-test-custom-checkbox]');

    // checkbox state
    assert.dom('[data-test-custom-checkbox]').isNotChecked();
    assert
      .dom('[data-test-custom-checkbox]')
      .hasAttribute('aria-checked', 'mixed');

    assert.dom('[data-test-selected-count]').hasText('Selected 1');
  });

  test('clicking download all should only list available rows', async function (assert) {
    // stub the window alert
    let alertMessage;
    const originalAlert = window.alert;
    window.alert = (msg) => {
      alertMessage = msg;
    };

    this.data = [
      {
        name: 'a.dll',
        device: 'b',
        path: 'c',
        status: 'scheduled',
      },

      {
        name: 'd.exe',
        device: 'e',
        path: 'f',
        status: 'available',
      },
    ];
    await render(hbs`
      <TableWithControls @data={{this.data}} />
    `);

    await click('[data-test-custom-checkbox]');

    await click('[data-test-download-selected]');

    assert.ok(
      alertMessage.includes('e') && alertMessage.includes('f') && !alertMessage.includes('b'),
      'Alert only includes available row data'
    );

    // Restore the original alert function
    window.alert = originalAlert;
  });
});
