
var URL = (function() {

  function parseSearch(s) {
    var result = [];
    var k = 0;
    var parts = s.slice(1).split('&');
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var key = part.split('=', 1)[0];
      if (key) {
        var value = part.slice(key.length + 1);
        result[k++] = [key, value];
      }
    }
    return result;
  }

  function serializeParsed(array) {
    return array.map(function(pair) {
      return pair[1] !== '' ? pair.join('=') : pair[0];
    }).join('&');
  }

  function URL(url, base) {
    if (!url)
      throw new TypeError('Invalid argument');

    var doc = document.implementation.createHTMLDocument('');
    if (base) {
      var baseElement = doc.createElement('base');
      baseElement.href = base || window.lo;
      doc.head.appendChild(baseElement);
    }
    var anchorElement = doc.createElement('a');
    anchorElement.href = url;
    doc.body.appendChild(anchorElement);

    if (anchorElement.href === '')
      throw new TypeError('Invalid URL');

    Object.defineProperty(this, '_anchorElement', {value: anchorElement});
  }

  URL.prototype = {
    toString: function() {
      return this.href;
    },

    get href() {
      return this._anchorElement.href;
    },
    set href(value) {
      this._anchorElement.href = value;
    },

    get protocol() {
      return this._anchorElement.protocol;
    },
    set protocol(value) {
      this._anchorElement.protocol = value;
    },

    // NOT IMPLEMENTED
    // get username() {
    //   return this._anchorElement.username;
    // },
    // set username(value) {
    //   this._anchorElement.username = value;
    // },

    // get password() {
    //   return this._anchorElement.password;
    // },
    // set password(value) {
    //   this._anchorElement.password = value;
    // },

    // get origin() {
    //   return this._anchorElement.origin;
    // },

    get host() {
      return this._anchorElement.host;
    },
    set host(value) {
      this._anchorElement.host = value;
    },

    get hostname() {
      return this._anchorElement.hostname;
    },
    set hostname(value) {
      this._anchorElement.hostname = value;
    },

    get port() {
      return this._anchorElement.port;
    },
    set port(value) {
      this._anchorElement.port = value;
    },

    get pathname() {
      return this._anchorElement.pathname;
    },
    set pathname(value) {
      this._anchorElement.pathname = value;
    },

    get search() {
      return this._anchorElement.search;
    },
    set search(value) {
      this._anchorElement.search = value;
    },

    get hash() {
      return this._anchorElement.hash;
    },
    set hash(value) {
      this._anchorElement.hash = value;
    },

    get filename() {
      var match;
      if ((match = this.pathname.match(/\/([^\/]+)$/)))
        return match[1];
      return '';
    },
    set filename(value) {
      var match, pathname = this.pathname;
      if ((match = pathname.match(/\/([^\/]+)$/)))
        this.pathname = pathname.slice(0, -match[1].length) + value;
      else
        this.pathname = value;
    },

    get parameterNames() {
      var seen = Object.create(null);
      return parseSearch(this.search).map(function(pair) {
        return pair[0];
      }).filter(function(key) {
        if (key in seen)
          return false;
        seen[key] = true;
        return true;
      });
    },

    getParameter: function(name) {
      return this.getParameterAll(name).pop();
    },

    getParameterAll: function(name) {
      name = String(name);
      var result = [];
      var k = 0;
      parseSearch(this.search).forEach(function(pair) {
        if (pair[0] === name)
          result[k++] = pair[1];
      });
      return result;
    },

    appendParameter: function(name, values) {
      if (!Array.isArray(values))
        values = [values];
      var parsed = parseSearch(this.search);
      for (var i = 0; i < values.length; i++) {
        parsed.push([name, values[i]]);
      }
      this.search = serializeParsed(parsed);
    },

    clearParameter: function(name) {
      this.search = serializeParsed(
          parseSearch(this.search).filter(function(pair) {
            return pair[0] !== name;
          }));
    },
  };

  var oldURL = window.URL || window.webkitURL || window.mozURL;

  URL.createObjectURL = function(blob) {
    return oldURL.createObjectURL.apply(oldURL, arguments);
  };

  URL.revokeObjectURL = function(url) {
    return oldURL.revokeObjectURL.apply(oldURL, arguments);
  };

  // Methods should not be enumerable.
  Object.defineProperty(URL.prototype, 'toString', {enumerable: false});
  Object.defineProperty(URL.prototype, 'getParameter', {enumerable: false});
  Object.defineProperty(URL.prototype, 'getParameterAll', {enumerable: false});
  Object.defineProperty(URL.prototype, 'appendParameter', {enumerable: false});
  Object.defineProperty(URL.prototype, 'clearParameter', {enumerable: false});
  Object.defineProperty(URL, 'createObjectURL', {enumerable: false});
  Object.defineProperty(URL, 'revokeObjectURL', {enumerable: false});

  return URL;
})();
