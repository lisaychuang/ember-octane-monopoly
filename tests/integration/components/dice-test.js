import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dice', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Dice />`);

    assert.equal(this.element.textContent.trim(), '0,0 = 0');

    const button = this.element.querySelector('button');
    assert.ok(button, 'There is a button');
    assert.ok(this.element.textContent.indexOf('0') >= 0, 'Yes zeroes before dice roll');
    button.click();
    assert.ok(this.element.textContent.indexOf('0') < 0, 'No zeroes after dice roll');
  });
});
