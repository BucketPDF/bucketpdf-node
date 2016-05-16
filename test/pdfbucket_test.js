var chai   = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    Signer = require('./../lib/pdfbucket');

describe('Testing create Signer with valid parameters', function() {
  var s;
  beforeEach(function() {
    s = new Signer({apiKey: "PIQ7T3GOM7D36R0O67Q97UM3F0I6CPB5", apiSecret: "HieMN8dvi5zfSbKvqxKccxDo3LozqOIrY59U/jrZY54="});
  });

  it('should return a Signer object with valid parameters', function() {
    assert.typeOf(s, "object");
  });

  it('should generate signed url passing valid parameters', function() {
    var signedUrl = s.generateUrl("https://www.joyent.com/", "landscape", "A4");
    assert.isString(signedUrl);
  });

  it('should throws invalid uri passed in when uri is blank', function() {
    assert.throws(function() {
      var signedUrl = s.generateUrl("    ", "landscape", "A4");
    }, "Invalid uri value, must be not blank");
  });

  it('should throws invalid orientation passed in when orientation is neither portrait or landscape', function() {
    assert.throws(function() {
      var signedUrl = s.generateUrl("https://www.joyent.com/", "something", "A4");
    }, "Invalid orientation value, must be portrait or landscape");
  });

  it('should throws invalid pageSize passed in when pageSize is neither A4 or Letter', function() {
    assert.throws(function() {
      var signedUrl = s.generateUrl("https://www.joyent.com/", "landscape", "something");
    }, "Invalid pageSize value, must be A4 or Letter");
  });

  it('should return a Signer object with valid parameters through environment variables', function() {
    process.env["PDF_BUCKET_API_KEY"]    = "PIQ7T3GOM7D36R0O67Q97UM3F0I6CPB5";
    process.env["PDF_BUCKET_API_SECRET"] = "HieMN8dvi5zfSbKvqxKccxDo3LozqOIrY59U/jrZY54=";
    var s = new Signer();
    process.env["PDF_BUCKET_API_KEY"]    = "";
    process.env["PDF_BUCKET_API_SECRET"] = "";
    assert.typeOf(s, "object");
  });
});

describe('Testing create Signer with invalid parameters', function() {
  it('Signer() initialization should throws "bucket apiKey is required" if no apiKey is passed in', function() {
    assert.throws(function() {
      var s = new Signer({apiSecret: "HieMN8dvi5zfSbKvqxKccxDo3LozqOIrY59U/jrZY54="});
      console.log(s);
    }, "bucket apiKey is required");
  });

  it('Signer() initialization should throws "bucket apiSecret is required" if no apiSecret is passed in', function() {
    assert.throws(function() {
      var s = new Signer({apiKey: "PIQ7T3GOM7D36R0O67Q97UM3F0I6CPB5"});
    }, "bucket apiSecret is required");
  });

});
