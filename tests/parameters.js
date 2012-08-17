module('Parameters');

test('getParameterNames', function() {
  var url = new URL('http://www.example.com/');
  deepEqual([], url.getParameterNames());
  
  url = new URL('http://www.example.com/?');
  deepEqual([], url.getParameterNames());

  url = new URL('http://www.example.com/?&');
  deepEqual([], url.getParameterNames());

  url = new URL('http://www.example.com/?a');
  deepEqual(['a'], url.getParameterNames());

  url = new URL('http://www.example.com/?&a');
  deepEqual(['a'], url.getParameterNames());

  url = new URL('http://www.example.com/?a&');
  deepEqual(['a'], url.getParameterNames());

  url = new URL('http://www.example.com/?a&&b');
  deepEqual(['a', 'b'], url.getParameterNames());

  url = new URL('http://www.example.com/?a=A&a=B&b=B&c');
  deepEqual(['a', 'b', 'c'], url.getParameterNames());

  url = new URL('http://www.example.com/?a&A');
  deepEqual(['a', 'A'], url.getParameterNames());
});

test('getParameterValues', function() {
  var url = new URL('http://www.example.com/');
  deepEqual([], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a=A');
  deepEqual(['A'], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a');
  deepEqual([null], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a=');
  deepEqual([''], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a=A1&a=&a&a=A2');
  deepEqual(['A1', '', null, 'A2'], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a=A&b=B&c=C&b=B');
  deepEqual(['B', 'B'], url.getParameterValues('b'));

  throws(function() {
    url.getParameterValues(null);  
  }, TypeError, 'null is not a valid parameter name');

  throws(function() {
    url.getParameterValues('');  
  }, TypeError, "'' is not a valid parameter name");
});

test('hasParameter', function() {
  var url = new URL('http://www.example.com/');
  ok(!url.hasParameter('a'));

  url = new URL('http://www.example.com/?');
  ok(!url.hasParameter('a'));

  url = new URL('http://www.example.com/?a');
  ok(url.hasParameter('a'));

  url = new URL('http://www.example.com/?a');
  ok(!url.hasParameter('A'));

  url = new URL('http://www.example.com/?aa');
  ok(!url.hasParameter('a'));

  url = new URL('http://www.example.com/?a=b&c');
  ok(!url.hasParameter('b'));

  url = new URL('http://www.example.com/?a=b&c');
  ok(url.hasParameter('c'));

  throws(function() {
    url.hasParameter(null);  
  }, TypeError, 'null is not a valid parameter name');

  throws(function() {
    url.hasParameter('');  
  }, TypeError, "'' is not a valid parameter name");
});

test('getParameter', function() {
  var url = new URL('http://www.example.com/');
  equal(null, url.getParameter('a'));

  url = new URL('http://www.example.com/?');
  equal(null, url.getParameter('a'));

  url = new URL('http://www.example.com/?a');
  equal(null, url.getParameter('a'));

  url = new URL('http://www.example.com/?a=');
  equal('', url.getParameter('a'));

  url = new URL('http://www.example.com/?a=A1&a=A2');
  equal('A1', url.getParameter('a'));

  throws(function() {
    url.getParameter(null);  
  }, TypeError, 'null is not a valid parameter name');

  throws(function() {
    url.getParameter('');  
  }, TypeError, "'' is not a valid parameter name");
});

test('setParameter', function() {
  var url = new URL('http://www.example.com/');

  url.setParameter('a', null);
  equal('?a', url.search);

  url.setParameter('a', '');
  equal('?a=', url.search);

  url.setParameter('a', 'A');
  equal('?a=A', url.search);

  url = new URL('http://www.example.com/?b');  
  url.setParameter('a', 'A');
  equal('?b&a=A', url.search);

  url = new URL('http://www.example.com/?a=A1&b');  
  url.setParameter('a', 'A2');
  equal('?b&a=A2', url.search);

  throws(function() {
    url.setParameter(null);  
  }, TypeError, 'null is not a valid parameter name');

  throws(function() {
    url.setParameter('');  
  }, TypeError, "'' is not a valid parameter name");
});

test('addParameter', function() {
  var url = new URL('http://www.example.com/');

  url.addParameter('a', null);
  equal('?a', url.search);

  url.addParameter('a', null);
  equal('?a&a', url.search);

  url.addParameter('a', '');
  equal('?a&a&a=', url.search);

  url.addParameter('a', 'A1');
  equal('?a&a&a=&a=A1', url.search);

  url.addParameter('a', 'A2');
  equal('?a&a&a=&a=A1&a=A2', url.search);

  url.addParameter('b', 'B');
  equal('?a&a&a=&a=A1&a=A2&b=B', url.search);

  throws(function() {
    url.addParameter(null);  
  }, TypeError, 'null is not a valid parameter name');

  throws(function() {
    url.addParameter('');  
  }, TypeError, "'' is not a valid parameter name");
});

test('removeParameter', function() {
  var url = new URL('http://www.example.com/');
  url.removeParameter('a');
  equal('', url.search);

  url = new URL('http://www.example.com/?a');
  url.removeParameter('a');
  equal('', url.search);

  url = new URL('http://www.example.com/?a&b');
  url.removeParameter('a');
  equal('?b', url.search);

  url = new URL('http://www.example.com/?a&b');
  url.removeParameter('b');
  equal('?a', url.search);

  url = new URL('http://www.example.com/?a&b&a=A');
  url.removeParameter('a');
  equal('?b', url.search);

  url = new URL('http://www.example.com/?a&b&a=A&a=');
  url.removeParameter('a');
  equal('?b', url.search);

  throws(function() {
    url.removeParameter(null);  
  }, TypeError, 'null is not a valid parameter name');

  throws(function() {
    url.removeParameter('');  
  }, TypeError, "'' is not a valid parameter name");
});

test('clearParameters', function() {
  var url = new URL('http://www.example.com/');
  url.clearParameters();
  equal('', url.search);

  url = new URL('http://www.example.com/?');
  url.clearParameters();
  equal('', url.search);

  url = new URL('http://www.example.com/?a');
  url.clearParameters();
  equal('', url.search);

  url = new URL('http://www.example.com/?a&a=A&a=');
  url.clearParameters();
  equal('', url.search);

  url = new URL('http://www.example.com/?a&b');
  url.clearParameters();
  equal('', url.search);



});
