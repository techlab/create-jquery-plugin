const test      = require('ava');

const getParams = require('../lib/get-params')

test('Param arg is taking as name', async t =>  {
  process.argv[2] = 'jq-test';
  const params = await getParams()
  t.is(params.name, 'jq-test')
});

test('Param is returning shortName', async t =>  {
  process.argv[2] = 'jq-test';
  const params = await getParams()
  t.not(params.shortName, undefined)
});

test('Param is returning fileName', async t =>  {
  process.argv[2] = 'jq-test';
  const params = await getParams()
  t.not(params.fileName, undefined)
});


test('Param is returning functionName', async t =>  {
  process.argv[2] = 'jq-test';
  const params = await getParams()
  t.not(params.functionName, undefined)
});

test('Param is returning className', async t =>  {
  process.argv[2] = 'jq-test';
  const params = await getParams()
  t.not(params.className, undefined)
});

test('Param is returning templateFolder', async t =>  {
  process.argv[2] = 'jq-test';
  const params = await getParams()
  t.not(params.templateFolder, undefined)
});
