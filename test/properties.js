
suite('Properties', function() {

  test('protocol', function() {
    var url = new URL('mailto:abc@def.com');
    expect(url.protocol).to.be('mailto:');

    url = new URL('http://www.example.com/');
    expect(url.protocol).to.be('http:');

    url.protocol = 'https';
    expect(url.protocol).to.be('https:');

    url.protocol = 'foo:';
    expect(url.protocol).to.be('foo:');
    expect(url.href).to.be('foo://www.example.com/');
  });

  test('username', function() {
    // not implemented
  });

  test('password', function() {
    // not implemented
  });

  test('host', function() {
    var url = new URL('http://www.example.com/');
    expect(url.host).to.be('www.example.com');

    url = new URL('http://www.example.com:8080/');
    expect(url.host).to.be('www.example.com:8080');

    url.host = 'changed';
    expect(url.host).to.be('changed');
    expect(url.href).to.be('http://changed/');

    url.host = 'again:99';
    expect(url.host).to.be('again:99');
    expect(url.href).to.be('http://again:99/');
  });

  test('hostname', function() {
    var url = new URL('http://www.example.com/');
    expect(url.hostname).to.be('www.example.com');

    url = new URL('http://www.example.com:8080/');
    expect(url.hostname).to.be('www.example.com');

    url.hostname = 'changed';
    expect(url.hostname).to.be('changed');
    expect(url.host).to.be('changed:8080');
    expect(url.href).to.be('http://changed:8080/');
  });

  test('port', function() {
    var url = new URL('http://www.example.com/');
    expect(url.port).to.be('');

    url = new URL('http://www.example.com:8080/');
    expect(url.port).to.be('8080');

    url.port = '99';
    expect(url.port).to.be('99');
    expect(url.href).to.be('http://www.example.com:99/');
  });

  test('pathname', function() {
    var url = new URL('http://www.example.com/');
    expect(url.pathname).to.be('/');

    url = new URL('http://www.example.com');
    expect(url.pathname).to.be('/');

    url = new URL('http://www.example.com/a/b');
    expect(url.pathname).to.be('/a/b');

    url = new URL('http://www.example.com/a/b/');
    expect(url.pathname).to.be('/a/b/');

    url.pathname = '';
    expect(url.pathname).to.be('/');

    url.pathname = 'a/b/c'
    expect(url.pathname).to.be('/a/b/c');
  });

  test('search', function() {
    var url = new URL('http://www.example.com/');
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?');
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?a');
    expect(url.search).to.be('?a');

    url.search = 'b';
    expect(url.search).to.be('?b');

    url.search = '?b';
    expect(url.search).to.be('?b');

    url.search = '';
    expect(url.search).to.be('');

    url.search = '?';
    expect(url.search).to.be('');
  });

  test('hash', function() {
    var url = new URL('http://www.example.com/');
    expect(url.hash).to.be('');

    url = new URL('http://www.example.com/#');
    expect(url.hash).to.be('');

    url = new URL('http://www.example.com/#a');
    expect(url.hash).to.be('#a');

    url.hash = 'b';
    expect(url.hash).to.be('#b');

    url.hash = '#b';
    expect(url.hash).to.be('#b');

    url.hash = '';
    expect(url.hash).to.be('');

    url.hash = '#';
    expect(url.hash).to.be('');
  });

  test('filename', function() {
    var url = new URL('http://www.example.com/');
    expect(url.filename).to.be('');

    url = new URL('http://www.example.com/a');
    expect(url.filename).to.be('a');

    url = new URL('http://www.example.com/a/b');
    expect(url.filename).to.be('b');

    url = new URL('http://www.example.com/a/#b');
    expect(url.filename).to.be('');

    url = new URL('http://www.example.com/a/b#c');
    expect(url.filename).to.be('b');

    url = new URL('http://www.example.com/a/b?c');
    expect(url.filename).to.be('b');

    url.filename = 'B';
    expect(url.filename).to.be('B');
    expect(url.href).to.be('http://www.example.com/a/B?c');
  });

  test('origin', function() {
    // not implemented
  });

  test('href', function() {
    var url = new URL('http://www.example.com/');
    expect(url.href).to.be('http://www.example.com/');
    expect(url.href).to.be(url.toString());

    url.href = 'https://changed/';
    expect(url.href).to.be('https://changed/');
  });

});