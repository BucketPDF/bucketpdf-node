var crypto      = require('crypto'),
    querystring = require('querystring'),
    url         = require('url'),
    DEFAULT_HOST = 'api.pdfbucket.io',
    ORIENTATIONS = {
      portrait: 'portrait',
      landscape: 'landscape'
    },
    PAGE_SIZES = {
      A4: 'A4',
      Letter: 'Letter'
    },
    POSITIONS = {
      header: 'header',
      footer: 'footer'
    },
    ALIGNMENTS = {
      left: 'left',
      center: 'center',
      right: 'right'
    };

function PDFBucket(params) {
  this.apiKey    = (params && params.apiKey)    || process.env.PDF_BUCKET_API_KEY;
  this.apiSecret = (params && params.apiSecret) || process.env.PDF_BUCKET_API_SECRET;
  this.apiHost   = (params && params.apiHost)   || process.env.PDF_BUCKET_API_HOST || DEFAULT_HOST;

  if (!this.apiKey || !this.apiKey.trim()) {
    throw "bucket apiKey is required";
  }
  if (!this.apiSecret || !this.apiSecret.trim()) {
    throw "bucket apiSecret is required";
  }
}

PDFBucket.prototype.generateUrl = function(uri, orientation, pageSize, margin, zoom, pagination, position, alignment, expires_in, cache) {
  var cache = cache || 0;
  if (uri.trim() &&
      (orientation == "portrait" || orientation == "landscape") &&
      (pageSize == "A4" || pageSize == "Letter")) {

    var params = {
      orientation:    ORIENTATIONS[orientation],
      page_size:      PAGE_SIZES[pageSize],
      margin:         margin,
      zoom:           zoom,
      expires_in:     expires_in,
      cache:          cache,
      api_key:        this.apiKey,
      encrypted_uri:  encrypt(this.apiSecret, uri)
    };

    if (pagination === true) {
      params.pagination = pagination;
      params.position   = POSITIONS[position];
      params.alignment  = ALIGNMENTS[alignment];
    }

    result = url.format({
      protocol: "https",
      host:     this.apiHost,
      pathname: '/api/convert',
      search:   querystring.stringify(params)
    });
    return result;
  } else if (!uri.trim()) {
      throw "Invalid uri value, must be not blank";
  } else if (orientation !== "portrait" && orientation !== "landscape"){
      throw "Invalid orientation value, must be portrait or landscape";
  } else if (pageSize !== "A4" && pageSize !== "Letter") {
      throw "Invalid pageSize value, must be A4 or Letter";
  } else if (pagination === true && position !== "header" && position !== "footer") {
      throw "Invalid position value, must be header or footer";
  } else if (pagination === true && alignment !== "left" && alignment !== "center" && alignment !== "right") {
      throw "Invalid alignment value, must be left, center or right";
  }
}

PDFBucket.prototype.generatePlainUrl = function(uri, orientation, pageSize, margin, zoom, pagination, position, alignment, expires_in, cache) {
  var cache = cache || 0;
  if (uri.trim() &&
      (orientation == "portrait" || orientation == "landscape") &&
      (pageSize == "A4" || pageSize == "Letter")) {
    var signature = sign(this.apiSecret, this.apiKey, uri, orientation, pageSize, margin, zoom, pagination, position, alignment, expires_in);

    var params = {
      orientation: ORIENTATIONS[orientation],
      page_size: PAGE_SIZES[pageSize],
      margin: margin,
      zoom: zoom,
      expires_in: expires_in,
      cache: cache,
      api_key: this.apiKey,
      uri: uri,
      signature: signature
    }

    if (pagination === true) {
      params.pagination = pagination;
      params.position   = POSITIONS[position];
      params.alignment  = ALIGNMENTS[alignment];
    }

    result = url.format({
      protocol: "https",
      host:     this.apiHost,
      pathname: '/api/convert',
      search:   querystring.stringify(params)
    });
    return result;
  } else if (!uri.trim()) {
      throw "Invalid uri value, must be not blank";
  } else if (orientation !== "portrait" && orientation !== "landscape"){
      throw "Invalid orientation value, must be portrait or landscape";
  } else if (pageSize !== "A4" && pageSize !== "Letter") {
      throw "Invalid pageSize value, must be A4 or Letter";
  } else if (pagination === true && position !== "header" && position !== "footer") {
      throw "Invalid position value, must be header or footer";
  } else if (pagination === true && alignment !== "left" && alignment !== "center" && alignment !== "right") {
      throw "Invalid alignment value, must be left, center or right";
  }
}

function sign(apiSecret, apiKey, uri, orientation, pageSize, margin, zoom, pagination, position, alignment, expires_in) {
  var shasum = crypto.createHash('sha1'),
    params = [
      apiKey,
      uri,
      orientation,
      pageSize,
      pagination,
      position,
      alignment,
      margin,
      zoom
    ].join(',');

  shasum.update(params + apiSecret);
  return shasum.digest('hex');
}

function encrypt(key, content) {
  var randomIV = crypto.randomBytes(16),
      key = new Buffer(key, 'base64'),
      cipher = crypto.createCipheriv('AES-256-CTR', key, randomIV),
      encrypted = cipher.update(content),
      cipherFinal = cipher.final(),
      totalLength = randomIV.length + encrypted.length + cipherFinal.length,
      result = Buffer.concat([randomIV, encrypted, cipherFinal], totalLength);

  return new Buffer(result, 'binary').toString('base64');
}

module.exports = PDFBucket;
