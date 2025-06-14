var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/ApiClient.js
import superagent from "superagent";
var ApiClient = class _ApiClient {
  constructor() {
    this.basePath = "http://your-gunbot-instance.com:3000/api/v1".replace(/\/+$/, "");
    this.authentications = {};
    this.defaultHeaders = {};
    this.timeout = 6e4;
    this.cache = true;
    this.enableCookies = false;
    if (typeof window === "undefined") {
      this.agent = new superagent.agent();
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
    if (typeof __require === "function") {
      let fs;
      try {
        fs = __require("fs");
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
    var request = superagent(httpMethod, url);
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
        callback(error, response);
      });
      return request;
    }
    return new Promise((resolve, reject) => {
      request.end((error, response) => {
        if (error) return reject(error);
        try {
          const data = this.deserialize(response, returnType);
          resolve(data);
        } catch (e) {
          reject(e);
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
   * Represents the Gunbot configuration structure. This is a simplified placeholder; the actual config is deeply nested.
   * @alias module:model/GunbotConfig
   * @class
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
      if (data.hasOwnProperty("pairs"))
        obj.pairs = ApiClient.convertToType(data["pairs"], { "String": { "String": Object } });
    }
    return obj;
  }
};
GunbotConfig.prototype.pairs = void 0;

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
   */
  constructor(name) {
    this.name = name;
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
   * @param data {module:model/GunbotConfig} 
   */
  constructor(data) {
    this.data = data;
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
      if (data.hasOwnProperty("data"))
        obj.data = GunbotConfig.constructFromObject(data["data"]);
    }
    return obj;
  }
};
ConfigUpdateRequest.prototype.data = void 0;

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
  constructor(filename, document) {
    this.filename = filename;
    this.document = document;
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
  constructor(document) {
    this.document = document;
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
        obj.days = ApiClient.convertToType(data["days"], [{ "String": Object }]);
      if (data.hasOwnProperty("orders"))
        obj.orders = ApiClient.convertToType(data["orders"], [{ "String": Object }]);
      if (data.hasOwnProperty("closeOrders"))
        obj.closeOrders = ApiClient.convertToType(data["closeOrders"], [{ "String": Object }]);
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
   */
  constructor() {
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
        obj.data = ApiClient.convertToType(data["data"], [{ "String": Object }]);
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
   * Get Historical Total Asset Value
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
   * Login User
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
   * Get Authentication Status
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
   * Get Asset Balances
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
   * Get Chart Data (Candles and Indicators)
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
   * Get Chart Timescale Marks
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
   * Get Full Configuration
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
   * Add Trading Pair to Configuration
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
   * Remove Trading Pair from Configuration
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
   * Add Trading Strategy to Configuration
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
   * Remove Trading Strategy from Configuration
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
   * Update Full Configuration
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
   * Get Core Memory Snapshot (All Pairs)
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
   * Get Raw Core Memory Data for a Pair
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
   * Get Core Memory Snapshot (Single Pair)
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
   * List AutoConfig Variable Files
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
   * Get AutoConfig Variable File Content
   * Retrieve the content of a specified AutoConfig variable file.
   * @param {module:model/FileGetRequest} body 
   * @param {module:api/GunbotApi~filesAcvarGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
   */
  filesAcvarGet(body, callback) {
    let postBody = body;
    if (body === void 0 || body === null) {
      throw new Error("Missing the required parameter 'body' when calling filesAcvarGet");
    }
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
   * Write to autoconfig.json File
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
   * List Backup Files
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
   * Get Backup File Content
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
   * @param {Object.<String, {'String': Object}>{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * Get Custom Strategy Editor File Content
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
    let accepts = ["application/json"];
    let returnType = { "String": Object };
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
   * Write to Custom Strategy Editor File
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
   * List State Files
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
   * Get State File Content
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
   * List Custom Strategy Files
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
   * Delete Custom Strategy File
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
   * @param {Object.<String, {'String': Object}>{ data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * Get Custom Strategy File Content
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
    let accepts = ["application/json"];
    let returnType = { "String": Object };
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
   * Write to Custom Strategy File
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
   * Edit License Keys
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
   * Get Market Candles (OHLCV)
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
   * Get Market Orderbook
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
   * Get Order History for a Pair
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
   * Get Orders for Current Day (Multiple Pairs)
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
   * Get Paginated Orders for a Pair
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
   * Get Paginated Orders (Multiple Pairs)
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
   * Get Trading Pairs
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
   * Get Detailed Trading Pairs
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
   * Get Daily PNL for a Trading Key
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
   * Get Paginated Daily PNL for a Trading Key
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
   * Get PNL Overview
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
   * Get PNL Sum for an Exchange Key
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
   * Get Total PNL for a Trading Key
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
   * Start System
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
   * Stop System
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
   * Get Server Time
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
   * Place Limit Buy Order
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
   * Place Market Buy Order
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
   * Place OCO Buy Order (Binance)
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
   * Place Stop-Limit Buy Order (Binance)
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
   * Place Trailing Stop Buy Order (Binance)
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
   * Cancel Order
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
   * Close Position with Limit Price (Bybit Futures)
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
   * Close Position at Market Price (Bybit Futures)
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
   * Place Limit Sell Order
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
   * Place Market Sell Order
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
   * Place OCO Sell Order (Binance)
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
   * Place Stop-Limit Sell Order (Binance)
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
   * Place Trailing Stop Sell Order (Binance)
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
export {
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
};
