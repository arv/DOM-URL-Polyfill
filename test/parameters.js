suite('Parameters', function() {

  test('getParameterNames', function() {
    var url = new URL('http://www.example.com/');
    assert.deepEqual(url.getParameterNames(), []);

    url = new URL('http://www.example.com/?');
    assert.deepEqual(url.getParameterNames(), []);

    url = new URL('http://www.example.com/?&');
    assert.deepEqual(url.getParameterNames(), []);

    url = new URL('http://www.example.com/?a');
    assert.deepEqual(url.getParameterNames(), ['a']);

    url = new URL('http://www.example.com/?&a');
    assert.deepEqual(url.getParameterNames(), ['a']);

    url = new URL('http://www.example.com/?a&');
    assert.deepEqual(url.getParameterNames(), ['a']);

    url = new URL('http://www.example.com/?a&&b');
    assert.deepEqual(url.getParameterNames(), ['a', 'b']);

    url = new URL('http://www.example.com/?a=A&a=B&b=B&c');
    assert.deepEqual(url.getParameterNames(), ['a', 'b', 'c']);

    url = new URL('http://www.example.com/?a&A');
    assert.deepEqual(url.getParameterNames(), ['a', 'A']);

    url = new URL('http://www.example.com/?=a&=&=');
    assert.deepEqual(url.getParameterNames(), ['']);
  });

  test('getParameterNames with extended characters', function() {
    var url = new URL('http://www.example.com/?a%26b');
    assert.deepEqual(url.getParameterNames(), ['a&b']);

    url = new URL('http://www.example.com/?a%3DA&b');
    assert.deepEqual(url.getParameterNames(), ['a=A', 'b']);

    url = new URL('http://www.example.com/?a%3DA%26b&c');
    assert.deepEqual(url.getParameterNames(), ['a=A&b', 'c']);

    url = new URL('http://www.example.com/?%20');
    assert.deepEqual(url.getParameterNames(), [' ']);
  });

  test('getParameterValues', function() {
    var url = new URL('http://www.example.com/');
    assert.deepEqual(url.getParameterValues('a'), []);

    url = new URL('http://www.example.com/?a=A');
    assert.deepEqual(url.getParameterValues('a'), ['A']);

    url = new URL('http://www.example.com/?a');
    assert.deepEqual(url.getParameterValues('a'), [null]);

    url = new URL('http://www.example.com/?a=');
    assert.deepEqual(url.getParameterValues('a'), ['']);

    url = new URL('http://www.example.com/?a=A1&a=&a&a=A2');
    assert.deepEqual(url.getParameterValues('a'), ['A1', '', null, 'A2']);

    url = new URL('http://www.example.com/?a=A&b=B&c=C&b=B');
    assert.deepEqual(url.getParameterValues('b'), ['B', 'B']);

    url = new URL('http://www.example.com/?=&=A');
    assert.deepEqual(url.getParameterValues(''), ['', 'A']);
  });

  test('getParameterValues with extended characters', function() {
    var url = new URL('http://www.example.com/?a=%3D');
    assert.deepEqual(url.getParameterValues('a'), ['=']);

    url = new URL('http://www.example.com/?a=%26');
    assert.deepEqual(url.getParameterValues('a'), ['&']);

    url = new URL('http://www.example.com/?a=%3D&a=%26&a=%3D%20%26');
    assert.deepEqual(url.getParameterValues('a'), ['=', '&', '= &']);

    url = new URL('http://www.example.com/?a==A');
    assert.deepEqual(url.getParameterValues('a'), ['=A']);
  });

  test('hasParameter', function() {
    var url = new URL('http://www.example.com/');
    assert.isFalse(url.hasParameter('a'));

    url = new URL('http://www.example.com/?');
    assert.isFalse(url.hasParameter('a'));

    url = new URL('http://www.example.com/?a');
    assert.isTrue(url.hasParameter('a'));

    url = new URL('http://www.example.com/?a');
    assert.isFalse(url.hasParameter('A'));

    url = new URL('http://www.example.com/?aa');
    assert.isFalse(url.hasParameter('a'));

    url = new URL('http://www.example.com/?a=b&c');
    assert.isFalse(url.hasParameter('b'));

    url = new URL('http://www.example.com/?a=b&c');
    assert.isTrue(url.hasParameter('c'));

    url = new URL('http://www.example.com/?=1');
    assert.isTrue(url.hasParameter(''));
  });

  test('hasParameter with extended characters', function() {
    var url = new URL('http://www.example.com/?%3D');
    assert.isTrue(url.hasParameter('='));

    url = new URL('http://www.example.com/?%26');
    assert.isTrue(url.hasParameter('&'));

    url = new URL('http://www.example.com/?a&%3D%20%26');
    assert.isTrue(url.hasParameter('= &'));
  });

  test('getParameter', function() {
    var url = new URL('http://www.example.com/');
    assert.isNull(url.getParameter('a'));

    url = new URL('http://www.example.com/?');
    assert.isNull(url.getParameter('a'));

    url = new URL('http://www.example.com/?a');
    assert.isNull(url.getParameter('a'));

    url = new URL('http://www.example.com/?a=');
    assert.equal(url.getParameter('a'), '');

    url = new URL('http://www.example.com/?a=A1&a=A2');
    assert.equal(url.getParameter('a'), 'A1');

    url = new URL('http://www.example.com/?=A');
    assert.equal(url.getParameter(''), 'A');
  });

  test('getParameter with extended characters', function() {
    var url = new URL('http://www.example.com/?%3D');
    assert.isNull(url.getParameter('='));

    url = new URL('http://www.example.com/?%3D=');
    assert.equal(url.getParameter('='), '');

    url = new URL('http://www.example.com/?%3D=A');
    assert.equal(url.getParameter('='), 'A');

    url = new URL('http://www.example.com/?%26');
    assert.isNull(url.getParameter('&'));

    url = new URL('http://www.example.com/?%26=');
    assert.equal(url.getParameter('&'), '');

    url = new URL('http://www.example.com/?%26=A');
    assert.equal(url.getParameter('&'), 'A');

    url = new URL('http://www.example.com/?%3D%20%26');
    assert.isNull(url.getParameter('= &'));

    url = new URL('http://www.example.com/?%3D%20%26=');
    assert.equal(url.getParameter('= &'), '');

    url = new URL('http://www.example.com/?%3D%20%26=A');
    assert.equal(url.getParameter('= &'), 'A');
  });

  test('setParameter', function() {
    var url = new URL('http://www.example.com/');

    url.setParameter('a', null);
    assert.equal(url.search, '?a');

    url.setParameter('a', '');
    assert.equal(url.search, '?a=');

    url.setParameter('a', 'A');
    assert.equal(url.search, '?a=A');

    url = new URL('http://www.example.com/?b');
    url.setParameter('a', 'A');
    assert.equal(url.search, '?b&a=A');

    url = new URL('http://www.example.com/?a=A1&b');
    url.setParameter('a', 'A2');
    assert.equal(url.search, '?b&a=A2');

    url = new URL('http://www.example.com/?=A1');
    url.setParameter('', 'A2');
    assert.equal(url.search, '?=A2');

    assert.throws(function() {
      url.setParameter('', null);
    }, TypeError);
  });

  test('setParameter with extended characters', function() {
    var url = new URL('http://www.example.com/');

    url.setParameter('=', null);
    assert.equal(url.search, '?%3D');

    url.setParameter('=', '');
    assert.equal(url.search, '?%3D=');

    url.setParameter('=', 'A');
    assert.equal(url.search, '?%3D=A');

    url.setParameter('=', '=');
    assert.equal(url.search, '?%3D=%3D');

    url = new URL('http://www.example.com/');
    url.setParameter('&', null);
    assert.equal(url.search, '?%26');

    url.setParameter('&', '');
    assert.equal(url.search, '?%26=');

    url.setParameter('&', 'A');
    assert.equal(url.search, '?%26=A');

    url.setParameter('&', '&');
    assert.equal(url.search, '?%26=%26');

    url = new URL('http://www.example.com/');
    url.setParameter('%26', null);
    assert.equal(url.search, '?%2526');

    url.setParameter('%26', '');
    assert.equal(url.search, '?%2526=');

    url.setParameter('%26', 'A');
    assert.equal(url.search, '?%2526=A');

    url.setParameter('%26', '%26');
    assert.equal(url.search, '?%2526=%2526');
  });

  test('addParameter', function() {
    var url = new URL('http://www.example.com/');

    url.addParameter('a', null);
    assert.equal(url.search, '?a');

    url.addParameter('a', null);
    assert.equal(url.search, '?a&a');

    url.addParameter('a', '');
    assert.equal(url.search, '?a&a&a=');

    url.addParameter('a', 'A1');
    assert.equal(url.search, '?a&a&a=&a=A1');

    url.addParameter('a', 'A2');
    assert.equal(url.search, '?a&a&a=&a=A1&a=A2');

    url.addParameter('b', 'B');
    assert.equal(url.search, '?a&a&a=&a=A1&a=A2&b=B');

    var url = new URL('http://www.example.com/');
    url.addParameter('', '');
    assert.equal(url.search, '?=');

    url.addParameter('', '');
    assert.equal(url.search, '?=&=');

    assert.throws(function() {
      url.addParameter('', null);
    }, TypeError);
  });

  test('addParameter with extended characters', function() {
    var url = new URL('http://www.example.com/');

    url.addParameter('=', null);
    assert.equal(url.search, '?%3D');

    url.addParameter('=', null);
    assert.equal(url.search, '?%3D&%3D');

    url.addParameter('=', '');
    assert.equal(url.search, '?%3D&%3D&%3D=');

    url.addParameter('=', 'A');
    assert.equal(url.search, '?%3D&%3D&%3D=&%3D=A');

    url.addParameter('=', '=');
    assert.equal(url.search, '?%3D&%3D&%3D=&%3D=A&%3D=%3D');

    url = new URL('http://www.example.com/');
    url.addParameter('&', null);
    assert.equal(url.search, '?%26');
    url.addParameter('%', null);
    assert.equal(url.search, '?%26&%25');
    url.addParameter('%2D', '%');
    assert.equal(url.search, '?%26&%25&%252D=%25');
  });

  test('removeParameter', function() {
    var url = new URL('http://www.example.com/');
    url.removeParameter('a');
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?a');
    url.removeParameter('a');
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?a&b');
    url.removeParameter('a');
    assert.equal(url.search, '?b');

    url = new URL('http://www.example.com/?a&b');
    url.removeParameter('b');
    assert.equal(url.search, '?a');

    url = new URL('http://www.example.com/?a&b&a=A');
    url.removeParameter('a');
    assert.equal(url.search, '?b');

    url = new URL('http://www.example.com/?a&b&a=A&a=');
    url.removeParameter('a');
    assert.equal(url.search, '?b');

    url = new URL('http://www.example.com/?=A');
    url.removeParameter('');
    assert.equal(url.search, '');
  });

  test('removeParameter with extended characters', function() {
    var url = new URL('http://www.example.com/?%3D');
    url.removeParameter('=');
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?%26');
    url.removeParameter('&');
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?%25');
    url.removeParameter('%');
    assert.equal(url.search, '');
  });

  test('clearParameters', function() {
    var url = new URL('http://www.example.com/');
    url.clearParameters();
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?');
    url.clearParameters();
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?a');
    url.clearParameters();
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?a&a=A&a=');
    url.clearParameters();
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?a&b');
    url.clearParameters();
    assert.equal(url.search, '');
  });

});