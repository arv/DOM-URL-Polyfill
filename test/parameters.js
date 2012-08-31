suite('Parameters', function() {

  test('getParameterNames', function() {
    var url = new URL('http://www.example.com/');
    expect(url.getParameterNames()).to.eql([]);

    url = new URL('http://www.example.com/?');
    expect(url.getParameterNames()).to.eql([]);

    url = new URL('http://www.example.com/?&');
    expect(url.getParameterNames()).to.eql([]);

    url = new URL('http://www.example.com/?a');
    expect(url.getParameterNames()).to.eql(['a']);

    url = new URL('http://www.example.com/?&a');
    expect(url.getParameterNames()).to.eql(['a']);

    url = new URL('http://www.example.com/?a&');
    expect(url.getParameterNames()).to.eql(['a']);

    url = new URL('http://www.example.com/?a&&b');
    expect(url.getParameterNames()).to.eql(['a', 'b']);

    url = new URL('http://www.example.com/?a=A&a=B&b=B&c');
    expect(url.getParameterNames()).to.eql(['a', 'b', 'c']);

    url = new URL('http://www.example.com/?a&A');
    expect(url.getParameterNames()).to.eql(['a', 'A']);

    url = new URL('http://www.example.com/?=a&=&=');
    expect(url.getParameterNames()).to.eql(['']);
  });

  test('getParameterNames with extended characters', function() {
    var url = new URL('http://www.example.com/?a%26b');
    expect(url.getParameterNames()).to.eql(['a&b']);

    url = new URL('http://www.example.com/?a%3DA&b');
    expect(url.getParameterNames()).to.eql(['a=A', 'b']);

    url = new URL('http://www.example.com/?a%3DA%26b&c');
    expect(url.getParameterNames()).to.eql(['a=A&b', 'c']);

    url = new URL('http://www.example.com/?%20');
    expect(url.getParameterNames()).to.eql([' ']);
  });

  test('getParameterValues', function() {
    var url = new URL('http://www.example.com/');
    expect(url.getParameterValues('a')).to.eql([]);

    url = new URL('http://www.example.com/?a=A');
    expect(url.getParameterValues('a')).to.eql(['A']);

    url = new URL('http://www.example.com/?a');
    expect(url.getParameterValues('a')).to.eql([null]);

    url = new URL('http://www.example.com/?a=');
    expect(url.getParameterValues('a')).to.eql(['']);

    url = new URL('http://www.example.com/?a=A1&a=&a&a=A2');
    expect(url.getParameterValues('a')).to.eql(['A1', '', null, 'A2']);

    url = new URL('http://www.example.com/?a=A&b=B&c=C&b=B');
    expect(url.getParameterValues('b')).to.eql(['B', 'B']);

    url = new URL('http://www.example.com/?=&=A');
    expect(url.getParameterValues('')).to.eql(['', 'A']);
  });

  test('getParameterValues with extended characters', function() {
    var url = new URL('http://www.example.com/?a=%3D');
    expect(url.getParameterValues('a')).to.eql(['=']);

    url = new URL('http://www.example.com/?a=%26');
    expect(url.getParameterValues('a')).to.eql(['&']);

    url = new URL('http://www.example.com/?a=%3D&a=%26&a=%3D%20%26');
    expect(url.getParameterValues('a')).to.eql(['=', '&', '= &']);

    url = new URL('http://www.example.com/?a==A');
    expect(url.getParameterValues('a')).to.eql(['=A']);
  });

  test('hasParameter', function() {
    var url = new URL('http://www.example.com/');
    expect(url.hasParameter('a')).to.be(false);

    url = new URL('http://www.example.com/?');
    expect(url.hasParameter('a')).to.be(false);

    url = new URL('http://www.example.com/?a');
    expect(url.hasParameter('a')).to.be(true);

    url = new URL('http://www.example.com/?a');
    expect(url.hasParameter('A')).to.be(false);

    url = new URL('http://www.example.com/?aa');
    expect(url.hasParameter('a')).to.be(false);

    url = new URL('http://www.example.com/?a=b&c');
    expect(url.hasParameter('b')).to.be(false);

    url = new URL('http://www.example.com/?a=b&c');
    expect(url.hasParameter('c')).to.be(true);

    url = new URL('http://www.example.com/?=1');
    expect(url.hasParameter('')).to.be(true);
  });

  test('hasParameter with extended characters', function() {
    var url = new URL('http://www.example.com/?%3D');
    expect(url.hasParameter('=')).to.be(true);

    url = new URL('http://www.example.com/?%26');
    expect(url.hasParameter('&')).to.be(true);

    url = new URL('http://www.example.com/?a&%3D%20%26');
    expect(url.hasParameter('= &')).to.be(true);
  });

  test('getParameter', function() {
    var url = new URL('http://www.example.com/');
    expect(url.getParameter('a')).to.be(null);

    url = new URL('http://www.example.com/?');
    expect(url.getParameter('a')).to.be(null);

    url = new URL('http://www.example.com/?a');
    expect(url.getParameter('a')).to.be(null);

    url = new URL('http://www.example.com/?a=');
    expect(url.getParameter('a')).to.be('');

    url = new URL('http://www.example.com/?a=A1&a=A2');
    expect(url.getParameter('a')).to.be('A1');

    url = new URL('http://www.example.com/?=A');
    expect(url.getParameter('')).to.be('A');
  });

  test('getParameter with extended characters', function() {
    var url = new URL('http://www.example.com/?%3D');
    expect(url.getParameter('=')).to.be(null);

    url = new URL('http://www.example.com/?%3D=');
    expect(url.getParameter('=')).to.be('');

    url = new URL('http://www.example.com/?%3D=A');
    expect(url.getParameter('=')).to.be('A');

    url = new URL('http://www.example.com/?%26');
    expect(url.getParameter('&')).to.be(null);

    url = new URL('http://www.example.com/?%26=');
    expect(url.getParameter('&')).to.be('');

    url = new URL('http://www.example.com/?%26=A');
    expect(url.getParameter('&')).to.be('A');

    url = new URL('http://www.example.com/?%3D%20%26');
    expect(url.getParameter('= &')).to.be(null);

    url = new URL('http://www.example.com/?%3D%20%26=');
    expect(url.getParameter('= &')).to.be('');

    url = new URL('http://www.example.com/?%3D%20%26=A');
    expect(url.getParameter('= &')).to.be('A');
  });

  test('setParameter', function() {
    var url = new URL('http://www.example.com/');

    url.setParameter('a', null);
    expect(url.search).to.be('?a');

    url.setParameter('a', '');
    expect(url.search).to.be('?a=');

    url.setParameter('a', 'A');
    expect(url.search).to.be('?a=A');

    url = new URL('http://www.example.com/?b');
    url.setParameter('a', 'A');
    expect(url.search).to.be('?b&a=A');

    url = new URL('http://www.example.com/?a=A1&b');
    url.setParameter('a', 'A2');
    expect(url.search).to.be('?b&a=A2');

    url = new URL('http://www.example.com/?=A1');
    url.setParameter('', 'A2');
    expect(url.search).to.be('?=A2');

    expect(function() {
      url.setParameter('', null);
    }).to.throwException(function(ex) {
      expect(ex).to.be.a(TypeError);
    })
  });

  test('setParameter with extended characters', function() {
    var url = new URL('http://www.example.com/');

    url.setParameter('=', null);
    expect(url.search).to.be('?%3D');

    url.setParameter('=', '');
    expect(url.search).to.be('?%3D=');

    url.setParameter('=', 'A');
    expect(url.search).to.be('?%3D=A');

    url.setParameter('=', '=');
    expect(url.search).to.be('?%3D=%3D');

    url = new URL('http://www.example.com/');
    url.setParameter('&', null);
    expect(url.search).to.be('?%26');

    url.setParameter('&', '');
    expect(url.search).to.be('?%26=');

    url.setParameter('&', 'A');
    expect(url.search).to.be('?%26=A');

    url.setParameter('&', '&');
    expect(url.search).to.be('?%26=%26');

    url = new URL('http://www.example.com/');
    url.setParameter('%26', null);
    expect(url.search).to.be('?%2526');

    url.setParameter('%26', '');
    expect(url.search).to.be('?%2526=');

    url.setParameter('%26', 'A');
    expect(url.search).to.be('?%2526=A');

    url.setParameter('%26', '%26');
    expect(url.search).to.be('?%2526=%2526');
  });

  test('addParameter', function() {
    var url = new URL('http://www.example.com/');

    url.addParameter('a', null);
    expect(url.search).to.be('?a');

    url.addParameter('a', null);
    expect(url.search).to.be('?a&a');

    url.addParameter('a', '');
    expect(url.search).to.be('?a&a&a=');

    url.addParameter('a', 'A1');
    expect(url.search).to.be('?a&a&a=&a=A1');

    url.addParameter('a', 'A2');
    expect(url.search).to.be('?a&a&a=&a=A1&a=A2');

    url.addParameter('b', 'B');
    expect(url.search).to.be('?a&a&a=&a=A1&a=A2&b=B');

    var url = new URL('http://www.example.com/');
    url.addParameter('', '');
    expect(url.search).to.be('?=');

    url.addParameter('', '');
    expect(url.search).to.be('?=&=');

    expect(function() {
      url.addParameter('', null);
    }).to.throwException(function(ex) {
      expect(ex).to.be.a(TypeError);
    })
  });

  test('addParameter with extended characters', function() {
    var url = new URL('http://www.example.com/');

    url.addParameter('=', null);
    expect(url.search).to.be('?%3D');

    url.addParameter('=', null);
    expect(url.search).to.be('?%3D&%3D');

    url.addParameter('=', '');
    expect(url.search).to.be('?%3D&%3D&%3D=');

    url.addParameter('=', 'A');
    expect(url.search).to.be('?%3D&%3D&%3D=&%3D=A');

    url.addParameter('=', '=');
    expect(url.search).to.be('?%3D&%3D&%3D=&%3D=A&%3D=%3D');

    url = new URL('http://www.example.com/');
    url.addParameter('&', null);
    expect(url.search).to.be('?%26');
    url.addParameter('%', null);
    expect(url.search).to.be('?%26&%25');
    url.addParameter('%2D', '%');
    expect(url.search).to.be('?%26&%25&%252D=%25');
  });

  test('removeParameter', function() {
    var url = new URL('http://www.example.com/');
    url.removeParameter('a');
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?a');
    url.removeParameter('a');
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?a&b');
    url.removeParameter('a');
    expect(url.search).to.be('?b');

    url = new URL('http://www.example.com/?a&b');
    url.removeParameter('b');
    expect(url.search).to.be('?a');

    url = new URL('http://www.example.com/?a&b&a=A');
    url.removeParameter('a');
    expect(url.search).to.be('?b');

    url = new URL('http://www.example.com/?a&b&a=A&a=');
    url.removeParameter('a');
    expect(url.search).to.be('?b');

    url = new URL('http://www.example.com/?=A');
    url.removeParameter('');
    expect(url.search).to.be('');
  });

  test('removeParameter with extended characters', function() {
    var url = new URL('http://www.example.com/?%3D');
    url.removeParameter('=');
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?%26');
    url.removeParameter('&');
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?%25');
    url.removeParameter('%');
    expect(url.search).to.be('');
  });

  test('clearParameters', function() {
    var url = new URL('http://www.example.com/');
    url.clearParameters();
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?');
    url.clearParameters();
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?a');
    url.clearParameters();
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?a&a=A&a=');
    url.clearParameters();
    expect(url.search).to.be('');

    url = new URL('http://www.example.com/?a&b');
    url.clearParameters();
    expect(url.search).to.be('');
  });

});