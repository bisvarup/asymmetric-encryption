var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
const passphrase = "mySecret";

let publicKey, privateKey;

var encryptStringWithRsaPublicKey = function (
  toEncrypt,
) {
  var buffer = Buffer.from(toEncrypt);
  var encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function (
  toDecrypt,
) {
  var buffer = Buffer.from(toDecrypt, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: passphrase,
    },
    buffer
  );
  return decrypted.toString("utf8");
};

const { generateKeyPairSync } = require("crypto");

function generateKeys() {
  const keys = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    namedCurve: "secp256k1",
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  });

  publicKey = keys.publicKey
  privateKey=keys.privateKey

}

generateKeys();

let a = encryptStringWithRsaPublicKey("hello", "public.pem");
let b = decryptStringWithRsaPrivateKey(a, "private.pem");
console.log(b);
