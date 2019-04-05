import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | if-name-equals', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', '5');
    
    await render(hbs`{{if-name-equals this.inputValue 'Reading Railroad' 'Yes' 'No'}}`);
    
    assert.equal(this.element.textContent.trim(), 'Yes', 'True test case');
    this.set('inputValue', '38');
    assert.equal(this.element.textContent.trim(), 'No', 'False test case');
  });
});
