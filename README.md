# PDFBucket   [![Build Status](https://travis-ci.org/PDFBucket/pdfbucket-node.svg?branch=master)](https://travis-ci.org/PDFBucket/pdfbucket-node)

This module allows you to use easily sign URLs to be used with the PDFBucket service. Automatically tested against 0.12, 4, 5 and 6 node versions.

## Installation

```sh
$ npm install pdfbucket --save
```

## Usage

To sign a URL in your code instantiate a signer object and use its `generateUrl` method.
The new signer will use `PDF_BUCKET_API_KEY`, `PDF_BUCKET_API_SECRET`, `PDF_BUCKET_API_HOST` (default is `pdfbucket.kommit.co`) ENV vars:

```javascript
var Signer = require('pdfbucket');
var signer = new Signer();
```

You can also set any the api params, overwriting then ENV vars like this:

```javascript
var otherSigner = new Signer({apiKey: "ABCDEFGHIJKLMNO", apiSecret: "1234567890ABCDE", apiHost: "potion-api-staging.herokuapp.com"});
```

And you get the signedUrl using the generateUrl method:

```javascript
var signedUrl = signer.generateUrl("http://example.com", "landscape", "A4", "2px", "0.7");
```

* Possible values for orientation: "landscape", "portrait"
* Possible values for page size: "Letter", "A4"
* Possible values for margin: https://developer.mozilla.org/en-US/docs/Web/CSS/margin#Formal_syntax
* Possible values for zoom: https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport/zoom#Formal_syntax
