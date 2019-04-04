const fs = require('fs');

describe('ts_web_test_suite', () => {
  it('should collect node_sources and dev_scripts', () => {
    const config = fs.readFileSync('testing_wrapped_test.conf.js', 'utf-8');
    const match = config.match(/\/\/ BEGIN USER FILES([\S\s]+)\/\/ END USER FILES/);
    expect(match).toBeTruthy();
    const files = match.pop().split(',').map(l => {
      // remove leading and trailing whitepaces, and begin quote and end quote.
      return l.trim().slice(1, -1);
    }).filter(l => !!l);
    expect(files).toEqual([
      'e2e_karma_typescript/decrement.js',
      'e2e_karma_typescript/decrement.spec.js',
    ]);
  });
});
