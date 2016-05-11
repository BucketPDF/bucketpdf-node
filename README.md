# Bucketpdf   [![Build Status](https://travis-ci.org/BucketPDF/bucketpdf-node.svg?branch=master)](https://travis-ci.org/BucketPDF/bucketpdf-node)

This module allows you to use easily sign URLs to be used with the BucketPDF service.

## Installation

```sh
$ npm install bucketpdf --save
```

## Usage

To sign a URL in your code instantiate a signer object and use its `generateUrl` method.
The new signer will use `BUCKET_PDF_API_KEY`, `BUCKET_PDF_API_SECRET`, `BUCKET_PDF_API_HOST` (default is `bucketpdf.kommit.co`) ENV vars:

```javascript
var Signer = require('bucketpdf');
var signer = new Signer();
```

You can also set any the api params, overwriting then ENV vars like this:

```javascript
var otherSigner = new Signer({apiKey: "ABCDEFGHIJKLMNO", apiSecret: "1234567890ABCDE", apiHost: "potion-api-staging.herokuapp.com"});
```

And you get the signedUrl using the generateUrl method:

```javascript
var signedUrl = signer.generateUrl("http://example.com", "landscape", "A4");
```

* Possible values for orientation: "landscape", "portrait"
* Possible values for page size: "Letter", "A4"
