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

  url = new URL('http://www.example.com/?=a&=&=');
  deepEqual([''], url.getParameterNames());
});

test('getParameterNames with extended characters', function() {
  var url = new URL('http://www.example.com/?a%26b');
  deepEqual(['a&b'], url.getParameterNames());

  url = new URL('http://www.example.com/?a%3DA&b');
  deepEqual(['a=A', 'b'], url.getParameterNames());

  url = new URL('http://www.example.com/?a%3DA%26b&c');
  deepEqual(['a=A&b', 'c'], url.getParameterNames());

  url = new URL('http://www.example.com/?%20');
  deepEqual([' '], url.getParameterNames());
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

  url = new URL('http://www.example.com/?=&=A');
  deepEqual(['', 'A'], url.getParameterValues(''));
});

test('getParameterValues with extended characters', function() {
  var url = new URL('http://www.example.com/?a=%3D');
  deepEqual(['='], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a=%26');
  deepEqual(['&'], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a=%3D&a=%26&a=%3D%20%26');
  deepEqual(['=', '&', '= &'], url.getParameterValues('a'));

  url = new URL('http://www.example.com/?a==A');
  deepEqual(['=A'], url.getParameterValues('a'));
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

  url = new URL('http://www.example.com/?=1');
  ok(url.hasParameter(''));
});

test('hasParameter with extended characters', function() {
  var url = new URL('http://www.example.com/?%3D');
  ok(url.hasParameter('='));

  url = new URL('http://www.example.com/?%26');
  ok(url.hasParameter('&'));

  url = new URL('http://www.example.com/?a&%3D%20%26');
  ok(url.hasParameter('= &'));
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

  url = new URL('http://www.example.com/?=A');
  equal('A', url.getParameter(''));
});

test('getParameter with extended characters', function() {
  var url = new URL('http://www.example.com/?%3D');
  equal(null, url.getParameter('='));

  url = new URL('http://www.example.com/?%3D=');
  equal('', url.getParameter('='));

  url = new URL('http://www.example.com/?%3D=A');
  equal('A', url.getParameter('='));

  url = new URL('http://www.example.com/?%26');
  equal(null, url.getParameter('&'));

  url = new URL('http://www.example.com/?%26=');
  equal('', url.getParameter('&'));

  url = new URL('http://www.example.com/?%26=A');
  equal('A', url.getParameter('&'));

  url = new URL('http://www.example.com/?%3D%20%26');
  equal(null, url.getParameter('= &'));

  url = new URL('http://www.example.com/?%3D%20%26=');
  equal('', url.getParameter('= &'));

  url = new URL('http://www.example.com/?%3D%20%26=A');
  equal('A', url.getParameter('= &'));
});

test('setParameter', function() {
  var url = new URL('http://www.example.com/');

  url.setParameter('a', null);
  equal(url.search, '?a');

  url.setParameter('a', '');
  equal(url.search, '?a=');

  url.setParameter('a', 'A');
  equal(url.search, '?a=A');

  url = new URL('http://www.example.com/?b');
  url.setParameter('a', 'A');
  equal(url.search, '?b&a=A');

  url = new URL('http://www.example.com/?a=A1&b');
  url.setParameter('a', 'A2');
  equal(url.search, '?b&a=A2');

  url = new URL('http://www.example.com/?=A1');
  url.setParameter('', 'A2');
  equal(url.search, '?=A2');

  throws(function() {
    url.setParameter('', null);
  }, TypeError, 'Cannot add empty name and null value');
});

test('setParameter with extended characters', function() {
  var url = new URL('http://www.example.com/');

  url.setParameter('=', null);
  equal(url.search, '?%3D');

  url.setParameter('=', '');
  equal(url.search, '?%3D=');

  url.setParameter('=', 'A');
  equal(url.search, '?%3D=A');

  url.setParameter('=', '=');
  equal(url.search, '?%3D=%3D');

  url = new URL('http://www.example.com/');
  url.setParameter('&', null);
  equal(url.search, '?%26');

  url.setParameter('&', '');
  equal(url.search, '?%26=');

  url.setParameter('&', 'A');
  equal(url.search, '?%26=A');

  url.setParameter('&', '&');
  equal(url.search, '?%26=%26');

  url = new URL('http://www.example.com/');
  url.setParameter('%26', null);
  equal(url.search, '?%2526');

  url.setParameter('%26', '');
  equal(url.search, '?%2526=');

  url.setParameter('%26', 'A');
  equal(url.search, '?%2526=A');

  url.setParameter('%26', '%26');
  equal(url.search, '?%2526=%2526');
});

test('addParameter', function() {
  var url = new URL('http://www.example.com/');

  url.addParameter('a', null);
  equal(url.search, '?a');

  url.addParameter('a', null);
  equal(url.search, '?a&a');

  url.addParameter('a', '');
  equal(url.search, '?a&a&a=');

  url.addParameter('a', 'A1');
  equal(url.search, '?a&a&a=&a=A1');

  url.addParameter('a', 'A2');
  equal(url.search, '?a&a&a=&a=A1&a=A2');

  url.addParameter('b', 'B');
  equal(url.search, '?a&a&a=&a=A1&a=A2&b=B');

  var url = new URL('http://www.example.com/');
  url.addParameter('', '');
  equal(url.search, '?=');

  url.addParameter('', '');
  equal(url.search, '?=&=');

  throws(function() {
    url.addParameter('', null);
  }, TypeError, 'Cannot add empty name and null value');
});

test('addParameter with extended characters', function() {
  var url = new URL('http://www.example.com/');

  url.addParameter('=', null);
  equal(url.search, '?%3D');

  url.addParameter('=', null);
  equal(url.search, '?%3D&%3D');

  url.addParameter('=', '');
  equal(url.search, '?%3D&%3D&%3D=');

  url.addParameter('=', 'A');
  equal(url.search, '?%3D&%3D&%3D=&%3D=A');

  url.addParameter('=', '=');
  equal(url.search, '?%3D&%3D&%3D=&%3D=A&%3D=%3D');

  url = new URL('http://www.example.com/');
  url.addParameter('&', null);
  equal(url.search, '?%26');
  url.addParameter('%', null);
  equal(url.search, '?%26&%25');
  url.addParameter('%2D', '%');
  equal(url.search, '?%26&%25&%252D=%25');
});

test('removeParameter', function() {
  var url = new URL('http://www.example.com/');
  url.removeParameter('a');
  equal(url.search, '');

  url = new URL('http://www.example.com/?a');
  url.removeParameter('a');
  equal(url.search, '');

  url = new URL('http://www.example.com/?a&b');
  url.removeParameter('a');
  equal(url.search, '?b');

  url = new URL('http://www.example.com/?a&b');
  url.removeParameter('b');
  equal(url.search, '?a');

  url = new URL('http://www.example.com/?a&b&a=A');
  url.removeParameter('a');
  equal(url.search, '?b');

  url = new URL('http://www.example.com/?a&b&a=A&a=');
  url.removeParameter('a');
  equal(url.search, '?b');

  url = new URL('http://www.example.com/?=A');
  url.removeParameter('');
  equal(url.search, '');
});

test('removeParameter with extended characters', function() {
  var url = new URL('http://www.example.com/?%3D');
  url.removeParameter('=');
  equal(url.search, '');

  url = new URL('http://www.example.com/?%26');
  url.removeParameter('&');
  equal(url.search, '');

  url = new URL('http://www.example.com/?%25');
  url.removeParameter('%');
  equal(url.search, '');
});

test('clearParameters', function() {
  var url = new URL('http://www.example.com/');
  url.clearParameters();
  equal(url.search, '');

  url = new URL('http://www.example.com/?');
  url.clearParameters();
  equal(url.search, '');

  url = new URL('http://www.example.com/?a');
  url.clearParameters();
  equal(url.search, '');

  url = new URL('http://www.example.com/?a&a=A&a=');
  url.clearParameters();
  equal(url.search, '');

  url = new URL('http://www.example.com/?a&b');
  url.clearParameters();
  equal(url.search, '');
});
