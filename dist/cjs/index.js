var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports2, module2) {
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports2, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      "double": '"',
      single: "'"
    };
    var quoteREs = {
      __proto__: null,
      "double": /(["\\])/g,
      single: /(['\\])/g
    };
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function canTrustToString(obj) {
      return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && canTrustToString(obj);
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && canTrustToString(obj);
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && canTrustToString(obj);
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && canTrustToString(obj);
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && canTrustToString(obj);
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel-list/index.js
var require_side_channel_list = __commonJS({
  "node_modules/side-channel-list/index.js"(exports2, module2) {
    "use strict";
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var listGetNode = function(list, key, isDelete) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) != null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          if (!isDelete) {
            curr.next = /** @type {NonNullable<typeof list.next>} */
            list.next;
            list.next = curr;
          }
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      if (!objects) {
        return void 0;
      }
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
        {
          // eslint-disable-line no-param-reassign, no-extra-parens
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      if (!objects) {
        return false;
      }
      return !!listGetNode(objects, key);
    };
    var listDelete = function(objects, key) {
      if (objects) {
        return listGetNode(objects, key, true);
      }
    };
    module2.exports = function getSideChannelList() {
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          var root = $o && $o.next;
          var deletedNode = listDelete($o, key);
          if (deletedNode && root && root === deletedNode) {
            $o = void 0;
          }
          return !!deletedNode;
        },
        get: function(key) {
          return listGet($o, key);
        },
        has: function(key) {
          return listHas($o, key);
        },
        set: function(key, value) {
          if (!$o) {
            $o = {
              next: void 0
            };
          }
          listSet(
            /** @type {NonNullable<typeof $o>} */
            $o,
            key,
            value
          );
        }
      };
      return channel;
    };
  }
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/es-object-atoms/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object;
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    module2.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    module2.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    module2.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    module2.exports = SyntaxError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    module2.exports = URIError;
  }
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/math-intrinsics/abs.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.abs;
  }
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/math-intrinsics/floor.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.floor;
  }
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/math-intrinsics/max.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.max;
  }
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/math-intrinsics/min.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.min;
  }
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/math-intrinsics/pow.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.pow;
  }
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/math-intrinsics/round.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.round;
  }
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
    "use strict";
    module2.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/math-intrinsics/sign.js"(exports2, module2) {
    "use strict";
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.call;
  }
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.apply;
  }
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  }
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  }
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/dunder-proto/get.js"(exports2, module2) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/get-proto/index.js"(exports2, module2) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void undefined2;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/call-bound/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    };
  }
});

// node_modules/side-channel-map/index.js
var require_side_channel_map = __commonJS({
  "node_modules/side-channel-map/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var $Map = GetIntrinsic("%Map%", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var $mapDelete = callBound("Map.prototype.delete", true);
    var $mapSize = callBound("Map.prototype.size", true);
    module2.exports = !!$Map && /** @type {Exclude<import('.'), false>} */
    function getSideChannelMap() {
      var $m;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          if ($m) {
            var result = $mapDelete($m, key);
            if ($mapSize($m) === 0) {
              $m = void 0;
            }
            return result;
          }
          return false;
        },
        get: function(key) {
          if ($m) {
            return $mapGet($m, key);
          }
        },
        has: function(key) {
          if ($m) {
            return $mapHas($m, key);
          }
          return false;
        },
        set: function(key, value) {
          if (!$m) {
            $m = new $Map();
          }
          $mapSet($m, key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/side-channel-weakmap/index.js
var require_side_channel_weakmap = __commonJS({
  "node_modules/side-channel-weakmap/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var getSideChannelMap = require_side_channel_map();
    var $TypeError = require_type();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
    module2.exports = $WeakMap ? (
      /** @type {Exclude<import('.'), false>} */
      function getSideChannelWeakMap() {
        var $wm;
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapDelete($wm, key);
              }
            } else if (getSideChannelMap) {
              if ($m) {
                return $m["delete"](key);
              }
            }
            return false;
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            }
            return $m && $m.get(key);
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            }
            return !!$m && $m.has(key);
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if (getSideChannelMap) {
              if (!$m) {
                $m = getSideChannelMap();
              }
              $m.set(key, value);
            }
          }
        };
        return channel;
      }
    ) : getSideChannelMap;
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    var $TypeError = require_type();
    var inspect = require_object_inspect();
    var getSideChannelList = require_side_channel_list();
    var getSideChannelMap = require_side_channel_map();
    var getSideChannelWeakMap = require_side_channel_weakmap();
    var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
    module2.exports = function getSideChannel() {
      var $channelData;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          return !!$channelData && $channelData["delete"](key);
        },
        get: function(key) {
          return $channelData && $channelData.get(key);
        },
        has: function(key) {
          return !!$channelData && $channelData.has(key);
        },
        set: function(key, value) {
          if (!$channelData) {
            $channelData = makeChannel();
          }
          $channelData.set(key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? { __proto__: null } : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object" && typeof source !== "function") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, defaultDecoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var limit = 1024;
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var j = 0; j < string.length; j += limit) {
        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
        var arr = [];
        for (var i = 0; i < segment.length; ++i) {
          var c = segment.charCodeAt(i);
          if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
            arr[arr.length] = segment.charAt(i);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hexTable[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
          arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
        }
        out += arr.join("");
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      commaRoundTrip: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: utils.encode,
      encodeValuesOnly: false,
      filter: void 0,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
      if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
        return adjustedPrefix + "[]";
      }
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          allowEmptyArrays,
          strictNullHandling,
          skipNulls,
          encodeDotInKeys,
          generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
        throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      var arrayFormat;
      if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if ("indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = defaults.arrayFormat;
      }
      if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: !!opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
      var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = obj[key];
        if (options.skipNulls && value === null) {
          continue;
        }
        pushToArray(keys, stringify(
          value,
          key,
          generateArrayPrefix,
          commaRoundTrip,
          options.allowEmptyArrays,
          options.strictNullHandling,
          options.skipNulls,
          options.encodeDotInKeys,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowEmptyArrays: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decodeDotInKeys: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictDepth: false,
      strictNullHandling: false,
      throwOnLimitExceeded: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options, currentArrayLength) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
        throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(
        options.delimiter,
        options.throwOnLimitExceeded ? limit + 1 : limit
      );
      if (options.throwOnLimitExceeded && parts.length > limit) {
        throw new RangeError("Parameter limit exceeded. Only " + limit + " parameter" + (limit === 1 ? "" : "s") + " allowed.");
      }
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key;
        var val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(
              part.slice(pos + 1),
              options,
              isArray(obj[key]) ? obj[key].length : 0
            ),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(String(val));
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        var existing = has.call(obj, key);
        if (existing && options.duplicates === "combine") {
          obj[key] = utils.combine(obj[key], val);
        } else if (!existing || options.duplicates === "last") {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var currentArrayLength = 0;
      if (chain.length > 0 && chain[chain.length - 1] === "[]") {
        var parentKey = chain.slice(0, -1).join("");
        currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
      }
      var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine([], leaf);
        } else {
          obj = options.plainObjects ? { __proto__: null } : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
          var index = parseInt(decodedRoot, 10);
          if (!options.parseArrays && decodedRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root !== decodedRoot && String(index) === decodedRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else if (decodedRoot !== "__proto__") {
            obj[decodedRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        if (options.strictDepth === true) {
          throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
        }
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
        throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
        throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
      if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
        throw new TypeError("The duplicates option must be either combine, first, or last");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling,
        throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
      };
    };
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? { __proto__: null } : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? { __proto__: null } : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/mime/Mime.js"(exports2, module2) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module2.exports = Mime;
  }
});

// node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/mime/types/standard.js"(exports2, module2) {
    module2.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// node_modules/mime/types/other.js
var require_other = __commonJS({
  "node_modules/mime/types/other.js"(exports2, module2) {
    module2.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// node_modules/mime/index.js
var require_mime = __commonJS({
  "node_modules/mime/index.js"(exports2, module2) {
    "use strict";
    var Mime = require_Mime();
    module2.exports = new Mime(require_standard(), require_other());
  }
});

// node_modules/methods/index.js
var require_methods = __commonJS({
  "node_modules/methods/index.js"(exports2, module2) {
    "use strict";
    var http = require("http");
    module2.exports = getCurrentNodeMethods() || getBasicNodeMethods();
    function getCurrentNodeMethods() {
      return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
        return method.toLowerCase();
      });
    }
    function getBasicNodeMethods() {
      return [
        "get",
        "post",
        "put",
        "head",
        "delete",
        "options",
        "trace",
        "copy",
        "lock",
        "mkcol",
        "move",
        "purge",
        "propfind",
        "proppatch",
        "unlock",
        "report",
        "mkactivity",
        "checkout",
        "merge",
        "m-search",
        "notify",
        "subscribe",
        "unsubscribe",
        "patch",
        "search",
        "connect"
      ];
    }
  }
});

// node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/delayed-stream/lib/delayed_stream.js"(exports2, module2) {
    var Stream = require("stream").Stream;
    var util = require("util");
    module2.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/combined-stream/lib/combined_stream.js"(exports2, module2) {
    var util = require("util");
    var Stream = require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module2.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream) {
      return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
    };
    CombinedStream.prototype.append = function(stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream.on("data", this._checkDataSize.bind(this));
          stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
          stream.pause();
        }
      }
      this._streams.push(stream);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream = this._streams.shift();
      if (typeof stream == "undefined") {
        this.end();
        return;
      }
      if (typeof stream !== "function") {
        this._pipeNext(stream);
        return;
      }
      var getStream = stream;
      getStream(function(stream2) {
        var isStreamLike = CombinedStream.isStreamLike(stream2);
        if (isStreamLike) {
          stream2.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream2);
        }
        this._pipeNext(stream2);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream) {
      this._currentStream = stream;
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on("end", this._getNext.bind(this));
        stream.pipe(this, { end: false });
        return;
      }
      var value = stream;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream) {
      var self = this;
      stream.on("error", function(err) {
        self._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self = this;
      this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
          return;
        }
        self.dataSize += stream.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  }
});

// node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = /* @__PURE__ */ Object.create(null);
    exports2.lookup = lookup;
    exports2.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path) {
      if (!path || typeof path !== "string") {
        return false;
      }
      var extension2 = extname("x." + path).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/asynckit/lib/defer.js"(exports2, module2) {
    module2.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/asynckit/lib/async.js"(exports2, module2) {
    var defer = require_defer();
    module2.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/asynckit/lib/abort.js"(exports2, module2) {
    module2.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/asynckit/lib/iterate.js"(exports2, module2) {
    var async = require_async();
    var abort = require_abort();
    module2.exports = iterate;
    function iterate(list, iterator, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator, key, item, callback) {
      var aborter;
      if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
      } else {
        aborter = iterator(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/asynckit/lib/state.js"(exports2, module2) {
    module2.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
          return sortMethod(list[a], list[b]);
        });
      }
      return initState;
    }
  }
});

// node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/asynckit/lib/terminator.js"(exports2, module2) {
    var abort = require_abort();
    var async = require_async();
    module2.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/asynckit/parallel.js"(exports2, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = parallel;
    function parallel(list, iterator, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator, state, function(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/asynckit/serialOrdered.js"(exports2, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = serialOrdered;
    module2.exports.ascending = ascending;
    module2.exports.descending = descending;
    function serialOrdered(list, iterator, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  }
});

// node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/asynckit/serial.js"(exports2, module2) {
    var serialOrdered = require_serialOrdered();
    module2.exports = serial;
    function serial(list, iterator, callback) {
      return serialOrdered(list, iterator, null, callback);
    }
  }
});

// node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/asynckit/index.js"(exports2, module2) {
    module2.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/has-tostringtag/shams.js"(exports2, module2) {
    "use strict";
    var hasSymbols = require_shams();
    module2.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/es-set-tostringtag/index.js
var require_es_set_tostringtag = __commonJS({
  "node_modules/es-set-tostringtag/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasToStringTag = require_shams2()();
    var hasOwn = require_hasown();
    var $TypeError = require_type();
    var toStringTag = hasToStringTag ? Symbol.toStringTag : null;
    module2.exports = function setToStringTag(object, value) {
      var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
      var nonConfigurable = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
      if (typeof overrideIfSet !== "undefined" && typeof overrideIfSet !== "boolean" || typeof nonConfigurable !== "undefined" && typeof nonConfigurable !== "boolean") {
        throw new $TypeError("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
      }
      if (toStringTag && (overrideIfSet || !hasOwn(object, toStringTag))) {
        if ($defineProperty) {
          $defineProperty(object, toStringTag, {
            configurable: !nonConfigurable,
            enumerable: false,
            value,
            writable: false
          });
        } else {
          object[toStringTag] = value;
        }
      }
    };
  }
});

// node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/form-data/lib/populate.js"(exports2, module2) {
    "use strict";
    module2.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/form-data/lib/form_data.js"(exports2, module2) {
    "use strict";
    var CombinedStream = require_combined_stream();
    var util = require("util");
    var path = require("path");
    var http = require("http");
    var https = require("https");
    var parseUrl = require("url").parse;
    var fs = require("fs");
    var Stream = require("stream").Stream;
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var setToStringTag = require_es_set_tostringtag();
    var hasOwn = require_hasown();
    var populate = require_populate();
    function FormData(options) {
      if (!(this instanceof FormData)) {
        return new FormData(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    util.inherits(FormData, CombinedStream);
    FormData.LINE_BREAK = "\r\n";
    FormData.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options === "string") {
        options = { filename: options };
      }
      var append = CombinedStream.prototype.append.bind(this);
      if (typeof value === "number" || value == null) {
        value = String(value);
      }
      if (Array.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append(header);
      append(value);
      append(footer);
      this._trackLength(header, value, options);
    };
    FormData.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += Number(options.knownLength);
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && hasOwn(value, "httpVersion")) && !(value instanceof Stream)) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData.prototype._lengthRetriever = function(value, callback) {
      if (hasOwn(value, "fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs.stat(value.path, function(err, stat) {
            if (err) {
              callback(err);
              return;
            }
            var fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (hasOwn(value, "httpVersion")) {
        callback(null, Number(value.headers["content-length"]));
      } else if (hasOwn(value, "httpModule")) {
        value.on("response", function(response) {
          value.pause();
          callback(null, Number(response.headers["content-length"]));
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header === "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        // add custom disposition as third element or keep it two elements if not
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header === "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (hasOwn(headers, prop)) {
          header = headers[prop];
          if (header == null) {
            continue;
          }
          if (!Array.isArray(header)) {
            header = [header];
          }
          if (header.length) {
            contents += prop + ": " + header.join("; ") + FormData.LINE_BREAK;
          }
        }
      }
      return "--" + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
    };
    FormData.prototype._getContentDisposition = function(value, options) {
      var filename;
      if (typeof options.filepath === "string") {
        filename = path.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value && (value.name || value.path)) {
        filename = path.basename(options.filename || value && (value.name || value.path));
      } else if (value && value.readable && hasOwn(value, "httpVersion")) {
        filename = path.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        return 'filename="' + filename + '"';
      }
    };
    FormData.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value && value.readable && hasOwn(value, "httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && value && typeof value === "object") {
        contentType = FormData.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData.LINE_BREAK;
    };
    FormData.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (hasOwn(userHeaders, header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData.prototype.setBoundary = function(boundary) {
      if (typeof boundary !== "string") {
        throw new TypeError("FormData boundary must be a string");
      }
      this._boundary = boundary;
    };
    FormData.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== "function") {
          if (Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
          }
          if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData.prototype._generateBoundary = function() {
      var boundary = "--------------------------";
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData.prototype.submit = function(params, cb) {
      var request;
      var options;
      var defaults = { method: "post" };
      if (typeof params === "string") {
        params = parseUrl(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults);
      } else {
        options = populate(params, defaults);
        if (!options.port) {
          options.port = options.protocol === "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol === "https:") {
        request = https.request(options);
      } else {
        request = http.request(options);
      }
      this.getLength(function(err, length) {
        if (err && err !== "Unknown stream") {
          this._error(err);
          return;
        }
        if (length) {
          request.setHeader("Content-Length", length);
        }
        this.pipe(request);
        if (cb) {
          var onResponse;
          var callback = function(error, responce) {
            request.removeListener("error", callback);
            request.removeListener("response", onResponse);
            return cb.call(this, error, responce);
          };
          onResponse = callback.bind(this, null);
          request.on("error", callback);
          request.on("response", onResponse);
        }
      }.bind(this));
      return request;
    };
    FormData.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData.prototype.toString = function() {
      return "[object FormData]";
    };
    setToStringTag(FormData, "FormData");
    module2.exports = FormData;
  }
});

// node_modules/@noble/hashes/_u64.js
var require_u64 = __commonJS({
  "node_modules/@noble/hashes/_u64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toBig = exports2.shrSL = exports2.shrSH = exports2.rotrSL = exports2.rotrSH = exports2.rotrBL = exports2.rotrBH = exports2.rotr32L = exports2.rotr32H = exports2.rotlSL = exports2.rotlSH = exports2.rotlBL = exports2.rotlBH = exports2.add5L = exports2.add5H = exports2.add4L = exports2.add4H = exports2.add3L = exports2.add3H = void 0;
    exports2.add = add;
    exports2.fromBig = fromBig;
    exports2.split = split;
    var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    var _32n = /* @__PURE__ */ BigInt(32);
    function fromBig(n, le = false) {
      if (le)
        return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
      return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
    }
    function split(lst, le = false) {
      const len = lst.length;
      let Ah = new Uint32Array(len);
      let Al = new Uint32Array(len);
      for (let i = 0; i < len; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
      }
      return [Ah, Al];
    }
    var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
    exports2.toBig = toBig;
    var shrSH = (h, _l, s) => h >>> s;
    exports2.shrSH = shrSH;
    var shrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports2.shrSL = shrSL;
    var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    exports2.rotrSH = rotrSH;
    var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports2.rotrSL = rotrSL;
    var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    exports2.rotrBH = rotrBH;
    var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    exports2.rotrBL = rotrBL;
    var rotr32H = (_h, l) => l;
    exports2.rotr32H = rotr32H;
    var rotr32L = (h, _l) => h;
    exports2.rotr32L = rotr32L;
    var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    exports2.rotlSH = rotlSH;
    var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    exports2.rotlSL = rotlSL;
    var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    exports2.rotlBH = rotlBH;
    var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    exports2.rotlBL = rotlBL;
    function add(Ah, Al, Bh, Bl) {
      const l = (Al >>> 0) + (Bl >>> 0);
      return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
    }
    var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    exports2.add3L = add3L;
    var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    exports2.add3H = add3H;
    var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    exports2.add4L = add4L;
    var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    exports2.add4H = add4H;
    var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    exports2.add5L = add5L;
    var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    exports2.add5H = add5H;
    var u64 = {
      fromBig,
      split,
      toBig,
      shrSH,
      shrSL,
      rotrSH,
      rotrSL,
      rotrBH,
      rotrBL,
      rotr32H,
      rotr32L,
      rotlSH,
      rotlSL,
      rotlBH,
      rotlBL,
      add,
      add3L,
      add3H,
      add4L,
      add4H,
      add5H,
      add5L
    };
    exports2.default = u64;
  }
});

// node_modules/@noble/hashes/cryptoNode.js
var require_cryptoNode = __commonJS({
  "node_modules/@noble/hashes/cryptoNode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.crypto = void 0;
    var nc = require("node:crypto");
    exports2.crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
  }
});

// node_modules/@noble/hashes/utils.js
var require_utils2 = __commonJS({
  "node_modules/@noble/hashes/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.wrapXOFConstructorWithOpts = exports2.wrapConstructorWithOpts = exports2.wrapConstructor = exports2.Hash = exports2.nextTick = exports2.swap32IfBE = exports2.byteSwapIfBE = exports2.swap8IfBE = exports2.isLE = void 0;
    exports2.isBytes = isBytes;
    exports2.anumber = anumber;
    exports2.abytes = abytes;
    exports2.ahash = ahash;
    exports2.aexists = aexists;
    exports2.aoutput = aoutput;
    exports2.u8 = u8;
    exports2.u32 = u32;
    exports2.clean = clean;
    exports2.createView = createView;
    exports2.rotr = rotr;
    exports2.rotl = rotl;
    exports2.byteSwap = byteSwap;
    exports2.byteSwap32 = byteSwap32;
    exports2.bytesToHex = bytesToHex;
    exports2.hexToBytes = hexToBytes;
    exports2.asyncLoop = asyncLoop;
    exports2.utf8ToBytes = utf8ToBytes;
    exports2.bytesToUtf8 = bytesToUtf8;
    exports2.toBytes = toBytes;
    exports2.kdfInputToBytes = kdfInputToBytes;
    exports2.concatBytes = concatBytes;
    exports2.checkOpts = checkOpts;
    exports2.createHasher = createHasher;
    exports2.createOptHasher = createOptHasher;
    exports2.createXOFer = createXOFer;
    exports2.randomBytes = randomBytes;
    var crypto_1 = require_cryptoNode();
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function anumber(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      anumber(h.outputLen);
      anumber(h.blockLen);
    }
    function aexists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput(out, instance) {
      abytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u32(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function rotr(word, shift) {
      return word << 32 - shift | word >>> shift;
    }
    function rotl(word, shift) {
      return word << shift | word >>> 32 - shift >>> 0;
    }
    exports2.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    function byteSwap(word) {
      return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    }
    exports2.swap8IfBE = exports2.isLE ? (n) => n : (n) => byteSwap(n);
    exports2.byteSwapIfBE = exports2.swap8IfBE;
    function byteSwap32(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap(arr[i]);
      }
      return arr;
    }
    exports2.swap32IfBE = exports2.isLE ? (u) => u : byteSwap32;
    var hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      abytes(bytes);
      if (hasHexBuiltin)
        return bytes.toHex();
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      if (hasHexBuiltin)
        return Uint8Array.fromHex(hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    var nextTick = async () => {
    };
    exports2.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports2.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes) {
      return new TextDecoder().decode(bytes);
    }
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      abytes(data);
      return data;
    }
    function kdfInputToBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      abytes(data);
      return data;
    }
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    var Hash = class {
    };
    exports2.Hash = Hash;
    function createHasher(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function createOptHasher(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function createXOFer(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports2.wrapConstructor = createHasher;
    exports2.wrapConstructorWithOpts = createOptHasher;
    exports2.wrapXOFConstructorWithOpts = createXOFer;
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  }
});

// node_modules/@noble/hashes/sha3.js
var require_sha3 = __commonJS({
  "node_modules/@noble/hashes/sha3.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shake256 = exports2.shake128 = exports2.keccak_512 = exports2.keccak_384 = exports2.keccak_256 = exports2.keccak_224 = exports2.sha3_512 = exports2.sha3_384 = exports2.sha3_256 = exports2.sha3_224 = exports2.Keccak = void 0;
    exports2.keccakP = keccakP;
    var _u64_ts_1 = require_u64();
    var utils_ts_1 = require_utils2();
    var _0n = BigInt(0);
    var _1n = BigInt(1);
    var _2n = BigInt(2);
    var _7n = BigInt(7);
    var _256n = BigInt(256);
    var _0x71n = BigInt(113);
    var SHA3_PI = [];
    var SHA3_ROTL = [];
    var _SHA3_IOTA = [];
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    var IOTAS = (0, _u64_ts_1.split)(_SHA3_IOTA, true);
    var SHA3_IOTA_H = IOTAS[0];
    var SHA3_IOTA_L = IOTAS[1];
    var rotlH = (h, l, s) => s > 32 ? (0, _u64_ts_1.rotlBH)(h, l, s) : (0, _u64_ts_1.rotlSH)(h, l, s);
    var rotlL = (h, l, s) => s > 32 ? (0, _u64_ts_1.rotlBL)(h, l, s) : (0, _u64_ts_1.rotlSL)(h, l, s);
    function keccakP(s, rounds = 24) {
      const B = new Uint32Array(5 * 2);
      for (let round = 24 - rounds; round < 24; round++) {
        for (let x = 0; x < 10; x++)
          B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
          const idx1 = (x + 8) % 10;
          const idx0 = (x + 2) % 10;
          const B0 = B[idx0];
          const B1 = B[idx0 + 1];
          const Th = rotlH(B0, B1, 1) ^ B[idx1];
          const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
          for (let y = 0; y < 50; y += 10) {
            s[x + y] ^= Th;
            s[x + y + 1] ^= Tl;
          }
        }
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
          const shift = SHA3_ROTL[t];
          const Th = rotlH(curH, curL, shift);
          const Tl = rotlL(curH, curL, shift);
          const PI = SHA3_PI[t];
          curH = s[PI];
          curL = s[PI + 1];
          s[PI] = Th;
          s[PI + 1] = Tl;
        }
        for (let y = 0; y < 50; y += 10) {
          for (let x = 0; x < 10; x++)
            B[x] = s[y + x];
          for (let x = 0; x < 10; x++)
            s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
      }
      (0, utils_ts_1.clean)(B);
    }
    var Keccak = class _Keccak extends utils_ts_1.Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        (0, utils_ts_1.anumber)(outputLen);
        if (!(0 < blockLen && blockLen < 200))
          throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_ts_1.u32)(this.state);
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        (0, utils_ts_1.swap32IfBE)(this.state32);
        keccakP(this.state32, this.rounds);
        (0, utils_ts_1.swap32IfBE)(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        (0, utils_ts_1.aexists)(this);
        data = (0, utils_ts_1.toBytes)(data);
        (0, utils_ts_1.abytes)(data);
        const { blockLen, state } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        (0, utils_ts_1.aexists)(this, false);
        (0, utils_ts_1.abytes)(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        (0, utils_ts_1.anumber)(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        (0, utils_ts_1.aoutput)(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        (0, utils_ts_1.clean)(this.state);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    exports2.Keccak = Keccak;
    var gen = (suffix, blockLen, outputLen) => (0, utils_ts_1.createHasher)(() => new Keccak(blockLen, suffix, outputLen));
    exports2.sha3_224 = (() => gen(6, 144, 224 / 8))();
    exports2.sha3_256 = (() => gen(6, 136, 256 / 8))();
    exports2.sha3_384 = (() => gen(6, 104, 384 / 8))();
    exports2.sha3_512 = (() => gen(6, 72, 512 / 8))();
    exports2.keccak_224 = (() => gen(1, 144, 224 / 8))();
    exports2.keccak_256 = (() => gen(1, 136, 256 / 8))();
    exports2.keccak_384 = (() => gen(1, 104, 384 / 8))();
    exports2.keccak_512 = (() => gen(1, 72, 512 / 8))();
    var genShake = (suffix, blockLen, outputLen) => (0, utils_ts_1.createXOFer)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
    exports2.shake128 = (() => genShake(31, 168, 128 / 8))();
    exports2.shake256 = (() => genShake(31, 136, 256 / 8))();
  }
});

// node_modules/@paralleldrive/cuid2/src/index.js
var require_src = __commonJS({
  "node_modules/@paralleldrive/cuid2/src/index.js"(exports2, module2) {
    var { sha3_512: sha3 } = require_sha3();
    var defaultLength = 24;
    var bigLength = 32;
    var createEntropy = (length = 4, random = Math.random) => {
      let entropy = "";
      while (entropy.length < length) {
        entropy = entropy + Math.floor(random() * 36).toString(36);
      }
      return entropy;
    };
    function bufToBigInt(buf) {
      let bits = 8n;
      let value = 0n;
      for (const i of buf.values()) {
        const bi = BigInt(i);
        value = (value << bits) + bi;
      }
      return value;
    }
    var hash = (input = "") => {
      return bufToBigInt(sha3(input)).toString(36).slice(1);
    };
    var alphabet = Array.from(
      { length: 26 },
      (x, i) => String.fromCharCode(i + 97)
    );
    var randomLetter = (random) => alphabet[Math.floor(random() * alphabet.length)];
    var createFingerprint = ({
      globalObj = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {},
      random = Math.random
    } = {}) => {
      const globals = Object.keys(globalObj).toString();
      const sourceString = globals.length ? globals + createEntropy(bigLength, random) : createEntropy(bigLength, random);
      return hash(sourceString).substring(0, bigLength);
    };
    var createCounter = (count) => () => {
      return count++;
    };
    var initialCountMax = 476782367;
    var init = ({
      // Fallback if the user does not pass in a CSPRNG. This should be OK
      // because we don't rely solely on the random number generator for entropy.
      // We also use the host fingerprint, current time, and a session counter.
      random = Math.random,
      counter = createCounter(Math.floor(random() * initialCountMax)),
      length = defaultLength,
      fingerprint = createFingerprint({ random })
    } = {}) => {
      return function cuid2() {
        const firstLetter = randomLetter(random);
        const time = Date.now().toString(36);
        const count = counter().toString(36);
        const salt = createEntropy(length, random);
        const hashInput = `${time + salt + count + fingerprint}`;
        return `${firstLetter + hash(hashInput).substring(1, length)}`;
      };
    };
    var createId = init();
    var isCuid = (id, { minLength = 2, maxLength = bigLength } = {}) => {
      const length = id.length;
      const regex = /^[0-9a-z]+$/;
      try {
        if (typeof id === "string" && length >= minLength && length <= maxLength && regex.test(id))
          return true;
      } finally {
      }
      return false;
    };
    module2.exports.getConstants = () => ({ defaultLength, bigLength });
    module2.exports.init = init;
    module2.exports.createId = createId;
    module2.exports.bufToBigInt = bufToBigInt;
    module2.exports.createCounter = createCounter;
    module2.exports.createFingerprint = createFingerprint;
    module2.exports.isCuid = isCuid;
  }
});

// node_modules/@paralleldrive/cuid2/index.js
var require_cuid2 = __commonJS({
  "node_modules/@paralleldrive/cuid2/index.js"(exports2, module2) {
    var { createId, init, getConstants, isCuid } = require_src();
    module2.exports.createId = createId;
    module2.exports.init = init;
    module2.exports.getConstants = getConstants;
    module2.exports.isCuid = isCuid;
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports2, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/asap/raw.js
var require_raw = __commonJS({
  "node_modules/asap/raw.js"(exports2, module2) {
    "use strict";
    var domain;
    var hasSetImmediate = typeof setImmediate === "function";
    module2.exports = rawAsap;
    function rawAsap(task) {
      if (!queue.length) {
        requestFlush();
        flushing = true;
      }
      queue[queue.length] = task;
    }
    var queue = [];
    var flushing = false;
    var index = 0;
    var capacity = 1024;
    function flush() {
      while (index < queue.length) {
        var currentIndex = index;
        index = index + 1;
        queue[currentIndex].call();
        if (index > capacity) {
          for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
            queue[scan] = queue[scan + index];
          }
          queue.length -= index;
          index = 0;
        }
      }
      queue.length = 0;
      index = 0;
      flushing = false;
    }
    rawAsap.requestFlush = requestFlush;
    function requestFlush() {
      var parentDomain = process.domain;
      if (parentDomain) {
        if (!domain) {
          domain = require("domain");
        }
        domain.active = process.domain = null;
      }
      if (flushing && hasSetImmediate) {
        setImmediate(flush);
      } else {
        process.nextTick(flush);
      }
      if (parentDomain) {
        domain.active = process.domain = parentDomain;
      }
    }
  }
});

// node_modules/asap/asap.js
var require_asap = __commonJS({
  "node_modules/asap/asap.js"(exports2, module2) {
    "use strict";
    var rawAsap = require_raw();
    var freeTasks = [];
    module2.exports = asap;
    function asap(task) {
      var rawTask;
      if (freeTasks.length) {
        rawTask = freeTasks.pop();
      } else {
        rawTask = new RawTask();
      }
      rawTask.task = task;
      rawTask.domain = process.domain;
      rawAsap(rawTask);
    }
    function RawTask() {
      this.task = null;
      this.domain = null;
    }
    RawTask.prototype.call = function() {
      if (this.domain) {
        this.domain.enter();
      }
      var threw = true;
      try {
        this.task.call();
        threw = false;
        if (this.domain) {
          this.domain.exit();
        }
      } finally {
        if (threw) {
          rawAsap.requestFlush();
        }
        this.task = null;
        this.domain = null;
        freeTasks.push(this);
      }
    };
  }
});

// node_modules/dezalgo/dezalgo.js
var require_dezalgo = __commonJS({
  "node_modules/dezalgo/dezalgo.js"(exports2, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(dezalgo);
    var asap = require_asap();
    function dezalgo(cb) {
      var sync = true;
      asap(function() {
        sync = false;
      });
      return function zalgoSafe() {
        var args = arguments;
        var me = this;
        if (sync)
          asap(function() {
            cb.apply(me, args);
          });
        else
          cb.apply(me, args);
      };
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports2, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/formidable/dist/index.cjs
var require_dist = __commonJS({
  "node_modules/formidable/dist/index.cjs"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs = require("node:fs");
    var crypto = require("node:crypto");
    var node_events = require("node:events");
    var cuid2 = require_cuid2();
    var dezalgo = require_dezalgo();
    var fsPromises = require("node:fs/promises");
    var os = require("node:os");
    var path = require("node:path");
    var node_string_decoder = require("node:string_decoder");
    var once = require_once();
    var node_stream = require("node:stream");
    var PersistentFile = class extends node_events.EventEmitter {
      constructor({ filepath, newFilename, originalFilename, mimetype, hashAlgorithm }) {
        super();
        this.lastModifiedDate = null;
        Object.assign(this, { filepath, newFilename, originalFilename, mimetype, hashAlgorithm });
        this.size = 0;
        this._writeStream = null;
        if (typeof this.hashAlgorithm === "string") {
          this.hash = crypto.createHash(this.hashAlgorithm);
        } else {
          this.hash = null;
        }
      }
      open() {
        this._writeStream = fs.createWriteStream(this.filepath);
        this._writeStream.on("error", (err) => {
          this.emit("error", err);
        });
      }
      toJSON() {
        const json = {
          size: this.size,
          filepath: this.filepath,
          newFilename: this.newFilename,
          mimetype: this.mimetype,
          mtime: this.lastModifiedDate,
          length: this.length,
          originalFilename: this.originalFilename
        };
        if (this.hash && this.hash !== "") {
          json.hash = this.hash;
        }
        return json;
      }
      toString() {
        return `PersistentFile: ${this.newFilename}, Original: ${this.originalFilename}, Path: ${this.filepath}`;
      }
      write(buffer, cb) {
        if (this.hash) {
          this.hash.update(buffer);
        }
        if (this._writeStream.closed) {
          cb();
          return;
        }
        this._writeStream.write(buffer, () => {
          this.lastModifiedDate = /* @__PURE__ */ new Date();
          this.size += buffer.length;
          this.emit("progress", this.size);
          cb();
        });
      }
      end(cb) {
        if (this.hash) {
          this.hash = this.hash.digest("hex");
        }
        this._writeStream.end(() => {
          this.emit("end");
          cb();
        });
      }
      destroy() {
        this._writeStream.destroy();
        const filepath = this.filepath;
        setTimeout(function() {
          fs.unlink(filepath, () => {
          });
        }, 1);
      }
    };
    var VolatileFile = class extends node_events.EventEmitter {
      constructor({ filepath, newFilename, originalFilename, mimetype, hashAlgorithm, createFileWriteStream }) {
        super();
        this.lastModifiedDate = null;
        Object.assign(this, { filepath, newFilename, originalFilename, mimetype, hashAlgorithm, createFileWriteStream });
        this.size = 0;
        this._writeStream = null;
        if (typeof this.hashAlgorithm === "string") {
          this.hash = crypto.createHash(this.hashAlgorithm);
        } else {
          this.hash = null;
        }
      }
      open() {
        this._writeStream = this.createFileWriteStream(this);
        this._writeStream.on("error", (err) => {
          this.emit("error", err);
        });
      }
      destroy() {
        this._writeStream.destroy();
      }
      toJSON() {
        const json = {
          size: this.size,
          newFilename: this.newFilename,
          length: this.length,
          originalFilename: this.originalFilename,
          mimetype: this.mimetype
        };
        if (this.hash && this.hash !== "") {
          json.hash = this.hash;
        }
        return json;
      }
      toString() {
        return `VolatileFile: ${this.originalFilename}`;
      }
      write(buffer, cb) {
        if (this.hash) {
          this.hash.update(buffer);
        }
        if (this._writeStream.closed || this._writeStream.destroyed) {
          cb();
          return;
        }
        this._writeStream.write(buffer, () => {
          this.size += buffer.length;
          this.emit("progress", this.size);
          cb();
        });
      }
      end(cb) {
        if (this.hash) {
          this.hash = this.hash.digest("hex");
        }
        this._writeStream.end(() => {
          this.emit("end");
          cb();
        });
      }
    };
    var missingPlugin = 1e3;
    var pluginFunction = 1001;
    var aborted = 1002;
    var noParser = 1003;
    var uninitializedParser = 1004;
    var filenameNotString = 1005;
    var maxFieldsSizeExceeded = 1006;
    var maxFieldsExceeded = 1007;
    var smallerThanMinFileSize = 1008;
    var biggerThanTotalMaxFileSize = 1009;
    var noEmptyFiles = 1010;
    var missingContentType = 1011;
    var malformedMultipart = 1012;
    var missingMultipartBoundary = 1013;
    var unknownTransferEncoding = 1014;
    var maxFilesExceeded = 1015;
    var biggerThanMaxFileSize = 1016;
    var pluginFailed = 1017;
    var cannotCreateDir = 1018;
    var FormidableError = class extends Error {
      constructor(message, internalCode, httpCode = 500) {
        super(message);
        this.code = internalCode;
        this.httpCode = httpCode;
      }
    };
    var FormidableError$1 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      aborted,
      biggerThanMaxFileSize,
      biggerThanTotalMaxFileSize,
      cannotCreateDir,
      default: FormidableError,
      filenameNotString,
      malformedMultipart,
      maxFieldsExceeded,
      maxFieldsSizeExceeded,
      maxFilesExceeded,
      missingContentType,
      missingMultipartBoundary,
      missingPlugin,
      noEmptyFiles,
      noParser,
      pluginFailed,
      pluginFunction,
      smallerThanMinFileSize,
      uninitializedParser,
      unknownTransferEncoding
    });
    var DummyParser = class extends node_stream.Transform {
      constructor(incomingForm, options = {}) {
        super();
        this.globalOptions = { ...options };
        this.incomingForm = incomingForm;
      }
      _flush(callback) {
        this.incomingForm.ended = true;
        this.incomingForm._maybeEnd();
        callback();
      }
    };
    var s = 0;
    var STATE = {
      PARSER_UNINITIALIZED: s++,
      START: s++,
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      PART_END: s++,
      END: s++
    };
    var f = 1;
    var FBOUNDARY = { PART_BOUNDARY: f, LAST_BOUNDARY: f *= 2 };
    var LF = 10;
    var CR = 13;
    var SPACE = 32;
    var HYPHEN = 45;
    var COLON = 58;
    var A = 97;
    var Z = 122;
    function lower(c) {
      return c | 32;
    }
    var STATES = {};
    Object.keys(STATE).forEach((stateName) => {
      STATES[stateName] = STATE[stateName];
    });
    var MultipartParser = class _MultipartParser extends node_stream.Transform {
      constructor(options = {}) {
        super({ readableObjectMode: true });
        this.boundary = null;
        this.boundaryChars = null;
        this.lookbehind = null;
        this.bufferLength = 0;
        this.state = STATE.PARSER_UNINITIALIZED;
        this.globalOptions = { ...options };
        this.index = null;
        this.flags = 0;
      }
      _endUnexpected() {
        return new FormidableError(
          `MultipartParser.end(): stream ended unexpectedly: ${this.explain()}`,
          malformedMultipart,
          400
        );
      }
      _flush(done) {
        if (this.state === STATE.HEADER_FIELD_START && this.index === 0 || this.state === STATE.PART_DATA && this.index === this.boundary.length) {
          this._handleCallback("partEnd");
          this._handleCallback("end");
          done();
        } else if (this.state !== STATE.END) {
          done(this._endUnexpected());
        } else {
          done();
        }
      }
      initWithBoundary(str) {
        this.boundary = Buffer.from(`\r
--${str}`);
        this.lookbehind = Buffer.alloc(this.boundary.length + 8);
        this.state = STATE.START;
        this.boundaryChars = {};
        for (let i = 0; i < this.boundary.length; i++) {
          this.boundaryChars[this.boundary[i]] = true;
        }
      }
      // eslint-disable-next-line max-params
      _handleCallback(name, buf, start, end) {
        if (start !== void 0 && start === end) {
          return;
        }
        this.push({ name, buffer: buf, start, end });
      }
      // eslint-disable-next-line max-statements
      _transform(buffer, _, done) {
        let i = 0;
        let prevIndex = this.index;
        let { index, state, flags } = this;
        const { lookbehind, boundary, boundaryChars } = this;
        const boundaryLength = boundary.length;
        const boundaryEnd = boundaryLength - 1;
        this.bufferLength = buffer.length;
        let c = null;
        let cl = null;
        const setMark = (name, idx) => {
          this[`${name}Mark`] = typeof idx === "number" ? idx : i;
        };
        const clearMarkSymbol = (name) => {
          delete this[`${name}Mark`];
        };
        const dataCallback = (name, shouldClear) => {
          const markSymbol = `${name}Mark`;
          if (!(markSymbol in this)) {
            return;
          }
          if (!shouldClear) {
            this._handleCallback(name, buffer, this[markSymbol], buffer.length);
            setMark(name, 0);
          } else {
            this._handleCallback(name, buffer, this[markSymbol], i);
            clearMarkSymbol(name);
          }
        };
        for (i = 0; i < this.bufferLength; i++) {
          c = buffer[i];
          switch (state) {
            case STATE.PARSER_UNINITIALIZED:
              done(this._endUnexpected());
              return;
            case STATE.START:
              index = 0;
              state = STATE.START_BOUNDARY;
            case STATE.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= FBOUNDARY.LAST_BOUNDARY;
                } else if (c !== CR) {
                  done(this._endUnexpected());
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & FBOUNDARY.LAST_BOUNDARY && c === HYPHEN) {
                  this._handleCallback("end");
                  state = STATE.END;
                  flags = 0;
                } else if (!(flags & FBOUNDARY.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  this._handleCallback("partBegin");
                  state = STATE.HEADER_FIELD_START;
                } else {
                  done(this._endUnexpected());
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case STATE.HEADER_FIELD_START:
              state = STATE.HEADER_FIELD;
              setMark("headerField");
              index = 0;
            case STATE.HEADER_FIELD:
              if (c === CR) {
                clearMarkSymbol("headerField");
                state = STATE.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  done(this._endUnexpected());
                  return;
                }
                dataCallback("headerField", true);
                state = STATE.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                done(this._endUnexpected());
                return;
              }
              break;
            case STATE.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              setMark("headerValue");
              state = STATE.HEADER_VALUE;
            case STATE.HEADER_VALUE:
              if (c === CR) {
                dataCallback("headerValue", true);
                this._handleCallback("headerEnd");
                state = STATE.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case STATE.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                done(this._endUnexpected());
                return;
              }
              state = STATE.HEADER_FIELD_START;
              break;
            case STATE.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                done(this._endUnexpected());
                return;
              }
              this._handleCallback("headersEnd");
              state = STATE.PART_DATA_START;
              break;
            case STATE.PART_DATA_START:
              state = STATE.PART_DATA;
              setMark("partData");
            case STATE.PART_DATA:
              prevIndex = index;
              if (index === 0) {
                i += boundaryEnd;
                while (i < this.bufferLength && !(buffer[i] in boundaryChars)) {
                  i += boundaryLength;
                }
                i -= boundaryEnd;
                c = buffer[i];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("partData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= FBOUNDARY.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= FBOUNDARY.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & FBOUNDARY.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~FBOUNDARY.PART_BOUNDARY;
                    this._handleCallback("partEnd");
                    this._handleCallback("partBegin");
                    state = STATE.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & FBOUNDARY.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    this._handleCallback("partEnd");
                    this._handleCallback("end");
                    state = STATE.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (prevIndex > 0) {
                this._handleCallback("partData", lookbehind, 0, prevIndex);
                prevIndex = 0;
                setMark("partData");
                i--;
              }
              break;
            case STATE.END:
              break;
            default:
              done(this._endUnexpected());
              return;
          }
        }
        dataCallback("headerField");
        dataCallback("headerValue");
        dataCallback("partData");
        this.index = index;
        this.state = state;
        this.flags = flags;
        done();
        return this.bufferLength;
      }
      explain() {
        return `state = ${_MultipartParser.stateToString(this.state)}`;
      }
    };
    MultipartParser.stateToString = (stateNumber) => {
      for (const stateName in STATE) {
        const number = STATE[stateName];
        if (number === stateNumber) return stateName;
      }
    };
    var MultipartParser$1 = Object.assign(MultipartParser, { STATES });
    var OctetStreamParser = class extends node_stream.PassThrough {
      constructor(options = {}) {
        super();
        this.globalOptions = { ...options };
      }
    };
    var octetStreamType = "octet-stream";
    async function plugin$3(formidable2, options) {
      const self = this || formidable2;
      if (/octet-stream/i.test(self.headers["content-type"])) {
        await init$2.call(self, self, options);
      }
      return self;
    }
    async function init$2(_self, _opts) {
      this.type = octetStreamType;
      const originalFilename = this.headers["x-file-name"];
      const mimetype = this.headers["content-type"];
      const thisPart = {
        originalFilename,
        mimetype
      };
      const newFilename = this._getNewName(thisPart);
      const filepath = this._joinDirectoryName(newFilename);
      const file = await this._newFile({
        newFilename,
        filepath,
        originalFilename,
        mimetype
      });
      this.emit("fileBegin", originalFilename, file);
      file.open();
      this.openedFiles.push(file);
      this._flushing += 1;
      this._parser = new OctetStreamParser(this.options);
      let outstandingWrites = 0;
      this._parser.on("data", (buffer) => {
        this.pause();
        outstandingWrites += 1;
        file.write(buffer, () => {
          outstandingWrites -= 1;
          this.resume();
          if (this.ended) {
            this._parser.emit("doneWritingFile");
          }
        });
      });
      this._parser.on("end", () => {
        this._flushing -= 1;
        this.ended = true;
        const done = () => {
          file.end(() => {
            this.emit("file", "file", file);
            this._maybeEnd();
          });
        };
        if (outstandingWrites === 0) {
          done();
        } else {
          this._parser.once("doneWritingFile", done);
        }
      });
      return this;
    }
    var QuerystringParser = class extends node_stream.Transform {
      constructor(options = {}) {
        super({ readableObjectMode: true });
        this.globalOptions = { ...options };
        this.buffer = "";
        this.bufferLength = 0;
      }
      _transform(buffer, encoding, callback) {
        this.buffer += buffer.toString("ascii");
        this.bufferLength = this.buffer.length;
        callback();
      }
      _flush(callback) {
        const fields = new URLSearchParams(this.buffer);
        for (const [key, value] of fields) {
          this.push({
            key,
            value
          });
        }
        this.buffer = "";
        callback();
      }
    };
    var querystringType = "urlencoded";
    function plugin$2(formidable2, options) {
      const self = this || formidable2;
      if (/urlencoded/i.test(self.headers["content-type"])) {
        init$1.call(self, self, options);
      }
      return self;
    }
    function init$1(_self, _opts) {
      this.type = querystringType;
      const parser = new QuerystringParser(this.options);
      parser.on("data", ({ key, value }) => {
        this.emit("field", key, value);
      });
      parser.once("end", () => {
        this.ended = true;
        this._maybeEnd();
      });
      this._parser = parser;
      return this;
    }
    var multipartType = "multipart";
    function plugin$1(formidable2, options) {
      const self = this || formidable2;
      const multipart = /multipart/i.test(self.headers["content-type"]);
      if (multipart) {
        const m = self.headers["content-type"].match(
          /boundary=(?:"([^"]+)"|([^;]+))/i
        );
        if (m) {
          const initMultipart = createInitMultipart(m[1] || m[2]);
          initMultipart.call(self, self, options);
        } else {
          const err = new FormidableError(
            "bad content-type header, no multipart boundary",
            missingMultipartBoundary,
            400
          );
          self._error(err);
        }
      }
      return self;
    }
    function createInitMultipart(boundary) {
      return function initMultipart() {
        this.type = multipartType;
        const parser = new MultipartParser$1(this.options);
        let headerField;
        let headerValue;
        let part;
        parser.initWithBoundary(boundary);
        parser.on("data", async ({ name, buffer, start, end }) => {
          if (name === "partBegin") {
            part = new node_stream.Stream();
            part.readable = true;
            part.headers = {};
            part.name = null;
            part.originalFilename = null;
            part.mimetype = null;
            part.transferEncoding = this.options.encoding;
            part.transferBuffer = "";
            headerField = "";
            headerValue = "";
          } else if (name === "headerField") {
            headerField += buffer.toString(this.options.encoding, start, end);
          } else if (name === "headerValue") {
            headerValue += buffer.toString(this.options.encoding, start, end);
          } else if (name === "headerEnd") {
            headerField = headerField.toLowerCase();
            part.headers[headerField] = headerValue;
            const m = headerValue.match(
              // eslint-disable-next-line no-useless-escape
              /\bname=("([^"]*)"|([^\(\)<>@,;:\\"\/\[\]\?=\{\}\s\t/]+))/i
            );
            if (headerField === "content-disposition") {
              if (m) {
                part.name = m[2] || m[3] || "";
              }
              part.originalFilename = this._getFileName(headerValue);
            } else if (headerField === "content-type") {
              part.mimetype = headerValue;
            } else if (headerField === "content-transfer-encoding") {
              part.transferEncoding = headerValue.toLowerCase();
            }
            headerField = "";
            headerValue = "";
          } else if (name === "headersEnd") {
            switch (part.transferEncoding) {
              case "binary":
              case "7bit":
              case "8bit":
              case "utf-8": {
                const dataPropagation = (ctx) => {
                  if (ctx.name === "partData") {
                    part.emit("data", ctx.buffer.slice(ctx.start, ctx.end));
                  }
                };
                const dataStopPropagation = (ctx) => {
                  if (ctx.name === "partEnd") {
                    part.emit("end");
                    parser.off("data", dataPropagation);
                    parser.off("data", dataStopPropagation);
                  }
                };
                parser.on("data", dataPropagation);
                parser.on("data", dataStopPropagation);
                break;
              }
              case "base64": {
                const dataPropagation = (ctx) => {
                  if (ctx.name === "partData") {
                    part.transferBuffer += ctx.buffer.slice(ctx.start, ctx.end).toString("ascii");
                    const offset = parseInt(part.transferBuffer.length / 4, 10) * 4;
                    part.emit(
                      "data",
                      Buffer.from(
                        part.transferBuffer.substring(0, offset),
                        "base64"
                      )
                    );
                    part.transferBuffer = part.transferBuffer.substring(offset);
                  }
                };
                const dataStopPropagation = (ctx) => {
                  if (ctx.name === "partEnd") {
                    part.emit("data", Buffer.from(part.transferBuffer, "base64"));
                    part.emit("end");
                    parser.off("data", dataPropagation);
                    parser.off("data", dataStopPropagation);
                  }
                };
                parser.on("data", dataPropagation);
                parser.on("data", dataStopPropagation);
                break;
              }
              default:
                return this._error(
                  new FormidableError(
                    "unknown transfer-encoding",
                    unknownTransferEncoding,
                    501
                  )
                );
            }
            this._parser.pause();
            await this.onPart(part);
            this._parser.resume();
          } else if (name === "end") {
            this.ended = true;
            this._maybeEnd();
          }
        });
        this._parser = parser;
      };
    }
    var JSONParser = class extends node_stream.Transform {
      constructor(options = {}) {
        super({ readableObjectMode: true });
        this.chunks = [];
        this.globalOptions = { ...options };
      }
      _transform(chunk, encoding, callback) {
        this.chunks.push(String(chunk));
        callback();
      }
      _flush(callback) {
        try {
          const fields = JSON.parse(this.chunks.join(""));
          this.push(fields);
        } catch (e) {
          callback(e);
          return;
        }
        this.chunks = null;
        callback();
      }
    };
    var jsonType = "json";
    function plugin(formidable2, options) {
      const self = this || formidable2;
      if (/json/i.test(self.headers["content-type"])) {
        init.call(self, self, options);
      }
      return self;
    }
    function init(_self, _opts) {
      this.type = jsonType;
      const parser = new JSONParser(this.options);
      parser.on("data", (fields) => {
        this.fields = fields;
      });
      parser.once("end", () => {
        this.ended = true;
        this._maybeEnd();
      });
      this._parser = parser;
    }
    var CUID2_FINGERPRINT = `${process.env.NODE_ENV}-${os.platform()}-${os.hostname()}`;
    var createId = cuid2.init({ length: 25, fingerprint: CUID2_FINGERPRINT.toLowerCase() });
    var DEFAULT_OPTIONS = {
      maxFields: 1e3,
      maxFieldsSize: 20 * 1024 * 1024,
      maxFiles: Infinity,
      maxFileSize: 200 * 1024 * 1024,
      maxTotalFileSize: void 0,
      minFileSize: 1,
      allowEmptyFiles: false,
      createDirsFromUploads: false,
      keepExtensions: false,
      encoding: "utf-8",
      hashAlgorithm: false,
      uploadDir: os.tmpdir(),
      enabledPlugins: [plugin$3, plugin$2, plugin$1, plugin],
      fileWriteStreamHandler: null,
      defaultInvalidName: "invalid-name",
      filter(_part) {
        return true;
      },
      filename: void 0
    };
    function hasOwnProp(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    var decorateForceSequential = function(promiseCreator) {
      let lastPromise = Promise.resolve();
      return async function(...x) {
        const promiseWeAreWaitingFor = lastPromise;
        let currentPromise;
        let callback;
        lastPromise = new Promise(function(resolve) {
          callback = resolve;
        });
        await promiseWeAreWaitingFor;
        currentPromise = promiseCreator(...x);
        currentPromise.then(callback).catch(callback);
        return currentPromise;
      };
    };
    var createNecessaryDirectoriesAsync = decorateForceSequential(function(filePath) {
      const directoryname = path.dirname(filePath);
      return fsPromises.mkdir(directoryname, { recursive: true });
    });
    var invalidExtensionChar = (c) => {
      const code = c.charCodeAt(0);
      return !(code === 46 || // .
      code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122);
    };
    var IncomingForm = class extends node_events.EventEmitter {
      constructor(options = {}) {
        super();
        this.options = { ...DEFAULT_OPTIONS, ...options };
        if (!this.options.maxTotalFileSize) {
          this.options.maxTotalFileSize = this.options.maxFileSize;
        }
        const dir = path.resolve(
          this.options.uploadDir || this.options.uploaddir || os.tmpdir()
        );
        this.uploaddir = dir;
        this.uploadDir = dir;
        [
          "error",
          "headers",
          "type",
          "bytesExpected",
          "bytesReceived",
          "_parser",
          "req"
        ].forEach((key) => {
          this[key] = null;
        });
        this._setUpRename();
        this._flushing = 0;
        this._fieldsSize = 0;
        this._totalFileSize = 0;
        this._plugins = [];
        this.openedFiles = [];
        this.options.enabledPlugins = [].concat(this.options.enabledPlugins).filter(Boolean);
        if (this.options.enabledPlugins.length === 0) {
          throw new FormidableError(
            "expect at least 1 enabled builtin plugin, see options.enabledPlugins",
            missingPlugin
          );
        }
        this.options.enabledPlugins.forEach((plugin2) => {
          this.use(plugin2);
        });
        this._setUpMaxFields();
        this._setUpMaxFiles();
        this.ended = void 0;
        this.type = void 0;
      }
      use(plugin2) {
        if (typeof plugin2 !== "function") {
          throw new FormidableError(
            ".use: expect `plugin` to be a function",
            pluginFunction
          );
        }
        this._plugins.push(plugin2.bind(this));
        return this;
      }
      pause() {
        try {
          this.req.pause();
        } catch (err) {
          if (!this.ended) {
            this._error(err);
          }
          return false;
        }
        return true;
      }
      resume() {
        try {
          this.req.resume();
        } catch (err) {
          if (!this.ended) {
            this._error(err);
          }
          return false;
        }
        return true;
      }
      // returns a promise if no callback is provided
      async parse(req, cb) {
        this.req = req;
        let promise;
        if (!cb) {
          let resolveRef;
          let rejectRef;
          promise = new Promise((resolve, reject) => {
            resolveRef = resolve;
            rejectRef = reject;
          });
          cb = (err, fields, files2) => {
            if (err) {
              rejectRef(err);
            } else {
              resolveRef([fields, files2]);
            }
          };
        }
        const callback = once(dezalgo(cb));
        this.fields = {};
        const files = {};
        this.on("field", (name, value) => {
          if (this.type === "multipart" || this.type === "urlencoded") {
            if (!hasOwnProp(this.fields, name)) {
              this.fields[name] = [value];
            } else {
              this.fields[name].push(value);
            }
          } else {
            this.fields[name] = value;
          }
        });
        this.on("file", (name, file) => {
          if (!hasOwnProp(files, name)) {
            files[name] = [file];
          } else {
            files[name].push(file);
          }
        });
        this.on("error", (err) => {
          callback(err, this.fields, files);
        });
        this.on("end", () => {
          callback(null, this.fields, files);
        });
        await this.writeHeaders(req.headers);
        req.on("error", (err) => {
          this._error(err);
        }).on("aborted", () => {
          this.emit("aborted");
          this._error(new FormidableError("Request aborted", aborted));
        }).on("data", (buffer) => {
          try {
            this.write(buffer);
          } catch (err) {
            this._error(err);
          }
        }).on("end", () => {
          if (this.error) {
            return;
          }
          if (this._parser) {
            this._parser.end();
          }
        });
        if (promise) {
          return promise;
        }
        return this;
      }
      async writeHeaders(headers) {
        this.headers = headers;
        this._parseContentLength();
        await this._parseContentType();
        if (!this._parser) {
          this._error(
            new FormidableError(
              "no parser found",
              noParser,
              415
              // Unsupported Media Type
            )
          );
          return;
        }
        this._parser.once("error", (error) => {
          this._error(error);
        });
      }
      write(buffer) {
        if (this.error) {
          return null;
        }
        if (!this._parser) {
          this._error(
            new FormidableError("uninitialized parser", uninitializedParser)
          );
          return null;
        }
        this.bytesReceived += buffer.length;
        this.emit("progress", this.bytesReceived, this.bytesExpected);
        this._parser.write(buffer);
        return this.bytesReceived;
      }
      onPart(part) {
        return this._handlePart(part);
      }
      async _handlePart(part) {
        if (part.originalFilename && typeof part.originalFilename !== "string") {
          this._error(
            new FormidableError(
              `the part.originalFilename should be string when it exists`,
              filenameNotString
            )
          );
          return;
        }
        if (!part.mimetype) {
          let value = "";
          const decoder = new node_string_decoder.StringDecoder(
            part.transferEncoding || this.options.encoding
          );
          part.on("data", (buffer) => {
            this._fieldsSize += buffer.length;
            if (this._fieldsSize > this.options.maxFieldsSize) {
              this._error(
                new FormidableError(
                  `options.maxFieldsSize (${this.options.maxFieldsSize} bytes) exceeded, received ${this._fieldsSize} bytes of field data`,
                  maxFieldsSizeExceeded,
                  413
                  // Payload Too Large
                )
              );
              return;
            }
            value += decoder.write(buffer);
          });
          part.on("end", () => {
            this.emit("field", part.name, value);
          });
          return;
        }
        if (!this.options.filter(part)) {
          return;
        }
        this._flushing += 1;
        let fileSize = 0;
        const newFilename = this._getNewName(part);
        const filepath = this._joinDirectoryName(newFilename);
        const file = await this._newFile({
          newFilename,
          filepath,
          originalFilename: part.originalFilename,
          mimetype: part.mimetype
        });
        file.on("error", (err) => {
          this._error(err);
        });
        this.emit("fileBegin", part.name, file);
        file.open();
        this.openedFiles.push(file);
        part.on("data", (buffer) => {
          this._totalFileSize += buffer.length;
          fileSize += buffer.length;
          if (this._totalFileSize > this.options.maxTotalFileSize) {
            this._error(
              new FormidableError(
                `options.maxTotalFileSize (${this.options.maxTotalFileSize} bytes) exceeded, received ${this._totalFileSize} bytes of file data`,
                biggerThanTotalMaxFileSize,
                413
              )
            );
            return;
          }
          if (buffer.length === 0) {
            return;
          }
          this.pause();
          file.write(buffer, () => {
            this.resume();
          });
        });
        part.on("end", () => {
          if (!this.options.allowEmptyFiles && fileSize === 0) {
            this._error(
              new FormidableError(
                `options.allowEmptyFiles is false, file size should be greater than 0`,
                noEmptyFiles,
                400
              )
            );
            return;
          }
          if (fileSize < this.options.minFileSize) {
            this._error(
              new FormidableError(
                `options.minFileSize (${this.options.minFileSize} bytes) inferior, received ${fileSize} bytes of file data`,
                smallerThanMinFileSize,
                400
              )
            );
            return;
          }
          if (fileSize > this.options.maxFileSize) {
            this._error(
              new FormidableError(
                `options.maxFileSize (${this.options.maxFileSize} bytes), received ${fileSize} bytes of file data`,
                biggerThanMaxFileSize,
                413
              )
            );
            return;
          }
          file.end(() => {
            this._flushing -= 1;
            this.emit("file", part.name, file);
            this._maybeEnd();
          });
        });
      }
      // eslint-disable-next-line max-statements
      async _parseContentType() {
        if (this.bytesExpected === 0) {
          this._parser = new DummyParser(this, this.options);
          return;
        }
        if (!this.headers["content-type"]) {
          this._error(
            new FormidableError(
              "bad content-type header, no content-type",
              missingContentType,
              400
            )
          );
          return;
        }
        new DummyParser(this, this.options);
        const results = [];
        await Promise.all(this._plugins.map(async (plugin2, idx) => {
          let pluginReturn = null;
          try {
            pluginReturn = await plugin2(this, this.options) || this;
          } catch (err) {
            const error = new FormidableError(
              `plugin on index ${idx} failed with: ${err.message}`,
              pluginFailed,
              500
            );
            error.idx = idx;
            throw error;
          }
          Object.assign(this, pluginReturn);
          this.emit("plugin", idx, pluginReturn);
        }));
        this.emit("pluginsResults", results);
      }
      _error(err, eventName = "error") {
        if (this.error || this.ended) {
          return;
        }
        this.req = null;
        this.error = err;
        this.emit(eventName, err);
        this.openedFiles.forEach((file) => {
          file.destroy();
        });
      }
      _parseContentLength() {
        this.bytesReceived = 0;
        if (this.headers["content-length"]) {
          this.bytesExpected = parseInt(this.headers["content-length"], 10);
        } else if (this.headers["transfer-encoding"] === void 0) {
          this.bytesExpected = 0;
        }
        if (this.bytesExpected !== null) {
          this.emit("progress", this.bytesReceived, this.bytesExpected);
        }
      }
      _newParser() {
        return new MultipartParser$1(this.options);
      }
      async _newFile({ filepath, originalFilename, mimetype, newFilename }) {
        if (this.options.fileWriteStreamHandler) {
          return new VolatileFile({
            newFilename,
            filepath,
            originalFilename,
            mimetype,
            createFileWriteStream: this.options.fileWriteStreamHandler,
            hashAlgorithm: this.options.hashAlgorithm
          });
        }
        if (this.options.createDirsFromUploads) {
          try {
            await createNecessaryDirectoriesAsync(filepath);
          } catch (errorCreatingDir) {
            this._error(new FormidableError(
              `cannot create directory`,
              cannotCreateDir,
              409
            ));
          }
        }
        return new PersistentFile({
          newFilename,
          filepath,
          originalFilename,
          mimetype,
          hashAlgorithm: this.options.hashAlgorithm
        });
      }
      _getFileName(headerValue) {
        const m = headerValue.match(
          /\bfilename=("(.*?)"|([^()<>{}[\]@,;:"?=\s/\t]+))($|;\s)/i
        );
        if (!m) return null;
        const match = m[2] || m[3] || "";
        let originalFilename = match.substr(match.lastIndexOf("\\") + 1);
        originalFilename = originalFilename.replace(/%22/g, '"');
        originalFilename = originalFilename.replace(
          /&#([\d]{4});/g,
          (_, code) => String.fromCharCode(code)
        );
        return originalFilename;
      }
      // able to get composed extension with multiple dots
      // "a.b.c" -> ".b.c"
      // as opposed to path.extname -> ".c"
      _getExtension(str) {
        if (!str) {
          return "";
        }
        const basename = path.basename(str);
        const firstDot = basename.indexOf(".");
        const lastDot = basename.lastIndexOf(".");
        let rawExtname = path.extname(basename);
        if (firstDot !== lastDot) {
          rawExtname = basename.slice(firstDot);
        }
        let filtered;
        const firstInvalidIndex = Array.from(rawExtname).findIndex(invalidExtensionChar);
        if (firstInvalidIndex === -1) {
          filtered = rawExtname;
        } else {
          filtered = rawExtname.substring(0, firstInvalidIndex);
        }
        if (filtered === ".") {
          return "";
        }
        return filtered;
      }
      _joinDirectoryName(name) {
        const newPath = path.join(this.uploadDir, name);
        if (!newPath.startsWith(this.uploadDir)) {
          return path.join(this.uploadDir, this.options.defaultInvalidName);
        }
        return newPath;
      }
      _setUpRename() {
        const hasRename = typeof this.options.filename === "function";
        if (hasRename) {
          this._getNewName = (part) => {
            let ext = "";
            let name = this.options.defaultInvalidName;
            if (part.originalFilename) {
              ({ ext, name } = path.parse(part.originalFilename));
              if (this.options.keepExtensions !== true) {
                ext = "";
              }
            }
            return this.options.filename.call(this, name, ext, part, this);
          };
        } else {
          this._getNewName = (part) => {
            const name = createId();
            if (part && this.options.keepExtensions) {
              const originalFilename = typeof part === "string" ? part : part.originalFilename;
              return `${name}${this._getExtension(originalFilename)}`;
            }
            return name;
          };
        }
      }
      _setUpMaxFields() {
        if (this.options.maxFields !== Infinity) {
          let fieldsCount = 0;
          this.on("field", () => {
            fieldsCount += 1;
            if (fieldsCount > this.options.maxFields) {
              this._error(
                new FormidableError(
                  `options.maxFields (${this.options.maxFields}) exceeded`,
                  maxFieldsExceeded,
                  413
                )
              );
            }
          });
        }
      }
      _setUpMaxFiles() {
        if (this.options.maxFiles !== Infinity) {
          let fileCount = 0;
          this.on("fileBegin", () => {
            fileCount += 1;
            if (fileCount > this.options.maxFiles) {
              this._error(
                new FormidableError(
                  `options.maxFiles (${this.options.maxFiles}) exceeded`,
                  maxFilesExceeded,
                  413
                )
              );
            }
          });
        }
      }
      _maybeEnd() {
        if (!this.ended || this._flushing || this.error) {
          return;
        }
        this.req = null;
        this.emit("end");
      }
    };
    var formidable = (...args) => new IncomingForm(...args);
    var { enabledPlugins } = DEFAULT_OPTIONS;
    exports2.DummyParser = DummyParser;
    exports2.File = PersistentFile;
    exports2.Formidable = IncomingForm;
    exports2.IncomingForm = IncomingForm;
    exports2.JSONParser = JSONParser;
    exports2.MultipartParser = MultipartParser$1;
    exports2.OctetStreamParser = OctetStreamParser;
    exports2.OctetstreamParser = OctetStreamParser;
    exports2.PersistentFile = PersistentFile;
    exports2.QueryStringParser = QuerystringParser;
    exports2.QuerystringParser = QuerystringParser;
    exports2.VolatileFile = VolatileFile;
    exports2.default = formidable;
    exports2.defaultOptions = DEFAULT_OPTIONS;
    exports2.enabledPlugins = enabledPlugins;
    exports2.errors = FormidableError$1;
    exports2.formidable = formidable;
    exports2.json = plugin;
    exports2.multipart = plugin$1;
    exports2.octetstream = plugin$3;
    exports2.querystring = plugin$2;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var flagForceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      flagForceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      flagForceColor = 1;
    }
    function envForceColor() {
      if ("FORCE_COLOR" in env) {
        if (env.FORCE_COLOR === "true") {
          return 1;
        }
        if (env.FORCE_COLOR === "false") {
          return 0;
        }
        return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
      const noFlagForceColor = envForceColor();
      if (noFlagForceColor !== void 0) {
        flagForceColor = noFlagForceColor;
      }
      const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
      if (forceColor === 0) {
        return 0;
      }
      if (sniffFlags) {
        if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
          return 3;
        }
        if (hasFlag("color=256")) {
          return 2;
        }
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream, options = {}) {
      const level = supportsColor(stream, {
        streamIsTTY: stream && stream.isTTY,
        ...options
      });
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel({ isTTY: tty.isatty(1) }),
      stderr: getSupportLevel({ isTTY: tty.isatty(2) })
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/cookiejar/cookiejar.js
var require_cookiejar = __commonJS({
  "node_modules/cookiejar/cookiejar.js"(exports2) {
    (function() {
      "use strict";
      function CookieAccessInfo(domain, path, secure, script) {
        if (this instanceof CookieAccessInfo) {
          this.domain = domain || void 0;
          this.path = path || "/";
          this.secure = !!secure;
          this.script = !!script;
          return this;
        }
        return new CookieAccessInfo(domain, path, secure, script);
      }
      CookieAccessInfo.All = Object.freeze(/* @__PURE__ */ Object.create(null));
      exports2.CookieAccessInfo = CookieAccessInfo;
      function Cookie(cookiestr, request_domain, request_path) {
        if (cookiestr instanceof Cookie) {
          return cookiestr;
        }
        if (this instanceof Cookie) {
          this.name = null;
          this.value = null;
          this.expiration_date = Infinity;
          this.path = String(request_path || "/");
          this.explicit_path = false;
          this.domain = request_domain || null;
          this.explicit_domain = false;
          this.secure = false;
          this.noscript = false;
          if (cookiestr) {
            this.parse(cookiestr, request_domain, request_path);
          }
          return this;
        }
        return new Cookie(cookiestr, request_domain, request_path);
      }
      exports2.Cookie = Cookie;
      Cookie.prototype.toString = function toString() {
        var str = [this.name + "=" + this.value];
        if (this.expiration_date !== Infinity) {
          str.push("expires=" + new Date(this.expiration_date).toGMTString());
        }
        if (this.domain) {
          str.push("domain=" + this.domain);
        }
        if (this.path) {
          str.push("path=" + this.path);
        }
        if (this.secure) {
          str.push("secure");
        }
        if (this.noscript) {
          str.push("httponly");
        }
        return str.join("; ");
      };
      Cookie.prototype.toValueString = function toValueString() {
        return this.name + "=" + this.value;
      };
      var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;
      Cookie.prototype.parse = function parse(str, request_domain, request_path) {
        if (this instanceof Cookie) {
          if (str.length > 32768) {
            console.warn("Cookie too long for parsing (>32768 characters)");
            return;
          }
          var parts = str.split(";").filter(function(value2) {
            return !!value2;
          });
          var i;
          var pair = parts[0].match(/([^=]+)=([\s\S]*)/);
          if (!pair) {
            console.warn("Invalid cookie header encountered. Header: '" + str + "'");
            return;
          }
          var key = pair[1];
          var value = pair[2];
          if (typeof key !== "string" || key.length === 0 || typeof value !== "string") {
            console.warn("Unable to extract values from cookie header. Cookie: '" + str + "'");
            return;
          }
          this.name = key;
          this.value = value;
          for (i = 1; i < parts.length; i += 1) {
            pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
            key = pair[1].trim().toLowerCase();
            value = pair[2];
            switch (key) {
              case "httponly":
                this.noscript = true;
                break;
              case "expires":
                this.expiration_date = value ? Number(Date.parse(value)) : Infinity;
                break;
              case "path":
                this.path = value ? value.trim() : "";
                this.explicit_path = true;
                break;
              case "domain":
                this.domain = value ? value.trim() : "";
                this.explicit_domain = !!this.domain;
                break;
              case "secure":
                this.secure = true;
                break;
            }
          }
          if (!this.explicit_path) {
            this.path = request_path || "/";
          }
          if (!this.explicit_domain) {
            this.domain = request_domain;
          }
          return this;
        }
        return new Cookie().parse(str, request_domain, request_path);
      };
      Cookie.prototype.matches = function matches(access_info) {
        if (access_info === CookieAccessInfo.All) {
          return true;
        }
        if (this.noscript && access_info.script || this.secure && !access_info.secure || !this.collidesWith(access_info)) {
          return false;
        }
        return true;
      };
      Cookie.prototype.collidesWith = function collidesWith(access_info) {
        if (this.path && !access_info.path || this.domain && !access_info.domain) {
          return false;
        }
        if (this.path && access_info.path.indexOf(this.path) !== 0) {
          return false;
        }
        if (this.explicit_path && access_info.path.indexOf(this.path) !== 0) {
          return false;
        }
        var access_domain = access_info.domain && access_info.domain.replace(/^[\.]/, "");
        var cookie_domain = this.domain && this.domain.replace(/^[\.]/, "");
        if (cookie_domain === access_domain) {
          return true;
        }
        if (cookie_domain) {
          if (!this.explicit_domain) {
            return false;
          }
          var wildcard = access_domain.indexOf(cookie_domain);
          if (wildcard === -1 || wildcard !== access_domain.length - cookie_domain.length) {
            return false;
          }
          return true;
        }
        return true;
      };
      function CookieJar() {
        var cookies, cookies_list, collidable_cookie;
        if (this instanceof CookieJar) {
          cookies = /* @__PURE__ */ Object.create(null);
          this.setCookie = function setCookie(cookie, request_domain, request_path) {
            var remove, i;
            cookie = new Cookie(cookie, request_domain, request_path);
            remove = cookie.expiration_date <= Date.now();
            if (cookies[cookie.name] !== void 0) {
              cookies_list = cookies[cookie.name];
              for (i = 0; i < cookies_list.length; i += 1) {
                collidable_cookie = cookies_list[i];
                if (collidable_cookie.collidesWith(cookie)) {
                  if (remove) {
                    cookies_list.splice(i, 1);
                    if (cookies_list.length === 0) {
                      delete cookies[cookie.name];
                    }
                    return false;
                  }
                  cookies_list[i] = cookie;
                  return cookie;
                }
              }
              if (remove) {
                return false;
              }
              cookies_list.push(cookie);
              return cookie;
            }
            if (remove) {
              return false;
            }
            cookies[cookie.name] = [cookie];
            return cookies[cookie.name];
          };
          this.getCookie = function getCookie(cookie_name, access_info) {
            var cookie, i;
            cookies_list = cookies[cookie_name];
            if (!cookies_list) {
              return;
            }
            for (i = 0; i < cookies_list.length; i += 1) {
              cookie = cookies_list[i];
              if (cookie.expiration_date <= Date.now()) {
                if (cookies_list.length === 0) {
                  delete cookies[cookie.name];
                }
                continue;
              }
              if (cookie.matches(access_info)) {
                return cookie;
              }
            }
          };
          this.getCookies = function getCookies(access_info) {
            var matches = [], cookie_name, cookie;
            for (cookie_name in cookies) {
              cookie = this.getCookie(cookie_name, access_info);
              if (cookie) {
                matches.push(cookie);
              }
            }
            matches.toString = function toString() {
              return matches.join(":");
            };
            matches.toValueString = function toValueString() {
              return matches.map(function(c) {
                return c.toValueString();
              }).join("; ");
            };
            return matches;
          };
          return this;
        }
        return new CookieJar();
      }
      exports2.CookieJar = CookieJar;
      CookieJar.prototype.setCookies = function setCookies(cookies, request_domain, request_path) {
        cookies = Array.isArray(cookies) ? cookies : cookies.split(cookie_str_splitter);
        var successful = [], i, cookie;
        cookies = cookies.map(function(item) {
          return new Cookie(item, request_domain, request_path);
        });
        for (i = 0; i < cookies.length; i += 1) {
          cookie = cookies[i];
          if (this.setCookie(cookie, request_domain, request_path)) {
            successful.push(cookie);
          }
        }
        return successful;
      };
    })();
  }
});

// node_modules/fast-safe-stringify/index.js
var require_fast_safe_stringify = __commonJS({
  "node_modules/fast-safe-stringify/index.js"(exports2, module2) {
    module2.exports = stringify;
    stringify.default = stringify;
    stringify.stable = deterministicStringify;
    stringify.stableStringify = deterministicStringify;
    var LIMIT_REPLACE_NODE = "[...]";
    var CIRCULAR_REPLACE_NODE = "[Circular]";
    var arr = [];
    var replacerStack = [];
    function defaultOptions() {
      return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
      };
    }
    function stringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      decirc(obj, "", 0, [], void 0, 0, options);
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(obj, replacer, spacer);
        } else {
          res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function setReplace(replace, val, k, parent) {
      var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
      if (propertyDescriptor.get !== void 0) {
        if (propertyDescriptor.configurable) {
          Object.defineProperty(parent, k, { value: replace });
          arr.push([parent, k, val, propertyDescriptor]);
        } else {
          replacerStack.push([val, k, replace]);
        }
      } else {
        parent[k] = replace;
        arr.push([parent, k, val]);
      }
    }
    function decirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            decirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var keys = Object.keys(val);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            decirc(val[key], key, i, stack, val, depth, options);
          }
        }
        stack.pop();
      }
    }
    function compareFunction(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    function deterministicStringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      var tmp = deterministicDecirc(obj, "", 0, [], void 0, 0, options) || obj;
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(tmp, replacer, spacer);
        } else {
          res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        try {
          if (typeof val.toJSON === "function") {
            return;
          }
        } catch (_) {
          return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            deterministicDecirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var tmp = {};
          var keys = Object.keys(val).sort(compareFunction);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            deterministicDecirc(val[key], key, i, stack, val, depth, options);
            tmp[key] = val[key];
          }
          if (typeof parent !== "undefined") {
            arr.push([parent, k, val]);
            parent[k] = tmp;
          } else {
            return tmp;
          }
        }
        stack.pop();
      }
    }
    function replaceGetterValues(replacer) {
      replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
        return v;
      };
      return function(key, val) {
        if (replacerStack.length > 0) {
          for (var i = 0; i < replacerStack.length; i++) {
            var part = replacerStack[i];
            if (part[1] === key && part[0] === val) {
              val = part[2];
              replacerStack.splice(i, 1);
              break;
            }
          }
        }
        return replacer.call(this, key, val);
      };
    }
  }
});

// node_modules/superagent/lib/utils.js
var require_utils3 = __commonJS({
  "node_modules/superagent/lib/utils.js"(exports2) {
    "use strict";
    exports2.type = (string_) => string_.split(/ *; */).shift();
    exports2.params = (value) => {
      const object = {};
      for (const string_ of value.split(/ *; */)) {
        const parts = string_.split(/ *= */);
        const key = parts.shift();
        const value2 = parts.shift();
        if (key && value2) object[key] = value2;
      }
      return object;
    };
    exports2.parseLinks = (value) => {
      const object = {};
      for (const string_ of value.split(/ *, */)) {
        const parts = string_.split(/ *; */);
        const url = parts[0].slice(1, -1);
        const rel = parts[1].split(/ *= */)[1].slice(1, -1);
        object[rel] = url;
      }
      return object;
    };
    exports2.cleanHeader = (header, changesOrigin) => {
      delete header["content-type"];
      delete header["content-length"];
      delete header["transfer-encoding"];
      delete header.host;
      if (changesOrigin) {
        delete header.authorization;
        delete header.cookie;
      }
      return header;
    };
    exports2.isObject = (object) => {
      return object !== null && typeof object === "object";
    };
    exports2.hasOwn = Object.hasOwn || function(object, property) {
      if (object == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      return Object.prototype.hasOwnProperty.call(new Object(object), property);
    };
    exports2.mixin = (target, source) => {
      for (const key in source) {
        if (exports2.hasOwn(source, key)) {
          target[key] = source[key];
        }
      }
    };
  }
});

// node_modules/superagent/lib/request-base.js
var require_request_base = __commonJS({
  "node_modules/superagent/lib/request-base.js"(exports2, module2) {
    "use strict";
    var {
      isObject,
      hasOwn
    } = require_utils3();
    module2.exports = RequestBase;
    function RequestBase() {
    }
    RequestBase.prototype.clearTimeout = function() {
      clearTimeout(this._timer);
      clearTimeout(this._responseTimeoutTimer);
      clearTimeout(this._uploadTimeoutTimer);
      delete this._timer;
      delete this._responseTimeoutTimer;
      delete this._uploadTimeoutTimer;
      return this;
    };
    RequestBase.prototype.parse = function(fn) {
      this._parser = fn;
      return this;
    };
    RequestBase.prototype.responseType = function(value) {
      this._responseType = value;
      return this;
    };
    RequestBase.prototype.serialize = function(fn) {
      this._serializer = fn;
      return this;
    };
    RequestBase.prototype.timeout = function(options) {
      if (!options || typeof options !== "object") {
        this._timeout = options;
        this._responseTimeout = 0;
        this._uploadTimeout = 0;
        return this;
      }
      for (const option in options) {
        if (hasOwn(options, option)) {
          switch (option) {
            case "deadline":
              this._timeout = options.deadline;
              break;
            case "response":
              this._responseTimeout = options.response;
              break;
            case "upload":
              this._uploadTimeout = options.upload;
              break;
            default:
              console.warn("Unknown timeout option", option);
          }
        }
      }
      return this;
    };
    RequestBase.prototype.retry = function(count, fn) {
      if (arguments.length === 0 || count === true) count = 1;
      if (count <= 0) count = 0;
      this._maxRetries = count;
      this._retries = 0;
      this._retryCallback = fn;
      return this;
    };
    var ERROR_CODES = /* @__PURE__ */ new Set(["ETIMEDOUT", "ECONNRESET", "EADDRINUSE", "ECONNREFUSED", "EPIPE", "ENOTFOUND", "ENETUNREACH", "EAI_AGAIN"]);
    var STATUS_CODES = /* @__PURE__ */ new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]);
    RequestBase.prototype._shouldRetry = function(error, res) {
      if (!this._maxRetries || this._retries++ >= this._maxRetries) {
        return false;
      }
      if (this._retryCallback) {
        try {
          const override = this._retryCallback(error, res);
          if (override === true) return true;
          if (override === false) return false;
        } catch (err) {
          console.error(err);
        }
      }
      if (res && res.status && STATUS_CODES.has(res.status)) return true;
      if (error) {
        if (error.code && ERROR_CODES.has(error.code)) return true;
        if (error.timeout && error.code === "ECONNABORTED") return true;
        if (error.crossDomain) return true;
      }
      return false;
    };
    RequestBase.prototype._retry = function() {
      this.clearTimeout();
      if (this.req) {
        this.req = null;
        this.req = this.request();
      }
      this._aborted = false;
      this.timedout = false;
      this.timedoutError = null;
      return this._end();
    };
    RequestBase.prototype.then = function(resolve, reject) {
      if (!this._fullfilledPromise) {
        const self = this;
        if (this._endCalled) {
          console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
        }
        this._fullfilledPromise = new Promise((resolve2, reject2) => {
          self.on("abort", () => {
            if (this._maxRetries && this._maxRetries > this._retries) {
              return;
            }
            if (this.timedout && this.timedoutError) {
              reject2(this.timedoutError);
              return;
            }
            const error = new Error("Aborted");
            error.code = "ABORTED";
            error.status = this.status;
            error.method = this.method;
            error.url = this.url;
            reject2(error);
          });
          self.end((error, res) => {
            if (error) reject2(error);
            else resolve2(res);
          });
        });
      }
      return this._fullfilledPromise.then(resolve, reject);
    };
    RequestBase.prototype.catch = function(callback) {
      return this.then(void 0, callback);
    };
    RequestBase.prototype.use = function(fn) {
      fn(this);
      return this;
    };
    RequestBase.prototype.ok = function(callback) {
      if (typeof callback !== "function") throw new Error("Callback required");
      this._okCallback = callback;
      return this;
    };
    RequestBase.prototype._isResponseOK = function(res) {
      if (!res) {
        return false;
      }
      if (this._okCallback) {
        return this._okCallback(res);
      }
      return res.status >= 200 && res.status < 300;
    };
    RequestBase.prototype.get = function(field) {
      return this._header[field.toLowerCase()];
    };
    RequestBase.prototype.getHeader = RequestBase.prototype.get;
    RequestBase.prototype.set = function(field, value) {
      if (isObject(field)) {
        for (const key in field) {
          if (hasOwn(field, key)) this.set(key, field[key]);
        }
        return this;
      }
      this._header[field.toLowerCase()] = value;
      this.header[field] = value;
      return this;
    };
    RequestBase.prototype.unset = function(field) {
      delete this._header[field.toLowerCase()];
      delete this.header[field];
      return this;
    };
    RequestBase.prototype.field = function(name, value, options) {
      if (name === null || void 0 === name) {
        throw new Error(".field(name, val) name can not be empty");
      }
      if (this._data) {
        throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
      }
      if (isObject(name)) {
        for (const key in name) {
          if (hasOwn(name, key)) this.field(key, name[key]);
        }
        return this;
      }
      if (Array.isArray(value)) {
        for (const i in value) {
          if (hasOwn(value, i)) this.field(name, value[i]);
        }
        return this;
      }
      if (value === null || void 0 === value) {
        throw new Error(".field(name, val) val can not be empty");
      }
      if (typeof value === "boolean") {
        value = String(value);
      }
      if (options) this._getFormData().append(name, value, options);
      else this._getFormData().append(name, value);
      return this;
    };
    RequestBase.prototype.abort = function() {
      if (this._aborted) {
        return this;
      }
      this._aborted = true;
      if (this.xhr) this.xhr.abort();
      if (this.req) {
        this.req.abort();
      }
      this.clearTimeout();
      this.emit("abort");
      return this;
    };
    RequestBase.prototype._auth = function(user, pass, options, base64Encoder) {
      switch (options.type) {
        case "basic":
          this.set("Authorization", `Basic ${base64Encoder(`${user}:${pass}`)}`);
          break;
        case "auto":
          this.username = user;
          this.password = pass;
          break;
        case "bearer":
          this.set("Authorization", `Bearer ${user}`);
          break;
        default:
          break;
      }
      return this;
    };
    RequestBase.prototype.withCredentials = function(on) {
      if (on === void 0) on = true;
      this._withCredentials = on;
      return this;
    };
    RequestBase.prototype.redirects = function(n) {
      this._maxRedirects = n;
      return this;
    };
    RequestBase.prototype.maxResponseSize = function(n) {
      if (typeof n !== "number") {
        throw new TypeError("Invalid argument");
      }
      this._maxResponseSize = n;
      return this;
    };
    RequestBase.prototype.toJSON = function() {
      return {
        method: this.method,
        url: this.url,
        data: this._data,
        headers: this._header
      };
    };
    RequestBase.prototype.send = function(data) {
      const isObject_ = isObject(data);
      let type = this._header["content-type"];
      if (this._formData) {
        throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
      }
      if (isObject_ && !this._data) {
        if (Array.isArray(data)) {
          this._data = [];
        } else if (!this._isHost(data)) {
          this._data = {};
        }
      } else if (data && this._data && this._isHost(this._data)) {
        throw new Error("Can't merge these send calls");
      }
      if (isObject_ && isObject(this._data)) {
        for (const key in data) {
          if (typeof data[key] == "bigint" && !data[key].toJSON) throw new Error("Cannot serialize BigInt value to json");
          if (hasOwn(data, key)) this._data[key] = data[key];
        }
      } else if (typeof data === "bigint") throw new Error("Cannot send value of type BigInt");
      else if (typeof data === "string") {
        if (!type) this.type("form");
        type = this._header["content-type"];
        if (type) type = type.toLowerCase().trim();
        if (type === "application/x-www-form-urlencoded") {
          this._data = this._data ? `${this._data}&${data}` : data;
        } else {
          this._data = (this._data || "") + data;
        }
      } else {
        this._data = data;
      }
      if (!isObject_ || this._isHost(data)) {
        return this;
      }
      if (!type) this.type("json");
      return this;
    };
    RequestBase.prototype.sortQuery = function(sort) {
      this._sort = typeof sort === "undefined" ? true : sort;
      return this;
    };
    RequestBase.prototype._finalizeQueryString = function() {
      const query = this._query.join("&");
      if (query) {
        this.url += (this.url.includes("?") ? "&" : "?") + query;
      }
      this._query.length = 0;
      if (this._sort) {
        const index = this.url.indexOf("?");
        if (index >= 0) {
          const queryArray = this.url.slice(index + 1).split("&");
          if (typeof this._sort === "function") {
            queryArray.sort(this._sort);
          } else {
            queryArray.sort();
          }
          this.url = this.url.slice(0, index) + "?" + queryArray.join("&");
        }
      }
    };
    RequestBase.prototype._appendQueryString = () => {
      console.warn("Unsupported");
    };
    RequestBase.prototype._timeoutError = function(reason, timeout, errno) {
      if (this._aborted) {
        return;
      }
      const error = new Error(`${reason + timeout}ms exceeded`);
      error.timeout = timeout;
      error.code = "ECONNABORTED";
      error.errno = errno;
      this.timedout = true;
      this.timedoutError = error;
      this.abort();
      this.callback(error);
    };
    RequestBase.prototype._setTimeouts = function() {
      const self = this;
      if (this._timeout && !this._timer) {
        this._timer = setTimeout(() => {
          self._timeoutError("Timeout of ", self._timeout, "ETIME");
        }, this._timeout);
      }
      if (this._responseTimeout && !this._responseTimeoutTimer) {
        this._responseTimeoutTimer = setTimeout(() => {
          self._timeoutError("Response timeout of ", self._responseTimeout, "ETIMEDOUT");
        }, this._responseTimeout);
      }
    };
  }
});

// node_modules/superagent/lib/node/http2wrapper.js
var require_http2wrapper = __commonJS({
  "node_modules/superagent/lib/node/http2wrapper.js"(exports2) {
    "use strict";
    var http2 = require("http2");
    var Stream = require("stream");
    var net = require("net");
    var tls = require("tls");
    var {
      HTTP2_HEADER_PATH,
      HTTP2_HEADER_STATUS,
      HTTP2_HEADER_METHOD,
      HTTP2_HEADER_AUTHORITY,
      HTTP2_HEADER_HOST,
      HTTP2_HEADER_SET_COOKIE,
      NGHTTP2_CANCEL
    } = http2.constants;
    function setProtocol(protocol) {
      return {
        request(options) {
          return new Request(protocol, options);
        }
      };
    }
    var Request = class extends Stream {
      constructor(protocol, options) {
        super();
        const defaultPort = protocol === "https:" ? 443 : 80;
        const defaultHost = "localhost";
        const port = options.port || defaultPort;
        const host = options.host || defaultHost;
        delete options.port;
        delete options.host;
        this.method = options.method;
        this.path = options.path;
        this.protocol = protocol;
        this.host = host;
        delete options.method;
        delete options.path;
        const sessionOptions = {
          ...options
        };
        if (options.socketPath) {
          sessionOptions.socketPath = options.socketPath;
          sessionOptions.createConnection = this.createUnixConnection.bind(this);
        }
        this._headers = {};
        const session = http2.connect(`${protocol}//${host}:${port}`, sessionOptions);
        this.setHeader("host", `${host}:${port}`);
        session.on("error", (error) => this.emit("error", error));
        this.session = session;
      }
      createUnixConnection(authority, options) {
        switch (this.protocol) {
          case "http:":
            return net.connect(options.socketPath);
          case "https:":
            options.ALPNProtocols = ["h2"];
            options.servername = this.host;
            options.allowHalfOpen = true;
            return tls.connect(options.socketPath, options);
          default:
            throw new Error("Unsupported protocol", this.protocol);
        }
      }
      setNoDelay(bool) {
      }
      getFrame() {
        if (this.frame) {
          return this.frame;
        }
        const method = {
          [HTTP2_HEADER_PATH]: this.path,
          [HTTP2_HEADER_METHOD]: this.method
        };
        let headers = this.mapToHttp2Header(this._headers);
        headers = Object.assign(headers, method);
        const frame = this.session.request(headers);
        frame.once("response", (headers2, flags) => {
          headers2 = this.mapToHttpHeader(headers2);
          frame.headers = headers2;
          frame.statusCode = headers2[HTTP2_HEADER_STATUS];
          frame.status = frame.statusCode;
          this.emit("response", frame);
        });
        this._headerSent = true;
        frame.once("drain", () => this.emit("drain"));
        frame.on("error", (error) => this.emit("error", error));
        frame.on("close", () => this.session.close());
        this.frame = frame;
        return frame;
      }
      mapToHttpHeader(headers) {
        const keys = Object.keys(headers);
        const http2Headers = {};
        for (let key of keys) {
          let value = headers[key];
          key = key.toLowerCase();
          switch (key) {
            case HTTP2_HEADER_SET_COOKIE:
              value = Array.isArray(value) ? value : [value];
              break;
            default:
              break;
          }
          http2Headers[key] = value;
        }
        return http2Headers;
      }
      mapToHttp2Header(headers) {
        const keys = Object.keys(headers);
        const http2Headers = {};
        for (let key of keys) {
          let value = headers[key];
          key = key.toLowerCase();
          switch (key) {
            case HTTP2_HEADER_HOST:
              key = HTTP2_HEADER_AUTHORITY;
              value = /^http:\/\/|^https:\/\//.test(value) ? new URL(value).host : value;
              break;
            default:
              break;
          }
          http2Headers[key] = value;
        }
        return http2Headers;
      }
      setHeader(name, value) {
        this._headers[name.toLowerCase()] = value;
      }
      getHeader(name) {
        return this._headers[name.toLowerCase()];
      }
      write(data, encoding) {
        const frame = this.getFrame();
        return frame.write(data, encoding);
      }
      pipe(stream, options) {
        const frame = this.getFrame();
        return frame.pipe(stream, options);
      }
      end(data) {
        const frame = this.getFrame();
        frame.end(data);
      }
      abort(data) {
        const frame = this.getFrame();
        frame.close(NGHTTP2_CANCEL);
        this.session.destroy();
      }
    };
    exports2.setProtocol = setProtocol;
  }
});

// node_modules/superagent/lib/node/unzip.js
var require_unzip = __commonJS({
  "node_modules/superagent/lib/node/unzip.js"(exports2) {
    "use strict";
    var {
      StringDecoder
    } = require("string_decoder");
    var Stream = require("stream");
    var zlib = require("zlib");
    exports2.unzip = (request, res) => {
      const unzip = zlib.createUnzip();
      const stream = new Stream();
      let decoder;
      stream.req = request;
      unzip.on("error", (error) => {
        if (error && error.code === "Z_BUF_ERROR") {
          stream.emit("end");
          return;
        }
        stream.emit("error", error);
      });
      res.pipe(unzip);
      res.setEncoding = (type) => {
        decoder = new StringDecoder(type);
      };
      unzip.on("data", (buf) => {
        if (decoder) {
          const string_ = decoder.write(buf);
          if (string_.length > 0) stream.emit("data", string_);
        } else {
          stream.emit("data", buf);
        }
      });
      unzip.on("end", () => {
        stream.emit("end");
      });
      const _on = res.on;
      res.on = function(type, fn) {
        if (type === "data" || type === "end") {
          stream.on(type, fn.bind(res));
        } else if (type === "error") {
          stream.on(type, fn.bind(res));
          _on.call(res, type, fn);
        } else {
          _on.call(res, type, fn);
        }
        return this;
      };
    };
  }
});

// node_modules/superagent/lib/response-base.js
var require_response_base = __commonJS({
  "node_modules/superagent/lib/response-base.js"(exports2, module2) {
    "use strict";
    var utils = require_utils3();
    module2.exports = ResponseBase;
    function ResponseBase() {
    }
    ResponseBase.prototype.get = function(field) {
      return this.header[field.toLowerCase()];
    };
    ResponseBase.prototype._setHeaderProperties = function(header) {
      const ct = header["content-type"] || "";
      this.type = utils.type(ct);
      const parameters = utils.params(ct);
      for (const key in parameters) {
        if (Object.prototype.hasOwnProperty.call(parameters, key)) this[key] = parameters[key];
      }
      this.links = {};
      try {
        if (header.link) {
          this.links = utils.parseLinks(header.link);
        }
      } catch (err) {
      }
    };
    ResponseBase.prototype._setStatusProperties = function(status) {
      const type = Math.trunc(status / 100);
      this.statusCode = status;
      this.status = this.statusCode;
      this.statusType = type;
      this.info = type === 1;
      this.ok = type === 2;
      this.redirect = type === 3;
      this.clientError = type === 4;
      this.serverError = type === 5;
      this.error = type === 4 || type === 5 ? this.toError() : false;
      this.created = status === 201;
      this.accepted = status === 202;
      this.noContent = status === 204;
      this.badRequest = status === 400;
      this.unauthorized = status === 401;
      this.notAcceptable = status === 406;
      this.forbidden = status === 403;
      this.notFound = status === 404;
      this.unprocessableEntity = status === 422;
    };
  }
});

// node_modules/superagent/lib/node/response.js
var require_response = __commonJS({
  "node_modules/superagent/lib/node/response.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var Stream = require("stream");
    var ResponseBase = require_response_base();
    var {
      mixin
    } = require_utils3();
    module2.exports = Response;
    function Response(request) {
      Stream.call(this);
      this.res = request.res;
      const {
        res
      } = this;
      this.request = request;
      this.req = request.req;
      this.text = res.text;
      this.files = res.files || {};
      this.buffered = request._resBuffered;
      this.headers = res.headers;
      this.header = this.headers;
      this._setStatusProperties(res.statusCode);
      this._setHeaderProperties(this.header);
      this.setEncoding = res.setEncoding.bind(res);
      res.on("data", this.emit.bind(this, "data"));
      res.on("end", this.emit.bind(this, "end"));
      res.on("close", this.emit.bind(this, "close"));
      res.on("error", this.emit.bind(this, "error"));
    }
    Object.defineProperty(Response.prototype, "body", {
      get() {
        return this._body !== void 0 ? this._body : this.res.body !== void 0 ? this.res.body : {};
      },
      set(value) {
        this._body = value;
      }
    });
    util.inherits(Response, Stream);
    mixin(Response.prototype, ResponseBase.prototype);
    Response.prototype.destroy = function(error) {
      this.res.destroy(error);
    };
    Response.prototype.pause = function() {
      this.res.pause();
    };
    Response.prototype.resume = function() {
      this.res.resume();
    };
    Response.prototype.toError = function() {
      const {
        req
      } = this;
      const {
        method
      } = req;
      const {
        path
      } = req;
      const message = `cannot ${method} ${path} (${this.status})`;
      const error = new Error(message);
      error.status = this.status;
      error.text = this.text;
      error.method = method;
      error.path = path;
      return error;
    };
    Response.prototype.setStatusProperties = function(status) {
      console.warn("In superagent 2.x setStatusProperties is a private method");
      return this._setStatusProperties(status);
    };
    Response.prototype.toJSON = function() {
      return {
        req: this.request.toJSON(),
        header: this.header,
        status: this.status,
        text: this.text
      };
    };
  }
});

// node_modules/superagent/lib/agent-base.js
var require_agent_base = __commonJS({
  "node_modules/superagent/lib/agent-base.js"(exports2, module2) {
    "use strict";
    var defaults = ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert", "disableTLSCerts"];
    var Agent = class {
      constructor() {
        this._defaults = [];
      }
      _setDefaults(request) {
        for (const def of this._defaults) {
          request[def.fn](...def.args);
        }
      }
    };
    for (const fn of defaults) {
      Agent.prototype[fn] = function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        this._defaults.push({
          fn,
          args
        });
        return this;
      };
    }
    module2.exports = Agent;
  }
});

// node_modules/superagent/lib/node/agent.js
var require_agent = __commonJS({
  "node_modules/superagent/lib/node/agent.js"(exports2, module2) {
    "use strict";
    var {
      CookieJar
    } = require_cookiejar();
    var {
      CookieAccessInfo
    } = require_cookiejar();
    var methods = require_methods();
    var request = require_node2();
    var AgentBase = require_agent_base();
    var Agent = class extends AgentBase {
      constructor(options) {
        super();
        this.jar = new CookieJar();
        if (options) {
          if (options.ca) {
            this.ca(options.ca);
          }
          if (options.key) {
            this.key(options.key);
          }
          if (options.pfx) {
            this.pfx(options.pfx);
          }
          if (options.cert) {
            this.cert(options.cert);
          }
          if (options.rejectUnauthorized === false) {
            this.disableTLSCerts();
          }
        }
      }
      /**
       * Save the cookies in the given `res` to
       * the agent's cookie jar for persistence.
       *
       * @param {Response} res
       * @api private
       */
      _saveCookies(res) {
        const cookies = res.headers["set-cookie"];
        if (cookies) {
          var _res$request;
          const url = new URL(((_res$request = res.request) === null || _res$request === void 0 ? void 0 : _res$request.url) || "");
          this.jar.setCookies(cookies, url.hostname, url.pathname);
        }
      }
      /**
       * Attach cookies when available to the given `req`.
       *
       * @param {Request} req
       * @api private
       */
      _attachCookies(request_) {
        const url = new URL(request_.url);
        const access = new CookieAccessInfo(url.hostname, url.pathname, url.protocol === "https:");
        const cookies = this.jar.getCookies(access).toValueString();
        request_.cookies = cookies;
      }
    };
    for (const name of methods) {
      const method = name.toUpperCase();
      Agent.prototype[name] = function(url, fn) {
        const request_ = new request.Request(method, url);
        request_.on("response", this._saveCookies.bind(this));
        request_.on("redirect", this._saveCookies.bind(this));
        request_.on("redirect", this._attachCookies.bind(this, request_));
        this._setDefaults(request_);
        this._attachCookies(request_);
        if (fn) {
          request_.end(fn);
        }
        return request_;
      };
    }
    Agent.prototype.del = Agent.prototype.delete;
    var proxyAgent = new Proxy(Agent, {
      apply(target, thisArg, argumentsList) {
        return new target(...argumentsList);
      }
    });
    module2.exports = proxyAgent;
  }
});

// node_modules/superagent/lib/node/parsers/urlencoded.js
var require_urlencoded = __commonJS({
  "node_modules/superagent/lib/node/parsers/urlencoded.js"(exports2, module2) {
    "use strict";
    var qs = require_lib();
    module2.exports = (res, fn) => {
      res.text = "";
      res.setEncoding("ascii");
      res.on("data", (chunk) => {
        res.text += chunk;
      });
      res.on("end", () => {
        try {
          fn(null, qs.parse(res.text));
        } catch (err) {
          fn(err);
        }
      });
    };
  }
});

// node_modules/superagent/lib/node/parsers/json.js
var require_json = __commonJS({
  "node_modules/superagent/lib/node/parsers/json.js"(exports2, module2) {
    "use strict";
    module2.exports = function(res, fn) {
      res.text = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        res.text += chunk;
      });
      res.on("end", () => {
        let body;
        let error;
        try {
          body = res.text && JSON.parse(res.text);
        } catch (err) {
          error = err;
          error.rawResponse = res.text || null;
          error.statusCode = res.statusCode;
        } finally {
          fn(error, body);
        }
      });
    };
  }
});

// node_modules/superagent/lib/node/parsers/text.js
var require_text = __commonJS({
  "node_modules/superagent/lib/node/parsers/text.js"(exports2, module2) {
    "use strict";
    module2.exports = (res, fn) => {
      res.text = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        res.text += chunk;
      });
      res.on("end", fn);
    };
  }
});

// node_modules/superagent/lib/node/parsers/image.js
var require_image = __commonJS({
  "node_modules/superagent/lib/node/parsers/image.js"(exports2, module2) {
    "use strict";
    module2.exports = (res, fn) => {
      const data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
      });
      res.on("end", () => {
        fn(null, Buffer.concat(data));
      });
    };
  }
});

// node_modules/superagent/lib/node/parsers/index.js
var require_parsers = __commonJS({
  "node_modules/superagent/lib/node/parsers/index.js"(exports2) {
    "use strict";
    exports2["application/x-www-form-urlencoded"] = require_urlencoded();
    exports2["application/json"] = require_json();
    exports2.text = require_text();
    exports2["application/json-seq"] = exports2.text;
    var binary = require_image();
    exports2["application/octet-stream"] = binary;
    exports2["application/pdf"] = binary;
    exports2.image = binary;
  }
});

// node_modules/superagent/lib/node/index.js
var require_node2 = __commonJS({
  "node_modules/superagent/lib/node/index.js"(exports2, module2) {
    "use strict";
    var {
      format
    } = require("url");
    var Stream = require("stream");
    var https = require("https");
    var http = require("http");
    var fs = require("fs");
    var zlib = require("zlib");
    var util = require("util");
    var qs = require_lib();
    var mime = require_mime();
    var methods = require_methods();
    var FormData = require_form_data();
    var formidable = require_dist();
    var debug = require_src2()("superagent");
    var CookieJar = require_cookiejar();
    var safeStringify = require_fast_safe_stringify();
    var utils = require_utils3();
    var RequestBase = require_request_base();
    var http2 = require_http2wrapper();
    var {
      unzip
    } = require_unzip();
    var Response = require_response();
    var {
      mixin,
      hasOwn
    } = utils;
    function request(method, url) {
      if (typeof url === "function") {
        return new exports2.Request("GET", method).end(url);
      }
      if (arguments.length === 1) {
        return new exports2.Request("GET", method);
      }
      return new exports2.Request(method, url);
    }
    module2.exports = request;
    exports2 = module2.exports;
    exports2.Request = Request;
    exports2.agent = require_agent();
    function noop() {
    }
    exports2.Response = Response;
    mime.define({
      "application/x-www-form-urlencoded": ["form", "urlencoded", "form-data"]
    }, true);
    exports2.protocols = {
      "http:": http,
      "https:": https,
      "http2:": http2
    };
    exports2.serialize = {
      "application/x-www-form-urlencoded": qs.stringify,
      "application/json": safeStringify
    };
    exports2.parse = require_parsers();
    exports2.buffer = {};
    function _initHeaders(request_) {
      request_._header = {
        // coerces header names to lowercase
      };
      request_.header = {
        // preserves header name case
      };
    }
    function Request(method, url) {
      Stream.call(this);
      if (typeof url !== "string") url = format(url);
      this._enableHttp2 = Boolean(process.env.HTTP2_TEST);
      this._agent = false;
      this._formData = null;
      this.method = method;
      this.url = url;
      _initHeaders(this);
      this.writable = true;
      this._redirects = 0;
      this.redirects(method === "HEAD" ? 0 : 5);
      this.cookies = "";
      this.qs = {};
      this._query = [];
      this.qsRaw = this._query;
      this._redirectList = [];
      this._streamRequest = false;
      this._lookup = void 0;
      this.once("end", this.clearTimeout.bind(this));
    }
    util.inherits(Request, Stream);
    mixin(Request.prototype, RequestBase.prototype);
    Request.prototype.http2 = function(bool) {
      if (exports2.protocols["http2:"] === void 0) {
        throw new Error("superagent: this version of Node.js does not support http2");
      }
      this._enableHttp2 = bool === void 0 ? true : bool;
      return this;
    };
    Request.prototype.attach = function(field, file, options) {
      if (file) {
        if (this._data) {
          throw new Error("superagent can't mix .send() and .attach()");
        }
        let o = options || {};
        if (typeof options === "string") {
          o = {
            filename: options
          };
        }
        if (typeof file === "string") {
          if (!o.filename) o.filename = file;
          debug("creating `fs.ReadStream` instance for file: %s", file);
          file = fs.createReadStream(file);
          file.on("error", (error) => {
            const formData = this._getFormData();
            formData.emit("error", error);
          });
        } else if (!o.filename && file.path) {
          o.filename = file.path;
        }
        this._getFormData().append(field, file, o);
      }
      return this;
    };
    Request.prototype._getFormData = function() {
      if (!this._formData) {
        this._formData = new FormData();
        this._formData.on("error", (error) => {
          debug("FormData error", error);
          if (this.called) {
            return;
          }
          this.callback(error);
          this.abort();
        });
      }
      return this._formData;
    };
    Request.prototype.agent = function(agent) {
      if (arguments.length === 0) return this._agent;
      this._agent = agent;
      return this;
    };
    Request.prototype.lookup = function(lookup) {
      if (arguments.length === 0) return this._lookup;
      this._lookup = lookup;
      return this;
    };
    Request.prototype.type = function(type) {
      return this.set("Content-Type", type.includes("/") ? type : mime.getType(type));
    };
    Request.prototype.accept = function(type) {
      return this.set("Accept", type.includes("/") ? type : mime.getType(type));
    };
    Request.prototype.query = function(value) {
      if (typeof value === "string") {
        this._query.push(value);
      } else {
        Object.assign(this.qs, value);
      }
      return this;
    };
    Request.prototype.write = function(data, encoding) {
      const request_ = this.request();
      if (!this._streamRequest) {
        this._streamRequest = true;
      }
      return request_.write(data, encoding);
    };
    Request.prototype.pipe = function(stream, options) {
      this.piped = true;
      this.buffer(false);
      this.end();
      return this._pipeContinue(stream, options);
    };
    Request.prototype._pipeContinue = function(stream, options) {
      this.req.once("response", (res) => {
        if (isRedirect(res.statusCode) && this._redirects++ !== this._maxRedirects) {
          return this._redirect(res) === this ? this._pipeContinue(stream, options) : void 0;
        }
        this.res = res;
        this._emitResponse();
        if (this._aborted) return;
        if (this._shouldUnzip(res)) {
          const unzipObject = zlib.createUnzip();
          unzipObject.on("error", (error) => {
            if (error && error.code === "Z_BUF_ERROR") {
              stream.emit("end");
              return;
            }
            stream.emit("error", error);
          });
          res.pipe(unzipObject).pipe(stream, options);
          unzipObject.once("end", () => this.emit("end"));
        } else {
          res.pipe(stream, options);
          res.once("end", () => this.emit("end"));
        }
      });
      return stream;
    };
    Request.prototype.buffer = function(value) {
      this._buffer = value !== false;
      return this;
    };
    Request.prototype._redirect = function(res) {
      let url = res.headers.location;
      if (!url) {
        return this.callback(new Error("No location header for redirect"), res);
      }
      debug("redirect %s -> %s", this.url, url);
      url = new URL(url, this.url).href;
      res.resume();
      let headers = this.req.getHeaders ? this.req.getHeaders() : this.req._headers;
      const changesOrigin = new URL(url).host !== new URL(this.url).host;
      if (res.statusCode === 301 || res.statusCode === 302) {
        headers = utils.cleanHeader(headers, changesOrigin);
        this.method = this.method === "HEAD" ? "HEAD" : "GET";
        this._data = null;
      }
      if (res.statusCode === 303) {
        headers = utils.cleanHeader(headers, changesOrigin);
        this.method = "GET";
        this._data = null;
      }
      delete headers.host;
      delete this.req;
      delete this._formData;
      _initHeaders(this);
      this.res = res;
      this._endCalled = false;
      this.url = url;
      this.qs = {};
      this._query.length = 0;
      this.set(headers);
      this._emitRedirect();
      this._redirectList.push(this.url);
      this.end(this._callback);
      return this;
    };
    Request.prototype.auth = function(user, pass, options) {
      if (arguments.length === 1) pass = "";
      if (typeof pass === "object" && pass !== null) {
        options = pass;
        pass = "";
      }
      if (!options) {
        options = {
          type: "basic"
        };
      }
      const encoder = (string) => Buffer.from(string).toString("base64");
      return this._auth(user, pass, options, encoder);
    };
    Request.prototype.ca = function(cert) {
      this._ca = cert;
      return this;
    };
    Request.prototype.key = function(cert) {
      this._key = cert;
      return this;
    };
    Request.prototype.pfx = function(cert) {
      if (typeof cert === "object" && !Buffer.isBuffer(cert)) {
        this._pfx = cert.pfx;
        this._passphrase = cert.passphrase;
      } else {
        this._pfx = cert;
      }
      return this;
    };
    Request.prototype.cert = function(cert) {
      this._cert = cert;
      return this;
    };
    Request.prototype.disableTLSCerts = function() {
      this._disableTLSCerts = true;
      return this;
    };
    Request.prototype.request = function() {
      if (this.req) return this.req;
      const options = {};
      try {
        const query = qs.stringify(this.qs, {
          indices: false,
          strictNullHandling: true
        });
        if (query) {
          this.qs = {};
          this._query.push(query);
        }
        this._finalizeQueryString();
      } catch (err) {
        return this.emit("error", err);
      }
      let {
        url: urlString
      } = this;
      const retries = this._retries;
      if (urlString.indexOf("http") !== 0) urlString = `http://${urlString}`;
      const url = new URL(urlString);
      let {
        protocol
      } = url;
      let path = `${url.pathname}${url.search}`;
      if (/^https?\+unix:/.test(protocol) === true) {
        protocol = `${protocol.split("+")[0]}:`;
        options.socketPath = url.hostname.replace(/%2F/g, "/");
        url.host = "";
        url.hostname = "";
      }
      if (this._connectOverride) {
        const {
          hostname
        } = url;
        const match = hostname in this._connectOverride ? this._connectOverride[hostname] : this._connectOverride["*"];
        if (match) {
          if (!this._header.host) {
            this.set("host", url.host);
          }
          let newHost;
          let newPort;
          if (typeof match === "object") {
            newHost = match.host;
            newPort = match.port;
          } else {
            newHost = match;
            newPort = url.port;
          }
          url.host = /:/.test(newHost) ? `[${newHost}]` : newHost;
          if (newPort) {
            url.host += `:${newPort}`;
            url.port = newPort;
          }
          url.hostname = newHost;
        }
      }
      options.method = this.method;
      options.port = url.port;
      options.path = path;
      options.host = url.hostname;
      options.ca = this._ca;
      options.key = this._key;
      options.pfx = this._pfx;
      options.cert = this._cert;
      options.passphrase = this._passphrase;
      options.agent = this._agent;
      options.lookup = this._lookup;
      options.rejectUnauthorized = typeof this._disableTLSCerts === "boolean" ? !this._disableTLSCerts : process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0";
      if (this._header.host) {
        options.servername = this._header.host.replace(/:\d+$/, "");
      }
      if (this._trustLocalhost && /^(?:localhost|127\.0\.0\.\d+|(0*:)+:0*1)$/.test(url.hostname)) {
        options.rejectUnauthorized = false;
      }
      const module_ = this._enableHttp2 ? exports2.protocols["http2:"].setProtocol(protocol) : exports2.protocols[protocol];
      this.req = module_.request(options);
      const {
        req
      } = this;
      req.setNoDelay(true);
      if (options.method !== "HEAD") {
        req.setHeader("Accept-Encoding", "gzip, deflate");
      }
      this.protocol = protocol;
      this.host = url.host;
      req.once("drain", () => {
        this.emit("drain");
      });
      req.on("error", (error) => {
        if (this._aborted) return;
        if (this._retries !== retries) return;
        if (this.response) return;
        this.callback(error);
      });
      if (url.username || url.password) {
        this.auth(url.username, url.password);
      }
      if (this.username && this.password) {
        this.auth(this.username, this.password);
      }
      for (const key in this.header) {
        if (hasOwn(this.header, key)) req.setHeader(key, this.header[key]);
      }
      if (this.cookies) {
        if (hasOwn(this._header, "cookie")) {
          const temporaryJar = new CookieJar.CookieJar();
          temporaryJar.setCookies(this._header.cookie.split("; "));
          temporaryJar.setCookies(this.cookies.split("; "));
          req.setHeader("Cookie", temporaryJar.getCookies(CookieJar.CookieAccessInfo.All).toValueString());
        } else {
          req.setHeader("Cookie", this.cookies);
        }
      }
      return req;
    };
    Request.prototype.callback = function(error, res) {
      if (this._shouldRetry(error, res)) {
        return this._retry();
      }
      const fn = this._callback || noop;
      this.clearTimeout();
      if (this.called) return console.warn("superagent: double callback bug");
      this.called = true;
      if (!error) {
        try {
          if (!this._isResponseOK(res)) {
            let message = "Unsuccessful HTTP response";
            if (res) {
              message = http.STATUS_CODES[res.status] || message;
            }
            error = new Error(message);
            error.status = res ? res.status : void 0;
          }
        } catch (err) {
          error = err;
          error.status = error.status || (res ? res.status : void 0);
        }
      }
      if (!error) {
        return fn(null, res);
      }
      error.response = res;
      if (this._maxRetries) error.retries = this._retries - 1;
      if (error && this.listeners("error").length > 0) {
        this.emit("error", error);
      }
      fn(error, res);
    };
    Request.prototype._isHost = function(object) {
      return Buffer.isBuffer(object) || object instanceof Stream || object instanceof FormData;
    };
    Request.prototype._emitResponse = function(body, files) {
      const response = new Response(this);
      this.response = response;
      response.redirects = this._redirectList;
      if (void 0 !== body) {
        response.body = body;
      }
      response.files = files;
      if (this._endCalled) {
        response.pipe = function() {
          throw new Error("end() has already been called, so it's too late to start piping");
        };
      }
      this.emit("response", response);
      return response;
    };
    Request.prototype._emitRedirect = function() {
      const response = new Response(this);
      response.redirects = this._redirectList;
      this.emit("redirect", response);
    };
    Request.prototype.end = function(fn) {
      this.request();
      debug("%s %s", this.method, this.url);
      if (this._endCalled) {
        throw new Error(".end() was called twice. This is not supported in superagent");
      }
      this._endCalled = true;
      this._callback = fn || noop;
      this._end();
    };
    Request.prototype._end = function() {
      if (this._aborted) return this.callback(new Error("The request has been aborted even before .end() was called"));
      let data = this._data;
      const {
        req
      } = this;
      const {
        method
      } = this;
      this._setTimeouts();
      if (method !== "HEAD" && !req._headerSent) {
        if (typeof data !== "string") {
          let contentType = req.getHeader("Content-Type");
          if (contentType) contentType = contentType.split(";")[0];
          let serialize = this._serializer || exports2.serialize[contentType];
          if (!serialize && isJSON(contentType)) {
            serialize = exports2.serialize["application/json"];
          }
          if (serialize) data = serialize(data);
        }
        if (data && !req.getHeader("Content-Length")) {
          req.setHeader("Content-Length", Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data));
        }
      }
      req.once("response", (res) => {
        debug("%s %s -> %s", this.method, this.url, res.statusCode);
        if (this._responseTimeoutTimer) {
          clearTimeout(this._responseTimeoutTimer);
        }
        if (this.piped) {
          return;
        }
        const max = this._maxRedirects;
        const mime2 = utils.type(res.headers["content-type"] || "") || "text/plain";
        let type = mime2.split("/")[0];
        if (type) type = type.toLowerCase().trim();
        const multipart = type === "multipart";
        const redirect = isRedirect(res.statusCode);
        const responseType = this._responseType;
        this.res = res;
        if (redirect && this._redirects++ !== max) {
          return this._redirect(res);
        }
        if (this.method === "HEAD") {
          this.emit("end");
          this.callback(null, this._emitResponse());
          return;
        }
        if (this._shouldUnzip(res)) {
          unzip(req, res);
        }
        let buffer = this._buffer;
        if (buffer === void 0 && mime2 in exports2.buffer) {
          buffer = Boolean(exports2.buffer[mime2]);
        }
        let parser = this._parser;
        if (void 0 === buffer && parser) {
          console.warn("A custom superagent parser has been set, but buffering strategy for the parser hasn't been configured. Call `req.buffer(true or false)` or set `superagent.buffer[mime] = true or false`");
          buffer = true;
        }
        if (!parser) {
          if (responseType) {
            parser = exports2.parse.image;
            buffer = true;
          } else if (multipart) {
            const form = formidable.formidable();
            parser = form.parse.bind(form);
            buffer = true;
          } else if (isBinary(mime2)) {
            parser = exports2.parse.image;
            buffer = true;
          } else if (exports2.parse[mime2]) {
            parser = exports2.parse[mime2];
          } else if (type === "text") {
            parser = exports2.parse.text;
            buffer = buffer !== false;
          } else if (isJSON(mime2)) {
            parser = exports2.parse["application/json"];
            buffer = buffer !== false;
          } else if (buffer) {
            parser = exports2.parse.text;
          } else if (void 0 === buffer) {
            parser = exports2.parse.image;
            buffer = true;
          }
        }
        if (void 0 === buffer && isText(mime2) || isJSON(mime2)) {
          buffer = true;
        }
        this._resBuffered = buffer;
        let parserHandlesEnd = false;
        if (buffer) {
          let responseBytesLeft = this._maxResponseSize || 2e8;
          res.on("data", (buf) => {
            responseBytesLeft -= buf.byteLength || buf.length > 0 ? buf.length : 0;
            if (responseBytesLeft < 0) {
              const error = new Error("Maximum response size reached");
              error.code = "ETOOLARGE";
              parserHandlesEnd = false;
              res.destroy(error);
              this.callback(error, null);
            }
          });
        }
        if (parser) {
          try {
            parserHandlesEnd = buffer;
            parser(res, (error, object, files) => {
              if (this.timedout) {
                return;
              }
              if (error && !this._aborted) {
                return this.callback(error);
              }
              if (parserHandlesEnd) {
                if (multipart) {
                  if (object) {
                    for (const key in object) {
                      const value = object[key];
                      if (Array.isArray(value) && value.length === 1) {
                        object[key] = value[0];
                      } else {
                        object[key] = value;
                      }
                    }
                  }
                  if (files) {
                    for (const key in files) {
                      const value = files[key];
                      if (Array.isArray(value) && value.length === 1) {
                        files[key] = value[0];
                      } else {
                        files[key] = value;
                      }
                    }
                  }
                }
                this.emit("end");
                this.callback(null, this._emitResponse(object, files));
              }
            });
          } catch (err) {
            this.callback(err);
            return;
          }
        }
        this.res = res;
        if (!buffer) {
          debug("unbuffered %s %s", this.method, this.url);
          this.callback(null, this._emitResponse());
          if (multipart) return;
          res.once("end", () => {
            debug("end %s %s", this.method, this.url);
            this.emit("end");
          });
          return;
        }
        res.once("error", (error) => {
          parserHandlesEnd = false;
          this.callback(error, null);
        });
        if (!parserHandlesEnd) res.once("end", () => {
          debug("end %s %s", this.method, this.url);
          this.emit("end");
          this.callback(null, this._emitResponse());
        });
      });
      this.emit("request", this);
      const getProgressMonitor = () => {
        const lengthComputable = true;
        const total = req.getHeader("Content-Length");
        let loaded = 0;
        const progress = new Stream.Transform();
        progress._transform = (chunk, encoding, callback) => {
          loaded += chunk.length;
          this.emit("progress", {
            direction: "upload",
            lengthComputable,
            loaded,
            total
          });
          callback(null, chunk);
        };
        return progress;
      };
      const bufferToChunks = (buffer) => {
        const chunkSize = 16 * 1024;
        const chunking = new Stream.Readable();
        const totalLength = buffer.length;
        const remainder = totalLength % chunkSize;
        const cutoff = totalLength - remainder;
        for (let i = 0; i < cutoff; i += chunkSize) {
          const chunk = buffer.slice(i, i + chunkSize);
          chunking.push(chunk);
        }
        if (remainder > 0) {
          const remainderBuffer = buffer.slice(-remainder);
          chunking.push(remainderBuffer);
        }
        chunking.push(null);
        return chunking;
      };
      const formData = this._formData;
      if (formData) {
        const headers = formData.getHeaders();
        for (const i in headers) {
          if (hasOwn(headers, i)) {
            debug('setting FormData header: "%s: %s"', i, headers[i]);
            req.setHeader(i, headers[i]);
          }
        }
        formData.getLength((error, length) => {
          if (error) debug("formData.getLength had error", error, length);
          debug("got FormData Content-Length: %s", length);
          if (typeof length === "number") {
            req.setHeader("Content-Length", length);
          }
          formData.pipe(getProgressMonitor()).pipe(req);
        });
      } else if (Buffer.isBuffer(data)) {
        bufferToChunks(data).pipe(getProgressMonitor()).pipe(req);
      } else {
        req.end(data);
      }
    };
    Request.prototype._shouldUnzip = (res) => {
      if (res.statusCode === 204 || res.statusCode === 304) {
        return false;
      }
      if (res.headers["content-length"] === "0") {
        return false;
      }
      return /^\s*(?:deflate|gzip)\s*$/.test(res.headers["content-encoding"]);
    };
    Request.prototype.connect = function(connectOverride) {
      if (typeof connectOverride === "string") {
        this._connectOverride = {
          "*": connectOverride
        };
      } else if (typeof connectOverride === "object") {
        this._connectOverride = connectOverride;
      } else {
        this._connectOverride = void 0;
      }
      return this;
    };
    Request.prototype.trustLocalhost = function(toggle) {
      this._trustLocalhost = toggle === void 0 ? true : toggle;
      return this;
    };
    if (!methods.includes("del")) {
      methods = [...methods];
      methods.push("del");
    }
    for (let method of methods) {
      const name = method;
      method = method === "del" ? "delete" : method;
      method = method.toUpperCase();
      request[name] = (url, data, fn) => {
        const request_ = request(method, url);
        if (typeof data === "function") {
          fn = data;
          data = null;
        }
        if (data) {
          if (method === "GET" || method === "HEAD") {
            request_.query(data);
          } else {
            request_.send(data);
          }
        }
        if (fn) request_.end(fn);
        return request_;
      };
    }
    function isText(mime2) {
      const parts = mime2.split("/");
      let type = parts[0];
      if (type) type = type.toLowerCase().trim();
      let subtype = parts[1];
      if (subtype) subtype = subtype.toLowerCase().trim();
      return type === "text" || subtype === "x-www-form-urlencoded";
    }
    function isBinary(mime2) {
      let [registry, name] = mime2.split("/");
      if (registry) registry = registry.toLowerCase().trim();
      if (name) name = name.toLowerCase().trim();
      return ["audio", "font", "image", "video"].includes(registry) || ["gz", "gzip"].includes(name);
    }
    function isJSON(mime2) {
      return /[/+]json($|[^-\w])/i.test(mime2);
    }
    function isRedirect(code) {
      return [301, 302, 303, 305, 307, 308].includes(code);
    }
  }
});

// src/index.js
var index_exports = {};
__export(index_exports, {
  ApiClient: () => ApiClient,
  AssetTotalItem: () => AssetTotalItem,
  AssetsTotalRequest: () => AssetsTotalRequest,
  AssetsTotalResponse: () => AssetsTotalResponse,
  AuthStatusResponse: () => AuthStatusResponse,
  BalanceItem: () => BalanceItem,
  BalancesResponse: () => BalancesResponse,
  ChartDataRequest: () => ChartDataRequest,
  ChartDataResponse: () => ChartDataResponse,
  ChartMarkItem: () => ChartMarkItem,
  ChartMarksResponse: () => ChartMarksResponse,
  ConfigFullResponse: () => ConfigFullResponse,
  ConfigPairAddRequest: () => ConfigPairAddRequest,
  ConfigPairRemoveRequest: () => ConfigPairRemoveRequest,
  ConfigStrategyAddRequest: () => ConfigStrategyAddRequest,
  ConfigStrategyRemoveRequest: () => ConfigStrategyRemoveRequest,
  ConfigUpdateRequest: () => ConfigUpdateRequest,
  ConfigUpdateResponse: () => ConfigUpdateResponse,
  CoreMemRawRequest: () => CoreMemRawRequest,
  CoreMemRawResponse: () => CoreMemRawResponse,
  CoreMemSingleRequest: () => CoreMemSingleRequest,
  CoreMemSnapshotResponse: () => CoreMemSnapshotResponse,
  ErrorResponse: () => ErrorResponse,
  FileAclarContentResponse: () => FileAclarContentResponse,
  FileContentResponse: () => FileContentResponse,
  FileGetRequest: () => FileGetRequest,
  FileListResponse: () => FileListResponse,
  FileStateContentResponse: () => FileStateContentResponse,
  FileStrategyWriteRequest: () => FileStrategyWriteRequest,
  FileWriteRequest: () => FileWriteRequest,
  GunbotApi: () => GunbotApi,
  GunbotConfig: () => GunbotConfig,
  LicenseKeysEditRequest: () => LicenseKeysEditRequest,
  LoginRequest: () => LoginRequest,
  LoginResponse: () => LoginResponse,
  MarketCandlesResponse: () => MarketCandlesResponse,
  MarketOrderbookData: () => MarketOrderbookData,
  MarketOrderbookResponse: () => MarketOrderbookResponse,
  OHLCVData: () => OHLCVData,
  OneOfFileWriteRequestDocument: () => OneOfFileWriteRequestDocument,
  OneOfOrderItemId: () => OneOfOrderItemId,
  OrderItem: () => OrderItem,
  OrderbookLevel: () => OrderbookLevel,
  OrdersDayResponse: () => OrdersDayResponse,
  OrdersPageMultiResponse: () => OrdersPageMultiResponse,
  OrdersPageResponse: () => OrdersPageResponse,
  OrdersResponse: () => OrdersResponse,
  PairDetailItem: () => PairDetailItem,
  PairsDetailedResponse: () => PairsDetailedResponse,
  PairsResponse: () => PairsResponse,
  PnlDailyPaginatedResponse: () => PnlDailyPaginatedResponse,
  PnlDailyResponse: () => PnlDailyResponse,
  PnlOverviewRequest: () => PnlOverviewRequest,
  PnlOverviewRequestDateRange: () => PnlOverviewRequestDateRange,
  PnlOverviewResponse: () => PnlOverviewResponse,
  PnlSumResponse: () => PnlSumResponse,
  PnlSumResponseTournamentData: () => PnlSumResponseTournamentData,
  PnlTotalResponse: () => PnlTotalResponse,
  SuccessStatusResponse: () => SuccessStatusResponse,
  SystemActionResponse: () => SystemActionResponse,
  TimeResponse: () => TimeResponse,
  TradeCancelData: () => TradeCancelData,
  TradeCancelRequest: () => TradeCancelRequest,
  TradeCloseLimitData: () => TradeCloseLimitData,
  TradeCloseLimitRequest: () => TradeCloseLimitRequest,
  TradeCloseMarketData: () => TradeCloseMarketData,
  TradeCloseMarketRequest: () => TradeCloseMarketRequest,
  TradeLimitOrderData: () => TradeLimitOrderData,
  TradeLimitOrderRequest: () => TradeLimitOrderRequest,
  TradeMarketOrderData: () => TradeMarketOrderData,
  TradeMarketOrderRequest: () => TradeMarketOrderRequest,
  TradeOcoData: () => TradeOcoData,
  TradeOcoRequest: () => TradeOcoRequest,
  TradeResponse: () => TradeResponse,
  TradeStopLimitData: () => TradeStopLimitData,
  TradeStopLimitRequest: () => TradeStopLimitRequest,
  TradeTrailingStopData: () => TradeTrailingStopData,
  TradeTrailingStopRequest: () => TradeTrailingStopRequest
});
module.exports = __toCommonJS(index_exports);

// src/ApiClient.js
var import_superagent = __toESM(require_node2(), 1);
var ApiClient = class _ApiClient {
  constructor() {
    this.basePath = "http://your-gunbot-instance.com:3000/api/v1".replace(/\/+$/, "");
    this.authentications = {};
    this.defaultHeaders = {};
    this.timeout = 6e4;
    this.cache = true;
    this.enableCookies = false;
    if (typeof window === "undefined") {
      this.agent = new import_superagent.default.agent();
    }
    this.requestAgent = null;
  }
  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */
  paramToString(param) {
    if (param == void 0 || param == null) {
      return "";
    }
    if (param instanceof Date) {
      return param.toJSON();
    }
    return param.toString();
  }
  /**
  * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
  * NOTE: query parameters are not handled here.
  * @param {String} path The path to append to the base URL.
  * @param {Object} pathParams The parameter values to append.
  * @returns {String} The encoded path with parameter values substituted.
  */
  buildUrl(path, pathParams) {
    if (!path.match(/^\//)) {
      path = "/" + path;
    }
    var url = this.basePath + path;
    url = url.replace(/\{([\w-]+)\}/g, (fullMatch, key) => {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = this.paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
    return url;
  }
  /**
  * Checks whether the given content type represents JSON.<br>
  * JSON content type examples:<br>
  * <ul>
  * <li>application/json</li>
  * <li>application/json; charset=UTF8</li>
  * <li>APPLICATION/JSON</li>
  * </ul>
  * @param {String} contentType The MIME content type to check.
  * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
  */
  isJsonMime(contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
  }
  /**
  * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
  * @param {Array.<String>} contentTypes
  * @returns {String} The chosen content type, preferring JSON.
  */
  jsonPreferredMime(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i];
      }
    }
    return contentTypes[0];
  }
  /**
  * Checks whether the given parameter value represents file-like content.
  * @param param The parameter to check.
  * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
  */
  isFileParam(param) {
    if (typeof require === "function") {
      let fs;
      try {
        fs = require("fs");
      } catch (err) {
      }
      if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
        return true;
      }
    }
    if (typeof Buffer === "function" && param instanceof Buffer) {
      return true;
    }
    if (typeof Blob === "function" && param instanceof Blob) {
      return true;
    }
    if (typeof File === "function" && param instanceof File) {
      return true;
    }
    return false;
  }
  /**
  * Normalizes parameter values:
  * <ul>
  * <li>remove nils</li>
  * <li>keep files and arrays</li>
  * <li>format to string with `paramToString` for other cases</li>
  * </ul>
  * @param {Object.<String, Object>} params The parameters as object properties.
  * @returns {Object.<String, Object>} normalized parameters.
  */
  normalizeParams(params) {
    var newParams = {};
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key] != void 0 && params[key] != null) {
        var value = params[key];
        if (this.isFileParam(value) || Array.isArray(value)) {
          newParams[key] = value;
        } else {
          newParams[key] = this.paramToString(value);
        }
      }
    }
    return newParams;
  }
  /**
  * Enumeration of collection format separator strategies.
  * @enum {String}
  * @readonly
  */
  static CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ",",
    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: " ",
    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: "	",
    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: "|",
    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: "multi"
  };
  /**
  * Builds a string representation of an array-type actual parameter, according to the given collection format.
  * @param {Array} param An array parameter.
  * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
  * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
  * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
  */
  buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null;
    }
    switch (collectionFormat) {
      case "csv":
        return param.map(this.paramToString).join(",");
      case "ssv":
        return param.map(this.paramToString).join(" ");
      case "tsv":
        return param.map(this.paramToString).join("	");
      case "pipes":
        return param.map(this.paramToString).join("|");
      case "multi":
        return param.map(this.paramToString);
      default:
        throw new Error("Unknown collection format: " + collectionFormat);
    }
  }
  /**
  * Applies authentication headers to the request.
  * @param {Object} request The request object created by a <code>superagent()</code> call.
  * @param {Array.<String>} authNames An array of authentication method names.
  */
  applyAuthToRequest(request, authNames) {
    authNames.forEach((authName) => {
      var auth = this.authentications[authName];
      switch (auth.type) {
        case "basic":
          if (auth.username || auth.password) {
            request.auth(auth.username || "", auth.password || "");
          }
          break;
        case "apiKey":
          if (auth.apiKey) {
            var data = {};
            if (auth.apiKeyPrefix) {
              data[auth.name] = auth.apiKeyPrefix + " " + auth.apiKey;
            } else {
              data[auth.name] = auth.apiKey;
            }
            if (auth["in"] === "header") {
              request.set(data);
            } else {
              request.query(data);
            }
          }
          break;
        case "oauth2":
          if (auth.accessToken) {
            request.set({ "Authorization": "Bearer " + auth.accessToken });
          }
          break;
        default:
          throw new Error("Unknown authentication type: " + auth.type);
      }
    });
  }
  /**
  * Deserializes an HTTP response body into a value of the specified type.
  * @param {Object} response A SuperAgent response object.
  * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
  * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
  * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
  * all properties on <code>data<code> will be converted to this type.
  * @returns A value of the specified type.
  */
  deserialize(response, returnType) {
    if (response == null || returnType == null || response.status == 204) {
      return null;
    }
    var data = response.body;
    if (data == null || typeof data === "object" && typeof data.length === "undefined" && !Object.keys(data).length) {
      data = response.text;
    }
    return _ApiClient.convertToType(data, returnType);
  }
  /**
  * Callback function to receive the result of the operation.
  * @callback module:ApiClient~callApiCallback
  * @param {String} error Error message, if any.
  * @param data The data returned by the service call.
  * @param {String} response The complete HTTP response.
  */
  /**
  * Invokes the REST service using the supplied settings and parameters.
  * @param {String} path The base URL to invoke.
  * @param {String} httpMethod The HTTP method to use.
  * @param {Object.<String, String>} pathParams A map of path parameters and their values.
  * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
  * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
  * @param {Object.<String, Object>} formParams A map of form parameters and their values.
  * @param {Object} bodyParam The value to pass as the request body.
  * @param {Array.<String>} authNames An array of authentication type names.
  * @param {Array.<String>} contentTypes An array of request MIME types.
  * @param {Array.<String>} accepts An array of acceptable response MIME types.
  * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
  * constructor for a complex type.
  * @param {module:ApiClient~callApiCallback} callback The callback function.
  * @returns {Object} The SuperAgent request object.
  */
  callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType, callback) {
    var url = this.buildUrl(path, pathParams);
    var request = (0, import_superagent.default)(httpMethod, url);
    this.applyAuthToRequest(request, authNames);
    if (httpMethod.toUpperCase() === "GET" && this.cache === false) {
      queryParams["_"] = (/* @__PURE__ */ new Date()).getTime();
    }
    request.query(this.normalizeParams(queryParams));
    request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));
    if (this.requestAgent) {
      request.agent(this.requestAgent);
    }
    request.timeout(this.timeout);
    var contentType = this.jsonPreferredMime(contentTypes);
    if (contentType) {
      if (contentType != "multipart/form-data") {
        request.type(contentType);
      }
    } else if (!request.header["Content-Type"]) {
      request.type("application/json");
    }
    if (contentType === "application/x-www-form-urlencoded") {
      request.send(new URLSearchParams(this.normalizeParams(formParams)));
    } else if (contentType == "multipart/form-data") {
      var _formParams = this.normalizeParams(formParams);
      for (var key in _formParams) {
        if (_formParams.hasOwnProperty(key)) {
          if (this.isFileParam(_formParams[key])) {
            request.attach(key, _formParams[key]);
          } else {
            request.field(key, _formParams[key]);
          }
        }
      }
    } else if (bodyParam) {
      request.send(bodyParam);
    }
    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
      request.accept(accept);
    }
    if (returnType === "Blob") {
      request.responseType("blob");
    } else if (returnType === "String") {
      request.responseType("string");
    }
    if (this.enableCookies) {
      if (typeof window === "undefined") {
        this.agent.attachCookies(request);
      } else {
        request.withCredentials();
      }
    }
    if (typeof callback === "function") {
      request.end((error, response) => {
        let data = null;
        if (!error) {
          try {
            data = this.deserialize(response, returnType);
            if (this.enableCookies && typeof window === "undefined") {
              this.agent.saveCookies(response);
            }
          } catch (err) {
            error = err;
          }
        }
        callback(error, data, response);
      });
      return request;
    }
    return new Promise((resolve, reject) => {
      request.end((error, response) => {
        if (error) {
          reject(error);
          return;
        }
        try {
          const data = this.deserialize(response, returnType);
          if (this.enableCookies && typeof window === "undefined") {
            this.agent.saveCookies(response);
          }
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
  /**
  * Parses an ISO-8601 string representation of a date value.
  * @param {String} str The date value as a string.
  * @returns {Date} The parsed date object.
  */
  static parseDate(str) {
    return new Date(str);
  }
  /**
  * Converts a value to the specified type.
  * @param {(String|Object)} data The data to convert, as a string or object.
  * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
  * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
  * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
  * all properties on <code>data<code> will be converted to this type.
  * @returns An instance of the specified type or null or undefined if data is null or undefined.
  */
  static convertToType(data, type) {
    if (data === null || data === void 0)
      return data;
    switch (type) {
      case "Boolean":
        return Boolean(data);
      case "Integer":
        return parseInt(data, 10);
      case "Number":
        return parseFloat(data);
      case "String":
        return String(data);
      case "Date":
        return _ApiClient.parseDate(String(data));
      case "Blob":
        return data;
      default:
        if (type === Object) {
          return data;
        } else if (typeof type === "function") {
          return type.constructFromObject(data);
        } else if (Array.isArray(type)) {
          var itemType = type[0];
          return data.map((item) => {
            return _ApiClient.convertToType(item, itemType);
          });
        } else if (typeof type === "object") {
          var keyType, valueType;
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k;
              valueType = type[k];
              break;
            }
          }
          var result = {};
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              var key = _ApiClient.convertToType(k, keyType);
              var value = _ApiClient.convertToType(data[k], valueType);
              result[key] = value;
            }
          }
          return result;
        } else {
          return data;
        }
    }
  }
  /**
  * Constructs a new map or array model from REST data.
  * @param data {Object|Array} The REST data.
  * @param obj {Object|Array} The target object or array.
  */
  static constructFromObject(data, obj, itemType) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i))
          obj[i] = _ApiClient.convertToType(data[i], itemType);
      }
    } else {
      for (var k in data) {
        if (data.hasOwnProperty(k))
          obj[k] = _ApiClient.convertToType(data[k], itemType);
      }
    }
  }
};
ApiClient.instance = new ApiClient();

// src/model/AssetTotalItem.js
var AssetTotalItem = class _AssetTotalItem {
  /**
   * Constructs a new <code>AssetTotalItem</code>.
   * @alias module:model/AssetTotalItem
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>AssetTotalItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssetTotalItem} obj Optional instance to populate.
   * @return {module:model/AssetTotalItem} The populated <code>AssetTotalItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _AssetTotalItem();
      if (data.hasOwnProperty("id"))
        obj.id = ApiClient.convertToType(data["id"], "Number");
      if (data.hasOwnProperty("base_key"))
        obj.baseKey = ApiClient.convertToType(data["base_key"], "String");
      if (data.hasOwnProperty("amount"))
        obj.amount = ApiClient.convertToType(data["amount"], "Number");
      if (data.hasOwnProperty("timestamp"))
        obj.timestamp = ApiClient.convertToType(data["timestamp"], "Number");
    }
    return obj;
  }
};
AssetTotalItem.prototype.id = void 0;
AssetTotalItem.prototype.baseKey = void 0;
AssetTotalItem.prototype.amount = void 0;
AssetTotalItem.prototype.timestamp = void 0;

// src/model/AssetsTotalRequest.js
var AssetsTotalRequest = class _AssetsTotalRequest {
  /**
   * Constructs a new <code>AssetsTotalRequest</code>.
   * @alias module:model/AssetsTotalRequest
   * @class
   * @param exchange {String} Exchange name (e.g., `binance`).
   * @param base {String} Base currency to value the assets in (e.g., `USDT`).
   * @param start {Number} Start timestamp in milliseconds since Unix epoch.
   * @param end {Number} End timestamp in milliseconds since Unix epoch.
   */
  constructor(exchange, base, start, end) {
    this.exchange = exchange;
    this.base = base;
    this.start = start;
    this.end = end;
  }
  /**
   * Constructs a <code>AssetsTotalRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssetsTotalRequest} obj Optional instance to populate.
   * @return {module:model/AssetsTotalRequest} The populated <code>AssetsTotalRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _AssetsTotalRequest();
      if (data.hasOwnProperty("exchange"))
        obj.exchange = ApiClient.convertToType(data["exchange"], "String");
      if (data.hasOwnProperty("base"))
        obj.base = ApiClient.convertToType(data["base"], "String");
      if (data.hasOwnProperty("start"))
        obj.start = ApiClient.convertToType(data["start"], "Number");
      if (data.hasOwnProperty("end"))
        obj.end = ApiClient.convertToType(data["end"], "Number");
    }
    return obj;
  }
};
AssetsTotalRequest.prototype.exchange = void 0;
AssetsTotalRequest.prototype.base = void 0;
AssetsTotalRequest.prototype.start = void 0;
AssetsTotalRequest.prototype.end = void 0;

// src/model/AssetsTotalResponse.js
var AssetsTotalResponse = class _AssetsTotalResponse extends Array {
  /**
   * Constructs a new <code>AssetsTotalResponse</code>.
   * @alias module:model/AssetsTotalResponse
   * @class
   * @extends Array
   */
  constructor() {
    super();
  }
  /**
   * Constructs a <code>AssetsTotalResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssetsTotalResponse} obj Optional instance to populate.
   * @return {module:model/AssetsTotalResponse} The populated <code>AssetsTotalResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _AssetsTotalResponse();
      ApiClient.constructFromObject(data, obj, "AssetTotalItem");
    }
    return obj;
  }
};

// src/model/AuthStatusResponse.js
var AuthStatusResponse = class _AuthStatusResponse {
  /**
   * Constructs a new <code>AuthStatusResponse</code>.
   * @alias module:model/AuthStatusResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>AuthStatusResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthStatusResponse} obj Optional instance to populate.
   * @return {module:model/AuthStatusResponse} The populated <code>AuthStatusResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _AuthStatusResponse();
      if (data.hasOwnProperty("code"))
        obj.code = ApiClient.convertToType(data["code"], "Number");
      if (data.hasOwnProperty("isDemo"))
        obj.isDemo = ApiClient.convertToType(data["isDemo"], "Boolean");
      if (data.hasOwnProperty("isRegistered"))
        obj.isRegistered = ApiClient.convertToType(data["isRegistered"], "Boolean");
      if (data.hasOwnProperty("isTwoFA"))
        obj.isTwoFA = ApiClient.convertToType(data["isTwoFA"], "Boolean");
      if (data.hasOwnProperty("metamask"))
        obj.metamask = ApiClient.convertToType(data["metamask"], "Boolean");
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("message"))
        obj.message = ApiClient.convertToType(data["message"], "String");
    }
    return obj;
  }
};
AuthStatusResponse.prototype.code = void 0;
AuthStatusResponse.prototype.isDemo = void 0;
AuthStatusResponse.prototype.isRegistered = void 0;
AuthStatusResponse.prototype.isTwoFA = void 0;
AuthStatusResponse.prototype.metamask = void 0;
AuthStatusResponse.prototype.status = void 0;
AuthStatusResponse.prototype.message = void 0;

// src/model/BalanceItem.js
var BalanceItem = class _BalanceItem {
  /**
   * Constructs a new <code>BalanceItem</code>.
   * @alias module:model/BalanceItem
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>BalanceItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BalanceItem} obj Optional instance to populate.
   * @return {module:model/BalanceItem} The populated <code>BalanceItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _BalanceItem();
      if (data.hasOwnProperty("Asset"))
        obj.asset = ApiClient.convertToType(data["Asset"], "String");
      if (data.hasOwnProperty("Exchange"))
        obj.exchange = ApiClient.convertToType(data["Exchange"], "String");
      if (data.hasOwnProperty("Available Qty"))
        obj.availableQty = ApiClient.convertToType(data["Available Qty"], "String");
      if (data.hasOwnProperty("On Order"))
        obj.onOrder = ApiClient.convertToType(data["On Order"], "String");
    }
    return obj;
  }
};
BalanceItem.prototype.asset = void 0;
BalanceItem.prototype.exchange = void 0;
BalanceItem.prototype.availableQty = void 0;
BalanceItem.prototype.onOrder = void 0;

// src/model/BalancesResponse.js
var BalancesResponse = class _BalancesResponse extends Array {
  /**
   * Constructs a new <code>BalancesResponse</code>.
   * @alias module:model/BalancesResponse
   * @class
   * @extends Array
   */
  constructor() {
    super();
  }
  /**
   * Constructs a <code>BalancesResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BalancesResponse} obj Optional instance to populate.
   * @return {module:model/BalancesResponse} The populated <code>BalancesResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _BalancesResponse();
      ApiClient.constructFromObject(data, obj, "BalanceItem");
    }
    return obj;
  }
};

// src/model/ChartDataRequest.js
var ChartDataRequest = class _ChartDataRequest {
  /**
   * Constructs a new <code>ChartDataRequest</code>.
   * @alias module:model/ChartDataRequest
   * @class
   * @param exchange {String} 
   * @param pair {String} 
   */
  constructor(exchange, pair) {
    this.exchange = exchange;
    this.pair = pair;
  }
  /**
   * Constructs a <code>ChartDataRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ChartDataRequest} obj Optional instance to populate.
   * @return {module:model/ChartDataRequest} The populated <code>ChartDataRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ChartDataRequest();
      if (data.hasOwnProperty("exchange"))
        obj.exchange = ApiClient.convertToType(data["exchange"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
    }
    return obj;
  }
};
ChartDataRequest.prototype.exchange = void 0;
ChartDataRequest.prototype.pair = void 0;

// src/model/ChartDataResponse.js
var ChartDataResponse = class _ChartDataResponse {
  /**
   * Constructs a new <code>ChartDataResponse</code>.
   * Chart data with candle and indicator arrays.
   * @alias module:model/ChartDataResponse
   * @class
   * @extends 
   */
  constructor() {
  }
  /**
   * Constructs a <code>ChartDataResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ChartDataResponse} obj Optional instance to populate.
   * @return {module:model/ChartDataResponse} The populated <code>ChartDataResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ChartDataResponse();
      ApiClient.constructFromObject(data, obj, "");
    }
    return obj;
  }
};

// src/model/ChartMarkItem.js
var ChartMarkItem = class _ChartMarkItem {
  /**
   * Constructs a new <code>ChartMarkItem</code>.
   * @alias module:model/ChartMarkItem
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>ChartMarkItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ChartMarkItem} obj Optional instance to populate.
   * @return {module:model/ChartMarkItem} The populated <code>ChartMarkItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ChartMarkItem();
      if (data.hasOwnProperty("exchange"))
        obj.exchange = ApiClient.convertToType(data["exchange"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("id"))
        obj.id = ApiClient.convertToType(data["id"], "String");
      if (data.hasOwnProperty("time"))
        obj.time = ApiClient.convertToType(data["time"], "Number");
      if (data.hasOwnProperty("color"))
        obj.color = ApiClient.convertToType(data["color"], "String");
      if (data.hasOwnProperty("label"))
        obj.label = ApiClient.convertToType(data["label"], "String");
      if (data.hasOwnProperty("tooltip"))
        obj.tooltip = ApiClient.convertToType(data["tooltip"], ["String"]);
    }
    return obj;
  }
};
ChartMarkItem.prototype.exchange = void 0;
ChartMarkItem.prototype.pair = void 0;
ChartMarkItem.prototype.id = void 0;
ChartMarkItem.prototype.time = void 0;
ChartMarkItem.prototype.color = void 0;
ChartMarkItem.prototype.label = void 0;
ChartMarkItem.prototype.tooltip = void 0;

// src/model/ChartMarksResponse.js
var ChartMarksResponse = class _ChartMarksResponse extends Array {
  /**
   * Constructs a new <code>ChartMarksResponse</code>.
   * @alias module:model/ChartMarksResponse
   * @class
   * @extends Array
   */
  constructor() {
    super();
  }
  /**
   * Constructs a <code>ChartMarksResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ChartMarksResponse} obj Optional instance to populate.
   * @return {module:model/ChartMarksResponse} The populated <code>ChartMarksResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ChartMarksResponse();
      ApiClient.constructFromObject(data, obj, "ChartMarkItem");
    }
    return obj;
  }
};

// src/model/GunbotConfig.js
var GunbotConfig = class _GunbotConfig {
  /**
   * Constructs a new <code>GunbotConfig</code>.
   * @alias module:model/GunbotConfig
   * @class
   * @extends Object
   */
  constructor() {
  }
  /**
   * Constructs a <code>GunbotConfig</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GunbotConfig} obj Optional instance to populate.
   * @return {module:model/GunbotConfig} The populated <code>GunbotConfig</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _GunbotConfig();
      ApiClient.constructFromObject(data, obj, "Object");
    }
    return obj;
  }
};

// src/model/ConfigFullResponse.js
var ConfigFullResponse = class _ConfigFullResponse {
  /**
   * Constructs a new <code>ConfigFullResponse</code>.
   * @alias module:model/ConfigFullResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>ConfigFullResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigFullResponse} obj Optional instance to populate.
   * @return {module:model/ConfigFullResponse} The populated <code>ConfigFullResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ConfigFullResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("config"))
        obj.config = GunbotConfig.constructFromObject(data["config"]);
    }
    return obj;
  }
};
ConfigFullResponse.prototype.status = void 0;
ConfigFullResponse.prototype.config = void 0;

// src/model/ConfigPairAddRequest.js
var ConfigPairAddRequest = class _ConfigPairAddRequest {
  /**
   * Constructs a new <code>ConfigPairAddRequest</code>.
   * @alias module:model/ConfigPairAddRequest
   * @class
   * @param pair {String} The trading pair to add (e.g., `USDT-PEPE`).
   * @param exchange {String} The exchange name (e.g., `binance`).
   */
  constructor(pair, exchange) {
    this.pair = pair;
    this.exchange = exchange;
  }
  /**
   * Constructs a <code>ConfigPairAddRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigPairAddRequest} obj Optional instance to populate.
   * @return {module:model/ConfigPairAddRequest} The populated <code>ConfigPairAddRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ConfigPairAddRequest();
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("exchange"))
        obj.exchange = ApiClient.convertToType(data["exchange"], "String");
      if (data.hasOwnProperty("settings"))
        obj.settings = ApiClient.convertToType(data["settings"], { "String": Object });
    }
    return obj;
  }
};
ConfigPairAddRequest.prototype.pair = void 0;
ConfigPairAddRequest.prototype.exchange = void 0;
ConfigPairAddRequest.prototype.settings = void 0;

// src/model/ConfigPairRemoveRequest.js
var ConfigPairRemoveRequest = class _ConfigPairRemoveRequest {
  /**
   * Constructs a new <code>ConfigPairRemoveRequest</code>.
   * @alias module:model/ConfigPairRemoveRequest
   * @class
   * @param pair {String} The trading pair to remove (e.g., `USDT-PEPE`).
   * @param exchange {String} The exchange name (e.g., `binance`).
   */
  constructor(pair, exchange) {
    this.pair = pair;
    this.exchange = exchange;
  }
  /**
   * Constructs a <code>ConfigPairRemoveRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigPairRemoveRequest} obj Optional instance to populate.
   * @return {module:model/ConfigPairRemoveRequest} The populated <code>ConfigPairRemoveRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ConfigPairRemoveRequest();
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("exchange"))
        obj.exchange = ApiClient.convertToType(data["exchange"], "String");
    }
    return obj;
  }
};
ConfigPairRemoveRequest.prototype.pair = void 0;
ConfigPairRemoveRequest.prototype.exchange = void 0;

// src/model/ConfigStrategyAddRequest.js
var ConfigStrategyAddRequest = class _ConfigStrategyAddRequest {
  /**
   * Constructs a new <code>ConfigStrategyAddRequest</code>.
   * @alias module:model/ConfigStrategyAddRequest
   * @class
   * @param name {String} The name of the strategy to add (e.g., `myStrategy`).
   * @param settings {Object.<String, Object>} (Optional) Specific settings for the strategy.
   */
  constructor(name, settings) {
    this.name = name;
    this.settings = settings;
  }
  /**
   * Constructs a <code>ConfigStrategyAddRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigStrategyAddRequest} obj Optional instance to populate.
   * @return {module:model/ConfigStrategyAddRequest} The populated <code>ConfigStrategyAddRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ConfigStrategyAddRequest();
      if (data.hasOwnProperty("name"))
        obj.name = ApiClient.convertToType(data["name"], "String");
      if (data.hasOwnProperty("settings"))
        obj.settings = ApiClient.convertToType(data["settings"], { "String": Object });
    }
    return obj;
  }
};
ConfigStrategyAddRequest.prototype.name = void 0;
ConfigStrategyAddRequest.prototype.settings = void 0;

// src/model/ConfigStrategyRemoveRequest.js
var ConfigStrategyRemoveRequest = class _ConfigStrategyRemoveRequest {
  /**
   * Constructs a new <code>ConfigStrategyRemoveRequest</code>.
   * @alias module:model/ConfigStrategyRemoveRequest
   * @class
   * @param name {String} The name of the strategy to remove.
   */
  constructor(name) {
    this.name = name;
  }
  /**
   * Constructs a <code>ConfigStrategyRemoveRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigStrategyRemoveRequest} obj Optional instance to populate.
   * @return {module:model/ConfigStrategyRemoveRequest} The populated <code>ConfigStrategyRemoveRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ConfigStrategyRemoveRequest();
      if (data.hasOwnProperty("name"))
        obj.name = ApiClient.convertToType(data["name"], "String");
    }
    return obj;
  }
};
ConfigStrategyRemoveRequest.prototype.name = void 0;

// src/model/ConfigUpdateRequest.js
var ConfigUpdateRequest = class _ConfigUpdateRequest {
  /**
   * Constructs a new <code>ConfigUpdateRequest</code>.
   * @alias module:model/ConfigUpdateRequest
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>ConfigUpdateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigUpdateRequest} obj Optional instance to populate.
   * @return {module:model/ConfigUpdateRequest} The populated <code>ConfigUpdateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ConfigUpdateRequest();
      if (data.hasOwnProperty("config"))
        obj.config = GunbotConfig.constructFromObject(data["config"]);
    }
    return obj;
  }
};
ConfigUpdateRequest.prototype.config = void 0;

// src/model/ConfigUpdateResponse.js
var ConfigUpdateResponse = class _ConfigUpdateResponse {
  /**
   * Constructs a new <code>ConfigUpdateResponse</code>.
   * @alias module:model/ConfigUpdateResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>ConfigUpdateResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigUpdateResponse} obj Optional instance to populate.
   * @return {module:model/ConfigUpdateResponse} The populated <code>ConfigUpdateResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ConfigUpdateResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("config"))
        obj.config = GunbotConfig.constructFromObject(data["config"]);
    }
    return obj;
  }
};
ConfigUpdateResponse.prototype.status = void 0;
ConfigUpdateResponse.prototype.config = void 0;

// src/model/CoreMemRawRequest.js
var CoreMemRawRequest = class _CoreMemRawRequest {
  /**
   * Constructs a new <code>CoreMemRawRequest</code>.
   * @alias module:model/CoreMemRawRequest
   * @class
   * @param exchange {String} 
   * @param pair {String} 
   */
  constructor(exchange, pair) {
    this.exchange = exchange;
    this.pair = pair;
  }
  /**
   * Constructs a <code>CoreMemRawRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CoreMemRawRequest} obj Optional instance to populate.
   * @return {module:model/CoreMemRawRequest} The populated <code>CoreMemRawRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _CoreMemRawRequest();
      if (data.hasOwnProperty("exchange"))
        obj.exchange = ApiClient.convertToType(data["exchange"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("elements"))
        obj.elements = ApiClient.convertToType(data["elements"], ["String"]);
    }
    return obj;
  }
};
CoreMemRawRequest.prototype.exchange = void 0;
CoreMemRawRequest.prototype.pair = void 0;
CoreMemRawRequest.prototype.elements = void 0;

// src/model/CoreMemRawResponse.js
var CoreMemRawResponse = class _CoreMemRawResponse {
  /**
   * Constructs a new <code>CoreMemRawResponse</code>.
   * @alias module:model/CoreMemRawResponse
   * @class
   * @extends 
   */
  constructor() {
  }
  /**
   * Constructs a <code>CoreMemRawResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CoreMemRawResponse} obj Optional instance to populate.
   * @return {module:model/CoreMemRawResponse} The populated <code>CoreMemRawResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _CoreMemRawResponse();
      ApiClient.constructFromObject(data, obj, "");
    }
    return obj;
  }
};

// src/model/CoreMemSingleRequest.js
var CoreMemSingleRequest = class _CoreMemSingleRequest {
  /**
   * Constructs a new <code>CoreMemSingleRequest</code>.
   * @alias module:model/CoreMemSingleRequest
   * @class
   * @param exchange {String} 
   * @param pair {String} 
   */
  constructor(exchange, pair) {
    this.exchange = exchange;
    this.pair = pair;
  }
  /**
   * Constructs a <code>CoreMemSingleRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CoreMemSingleRequest} obj Optional instance to populate.
   * @return {module:model/CoreMemSingleRequest} The populated <code>CoreMemSingleRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _CoreMemSingleRequest();
      if (data.hasOwnProperty("exchange"))
        obj.exchange = ApiClient.convertToType(data["exchange"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
    }
    return obj;
  }
};
CoreMemSingleRequest.prototype.exchange = void 0;
CoreMemSingleRequest.prototype.pair = void 0;

// src/model/CoreMemSnapshotResponse.js
var CoreMemSnapshotResponse = class _CoreMemSnapshotResponse {
  /**
   * Constructs a new <code>CoreMemSnapshotResponse</code>.
   * Snapshot of core memory data.
   * @alias module:model/CoreMemSnapshotResponse
   * @class
   * @extends 
   */
  constructor() {
  }
  /**
   * Constructs a <code>CoreMemSnapshotResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CoreMemSnapshotResponse} obj Optional instance to populate.
   * @return {module:model/CoreMemSnapshotResponse} The populated <code>CoreMemSnapshotResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _CoreMemSnapshotResponse();
      ApiClient.constructFromObject(data, obj, "");
    }
    return obj;
  }
};

// src/model/ErrorResponse.js
var ErrorResponse = class _ErrorResponse {
  /**
   * Constructs a new <code>ErrorResponse</code>.
   * @alias module:model/ErrorResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>ErrorResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ErrorResponse} obj Optional instance to populate.
   * @return {module:model/ErrorResponse} The populated <code>ErrorResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _ErrorResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("message"))
        obj.message = ApiClient.convertToType(data["message"], "String");
      if (data.hasOwnProperty("code"))
        obj.code = ApiClient.convertToType(data["code"], "Number");
    }
    return obj;
  }
};
ErrorResponse.prototype.status = void 0;
ErrorResponse.prototype.message = void 0;
ErrorResponse.prototype.code = void 0;

// src/model/FileAclarContentResponse.js
var FileAclarContentResponse = class _FileAclarContentResponse {
  /**
   * Constructs a new <code>FileAclarContentResponse</code>.
   * @alias module:model/FileAclarContentResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>FileAclarContentResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileAclarContentResponse} obj Optional instance to populate.
   * @return {module:model/FileAclarContentResponse} The populated <code>FileAclarContentResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _FileAclarContentResponse();
      if (data.hasOwnProperty("this"))
        obj._this = ApiClient.convertToType(data["this"], "Number");
      if (data.hasOwnProperty("pnd"))
        obj.pnd = ApiClient.convertToType(data["pnd"], "Boolean");
    }
    return obj;
  }
};
FileAclarContentResponse.prototype._this = void 0;
FileAclarContentResponse.prototype.pnd = void 0;

// src/model/FileContentResponse.js
var FileContentResponse = class _FileContentResponse {
  /**
   * Constructs a new <code>FileContentResponse</code>.
   * @alias module:model/FileContentResponse
   * @class
   * @extends 
   */
  constructor() {
  }
  /**
   * Constructs a <code>FileContentResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileContentResponse} obj Optional instance to populate.
   * @return {module:model/FileContentResponse} The populated <code>FileContentResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _FileContentResponse();
      ApiClient.constructFromObject(data, obj, "");
    }
    return obj;
  }
};

// src/model/FileGetRequest.js
var FileGetRequest = class _FileGetRequest {
  /**
   * Constructs a new <code>FileGetRequest</code>.
   * @alias module:model/FileGetRequest
   * @class
   * @param filename {String} The name of the file to retrieve.
   */
  constructor(filename) {
    this.filename = filename;
  }
  /**
   * Constructs a <code>FileGetRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileGetRequest} obj Optional instance to populate.
   * @return {module:model/FileGetRequest} The populated <code>FileGetRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _FileGetRequest();
      if (data.hasOwnProperty("filename"))
        obj.filename = ApiClient.convertToType(data["filename"], "String");
    }
    return obj;
  }
};
FileGetRequest.prototype.filename = void 0;

// src/model/FileListResponse.js
var FileListResponse = class _FileListResponse {
  /**
   * Constructs a new <code>FileListResponse</code>.
   * @alias module:model/FileListResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>FileListResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileListResponse} obj Optional instance to populate.
   * @return {module:model/FileListResponse} The populated <code>FileListResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _FileListResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("result"))
        obj.result = ApiClient.convertToType(data["result"], ["String"]);
    }
    return obj;
  }
};
FileListResponse.prototype.status = void 0;
FileListResponse.prototype.result = void 0;

// src/model/FileStateContentResponse.js
var FileStateContentResponse = class _FileStateContentResponse {
  /**
   * Constructs a new <code>FileStateContentResponse</code>.
   * @alias module:model/FileStateContentResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>FileStateContentResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileStateContentResponse} obj Optional instance to populate.
   * @return {module:model/FileStateContentResponse} The populated <code>FileStateContentResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _FileStateContentResponse();
      if (data.hasOwnProperty("orders"))
        obj.orders = ApiClient.convertToType(data["orders"], [{ "String": Object }]);
      if (data.hasOwnProperty("balances"))
        obj.balances = ApiClient.convertToType(data["balances"], { "String": Object });
    }
    return obj;
  }
};
FileStateContentResponse.prototype.orders = void 0;
FileStateContentResponse.prototype.balances = void 0;

// src/model/FileStrategyWriteRequest.js
var FileStrategyWriteRequest = class _FileStrategyWriteRequest {
  /**
   * Constructs a new <code>FileStrategyWriteRequest</code>.
   * @alias module:model/FileStrategyWriteRequest
   * @class
   * @param filename {String} 
   * @param document {String} The content to write into the strategy file.
   */
  constructor(filename, document2) {
    this.filename = filename;
    this.document = document2;
  }
  /**
   * Constructs a <code>FileStrategyWriteRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileStrategyWriteRequest} obj Optional instance to populate.
   * @return {module:model/FileStrategyWriteRequest} The populated <code>FileStrategyWriteRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _FileStrategyWriteRequest();
      if (data.hasOwnProperty("filename"))
        obj.filename = ApiClient.convertToType(data["filename"], "String");
      if (data.hasOwnProperty("document"))
        obj.document = ApiClient.convertToType(data["document"], "String");
    }
    return obj;
  }
};
FileStrategyWriteRequest.prototype.filename = void 0;
FileStrategyWriteRequest.prototype.document = void 0;

// src/model/FileWriteRequest.js
var FileWriteRequest = class _FileWriteRequest {
  /**
   * Constructs a new <code>FileWriteRequest</code>.
   * @alias module:model/FileWriteRequest
   * @class
   * @param document {Object} The content to write into the file.
   */
  constructor(document2) {
    this.document = document2;
  }
  /**
   * Constructs a <code>FileWriteRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileWriteRequest} obj Optional instance to populate.
   * @return {module:model/FileWriteRequest} The populated <code>FileWriteRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _FileWriteRequest();
      if (data.hasOwnProperty("document"))
        obj.document = ApiClient.convertToType(data["document"], Object);
    }
    return obj;
  }
};
FileWriteRequest.prototype.document = void 0;

// src/model/LicenseKeysEditRequest.js
var LicenseKeysEditRequest = class _LicenseKeysEditRequest {
  /**
   * Constructs a new <code>LicenseKeysEditRequest</code>.
   * @alias module:model/LicenseKeysEditRequest
   * @class
   * @param wallet {String} 
   * @param newLicenses {Object.<String, Object>} Object containing new license data. Use the entire config.exchanges object. For new keys, set isEncrypted to false.
   * @param verifyExchange {String} Name of an exchange with valid, registered credentials to authenticate the request.
   */
  constructor(wallet, newLicenses, verifyExchange) {
    this.wallet = wallet;
    this.newLicenses = newLicenses;
    this.verifyExchange = verifyExchange;
  }
  /**
   * Constructs a <code>LicenseKeysEditRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LicenseKeysEditRequest} obj Optional instance to populate.
   * @return {module:model/LicenseKeysEditRequest} The populated <code>LicenseKeysEditRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _LicenseKeysEditRequest();
      if (data.hasOwnProperty("wallet"))
        obj.wallet = ApiClient.convertToType(data["wallet"], "String");
      if (data.hasOwnProperty("newLicenses"))
        obj.newLicenses = ApiClient.convertToType(data["newLicenses"], { "String": Object });
      if (data.hasOwnProperty("verifyExchange"))
        obj.verifyExchange = ApiClient.convertToType(data["verifyExchange"], "String");
    }
    return obj;
  }
};
LicenseKeysEditRequest.prototype.wallet = void 0;
LicenseKeysEditRequest.prototype.newLicenses = void 0;
LicenseKeysEditRequest.prototype.verifyExchange = void 0;

// src/model/LoginRequest.js
var LoginRequest = class _LoginRequest {
  /**
   * Constructs a new <code>LoginRequest</code>.
   * @alias module:model/LoginRequest
   * @class
   * @param password {String} The user's encrypted password. See encryption helpers in the original documentation.
   */
  constructor(password) {
    this.password = password;
  }
  /**
   * Constructs a <code>LoginRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LoginRequest} obj Optional instance to populate.
   * @return {module:model/LoginRequest} The populated <code>LoginRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _LoginRequest();
      if (data.hasOwnProperty("password"))
        obj.password = ApiClient.convertToType(data["password"], "String");
    }
    return obj;
  }
};
LoginRequest.prototype.password = void 0;

// src/model/LoginResponse.js
var LoginResponse = class _LoginResponse {
  /**
   * Constructs a new <code>LoginResponse</code>.
   * @alias module:model/LoginResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>LoginResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LoginResponse} obj Optional instance to populate.
   * @return {module:model/LoginResponse} The populated <code>LoginResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _LoginResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("token"))
        obj.token = ApiClient.convertToType(data["token"], "String");
    }
    return obj;
  }
};
LoginResponse.prototype.status = void 0;
LoginResponse.prototype.token = void 0;

// src/model/OHLCVData.js
var OHLCVData = class _OHLCVData {
  /**
   * Constructs a new <code>OHLCVData</code>.
   * @alias module:model/OHLCVData
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OHLCVData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OHLCVData} obj Optional instance to populate.
   * @return {module:model/OHLCVData} The populated <code>OHLCVData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OHLCVData();
      if (data.hasOwnProperty("close"))
        obj.close = ApiClient.convertToType(data["close"], ["Number"]);
      if (data.hasOwnProperty("high"))
        obj.high = ApiClient.convertToType(data["high"], ["Number"]);
      if (data.hasOwnProperty("low"))
        obj.low = ApiClient.convertToType(data["low"], ["Number"]);
      if (data.hasOwnProperty("volume"))
        obj.volume = ApiClient.convertToType(data["volume"], ["Number"]);
      if (data.hasOwnProperty("open"))
        obj.open = ApiClient.convertToType(data["open"], ["Number"]);
    }
    return obj;
  }
};
OHLCVData.prototype.close = void 0;
OHLCVData.prototype.high = void 0;
OHLCVData.prototype.low = void 0;
OHLCVData.prototype.volume = void 0;
OHLCVData.prototype.open = void 0;

// src/model/MarketCandlesResponse.js
var MarketCandlesResponse = class _MarketCandlesResponse {
  /**
   * Constructs a new <code>MarketCandlesResponse</code>.
   * @alias module:model/MarketCandlesResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>MarketCandlesResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MarketCandlesResponse} obj Optional instance to populate.
   * @return {module:model/MarketCandlesResponse} The populated <code>MarketCandlesResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _MarketCandlesResponse();
      if (data.hasOwnProperty("data"))
        obj.data = OHLCVData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
MarketCandlesResponse.prototype.data = void 0;

// src/model/OrderbookLevel.js
var OrderbookLevel = class _OrderbookLevel extends Array {
  /**
   * Constructs a new <code>OrderbookLevel</code>.
   * @alias module:model/OrderbookLevel
   * @class
   * @extends Array
   */
  constructor() {
    super();
  }
  /**
   * Constructs a <code>OrderbookLevel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderbookLevel} obj Optional instance to populate.
   * @return {module:model/OrderbookLevel} The populated <code>OrderbookLevel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OrderbookLevel();
      ApiClient.constructFromObject(data, obj, "Number");
    }
    return obj;
  }
};

// src/model/MarketOrderbookData.js
var MarketOrderbookData = class _MarketOrderbookData {
  /**
   * Constructs a new <code>MarketOrderbookData</code>.
   * @alias module:model/MarketOrderbookData
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>MarketOrderbookData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MarketOrderbookData} obj Optional instance to populate.
   * @return {module:model/MarketOrderbookData} The populated <code>MarketOrderbookData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _MarketOrderbookData();
      if (data.hasOwnProperty("ask"))
        obj.ask = ApiClient.convertToType(data["ask"], [OrderbookLevel]);
      if (data.hasOwnProperty("bid"))
        obj.bid = ApiClient.convertToType(data["bid"], [OrderbookLevel]);
    }
    return obj;
  }
};
MarketOrderbookData.prototype.ask = void 0;
MarketOrderbookData.prototype.bid = void 0;

// src/model/MarketOrderbookResponse.js
var MarketOrderbookResponse = class _MarketOrderbookResponse {
  /**
   * Constructs a new <code>MarketOrderbookResponse</code>.
   * @alias module:model/MarketOrderbookResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>MarketOrderbookResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MarketOrderbookResponse} obj Optional instance to populate.
   * @return {module:model/MarketOrderbookResponse} The populated <code>MarketOrderbookResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _MarketOrderbookResponse();
      if (data.hasOwnProperty("data"))
        obj.data = MarketOrderbookData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
MarketOrderbookResponse.prototype.data = void 0;

// src/model/OneOfFileWriteRequestDocument.js
var OneOfFileWriteRequestDocument = class _OneOfFileWriteRequestDocument {
  /**
   * Constructs a new <code>OneOfFileWriteRequestDocument</code>.
   * @alias module:model/OneOfFileWriteRequestDocument
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OneOfFileWriteRequestDocument</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OneOfFileWriteRequestDocument} obj Optional instance to populate.
   * @return {module:model/OneOfFileWriteRequestDocument} The populated <code>OneOfFileWriteRequestDocument</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OneOfFileWriteRequestDocument();
    }
    return obj;
  }
};

// src/model/OneOfOrderItemId.js
var OneOfOrderItemId = class _OneOfOrderItemId {
  /**
   * Constructs a new <code>OneOfOrderItemId</code>.
   * @alias module:model/OneOfOrderItemId
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OneOfOrderItemId</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OneOfOrderItemId} obj Optional instance to populate.
   * @return {module:model/OneOfOrderItemId} The populated <code>OneOfOrderItemId</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OneOfOrderItemId();
    }
    return obj;
  }
};

// src/model/OrderItem.js
var OrderItem = class _OrderItem {
  /**
   * Constructs a new <code>OrderItem</code>.
   * @alias module:model/OrderItem
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OrderItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderItem} obj Optional instance to populate.
   * @return {module:model/OrderItem} The populated <code>OrderItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OrderItem();
      if (data.hasOwnProperty("time"))
        obj.time = ApiClient.convertToType(data["time"], "Number");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("type"))
        obj.type = ApiClient.convertToType(data["type"], "String");
      if (data.hasOwnProperty("rate"))
        obj.rate = ApiClient.convertToType(data["rate"], "Number");
      if (data.hasOwnProperty("amount"))
        obj.amount = ApiClient.convertToType(data["amount"], "Number");
      if (data.hasOwnProperty("id"))
        obj.id = ApiClient.convertToType(data["id"], Object);
      if (data.hasOwnProperty("cost"))
        obj.cost = ApiClient.convertToType(data["cost"], "Number");
      if (data.hasOwnProperty("toCancel"))
        obj.toCancel = ApiClient.convertToType(data["toCancel"], "Boolean");
      if (data.hasOwnProperty("fees"))
        obj.fees = ApiClient.convertToType(data["fees"], "Number");
      if (data.hasOwnProperty("baseValue"))
        obj.baseValue = ApiClient.convertToType(data["baseValue"], "Number");
      if (data.hasOwnProperty("costProceed"))
        obj.costProceed = ApiClient.convertToType(data["costProceed"], "Number");
      if (data.hasOwnProperty("averagePrice"))
        obj.averagePrice = ApiClient.convertToType(data["averagePrice"], "Number");
      if (data.hasOwnProperty("pnlPrice"))
        obj.pnlPrice = ApiClient.convertToType(data["pnlPrice"], "Number");
      if (data.hasOwnProperty("balance"))
        obj.balance = ApiClient.convertToType(data["balance"], "Number");
      if (data.hasOwnProperty("baseBalance"))
        obj.baseBalance = ApiClient.convertToType(data["baseBalance"], "Number");
      if (data.hasOwnProperty("inventory_cost"))
        obj.inventoryCost = ApiClient.convertToType(data["inventory_cost"], "Number");
      if (data.hasOwnProperty("ABP"))
        obj.ABP = ApiClient.convertToType(data["ABP"], "Number");
      if (data.hasOwnProperty("pnl"))
        obj.pnl = ApiClient.convertToType(data["pnl"], "Number");
    }
    return obj;
  }
};
OrderItem.prototype.time = void 0;
OrderItem.prototype.pair = void 0;
OrderItem.TypeEnum = {
  /**
   * value: "buy"
   * @const
   */
  buy: "buy",
  /**
   * value: "sell"
   * @const
   */
  sell: "sell"
};
OrderItem.prototype.type = void 0;
OrderItem.prototype.rate = void 0;
OrderItem.prototype.amount = void 0;
OrderItem.prototype.id = void 0;
OrderItem.prototype.cost = void 0;
OrderItem.prototype.toCancel = void 0;
OrderItem.prototype.fees = void 0;
OrderItem.prototype.baseValue = void 0;
OrderItem.prototype.costProceed = void 0;
OrderItem.prototype.averagePrice = void 0;
OrderItem.prototype.pnlPrice = void 0;
OrderItem.prototype.balance = void 0;
OrderItem.prototype.baseBalance = void 0;
OrderItem.prototype.inventoryCost = void 0;
OrderItem.prototype.ABP = void 0;
OrderItem.prototype.pnl = void 0;

// src/model/OrdersDayResponse.js
var OrdersDayResponse = class _OrdersDayResponse {
  /**
   * Constructs a new <code>OrdersDayResponse</code>.
   * @alias module:model/OrdersDayResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OrdersDayResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrdersDayResponse} obj Optional instance to populate.
   * @return {module:model/OrdersDayResponse} The populated <code>OrdersDayResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OrdersDayResponse();
      if (data.hasOwnProperty("days"))
        obj.days = ApiClient.convertToType(data["days"], ["String"]);
      if (data.hasOwnProperty("orders"))
        obj.orders = ApiClient.convertToType(data["orders"], ["Number"]);
      if (data.hasOwnProperty("closeOrders"))
        obj.closeOrders = ApiClient.convertToType(data["closeOrders"], ["Number"]);
    }
    return obj;
  }
};
OrdersDayResponse.prototype.days = void 0;
OrdersDayResponse.prototype.orders = void 0;
OrdersDayResponse.prototype.closeOrders = void 0;

// src/model/OrdersPageMultiResponse.js
var OrdersPageMultiResponse = class _OrdersPageMultiResponse {
  /**
   * Constructs a new <code>OrdersPageMultiResponse</code>.
   * @alias module:model/OrdersPageMultiResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OrdersPageMultiResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrdersPageMultiResponse} obj Optional instance to populate.
   * @return {module:model/OrdersPageMultiResponse} The populated <code>OrdersPageMultiResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OrdersPageMultiResponse();
      if (data.hasOwnProperty("total"))
        obj.total = ApiClient.convertToType(data["total"], "Number");
      if (data.hasOwnProperty("totalCount"))
        obj.totalCount = ApiClient.convertToType(data["totalCount"], "Number");
      if (data.hasOwnProperty("page"))
        obj.page = ApiClient.convertToType(data["page"], "Number");
      if (data.hasOwnProperty("data"))
        obj.data = ApiClient.convertToType(data["data"], [{ "String": Object }]);
    }
    return obj;
  }
};
OrdersPageMultiResponse.prototype.total = void 0;
OrdersPageMultiResponse.prototype.totalCount = void 0;
OrdersPageMultiResponse.prototype.page = void 0;
OrdersPageMultiResponse.prototype.data = void 0;

// src/model/OrdersPageResponse.js
var OrdersPageResponse = class _OrdersPageResponse {
  /**
   * Constructs a new <code>OrdersPageResponse</code>.
   * @alias module:model/OrdersPageResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OrdersPageResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrdersPageResponse} obj Optional instance to populate.
   * @return {module:model/OrdersPageResponse} The populated <code>OrdersPageResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OrdersPageResponse();
      if (data.hasOwnProperty("total"))
        obj.total = ApiClient.convertToType(data["total"], "Number");
      if (data.hasOwnProperty("page"))
        obj.page = ApiClient.convertToType(data["page"], "Number");
      if (data.hasOwnProperty("data"))
        obj.data = ApiClient.convertToType(data["data"], [{ "String": Object }]);
    }
    return obj;
  }
};
OrdersPageResponse.prototype.total = void 0;
OrdersPageResponse.prototype.page = void 0;
OrdersPageResponse.prototype.data = void 0;

// src/model/OrdersResponse.js
var OrdersResponse = class _OrdersResponse {
  /**
   * Constructs a new <code>OrdersResponse</code>.
   * @alias module:model/OrdersResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>OrdersResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrdersResponse} obj Optional instance to populate.
   * @return {module:model/OrdersResponse} The populated <code>OrdersResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _OrdersResponse();
      if (data.hasOwnProperty("data"))
        obj.data = ApiClient.convertToType(data["data"], [OrderItem]);
    }
    return obj;
  }
};
OrdersResponse.prototype.data = void 0;

// src/model/PairDetailItem.js
var PairDetailItem = class _PairDetailItem {
  /**
   * Constructs a new <code>PairDetailItem</code>.
   * @alias module:model/PairDetailItem
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>PairDetailItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PairDetailItem} obj Optional instance to populate.
   * @return {module:model/PairDetailItem} The populated <code>PairDetailItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PairDetailItem();
      if (data.hasOwnProperty("pairName"))
        obj.pairName = ApiClient.convertToType(data["pairName"], "String");
      if (data.hasOwnProperty("volume"))
        obj.volume = ApiClient.convertToType(data["volume"], "Number");
      if (data.hasOwnProperty("low"))
        obj.low = ApiClient.convertToType(data["low"], "String");
      if (data.hasOwnProperty("high"))
        obj.high = ApiClient.convertToType(data["high"], "String");
      if (data.hasOwnProperty("change"))
        obj.change = ApiClient.convertToType(data["change"], "String");
    }
    return obj;
  }
};
PairDetailItem.prototype.pairName = void 0;
PairDetailItem.prototype.volume = void 0;
PairDetailItem.prototype.low = void 0;
PairDetailItem.prototype.high = void 0;
PairDetailItem.prototype.change = void 0;

// src/model/PairsDetailedResponse.js
var PairsDetailedResponse = class _PairsDetailedResponse {
  /**
   * Constructs a new <code>PairsDetailedResponse</code>.
   * @alias module:model/PairsDetailedResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>PairsDetailedResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PairsDetailedResponse} obj Optional instance to populate.
   * @return {module:model/PairsDetailedResponse} The populated <code>PairsDetailedResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PairsDetailedResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("pairList"))
        obj.pairList = ApiClient.convertToType(data["pairList"], { "String": [PairDetailItem] });
    }
    return obj;
  }
};
PairsDetailedResponse.prototype.status = void 0;
PairsDetailedResponse.prototype.pairList = void 0;

// src/model/PairsResponse.js
var PairsResponse = class _PairsResponse {
  /**
   * Constructs a new <code>PairsResponse</code>.
   * @alias module:model/PairsResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>PairsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PairsResponse} obj Optional instance to populate.
   * @return {module:model/PairsResponse} The populated <code>PairsResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PairsResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("pairList"))
        obj.pairList = ApiClient.convertToType(data["pairList"], ["String"]);
    }
    return obj;
  }
};
PairsResponse.prototype.status = void 0;
PairsResponse.prototype.pairList = void 0;

// src/model/PnlDailyPaginatedResponse.js
var PnlDailyPaginatedResponse = class _PnlDailyPaginatedResponse {
  /**
   * Constructs a new <code>PnlDailyPaginatedResponse</code>.
   * @alias module:model/PnlDailyPaginatedResponse
   * @class
   * @param totalSize {Number} 
   * @param data {Array.<Array.<Object>>} 
   */
  constructor(totalSize, data) {
    this.totalSize = totalSize;
    this.data = data;
  }
  /**
   * Constructs a <code>PnlDailyPaginatedResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlDailyPaginatedResponse} obj Optional instance to populate.
   * @return {module:model/PnlDailyPaginatedResponse} The populated <code>PnlDailyPaginatedResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlDailyPaginatedResponse();
      if (data.hasOwnProperty("totalSize"))
        obj.totalSize = ApiClient.convertToType(data["totalSize"], "Number");
      if (data.hasOwnProperty("data"))
        obj.data = ApiClient.convertToType(data["data"], [[Object]]);
    }
    return obj;
  }
};
PnlDailyPaginatedResponse.prototype.totalSize = void 0;
PnlDailyPaginatedResponse.prototype.data = void 0;

// src/model/PnlDailyResponse.js
var PnlDailyResponse = class _PnlDailyResponse {
  /**
   * Constructs a new <code>PnlDailyResponse</code>.
   * @alias module:model/PnlDailyResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>PnlDailyResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlDailyResponse} obj Optional instance to populate.
   * @return {module:model/PnlDailyResponse} The populated <code>PnlDailyResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlDailyResponse();
      if (data.hasOwnProperty("dateRangeDailyHistory"))
        obj.dateRangeDailyHistory = ApiClient.convertToType(data["dateRangeDailyHistory"], [{ "String": Object }]);
      if (data.hasOwnProperty("unmatchedBaseValuePerDateRange"))
        obj.unmatchedBaseValuePerDateRange = ApiClient.convertToType(data["unmatchedBaseValuePerDateRange"], "Number");
    }
    return obj;
  }
};
PnlDailyResponse.prototype.dateRangeDailyHistory = void 0;
PnlDailyResponse.prototype.unmatchedBaseValuePerDateRange = void 0;

// src/model/PnlOverviewRequestDateRange.js
var PnlOverviewRequestDateRange = class _PnlOverviewRequestDateRange {
  /**
   * Constructs a new <code>PnlOverviewRequestDateRange</code>.
   * @alias module:model/PnlOverviewRequestDateRange
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>PnlOverviewRequestDateRange</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlOverviewRequestDateRange} obj Optional instance to populate.
   * @return {module:model/PnlOverviewRequestDateRange} The populated <code>PnlOverviewRequestDateRange</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlOverviewRequestDateRange();
      if (data.hasOwnProperty("startDate"))
        obj.startDate = ApiClient.convertToType(data["startDate"], "Number");
      if (data.hasOwnProperty("endDate"))
        obj.endDate = ApiClient.convertToType(data["endDate"], "Number");
    }
    return obj;
  }
};
PnlOverviewRequestDateRange.prototype.startDate = void 0;
PnlOverviewRequestDateRange.prototype.endDate = void 0;

// src/model/PnlOverviewRequest.js
var PnlOverviewRequest = class _PnlOverviewRequest {
  /**
   * Constructs a new <code>PnlOverviewRequest</code>.
   * @alias module:model/PnlOverviewRequest
   * @class
   * @param timezone {String} IANA timezone string (e.g., `Europe/Amsterdam`).
   * @param keys {Array.<String>} Array of trading keys (e.g., `['binance/USDT-BTC', 'binance/USDT-XRP']`). Use `['All']` for all results.
   */
  constructor(timezone, keys) {
    this.timezone = timezone;
    this.keys = keys;
  }
  /**
   * Constructs a <code>PnlOverviewRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlOverviewRequest} obj Optional instance to populate.
   * @return {module:model/PnlOverviewRequest} The populated <code>PnlOverviewRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlOverviewRequest();
      if (data.hasOwnProperty("timezone"))
        obj.timezone = ApiClient.convertToType(data["timezone"], "String");
      if (data.hasOwnProperty("keys"))
        obj.keys = ApiClient.convertToType(data["keys"], ["String"]);
      if (data.hasOwnProperty("dateRange"))
        obj.dateRange = PnlOverviewRequestDateRange.constructFromObject(data["dateRange"]);
    }
    return obj;
  }
};
PnlOverviewRequest.prototype.timezone = void 0;
PnlOverviewRequest.prototype.keys = void 0;
PnlOverviewRequest.prototype.dateRange = void 0;

// src/model/PnlOverviewResponse.js
var PnlOverviewResponse = class _PnlOverviewResponse {
  /**
   * Constructs a new <code>PnlOverviewResponse</code>.
   * A complex object containing PNL summaries. See documentation for full structure.
   * @alias module:model/PnlOverviewResponse
   * @class
   * @extends 
   */
  constructor() {
  }
  /**
   * Constructs a <code>PnlOverviewResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlOverviewResponse} obj Optional instance to populate.
   * @return {module:model/PnlOverviewResponse} The populated <code>PnlOverviewResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlOverviewResponse();
      ApiClient.constructFromObject(data, obj, "");
    }
    return obj;
  }
};

// src/model/PnlSumResponseTournamentData.js
var PnlSumResponseTournamentData = class _PnlSumResponseTournamentData {
  /**
   * Constructs a new <code>PnlSumResponseTournamentData</code>.
   * @alias module:model/PnlSumResponseTournamentData
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>PnlSumResponseTournamentData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlSumResponseTournamentData} obj Optional instance to populate.
   * @return {module:model/PnlSumResponseTournamentData} The populated <code>PnlSumResponseTournamentData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlSumResponseTournamentData();
      if (data.hasOwnProperty("sommaPnl"))
        obj.sommaPnl = ApiClient.convertToType(data["sommaPnl"], "String");
      if (data.hasOwnProperty("invested"))
        obj.invested = ApiClient.convertToType(data["invested"], "String");
    }
    return obj;
  }
};
PnlSumResponseTournamentData.prototype.sommaPnl = void 0;
PnlSumResponseTournamentData.prototype.invested = void 0;

// src/model/PnlSumResponse.js
var PnlSumResponse = class _PnlSumResponse {
  /**
   * Constructs a new <code>PnlSumResponse</code>.
   * @alias module:model/PnlSumResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>PnlSumResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlSumResponse} obj Optional instance to populate.
   * @return {module:model/PnlSumResponse} The populated <code>PnlSumResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlSumResponse();
      if (data.hasOwnProperty("tournamentData"))
        obj.tournamentData = PnlSumResponseTournamentData.constructFromObject(data["tournamentData"]);
      if (data.hasOwnProperty("data"))
        obj.data = ApiClient.convertToType(data["data"], [{ "String": Object }]);
    }
    return obj;
  }
};
PnlSumResponse.prototype.tournamentData = void 0;
PnlSumResponse.prototype.data = void 0;

// src/model/PnlTotalResponse.js
var PnlTotalResponse = class _PnlTotalResponse {
  /**
   * Constructs a new <code>PnlTotalResponse</code>.
   * @alias module:model/PnlTotalResponse
   * @class
   * @extends 
   */
  constructor() {
  }
  /**
   * Constructs a <code>PnlTotalResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlTotalResponse} obj Optional instance to populate.
   * @return {module:model/PnlTotalResponse} The populated <code>PnlTotalResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _PnlTotalResponse();
      ApiClient.constructFromObject(data, obj, "");
    }
    return obj;
  }
};

// src/model/SuccessStatusResponse.js
var SuccessStatusResponse = class _SuccessStatusResponse {
  /**
   * Constructs a new <code>SuccessStatusResponse</code>.
   * @alias module:model/SuccessStatusResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>SuccessStatusResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuccessStatusResponse} obj Optional instance to populate.
   * @return {module:model/SuccessStatusResponse} The populated <code>SuccessStatusResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _SuccessStatusResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
    }
    return obj;
  }
};
SuccessStatusResponse.prototype.status = void 0;

// src/model/SystemActionResponse.js
var SystemActionResponse = class _SystemActionResponse {
  /**
   * Constructs a new <code>SystemActionResponse</code>.
   * @alias module:model/SystemActionResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>SystemActionResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SystemActionResponse} obj Optional instance to populate.
   * @return {module:model/SystemActionResponse} The populated <code>SystemActionResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _SystemActionResponse();
    }
    return obj;
  }
};

// src/model/TimeResponse.js
var TimeResponse = class _TimeResponse {
  /**
   * Constructs a new <code>TimeResponse</code>.
   * @alias module:model/TimeResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>TimeResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TimeResponse} obj Optional instance to populate.
   * @return {module:model/TimeResponse} The populated <code>TimeResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TimeResponse();
      if (data.hasOwnProperty("serverTime"))
        obj.serverTime = ApiClient.convertToType(data["serverTime"], "Number");
    }
    return obj;
  }
};
TimeResponse.prototype.serverTime = void 0;

// src/model/TradeCancelData.js
var TradeCancelData = class _TradeCancelData {
  /**
   * Constructs a new <code>TradeCancelData</code>.
   * @alias module:model/TradeCancelData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param id {String} 
   * @param price {Number} 
   * @param type {module:model/TradeCancelData.TypeEnum} 
   */
  constructor(exch, pair, id, price, type) {
    this.exch = exch;
    this.pair = pair;
    this.id = id;
    this.price = price;
    this.type = type;
  }
  /**
   * Constructs a <code>TradeCancelData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeCancelData} obj Optional instance to populate.
   * @return {module:model/TradeCancelData} The populated <code>TradeCancelData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeCancelData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("id"))
        obj.id = ApiClient.convertToType(data["id"], "String");
      if (data.hasOwnProperty("price"))
        obj.price = ApiClient.convertToType(data["price"], "Number");
      if (data.hasOwnProperty("type"))
        obj.type = ApiClient.convertToType(data["type"], "String");
    }
    return obj;
  }
};
TradeCancelData.prototype.exch = void 0;
TradeCancelData.prototype.pair = void 0;
TradeCancelData.prototype.id = void 0;
TradeCancelData.prototype.price = void 0;
TradeCancelData.TypeEnum = {
  /**
   * value: "limit"
   * @const
   */
  limit: "limit",
  /**
   * value: "market"
   * @const
   */
  market: "market"
};
TradeCancelData.prototype.type = void 0;

// src/model/TradeCancelRequest.js
var TradeCancelRequest = class _TradeCancelRequest {
  /**
   * Constructs a new <code>TradeCancelRequest</code>.
   * @alias module:model/TradeCancelRequest
   * @class
   * @param data {module:model/TradeCancelData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeCancelRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeCancelRequest} obj Optional instance to populate.
   * @return {module:model/TradeCancelRequest} The populated <code>TradeCancelRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeCancelRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeCancelData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeCancelRequest.prototype.data = void 0;

// src/model/TradeCloseLimitData.js
var TradeCloseLimitData = class _TradeCloseLimitData {
  /**
   * Constructs a new <code>TradeCloseLimitData</code>.
   * @alias module:model/TradeCloseLimitData
   * @class
   * @param exch {String} 
   * @param pair {String} Pair symbol, often includes LONG/SHORT for futures.
   * @param amt {Number} 
   * @param price {Number} 
   */
  constructor(exch, pair, amt, price) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
    this.price = price;
  }
  /**
   * Constructs a <code>TradeCloseLimitData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeCloseLimitData} obj Optional instance to populate.
   * @return {module:model/TradeCloseLimitData} The populated <code>TradeCloseLimitData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeCloseLimitData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("amt"))
        obj.amt = ApiClient.convertToType(data["amt"], "Number");
      if (data.hasOwnProperty("price"))
        obj.price = ApiClient.convertToType(data["price"], "Number");
    }
    return obj;
  }
};
TradeCloseLimitData.prototype.exch = void 0;
TradeCloseLimitData.prototype.pair = void 0;
TradeCloseLimitData.prototype.amt = void 0;
TradeCloseLimitData.prototype.price = void 0;

// src/model/TradeCloseLimitRequest.js
var TradeCloseLimitRequest = class _TradeCloseLimitRequest {
  /**
   * Constructs a new <code>TradeCloseLimitRequest</code>.
   * @alias module:model/TradeCloseLimitRequest
   * @class
   * @param data {module:model/TradeCloseLimitData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeCloseLimitRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeCloseLimitRequest} obj Optional instance to populate.
   * @return {module:model/TradeCloseLimitRequest} The populated <code>TradeCloseLimitRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeCloseLimitRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeCloseLimitData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeCloseLimitRequest.prototype.data = void 0;

// src/model/TradeCloseMarketData.js
var TradeCloseMarketData = class _TradeCloseMarketData {
  /**
   * Constructs a new <code>TradeCloseMarketData</code>.
   * @alias module:model/TradeCloseMarketData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param amt {Number} 
   */
  constructor(exch, pair, amt) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
  }
  /**
   * Constructs a <code>TradeCloseMarketData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeCloseMarketData} obj Optional instance to populate.
   * @return {module:model/TradeCloseMarketData} The populated <code>TradeCloseMarketData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeCloseMarketData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("amt"))
        obj.amt = ApiClient.convertToType(data["amt"], "Number");
    }
    return obj;
  }
};
TradeCloseMarketData.prototype.exch = void 0;
TradeCloseMarketData.prototype.pair = void 0;
TradeCloseMarketData.prototype.amt = void 0;

// src/model/TradeCloseMarketRequest.js
var TradeCloseMarketRequest = class _TradeCloseMarketRequest {
  /**
   * Constructs a new <code>TradeCloseMarketRequest</code>.
   * @alias module:model/TradeCloseMarketRequest
   * @class
   * @param data {module:model/TradeCloseMarketData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeCloseMarketRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeCloseMarketRequest} obj Optional instance to populate.
   * @return {module:model/TradeCloseMarketRequest} The populated <code>TradeCloseMarketRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeCloseMarketRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeCloseMarketData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeCloseMarketRequest.prototype.data = void 0;

// src/model/TradeLimitOrderData.js
var TradeLimitOrderData = class _TradeLimitOrderData {
  /**
   * Constructs a new <code>TradeLimitOrderData</code>.
   * @alias module:model/TradeLimitOrderData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param amt {Number} 
   * @param price {Number} 
   */
  constructor(exch, pair, amt, price) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
    this.price = price;
  }
  /**
   * Constructs a <code>TradeLimitOrderData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeLimitOrderData} obj Optional instance to populate.
   * @return {module:model/TradeLimitOrderData} The populated <code>TradeLimitOrderData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeLimitOrderData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("amt"))
        obj.amt = ApiClient.convertToType(data["amt"], "Number");
      if (data.hasOwnProperty("price"))
        obj.price = ApiClient.convertToType(data["price"], "Number");
    }
    return obj;
  }
};
TradeLimitOrderData.prototype.exch = void 0;
TradeLimitOrderData.prototype.pair = void 0;
TradeLimitOrderData.prototype.amt = void 0;
TradeLimitOrderData.prototype.price = void 0;

// src/model/TradeLimitOrderRequest.js
var TradeLimitOrderRequest = class _TradeLimitOrderRequest {
  /**
   * Constructs a new <code>TradeLimitOrderRequest</code>.
   * @alias module:model/TradeLimitOrderRequest
   * @class
   * @param data {module:model/TradeLimitOrderData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeLimitOrderRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeLimitOrderRequest} obj Optional instance to populate.
   * @return {module:model/TradeLimitOrderRequest} The populated <code>TradeLimitOrderRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeLimitOrderRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeLimitOrderData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeLimitOrderRequest.prototype.data = void 0;

// src/model/TradeMarketOrderData.js
var TradeMarketOrderData = class _TradeMarketOrderData {
  /**
   * Constructs a new <code>TradeMarketOrderData</code>.
   * @alias module:model/TradeMarketOrderData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param amt {Number} 
   */
  constructor(exch, pair, amt) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
  }
  /**
   * Constructs a <code>TradeMarketOrderData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeMarketOrderData} obj Optional instance to populate.
   * @return {module:model/TradeMarketOrderData} The populated <code>TradeMarketOrderData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeMarketOrderData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("amt"))
        obj.amt = ApiClient.convertToType(data["amt"], "Number");
      if (data.hasOwnProperty("price"))
        obj.price = ApiClient.convertToType(data["price"], "Number");
    }
    return obj;
  }
};
TradeMarketOrderData.prototype.exch = void 0;
TradeMarketOrderData.prototype.pair = void 0;
TradeMarketOrderData.prototype.amt = void 0;
TradeMarketOrderData.prototype.price = void 0;

// src/model/TradeMarketOrderRequest.js
var TradeMarketOrderRequest = class _TradeMarketOrderRequest {
  /**
   * Constructs a new <code>TradeMarketOrderRequest</code>.
   * @alias module:model/TradeMarketOrderRequest
   * @class
   * @param data {module:model/TradeMarketOrderData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeMarketOrderRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeMarketOrderRequest} obj Optional instance to populate.
   * @return {module:model/TradeMarketOrderRequest} The populated <code>TradeMarketOrderRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeMarketOrderRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeMarketOrderData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeMarketOrderRequest.prototype.data = void 0;

// src/model/TradeOcoData.js
var TradeOcoData = class _TradeOcoData {
  /**
   * Constructs a new <code>TradeOcoData</code>.
   * @alias module:model/TradeOcoData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param amt {Number} 
   * @param price {Number} Limit price for the OCO order part.
   * @param stopPrice {Number} Stop price for the stop-limit part.
   * @param limit {Number} Limit price used after stopPrice is triggered for the stop-limit part.
   */
  constructor(exch, pair, amt, price, stopPrice, limit) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
    this.price = price;
    this.stopPrice = stopPrice;
    this.limit = limit;
  }
  /**
   * Constructs a <code>TradeOcoData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeOcoData} obj Optional instance to populate.
   * @return {module:model/TradeOcoData} The populated <code>TradeOcoData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeOcoData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("amt"))
        obj.amt = ApiClient.convertToType(data["amt"], "Number");
      if (data.hasOwnProperty("price"))
        obj.price = ApiClient.convertToType(data["price"], "Number");
      if (data.hasOwnProperty("stopPrice"))
        obj.stopPrice = ApiClient.convertToType(data["stopPrice"], "Number");
      if (data.hasOwnProperty("limit"))
        obj.limit = ApiClient.convertToType(data["limit"], "Number");
    }
    return obj;
  }
};
TradeOcoData.prototype.exch = void 0;
TradeOcoData.prototype.pair = void 0;
TradeOcoData.prototype.amt = void 0;
TradeOcoData.prototype.price = void 0;
TradeOcoData.prototype.stopPrice = void 0;
TradeOcoData.prototype.limit = void 0;

// src/model/TradeOcoRequest.js
var TradeOcoRequest = class _TradeOcoRequest {
  /**
   * Constructs a new <code>TradeOcoRequest</code>.
   * @alias module:model/TradeOcoRequest
   * @class
   * @param data {module:model/TradeOcoData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeOcoRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeOcoRequest} obj Optional instance to populate.
   * @return {module:model/TradeOcoRequest} The populated <code>TradeOcoRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeOcoRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeOcoData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeOcoRequest.prototype.data = void 0;

// src/model/TradeResponse.js
var TradeResponse = class _TradeResponse {
  /**
   * Constructs a new <code>TradeResponse</code>.
   * @alias module:model/TradeResponse
   * @class
   */
  constructor() {
  }
  /**
   * Constructs a <code>TradeResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeResponse} obj Optional instance to populate.
   * @return {module:model/TradeResponse} The populated <code>TradeResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeResponse();
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("message"))
        obj.message = ApiClient.convertToType(data["message"], "String");
    }
    return obj;
  }
};
TradeResponse.prototype.status = void 0;
TradeResponse.prototype.message = void 0;

// src/model/TradeStopLimitData.js
var TradeStopLimitData = class _TradeStopLimitData {
  /**
   * Constructs a new <code>TradeStopLimitData</code>.
   * @alias module:model/TradeStopLimitData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param amt {Number} 
   * @param stopPrice {Number} Price at which the limit order is triggered.
   * @param limitPrice {Number} Limit price used once stopPrice is reached.
   */
  constructor(exch, pair, amt, stopPrice, limitPrice) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
    this.stopPrice = stopPrice;
    this.limitPrice = limitPrice;
  }
  /**
   * Constructs a <code>TradeStopLimitData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeStopLimitData} obj Optional instance to populate.
   * @return {module:model/TradeStopLimitData} The populated <code>TradeStopLimitData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeStopLimitData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("amt"))
        obj.amt = ApiClient.convertToType(data["amt"], "Number");
      if (data.hasOwnProperty("stopPrice"))
        obj.stopPrice = ApiClient.convertToType(data["stopPrice"], "Number");
      if (data.hasOwnProperty("limitPrice"))
        obj.limitPrice = ApiClient.convertToType(data["limitPrice"], "Number");
    }
    return obj;
  }
};
TradeStopLimitData.prototype.exch = void 0;
TradeStopLimitData.prototype.pair = void 0;
TradeStopLimitData.prototype.amt = void 0;
TradeStopLimitData.prototype.stopPrice = void 0;
TradeStopLimitData.prototype.limitPrice = void 0;

// src/model/TradeStopLimitRequest.js
var TradeStopLimitRequest = class _TradeStopLimitRequest {
  /**
   * Constructs a new <code>TradeStopLimitRequest</code>.
   * @alias module:model/TradeStopLimitRequest
   * @class
   * @param data {module:model/TradeStopLimitData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeStopLimitRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeStopLimitRequest} obj Optional instance to populate.
   * @return {module:model/TradeStopLimitRequest} The populated <code>TradeStopLimitRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeStopLimitRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeStopLimitData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeStopLimitRequest.prototype.data = void 0;

// src/model/TradeTrailingStopData.js
var TradeTrailingStopData = class _TradeTrailingStopData {
  /**
   * Constructs a new <code>TradeTrailingStopData</code>.
   * @alias module:model/TradeTrailingStopData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param amt {Number} 
   * @param price {Number} Reference price for the order.
   * @param stopPrice {Number} Trailing stop price.
   */
  constructor(exch, pair, amt, price, stopPrice) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
    this.price = price;
    this.stopPrice = stopPrice;
  }
  /**
   * Constructs a <code>TradeTrailingStopData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeTrailingStopData} obj Optional instance to populate.
   * @return {module:model/TradeTrailingStopData} The populated <code>TradeTrailingStopData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeTrailingStopData();
      if (data.hasOwnProperty("exch"))
        obj.exch = ApiClient.convertToType(data["exch"], "String");
      if (data.hasOwnProperty("pair"))
        obj.pair = ApiClient.convertToType(data["pair"], "String");
      if (data.hasOwnProperty("amt"))
        obj.amt = ApiClient.convertToType(data["amt"], "Number");
      if (data.hasOwnProperty("price"))
        obj.price = ApiClient.convertToType(data["price"], "Number");
      if (data.hasOwnProperty("stopPrice"))
        obj.stopPrice = ApiClient.convertToType(data["stopPrice"], "Number");
    }
    return obj;
  }
};
TradeTrailingStopData.prototype.exch = void 0;
TradeTrailingStopData.prototype.pair = void 0;
TradeTrailingStopData.prototype.amt = void 0;
TradeTrailingStopData.prototype.price = void 0;
TradeTrailingStopData.prototype.stopPrice = void 0;

// src/model/TradeTrailingStopRequest.js
var TradeTrailingStopRequest = class _TradeTrailingStopRequest {
  /**
   * Constructs a new <code>TradeTrailingStopRequest</code>.
   * @alias module:model/TradeTrailingStopRequest
   * @class
   * @param data {module:model/TradeTrailingStopData} 
   */
  constructor(data) {
    this.data = data;
  }
  /**
   * Constructs a <code>TradeTrailingStopRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeTrailingStopRequest} obj Optional instance to populate.
   * @return {module:model/TradeTrailingStopRequest} The populated <code>TradeTrailingStopRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new _TradeTrailingStopRequest();
      if (data.hasOwnProperty("data"))
        obj.data = TradeTrailingStopData.constructFromObject(data["data"]);
    }
    return obj;
  }
};
TradeTrailingStopRequest.prototype.data = void 0;

// src/api/GunbotApi.js
var GunbotApi = class {
  /**
  * Constructs a new GunbotApi. 
  * @alias module:api/GunbotApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instanc
  e} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }
  /**
   * Callback function to receive the result of the assetsTotal operation.
   * @callback moduleapi/GunbotApi~assetsTotalCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AssetsTotalResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * assetsTotal — Get Historical Total Asset Value
   * Retrieve historical total asset value in a base currency over a time range.
   * @param {module:model/AssetsTotalRequest} body 
   * @param {module:api/GunbotApi~assetsTotalCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  assetsTotal(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling assetsTotal");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = AssetsTotalResponse;
    return this.apiClient.callApi(
      "/assets/total",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the authLogin operation.
   * @callback moduleapi/GunbotApi~authLoginCallback
   * @param {String} error Error message, if any.
   * @param {module:model/LoginResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * authLogin — Login User
   * Authenticate a user and obtain a JSON Web Token (JWT).
   * @param {module:model/LoginRequest} body 
   * @param {module:api/GunbotApi~authLoginCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  authLogin(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling authLogin");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = LoginResponse;
    return this.apiClient.callApi(
      "/auth/login",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the authStatus operation.
   * @callback moduleapi/GunbotApi~authStatusCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * authStatus — Get Authentication Status
   * Validate the current session&#x27;s authentication status using the provided token.
   * @param {module:api/GunbotApi~authStatusCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  authStatus(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = AuthStatusResponse;
    return this.apiClient.callApi(
      "/auth/status",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the balances operation.
   * @callback moduleapi/GunbotApi~balancesCallback
   * @param {String} error Error message, if any.
   * @param {module:model/BalancesResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * balances — Get Asset Balances
   * Retrieve asset balances across exchanges for the authenticated user.
   * @param {module:api/GunbotApi~balancesCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  balances(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = BalancesResponse;
    return this.apiClient.callApi(
      "/balances",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the chartData operation.
   * @callback moduleapi/GunbotApi~chartDataCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ChartDataResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * chartData — Get Chart Data (Candles and Indicators)
   * Retrieve chart data, including candles and indicators, for a specific trading pair.
   * @param {module:model/ChartDataRequest} body 
   * @param {module:api/GunbotApi~chartDataCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  chartData(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling chartData");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = ChartDataResponse;
    return this.apiClient.callApi(
      "/chart/data",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the chartMarks operation.
   * @callback moduleapi/GunbotApi~chartMarksCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ChartMarksResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * chartMarks — Get Chart Timescale Marks
   * Retrieve chart timescale marks (annotations like buy/sell triggers) for a pair and interval.
   * @param {String} exchange 
   * @param {String} pair 
   * @param {String} interval Time interval in minutes.
   * @param {String} startTime Start time (UNIX timestamp seconds).
   * @param {String} endTime End time (UNIX timestamp seconds).
   * @param {module:api/GunbotApi~chartMarksCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  chartMarks(exchange, pair, interval, startTime, endTime, callback) {
    let postBody = null;
    if (exchange === void 0 || exchange === null) {
      throw new Error("Missing the required parameter 'exchange' when calling chartMarks");
    }
    if (pair === void 0 || pair === null) {
      throw new Error("Missing the required parameter 'pair' when calling chartMarks");
    }
    if (interval === void 0 || interval === null) {
      throw new Error("Missing the required parameter 'interval' when calling chartMarks");
    }
    if (startTime === void 0 || startTime === null) {
      throw new Error("Missing the required parameter 'startTime' when calling chartMarks");
    }
    if (endTime === void 0 || endTime === null) {
      throw new Error("Missing the required parameter 'endTime' when calling chartMarks");
    }
    let pathParams = {};
    let queryParams = {
      "exchange": exchange,
      "pair": pair,
      "interval": interval,
      "startTime": startTime,
      "endTime": endTime
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = ChartMarksResponse;
    return this.apiClient.callApi(
      "/chart/marks",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the configFull operation.
   * @callback moduleapi/GunbotApi~configFullCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ConfigFullResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * configFull — Get Full Configuration
   * Retrieve the entire application configuration.
   * @param {module:api/GunbotApi~configFullCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  configFull(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = ConfigFullResponse;
    return this.apiClient.callApi(
      "/config/full",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the configPairAdd operation.
   * @callback moduleapi/GunbotApi~configPairAddCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * configPairAdd — Add Trading Pair to Configuration
   * Add a new trading pair to the configuration.
   * @param {module:model/ConfigPairAddRequest} body 
   * @param {module:api/GunbotApi~configPairAddCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  configPairAdd(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling configPairAdd");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/config/pair/add",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the configPairRemove operation.
   * @callback moduleapi/GunbotApi~configPairRemoveCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * configPairRemove — Remove Trading Pair from Configuration
   * Remove a trading pair from the configuration.
   * @param {module:model/ConfigPairRemoveRequest} body 
   * @param {module:api/GunbotApi~configPairRemoveCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  configPairRemove(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling configPairRemove");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/config/pair/remove",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the configStrategyAdd operation.
   * @callback moduleapi/GunbotApi~configStrategyAddCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * configStrategyAdd — Add Trading Strategy to Configuration
   * Add a new trading strategy to the configuration.
   * @param {module:model/ConfigStrategyAddRequest} body 
   * @param {module:api/GunbotApi~configStrategyAddCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  configStrategyAdd(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling configStrategyAdd");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/config/strategy/add",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the configStrategyRemove operation.
   * @callback moduleapi/GunbotApi~configStrategyRemoveCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * configStrategyRemove — Remove Trading Strategy from Configuration
   * Remove a trading strategy from the configuration.
   * @param {module:model/ConfigStrategyRemoveRequest} body 
   * @param {module:api/GunbotApi~configStrategyRemoveCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  configStrategyRemove(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling configStrategyRemove");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/config/strategy/remove",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the configUpdate operation.
   * @callback moduleapi/GunbotApi~configUpdateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ConfigUpdateResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * configUpdate — Update Full Configuration
   * Update the entire configuration with a new object.
   * @param {module:model/ConfigUpdateRequest} body 
   * @param {module:api/GunbotApi~configUpdateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  configUpdate(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling configUpdate");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = ConfigUpdateResponse;
    return this.apiClient.callApi(
      "/config/update",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the coremem operation.
   * @callback moduleapi/GunbotApi~corememCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CoreMemSnapshotResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * coremem — Get Core Memory Snapshot (All Pairs)
   * Retrieve a snapshot of relevant core memory data for all active trading pairs. Data is slightly delayed and transformed for frontend use.
   * @param {module:api/GunbotApi~corememCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  coremem(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = CoreMemSnapshotResponse;
    return this.apiClient.callApi(
      "/coremem",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the corememRequest operation.
   * @callback moduleapi/GunbotApi~corememRequestCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CoreMemRawResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * corememRequest — Get Raw Core Memory Data for a Pair
   * Retrieve raw core memory data for a specific trading pair, optionally filtered by elements.
   * @param {module:model/CoreMemRawRequest} body 
   * @param {module:api/GunbotApi~corememRequestCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  corememRequest(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling corememRequest");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = CoreMemRawResponse;
    return this.apiClient.callApi(
      "/coremem/raw",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the corememSingle operation.
   * @callback moduleapi/GunbotApi~corememSingleCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CoreMemSnapshotResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * corememSingle — Get Core Memory Snapshot (Single Pair)
   * Retrieve a snapshot of relevant core memory data for a single active trading pair. Data is slightly delayed and transformed.
   * @param {module:model/CoreMemSingleRequest} body 
   * @param {module:api/GunbotApi~corememSingleCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  corememSingle(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling corememSingle");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = CoreMemSnapshotResponse;
    return this.apiClient.callApi(
      "/coremem/single",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesAcvar operation.
   * @callback moduleapi/GunbotApi~filesAcvarCallback
   * @param {String} error Error message, if any.
   * @param {module:model/FileListResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesAcvar — List AutoConfig Variable Files
   * List filenames of available AutoConfig variable files.
   * @param {module:api/GunbotApi~filesAcvarCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesAcvar(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = FileListResponse;
    return this.apiClient.callApi(
      "/files/acvar",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesAcvarGet operation.
   * @callback moduleapi/GunbotApi~filesAcvarGetCallback
   * @param {String} error Error message, if any.
   * @param {module:model/FileAclarContentResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesAcvarGet — Get AutoConfig Variable File Content
   * Retrieve the content of a specified AutoConfig variable file.
   * @param {Object} opts Optional parameters
   * @param {module:model/FileGetRequest} opts.body 
   * @param {module:api/GunbotApi~filesAcvarGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesAcvarGet(opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = FileAclarContentResponse;
    return this.apiClient.callApi(
      "/files/acvar/get",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesAutoconfigWrite operation.
   * @callback moduleapi/GunbotApi~filesAutoconfigWriteCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesAutoconfigWrite — Write to autoconfig.json File
   * Write content to the &#x60;autoconfig.json&#x60; file.
   * @param {module:model/FileWriteRequest} body 
   * @param {module:api/GunbotApi~filesAutoconfigWriteCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesAutoconfigWrite(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesAutoconfigWrite");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/files/autoconfig/write",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesBackup operation.
   * @callback moduleapi/GunbotApi~filesBackupCallback
   * @param {String} error Error message, if any.
   * @param {module:model/FileListResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesBackup — List Backup Files
   * List available backup files.
   * @param {module:api/GunbotApi~filesBackupCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesBackup(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = FileListResponse;
    return this.apiClient.callApi(
      "/files/backup",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesBackupGet operation.
   * @callback moduleapi/GunbotApi~filesBackupGetCallback
   * @param {String} error Error message, if any.
   * @param {module:model/FileContentResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesBackupGet — Get Backup File Content
   * Retrieve the content of a specified backup config file.
   * @param {module:model/FileGetRequest} body 
   * @param {module:api/GunbotApi~filesBackupGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesBackupGet(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesBackupGet");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = FileContentResponse;
    return this.apiClient.callApi(
      "/files/backup/get",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesCustomEditorGet operation.
   * @callback moduleapi/GunbotApi~filesCustomEditorGetCallback
   * @param {String} error Error message, if any.
   * @param {'String'{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesCustomEditorGet — Get Custom Strategy Editor File Content
   * Retrieve the content of the custom strategy editor file.
   * @param {module:api/GunbotApi~filesCustomEditorGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesCustomEditorGet(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json"];
    let returnType = "String";
    return this.apiClient.callApi(
      "/files/custom-editor/get",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesCustomEditorWrite operation.
   * @callback moduleapi/GunbotApi~filesCustomEditorWriteCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesCustomEditorWrite — Write to Custom Strategy Editor File
   * Write content to the custom strategy editor file.
   * @param {module:model/FileWriteRequest} body 
   * @param {module:api/GunbotApi~filesCustomEditorWriteCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesCustomEditorWrite(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesCustomEditorWrite");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/files/custom-editor/write",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesState operation.
   * @callback moduleapi/GunbotApi~filesStateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/FileListResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesState — List State Files
   * List filenames of available state files.
   * @param {module:api/GunbotApi~filesStateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesState(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = FileListResponse;
    return this.apiClient.callApi(
      "/files/state",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesStateGet operation.
   * @callback moduleapi/GunbotApi~filesStateGetCallback
   * @param {String} error Error message, if any.
   * @param {module:model/FileStateContentResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesStateGet — Get State File Content
   * Retrieve the content of a specific state file.
   * @param {module:model/FileGetRequest} body 
   * @param {module:api/GunbotApi~filesStateGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesStateGet(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesStateGet");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = FileStateContentResponse;
    return this.apiClient.callApi(
      "/files/state/get",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesStrategy operation.
   * @callback moduleapi/GunbotApi~filesStrategyCallback
   * @param {String} error Error message, if any.
   * @param {module:model/FileListResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesStrategy — List Custom Strategy Files
   * List filenames of available custom strategy files (JavaScript files).
   * @param {module:api/GunbotApi~filesStrategyCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesStrategy(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = FileListResponse;
    return this.apiClient.callApi(
      "/files/strategy",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesStrategyDelete operation.
   * @callback moduleapi/GunbotApi~filesStrategyDeleteCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesStrategyDelete — Delete Custom Strategy File
   * Delete a specific custom strategy file.
   * @param {module:model/FileGetRequest} body 
   * @param {module:api/GunbotApi~filesStrategyDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesStrategyDelete(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesStrategyDelete");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/files/strategy/delete",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesStrategyGet operation.
   * @callback moduleapi/GunbotApi~filesStrategyGetCallback
   * @param {String} error Error message, if any.
   * @param {'String'{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesStrategyGet — Get Custom Strategy File Content
   * Retrieve the content of a specific custom strategy file. The response is the raw content of the file, likely JavaScript code, wrapped in a JSON object.
   * @param {module:model/FileGetRequest} body 
   * @param {module:api/GunbotApi~filesStrategyGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesStrategyGet(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesStrategyGet");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["text/plain", "application/json"];
    let returnType = "String";
    return this.apiClient.callApi(
      "/files/strategy/get",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the filesStrategyWrite operation.
   * @callback moduleapi/GunbotApi~filesStrategyWriteCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * filesStrategyWrite — Write to Custom Strategy File
   * Write JavaScript code content to a specific custom strategy file.
   * @param {module:model/FileStrategyWriteRequest} body 
   * @param {module:api/GunbotApi~filesStrategyWriteCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesStrategyWrite(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesStrategyWrite");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/files/strategy/write",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the licenseKeysEdit operation.
   * @callback moduleapi/GunbotApi~licenseKeysEditCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * licenseKeysEdit — Edit License Keys
   * Edit license keys for a wallet, optionally verifying with an exchange.
   * @param {module:model/LicenseKeysEditRequest} body 
   * @param {module:api/GunbotApi~licenseKeysEditCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  licenseKeysEdit(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling licenseKeysEdit");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = SuccessStatusResponse;
    return this.apiClient.callApi(
      "/license/keys/edit",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the marketCandles operation.
   * @callback moduleapi/GunbotApi~marketCandlesCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MarketCandlesResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * marketCandles — Get Market Candles (OHLCV)
   * Retrieve historical OHLCV candle data for a trading pair. The &#x60;key&#x60; parameter (exchange/pair) must be URL-encoded.
   * @param {String} key URL-encoded trading pair key (e.g., &#x60;binance%2FUSDT-PEPE&#x60;).
   * @param {module:api/GunbotApi~marketCandlesCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  marketCandles(key, callback) {
    let postBody = null;
    if (key === void 0 || key === null) {
      throw new Error("Missing the required parameter 'key' when calling marketCandles");
    }
    let pathParams = {};
    let queryParams = {
      "key": key
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = MarketCandlesResponse;
    return this.apiClient.callApi(
      "/market/candles",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the marketOrderbook operation.
   * @callback moduleapi/GunbotApi~marketOrderbookCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MarketOrderbookResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * marketOrderbook — Get Market Orderbook
   * Retrieve current order book (bids and asks) for a trading pair. The &#x60;key&#x60; parameter must be URL-encoded.
   * @param {String} key URL-encoded trading pair key (e.g., &#x60;binance%2FUSDT-PEPE&#x60;).
   * @param {module:api/GunbotApi~marketOrderbookCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  marketOrderbook(key, callback) {
    let postBody = null;
    if (key === void 0 || key === null) {
      throw new Error("Missing the required parameter 'key' when calling marketOrderbook");
    }
    let pathParams = {};
    let queryParams = {
      "key": key
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = MarketOrderbookResponse;
    return this.apiClient.callApi(
      "/market/orderbook",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the orders operation.
   * @callback moduleapi/GunbotApi~ordersCallback
   * @param {String} error Error message, if any.
   * @param {module:model/OrdersResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * orders — Get Order History for a Pair
   * Retrieve locally stored order history for a trading pair. The &#x60;key&#x60; parameter must be URL-encoded.
   * @param {String} key URL-encoded exchange/pair key (e.g., &#x60;binance%2FUSDT-XRP&#x60;).
   * @param {module:api/GunbotApi~ordersCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  orders(key, callback) {
    let postBody = null;
    if (key === void 0 || key === null) {
      throw new Error("Missing the required parameter 'key' when calling orders");
    }
    let pathParams = {};
    let queryParams = {
      "key": key
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = OrdersResponse;
    return this.apiClient.callApi(
      "/orders",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the ordersDay operation.
   * @callback moduleapi/GunbotApi~ordersDayCallback
   * @param {String} error Error message, if any.
   * @param {module:model/OrdersDayResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * ordersDay — Get Orders for Current Day (Multiple Pairs)
   * Retrieve orders from the current day for multiple trading pairs. Individual keys in &#x60;keys[]&#x60; array must be URL-encoded if they contain special characters.
   * @param {String} timezone IANA timezone (e.g., &#x60;America/New_York&#x60;).
   * @param {Array.<String>} keys Array of exchange/pair keys. Each key should be URL-encoded if needed.
   * @param {module:api/GunbotApi~ordersDayCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  ordersDay(timezone, keys, callback) {
    let postBody = null;
    if (timezone === void 0 || timezone === null) {
      throw new Error("Missing the required parameter 'timezone' when calling ordersDay");
    }
    if (keys === void 0 || keys === null) {
      throw new Error("Missing the required parameter 'keys' when calling ordersDay");
    }
    let pathParams = {};
    let queryParams = {
      "timezone": timezone,
      "keys[]": this.apiClient.buildCollectionParam(keys, "multi")
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = OrdersDayResponse;
    return this.apiClient.callApi(
      "/orders/day",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the ordersPage operation.
   * @callback moduleapi/GunbotApi~ordersPageCallback
   * @param {String} error Error message, if any.
   * @param {module:model/OrdersPageResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * ordersPage — Get Paginated Orders for a Pair
   * Retrieve paginated orders for a trading pair. The &#x60;key&#x60; parameter must be URL-encoded.
   * @param {String} key URL-encoded exchange/pair key.
   * @param {Number} page Page number (0-indexed).
   * @param {Number} pageSize Records per page.
   * @param {module:api/GunbotApi~ordersPageCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  ordersPage(key, page, pageSize, callback) {
    let postBody = null;
    if (key === void 0 || key === null) {
      throw new Error("Missing the required parameter 'key' when calling ordersPage");
    }
    if (page === void 0 || page === null) {
      throw new Error("Missing the required parameter 'page' when calling ordersPage");
    }
    if (pageSize === void 0 || pageSize === null) {
      throw new Error("Missing the required parameter 'pageSize' when calling ordersPage");
    }
    let pathParams = {};
    let queryParams = {
      "key": key,
      "page": page,
      "pageSize": pageSize
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = OrdersPageResponse;
    return this.apiClient.callApi(
      "/orders/page",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the ordersPageMulti operation.
   * @callback moduleapi/GunbotApi~ordersPageMultiCallback
   * @param {String} error Error message, if any.
   * @param {module:model/OrdersPageMultiResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * ordersPageMulti — Get Paginated Orders (Multiple Pairs)
   * Retrieve paginated orders for multiple trading pairs. Individual keys in &#x60;keys[]&#x60; array must be URL-encoded if needed.
   * @param {Array.<String>} keys Array of exchange/pair keys. Each key should be URL-encoded if needed.
   * @param {Number} page Page number (0-indexed).
   * @param {Number} pageSize Records per page.
   * @param {module:api/GunbotApi~ordersPageMultiCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  ordersPageMulti(keys, page, pageSize, callback) {
    let postBody = null;
    if (keys === void 0 || keys === null) {
      throw new Error("Missing the required parameter 'keys' when calling ordersPageMulti");
    }
    if (page === void 0 || page === null) {
      throw new Error("Missing the required parameter 'page' when calling ordersPageMulti");
    }
    if (pageSize === void 0 || pageSize === null) {
      throw new Error("Missing the required parameter 'pageSize' when calling ordersPageMulti");
    }
    let pathParams = {};
    let queryParams = {
      "keys[]": this.apiClient.buildCollectionParam(keys, "multi"),
      "page": page,
      "pageSize": pageSize
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = OrdersPageMultiResponse;
    return this.apiClient.callApi(
      "/orders/page/multi",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the pairs operation.
   * @callback moduleapi/GunbotApi~pairsCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PairsResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * pairs — Get Trading Pairs
   * Retrieve a list of trading pairs for a specified exchange. The &#x60;exchange&#x60; parameter should be URL-encoded if it contains special characters (e.g., &#x60;#&#x60; as &#x60;%23&#x60;).
   * @param {String} exchange Exchange name (e.g., &#x60;binance%233&#x60;).
   * @param {module:api/GunbotApi~pairsCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  pairs(exchange, callback) {
    let postBody = null;
    if (exchange === void 0 || exchange === null) {
      throw new Error("Missing the required parameter 'exchange' when calling pairs");
    }
    let pathParams = {};
    let queryParams = {
      "exchange": exchange
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = PairsResponse;
    return this.apiClient.callApi(
      "/pairs",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the pairsDetailed operation.
   * @callback moduleapi/GunbotApi~pairsDetailedCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PairsDetailedResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * pairsDetailed — Get Detailed Trading Pairs
   * Retrieve detailed trading pair information for a specified exchange. The &#x60;exchange&#x60; parameter should be URL-encoded if it contains special characters.
   * @param {String} exchange Exchange name (e.g., &#x60;binance%233&#x60;).
   * @param {module:api/GunbotApi~pairsDetailedCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  pairsDetailed(exchange, callback) {
    let postBody = null;
    if (exchange === void 0 || exchange === null) {
      throw new Error("Missing the required parameter 'exchange' when calling pairsDetailed");
    }
    let pathParams = {};
    let queryParams = {
      "exchange": exchange
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = PairsDetailedResponse;
    return this.apiClient.callApi(
      "/pairs/detailed",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the pnlDaily operation.
   * @callback moduleapi/GunbotApi~pnlDailyCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PnlDailyResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * pnlDaily — Get Daily PNL for a Trading Key
   * Retrieve daily PNL data for a specific trading key within a time range. The &#x60;key&#x60; parameter must be URL-encoded.
   * @param {String} key URL-encoded trading key (e.g. &#x60;binance%2FUSDT-XRP&#x60;).
   * @param {Number} startTimestamp Start timestamp (ms).
   * @param {Number} endTimestamp End timestamp (ms).
   * @param {module:api/GunbotApi~pnlDailyCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  pnlDaily(key, startTimestamp, endTimestamp, callback) {
    let postBody = null;
    if (key === void 0 || key === null) {
      throw new Error("Missing the required parameter 'key' when calling pnlDaily");
    }
    if (startTimestamp === void 0 || startTimestamp === null) {
      throw new Error("Missing the required parameter 'startTimestamp' when calling pnlDaily");
    }
    if (endTimestamp === void 0 || endTimestamp === null) {
      throw new Error("Missing the required parameter 'endTimestamp' when calling pnlDaily");
    }
    let pathParams = {};
    let queryParams = {
      "key": key,
      "startTimestamp": startTimestamp,
      "endTimestamp": endTimestamp
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = PnlDailyResponse;
    return this.apiClient.callApi(
      "/pnl/daily",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the pnlDailyPaginated operation.
   * @callback moduleapi/GunbotApi~pnlDailyPaginatedCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PnlDailyPaginatedResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * pnlDailyPaginated — Get Paginated Daily PNL for a Trading Key
   * Retrieve paginated daily PNL data for a specific trading key. The &#x60;key&#x60; parameter must be URL-encoded.
   * @param {String} key URL-encoded trading key.
   * @param {Number} pageNum Page number.
   * @param {Number} pageSize Records per page.
   * @param {Number} endTime End timestamp (ms).
   * @param {module:api/GunbotApi~pnlDailyPaginatedCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  pnlDailyPaginated(key, pageNum, pageSize, endTime, callback) {
    let postBody = null;
    if (key === void 0 || key === null) {
      throw new Error("Missing the required parameter 'key' when calling pnlDailyPaginated");
    }
    if (pageNum === void 0 || pageNum === null) {
      throw new Error("Missing the required parameter 'pageNum' when calling pnlDailyPaginated");
    }
    if (pageSize === void 0 || pageSize === null) {
      throw new Error("Missing the required parameter 'pageSize' when calling pnlDailyPaginated");
    }
    if (endTime === void 0 || endTime === null) {
      throw new Error("Missing the required parameter 'endTime' when calling pnlDailyPaginated");
    }
    let pathParams = {};
    let queryParams = {
      "key": key,
      "pageNum": pageNum,
      "pageSize": pageSize,
      "endTime": endTime
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = PnlDailyPaginatedResponse;
    return this.apiClient.callApi(
      "/pnl/daily/paginated",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the pnlOverview operation.
   * @callback moduleapi/GunbotApi~pnlOverviewCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PnlOverviewResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * pnlOverview — Get PNL Overview
   * Retrieve an overview of PNL data, summarized over time periods and trading pairs.
   * @param {module:model/PnlOverviewRequest} body 
   * @param {module:api/GunbotApi~pnlOverviewCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  pnlOverview(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling pnlOverview");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = PnlOverviewResponse;
    return this.apiClient.callApi(
      "/pnl/overview",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the pnlSum operation.
   * @callback moduleapi/GunbotApi~pnlSumCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PnlSumResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * pnlSum — Get PNL Sum for an Exchange Key
   * Retrieve total PNL sum and investment for an exchange key over a time range. The &#x60;exchange&#x60; parameter (exchange key) must be URL-encoded.
   * @param {String} exchange URL-encoded exchange key (e.g. &#x60;binance%2FUSDT-XRP&#x60;).
   * @param {Number} startTimestamp Start timestamp (ms).
   * @param {Number} endTimestamp End timestamp (ms).
   * @param {module:api/GunbotApi~pnlSumCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  pnlSum(exchange, startTimestamp, endTimestamp, callback) {
    let postBody = null;
    if (exchange === void 0 || exchange === null) {
      throw new Error("Missing the required parameter 'exchange' when calling pnlSum");
    }
    if (startTimestamp === void 0 || startTimestamp === null) {
      throw new Error("Missing the required parameter 'startTimestamp' when calling pnlSum");
    }
    if (endTimestamp === void 0 || endTimestamp === null) {
      throw new Error("Missing the required parameter 'endTimestamp' when calling pnlSum");
    }
    let pathParams = {};
    let queryParams = {
      "exchange": exchange,
      "startTimestamp": startTimestamp,
      "endTimestamp": endTimestamp
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = PnlSumResponse;
    return this.apiClient.callApi(
      "/pnl/sum",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the pnlTotal operation.
   * @callback moduleapi/GunbotApi~pnlTotalCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PnlTotalResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * pnlTotal — Get Total PNL for a Trading Key
   * Retrieve total PNL for a specific trading key. The &#x60;key&#x60; parameter must be URL-encoded.
   * @param {String} key URL-encoded trading key.
   * @param {module:api/GunbotApi~pnlTotalCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  pnlTotal(key, callback) {
    let postBody = null;
    if (key === void 0 || key === null) {
      throw new Error("Missing the required parameter 'key' when calling pnlTotal");
    }
    let pathParams = {};
    let queryParams = {
      "key": key
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = PnlTotalResponse;
    return this.apiClient.callApi(
      "/pnl/total",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the systemStart operation.
   * @callback moduleapi/GunbotApi~systemStartCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SystemActionResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * systemStart — Start System
   * Start the Gunbot system. Returns current configuration without private keys.
   * @param {module:api/GunbotApi~systemStartCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  systemStart(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = SystemActionResponse;
    return this.apiClient.callApi(
      "/system/start",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the systemStop operation.
   * @callback moduleapi/GunbotApi~systemStopCallback
   * @param {String} error Error message, if any.
   * @param {module:model/SystemActionResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * systemStop — Stop System
   * Stop the Gunbot system. Returns current configuration without private keys.
   * @param {module:api/GunbotApi~systemStopCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  systemStop(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = SystemActionResponse;
    return this.apiClient.callApi(
      "/system/stop",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the time operation.
   * @callback moduleapi/GunbotApi~timeCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TimeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * time — Get Server Time
   * Retrieve the current server time in milliseconds since Unix epoch.
   * @param {module:api/GunbotApi~timeCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  time(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = TimeResponse;
    return this.apiClient.callApi(
      "/time",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeBuy operation.
   * @callback moduleapi/GunbotApi~tradeBuyCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeBuy — Place Limit Buy Order
   * Place a limit buy order.
   * @param {module:model/TradeLimitOrderRequest} body 
   * @param {module:api/GunbotApi~tradeBuyCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeBuy(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeBuy");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/buy",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeBuyMarket operation.
   * @callback moduleapi/GunbotApi~tradeBuyMarketCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeBuyMarket — Place Market Buy Order
   * Place a market buy order.
   * @param {module:model/TradeMarketOrderRequest} body 
   * @param {module:api/GunbotApi~tradeBuyMarketCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeBuyMarket(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeBuyMarket");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/buy/market",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeBuyOco operation.
   * @callback moduleapi/GunbotApi~tradeBuyOcoCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeBuyOco — Place OCO Buy Order (Binance)
   * Place an OCO (One-Cancels-the-Other) buy order on Binance.
   * @param {module:model/TradeOcoRequest} body 
   * @param {module:api/GunbotApi~tradeBuyOcoCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeBuyOco(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeBuyOco");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/buy/oco",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeBuyStoplimit operation.
   * @callback moduleapi/GunbotApi~tradeBuyStoplimitCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeBuyStoplimit — Place Stop-Limit Buy Order (Binance)
   * Place a stop-limit buy order on Binance.
   * @param {module:model/TradeStopLimitRequest} body 
   * @param {module:api/GunbotApi~tradeBuyStoplimitCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeBuyStoplimit(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeBuyStoplimit");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/buy/stoplimit",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeBuyTrailingstop operation.
   * @callback moduleapi/GunbotApi~tradeBuyTrailingstopCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeBuyTrailingstop — Place Trailing Stop Buy Order (Binance)
   * Place a trailing stop buy order on Binance. &#x60;price&#x60; is the reference price.
   * @param {module:model/TradeTrailingStopRequest} body 
   * @param {module:api/GunbotApi~tradeBuyTrailingstopCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeBuyTrailingstop(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeBuyTrailingstop");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/buy/trailingstop",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeCancel operation.
   * @callback moduleapi/GunbotApi~tradeCancelCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeCancel — Cancel Order
   * Cancel an existing order.
   * @param {module:model/TradeCancelRequest} body 
   * @param {module:api/GunbotApi~tradeCancelCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeCancel(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeCancel");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/cancel",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeClose operation.
   * @callback moduleapi/GunbotApi~tradeCloseCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeClose — Close Position with Limit Price (Bybit Futures)
   * Close an open position at a specified limit price on Bybit (futures).
   * @param {module:model/TradeCloseLimitRequest} body 
   * @param {module:api/GunbotApi~tradeCloseCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeClose(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeClose");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/close",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeCloseMarket operation.
   * @callback moduleapi/GunbotApi~tradeCloseMarketCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeCloseMarket — Close Position at Market Price (Bybit Futures)
   * Close an open position at the current market price on Bybit (futures).
   * @param {module:model/TradeCloseMarketRequest} body 
   * @param {module:api/GunbotApi~tradeCloseMarketCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeCloseMarket(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeCloseMarket");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/close/market",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeSell operation.
   * @callback moduleapi/GunbotApi~tradeSellCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeSell — Place Limit Sell Order
   * Place a limit sell order.
   * @param {module:model/TradeLimitOrderRequest} body 
   * @param {module:api/GunbotApi~tradeSellCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeSell(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeSell");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/sell",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeSellMarket operation.
   * @callback moduleapi/GunbotApi~tradeSellMarketCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeSellMarket — Place Market Sell Order
   * Place a market sell order.
   * @param {module:model/TradeMarketOrderRequest} body 
   * @param {module:api/GunbotApi~tradeSellMarketCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeSellMarket(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeSellMarket");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/sell/market",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeSellOco operation.
   * @callback moduleapi/GunbotApi~tradeSellOcoCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeSellOco — Place OCO Sell Order (Binance)
   * Place an OCO (One-Cancels-the-Other) sell order on Binance.
   * @param {module:model/TradeOcoRequest} body 
   * @param {module:api/GunbotApi~tradeSellOcoCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeSellOco(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeSellOco");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/sell/oco",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeSellStoplimit operation.
   * @callback moduleapi/GunbotApi~tradeSellStoplimitCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeSellStoplimit — Place Stop-Limit Sell Order (Binance)
   * Place a stop-limit sell order on Binance.
   * @param {module:model/TradeStopLimitRequest} body 
   * @param {module:api/GunbotApi~tradeSellStoplimitCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeSellStoplimit(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeSellStoplimit");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/sell/stoplimit",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the tradeSellTrailingstop operation.
   * @callback moduleapi/GunbotApi~tradeSellTrailingstopCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TradeResponse{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * tradeSellTrailingstop — Place Trailing Stop Sell Order (Binance)
   * Place a trailing stop sell order on Binance. &#x60;price&#x60; is the reference price.
   * @param {module:model/TradeTrailingStopRequest} body 
   * @param {module:api/GunbotApi~tradeSellTrailingstopCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  tradeSellTrailingstop(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling tradeSellTrailingstop");
    }
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ["BearerAuth"];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = TradeResponse;
    return this.apiClient.callApi(
      "/trade/sell/trailingstop",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiClient,
  AssetTotalItem,
  AssetsTotalRequest,
  AssetsTotalResponse,
  AuthStatusResponse,
  BalanceItem,
  BalancesResponse,
  ChartDataRequest,
  ChartDataResponse,
  ChartMarkItem,
  ChartMarksResponse,
  ConfigFullResponse,
  ConfigPairAddRequest,
  ConfigPairRemoveRequest,
  ConfigStrategyAddRequest,
  ConfigStrategyRemoveRequest,
  ConfigUpdateRequest,
  ConfigUpdateResponse,
  CoreMemRawRequest,
  CoreMemRawResponse,
  CoreMemSingleRequest,
  CoreMemSnapshotResponse,
  ErrorResponse,
  FileAclarContentResponse,
  FileContentResponse,
  FileGetRequest,
  FileListResponse,
  FileStateContentResponse,
  FileStrategyWriteRequest,
  FileWriteRequest,
  GunbotApi,
  GunbotConfig,
  LicenseKeysEditRequest,
  LoginRequest,
  LoginResponse,
  MarketCandlesResponse,
  MarketOrderbookData,
  MarketOrderbookResponse,
  OHLCVData,
  OneOfFileWriteRequestDocument,
  OneOfOrderItemId,
  OrderItem,
  OrderbookLevel,
  OrdersDayResponse,
  OrdersPageMultiResponse,
  OrdersPageResponse,
  OrdersResponse,
  PairDetailItem,
  PairsDetailedResponse,
  PairsResponse,
  PnlDailyPaginatedResponse,
  PnlDailyResponse,
  PnlOverviewRequest,
  PnlOverviewRequestDateRange,
  PnlOverviewResponse,
  PnlSumResponse,
  PnlSumResponseTournamentData,
  PnlTotalResponse,
  SuccessStatusResponse,
  SystemActionResponse,
  TimeResponse,
  TradeCancelData,
  TradeCancelRequest,
  TradeCloseLimitData,
  TradeCloseLimitRequest,
  TradeCloseMarketData,
  TradeCloseMarketRequest,
  TradeLimitOrderData,
  TradeLimitOrderRequest,
  TradeMarketOrderData,
  TradeMarketOrderRequest,
  TradeOcoData,
  TradeOcoRequest,
  TradeResponse,
  TradeStopLimitData,
  TradeStopLimitRequest,
  TradeTrailingStopData,
  TradeTrailingStopRequest
});
/*! Bundled license information:

methods/index.js:
  (*!
   * methods
   * Copyright(c) 2013-2014 TJ Holowaychuk
   * Copyright(c) 2015-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
