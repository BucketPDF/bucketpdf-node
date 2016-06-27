var crypto      = require('crypto'),
    querystring = require('querystring'),
    url         = require('url'),
    DEFAULT_HOST = 'pdfbucket.kommit.co',
    ORIENTATIONS = {
      portrait: 'portrait',
      landscape: 'landscape'
    },
    PAGE_SIZES = {
      A4: 'A4',
      Letter: 'Letter'
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

PDFBucket.prototype.generateUrl = function(uri, orientation, pageSize, margin, zoom) {
  if (uri.trim() &&
      (orientation == "portrait" || orientation == "landscape") &&
      (pageSize == "A4" || pageSize == "Letter")) {
    var encryptedUri = encrypt(this.apiSecret, uri);

    queryParams = querystring.stringify({orientation: ORIENTATIONS[orientation],
                                         page_size: PAGE_SIZES[pageSize],
                                         margin: margin,
                                         zoom: zoom,
                                         api_key: this.apiKey,
                                         encrypted_uri: encryptedUri});
    result = url.format({
      protocol: "http",
      host: this.apiHost,
      pathname: '/api/convert',
      search: queryParams
    });
    return result;
  } else if (!uri.trim()) {
      throw "Invalid uri value, must be not blank";
  } else if (orientation !== "portrait" && orientation !== "landscape"){
      throw "Invalid orientation value, must be portrait or landscape";
  } else if (pageSize !== "A4" && pageSize !== "Letter") {
      throw "Invalid pageSize value, must be A4 or Letter";
  }
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
