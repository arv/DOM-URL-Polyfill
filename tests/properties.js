module('Properties');

test('protocol', function() {
  var url = new URL('mailto:abc@def.com');
  equal(url.protocol, 'mailto:');

  url = new URL('http://www.example.com/');
  equal(url.protocol, 'http:');

  url.protocol = 'https';
  equal(url.protocol, 'https:');

  url.protocol = 'foo:';
  equal(url.protocol, 'foo:');
  equal(url.href, 'foo://www.example.com/');
});

test('username', function() {
  // not implemented
  ok(true);
});

test('password', function() {
  // not implemented
  ok(true);
});

test('host', function() {
  var url = new URL('http://www.example.com/');
  equal(url.host, 'www.example.com');

  url = new URL('http://www.example.com:8080/');
  equal(url.host, 'www.example.com:8080');

  url.host = 'changed';
  equal(url.host, 'changed');
  equal(url.href, 'http://changed/');

  url.host = 'again:99';
  equal(url.host, 'again:99');
  equal(url.href, 'http://again:99/');
});

test('hostname', function() {
  var url = new URL('http://www.example.com/');
  equal(url.hostname, 'www.example.com');

  url = new URL('http://www.example.com:8080/');
  equal(url.hostname, 'www.example.com');

  url.hostname = 'changed';
  equal(url.hostname, 'changed');
  equal(url.host, 'changed:8080');
  equal(url.href, 'http://changed:8080/');
});

test('port', function() {
  var url = new URL('http://www.example.com/');
  equal(url.port, '');

  url = new URL('http://www.example.com:8080/');
  equal(url.port, '8080');

  url.port = '99';
  equal(url.port, '99');
  equal(url.href, 'http://www.example.com:99/');
});

test('pathname', function() {
  var url = new URL('http://www.example.com/');
  equal(url.pathname, '/');

  url = new URL('http://www.example.com');
  equal(url.pathname, '/');

  url = new URL('http://www.example.com/a/b');
  equal(url.pathname, '/a/b');

  url = new URL('http://www.example.com/a/b/');
  equal(url.pathname, '/a/b/');

  url.pathname = '';
  equal(url.pathname, '/');

  url.pathname = 'a/b/c'
  equal(url.pathname, '/a/b/c');
});

test('search', function() {
  var url = new URL('http://www.example.com/');
  equal(url.search, '');

  url = new URL('http://www.example.com/?');
  equal(url.search, '');

  url = new URL('http://www.example.com/?a');
  equal(url.search, '?a');

  url.search = 'b';
  equal(url.search, '?b');

  url.search = '?b';
  equal(url.search, '?b');

  url.search = '';
  equal(url.search, '');

  url.search = '?';
  equal(url.search, '');
});

test('hash', function() {
  var url = new URL('http://www.example.com/');
  equal(url.hash, '');

  url = new URL('http://www.example.com/#');
  equal(url.hash, '');

  url = new URL('http://www.example.com/#a');
  equal(url.hash, '#a');

  url.hash = 'b';
  equal(url.hash, '#b');

  url.hash = '#b';
  equal(url.hash, '#b');

  url.hash = '';
  equal(url.hash, '');

  url.hash = '#';
  equal(url.hash, '');
});

test('filename', function() {
  var url = new URL('http://www.example.com/');
  equal(url.filename, '');

  url = new URL('http://www.example.com/a');
  equal(url.filename, 'a');

  url = new URL('http://www.example.com/a/b');
  equal(url.filename, 'b');

  url = new URL('http://www.example.com/a/#b');
  equal(url.filename, '');

  url = new URL('http://www.example.com/a/b#c');
  equal(url.filename, 'b');

  url = new URL('http://www.example.com/a/b?c');
  equal(url.filename, 'b');

  url.filename = 'B';
  equal(url.filename, 'B');
  equal(url.href, 'http://www.example.com/a/B?c');
});

test('origin', function() {
  // not implemented
  ok(true);
});

test('href', function() {
  var url = new URL('http://www.example.com/');
  equal(url.href, 'http://www.example.com/');
  equal(url.href, url.toString());

  url.href = 'https://changed/';
  equal(url.href, 'https://changed/');
});
