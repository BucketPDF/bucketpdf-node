var chai   = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    PDFBucket = require('./../lib/pdfbucket');

describe('Testing create PDFBucket with valid parameters', function() {
  var pdfBucket;
  beforeEach(function() {
    pdfBucket = new PDFBucket({apiKey: "PIQ7T3GOM7D36R0O67Q97UM3F0I6CPB5", apiSecret: "HieMN8dvi5zfSbKvqxKccxDo3LozqOIrY59U/jrZY54="});
  });

  it('should return a PDFBucket object with valid parameters', function() {
    assert.typeOf(pdfBucket, "object");
  });

  it('should generate encrypted url passing valid parameters', function() {
    var encryptedUrl = pdfBucket.generateUrl("https://www.joyent.com/", "landscape", "A4", "2px", "0.7", true, "header", "center", 10, 0);
    assert.isString(encryptedUrl);
  });

  it('should generate plain url passing valid parameters', function() {
    var plainUrl = pdfBucket.generatePlainUrl("https://www.joyent.com/", "landscape", "A4", "2px", "0.7", true, "header", "center", "10");
    assert.isString(plainUrl);
  });

  it('should throws invalid uri passed in when uri is blank', function() {
    assert.throws(function() {
      var encryptedUrl = pdfBucket.generateUrl("    ", "landscape", "A4", "2px", "0.7", true, "header", "center", "10");
    }, "Invalid uri value, must be not blank");
  });

  it('should throws invalid orientation passed in when orientation is neither portrait or landscape', function() {
    assert.throws(function() {
      var encryptedUrl = pdfBucket.generateUrl("https://www.joyent.com/", "something", "A4", "2px", "0.7", true, "header", "center", "10");
    }, "Invalid orientation value, must be portrait or landscape");
  });

  it('should throws invalid pageSize passed in when pageSize is neither A4 or Letter', function() {
    assert.throws(function() {
      var encryptedUrl = pdfBucket.generateUrl("https://www.joyent.com/", "landscape", "something", "2px", "0.7", true, "header", "center", "10");
    }, "Invalid pageSize value, must be A4 or Letter");
  });

  it('should return a pdfBucket object with valid parameters through environment variables', function() {
    process.env["PDF_BUCKET_API_KEY"]    = "PIQ7T3GOM7D36R0O67Q97UM3F0I6CPB5";
    process.env["PDF_BUCKET_API_SECRET"] = "HieMN8dvi5zfSbKvqxKccxDo3LozqOIrY59U/jrZY54=";
    var pdfBucket = new PDFBucket();
    process.env["PDF_BUCKET_API_KEY"]    = "";
    process.env["PDF_BUCKET_API_SECRET"] = "";
    assert.typeOf(pdfBucket, "object");
  });
});

describe('Testing create PDFBucket with invalid parameters', function() {
  it('PDFBucket() initialization should throws "bucket apiKey is required" if no apiKey is passed in', function() {
    assert.throws(function() {
      var pdfBucket = new PDFBucket({apiSecret: "HieMN8dvi5zfSbKvqxKccxDo3LozqOIrY59U/jrZY54="});
    }, "bucket apiKey is required");
  });

  it('PDFBucket() initialization should throws "bucket apiSecret is required" if no apiSecret is passed in', function() {
    assert.throws(function() {
      var pdfBucket = new PDFBucket({apiKey: "PIQ7T3GOM7D36R0O67Q97UM3F0I6CPB5"});
    }, "bucket apiSecret is required");
  });

});
