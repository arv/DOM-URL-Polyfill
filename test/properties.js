
suite('Properties', function() {

  test('constructor', function() {
    assert.throws(function() {
      new URL;
    }, TypeError);
    assert.throws(function() {
      new URL('relative');
    }, TypeError);
  });

  test('protocol', function() {
    var url = new URL('mailto:abc@def.com');
    assert.equal(url.protocol, 'mailto:');

    url = new URL('http://www.example.com/');
    assert.equal(url.protocol, 'http:');

    url.protocol = 'https';
    assert.equal(url.protocol, 'https:');

    url.protocol = 'foo:';
    assert.equal(url.protocol, 'foo:');
    assert.equal(url.href, 'foo://www.example.com/');
  });

  test('username', function() {
    // not implemented
  });

  test('password', function() {
    // not implemented
  });

  test('host', function() {
    var url = new URL('http://www.example.com/');
    assert.equal(url.host, 'www.example.com');

    url = new URL('http://www.example.com:8080/');
    assert.equal(url.host, 'www.example.com:8080');

    url.host = 'changed';
    assert.equal(url.host, 'changed:8080');
    assert.equal(url.href, 'http://changed:8080/');

    url.host = 'again:99';
    assert.equal(url.host, 'again:99');
    assert.equal(url.href, 'http://again:99/');
  });

  test('hostname', function() {
    var url = new URL('http://www.example.com/');
    assert.equal(url.hostname, 'www.example.com');

    url = new URL('http://www.example.com:8080/');
    assert.equal(url.hostname, 'www.example.com');

    url.hostname = 'changed';
    assert.equal(url.hostname, 'changed');
    assert.equal(url.host, 'changed:8080');
    assert.equal(url.href, 'http://changed:8080/');
  });

  test('port', function() {
    var url = new URL('http://www.example.com/');
    assert.equal(url.port, '');

    url = new URL('http://www.example.com:8080/');
    assert.equal(url.port, '8080');

    url.port = '99';
    assert.equal(url.port, '99');
    assert.equal(url.href, 'http://www.example.com:99/');
  });

  test('pathname', function() {
    var url = new URL('http://www.example.com/');
    assert.equal(url.pathname, '/');

    url = new URL('http://www.example.com');
    assert.equal(url.pathname, '/');

    url = new URL('http://www.example.com/a/b');
    assert.equal(url.pathname, '/a/b');

    url = new URL('http://www.example.com/a/b/');
    assert.equal(url.pathname, '/a/b/');

    url.pathname = '';
    assert.equal(url.pathname, '/');

    url.pathname = 'a/b/c'
    assert.equal(url.pathname, '/a/b/c');
  });

  test('search', function() {
    var url = new URL('http://www.example.com/');
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?');
    assert.equal(url.search, '');

    url = new URL('http://www.example.com/?a');
    assert.equal(url.search, '?a');

    url.search = 'b';
    assert.equal(url.search, '?b');

    url.search = '?b';
    assert.equal(url.search, '?b');

    url.search = '';
    assert.equal(url.search, '');

    url.search = '?';
    assert.equal(url.search, '');
  });

  test('hash', function() {
    var url = new URL('http://www.example.com/');
    assert.equal(url.hash, '');

    url = new URL('http://www.example.com/#');
    assert.equal(url.hash, '');

    url = new URL('http://www.example.com/#a');
    assert.equal(url.hash, '#a');

    url.hash = 'b';
    assert.equal(url.hash, '#b');

    url.hash = '#b';
    assert.equal(url.hash, '#b');

    url.hash = '';
    assert.equal(url.hash, '');

    url.hash = '#';
    assert.equal(url.hash, '');
  });

  test('origin', function() {
    // not implemented
  });

  test('href', function() {
    var url = new URL('http://www.example.com/');
    assert.equal(url.href, 'http://www.example.com/');
    assert.equal(url.href, url.toString());

    url.href = 'https://changed/';
    assert.equal(url.href, 'https://changed/');
  });

});