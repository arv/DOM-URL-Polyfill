
var URL = (function() {

  var NAME = 0;
  var VALUE = 1;

  function collectURLParameters(input) {
    var result = [];
    var k = 0;
    // Remove leading '?' using slice(1).
    var parameters = input.slice(1).split('&');
    for (var i = 0; i < parameters.length; i++) {
      var parameter = parameters[i];
      if (!parameter)
        continue;
      var index, name, value = null;
      if ((index = parameter.indexOf('=')) === -1) {
        name = parameter;
      } else {
        name = parameter.slice(0, index);
        value = parameter.slice(index + 1);
      }
      result[k++] = [
        decodeURIComponent(name),
        value && decodeURIComponent(value)
      ];
    }
    return result;
  }

  function canonicalizeQueryParameter(s) {
    // encodeURIComponent is more aggressive than the spec. We only need to
    // escape %, & and =.
    return s.replace(/%|&|=/g, encodeURIComponent);
  }

  function serializeParameters(parameters) {
    return parameters.map(function(parameter) {
      return canonicalizeQueryParameter(parameter[NAME]) +
          (parameter[VALUE] !== null ?
               '=' + canonicalizeQueryParameter(parameter[VALUE]) :
               '');
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

    getParameterNames: function() {
      var seen = Object.create(null);
      return collectURLParameters(this.search).map(function(parameter) {
        return parameter[NAME];
      }).filter(function(key) {
        if (key in seen)
          return false;
        seen[key] = true;
        return true;
      });
    },

    getParameterValues: function(name) {
      name = String(name);
      var result = [];
      var k = 0;
      collectURLParameters(this.search).forEach(function(parameter) {
        if (parameter[NAME] === name)
          result[k++] = parameter[VALUE];
      });
      return result;
    },

    hasParameter: function(name) {
      name = String(name);
      return collectURLParameters(this.search).some(function(parameter) {
        return parameter[NAME] === name;
      });
    },

    getParameter: function(name) {
      var values = this.getParameterValues(name);
      return values.length ? values[0] : null;
    },

    setParameter: function(name, value) {
      if (name === '' && value === null)
        throw new TypeError('Invalid input');
      if (value !== null)
        value = String(value);
      name = String(name);
      var parameters = collectURLParameters(this.search).filter(
          function(parameter) {;
            return parameter[NAME] !== name;
          });

      parameters[parameters.length] = [name, value];
      this.search = serializeParameters(parameters);
    },

    addParameter: function(name, value) {
      if (name === '' && value === null)
        throw new TypeError('Invalid input');
      if (value !== null)
        value = String(value);
      name = String(name);
      var parameters = collectURLParameters(this.search)

      parameters[parameters.length] = [name, value];
      this.search = serializeParameters(parameters);
    },

    removeParameter: function(name) {
      var parameters = collectURLParameters(this.search).filter(
          function(parameter) {;
            return parameter[NAME] !== name;
          });
      this.search = serializeParameters(parameters);
    },

    clearParameters: function() {
      this.search = '';
    }
  };

  var oldURL = window.URL || window.webkitURL || window.mozURL;

  URL.createObjectURL = function(blob) {
    return oldURL.createObjectURL.apply(oldURL, arguments);
  };

  URL.revokeObjectURL = function(url) {
    return oldURL.revokeObjectURL.apply(oldURL, arguments);
  };

  Object.defineProperty(URL.prototype, 'toString', {enumerable: false});

  return URL;
})();
