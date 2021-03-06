# PDFBucket   [![Build Status](https://travis-ci.org/pdfbucket/pdfbucket-node.svg?branch=master)](https://travis-ci.org/pdfbucket/pdfbucket-node)

PDFBucket module allows you to integrate easily with the PDFBucket service. Automatically tested against 0.12, 4, 5 and 6 node versions.

## Installation

```sh
$ npm install pdfbucket --save
```

## Usage

To encrypt a URL in your code instantiate a PDFBucket object and use its `generateUrl` method.
The new pdfBucket will use `PDF_BUCKET_API_KEY`, `PDF_BUCKET_API_SECRET`, `PDF_BUCKET_API_HOST` (default is `api.pdfbucket.io`) ENV vars:

```javascript
var PDFBucket = require('pdfbucket'),
    pdfBucket = new PDFBucket();
```

You can also set any the api params, overwriting then ENV vars like this:

```javascript
var otherPDFBucket = new PDFBucket({apiKey: "ABCDEFGHIJKLMNO", apiSecret: "1234567890ABCDE", apiHost: "api.example.com"});
```

And you get the encryptedUrl using the generateUrl method:

```javascript
var encryptedUrl = pdfBucket.generateUrl("http://example.com", "landscape", "A4", "2px", "0.7");
```

Also you can pass the plain URL to PDFBucket

```javascript
var plainUrl = pdfBucket.generatePlainUrl("http://example.com", "landscape", "A4", "2px", "0.7");
```

* Possible values for orientation: "landscape", "portrait"
* Possible values for page size: "Letter", "A4"
* Possible values for margin: https://developer.mozilla.org/en-US/docs/Web/CSS/margin#Formal_syntax
* Possible values for zoom: https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport/zoom#Formal_syntax
