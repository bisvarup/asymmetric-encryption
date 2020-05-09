import {
  generateKeyPairSync,
  publicEncrypt,
  privateDecrypt,
  generateKeyPair,
} from "crypto";
import { KeyPairGenProps, KeyPairGenTypes } from "./Models/models";
const cryptoRandomString = require("crypto-random-string");

function AsymmetricEncryption() {}

AsymmetricEncryption.prototype.generateKeyPairSync = function generateKeysSync(
  { type, modulusLength }: KeyPairGenProps = {
    type: KeyPairGenTypes.rsa,
    modulusLength: 4096,
  }
) {
  try {
    this.config = { type, modulusLength };
    this.passphrase = cryptoRandomString({ length: 96, type: "base64" });

    // @ts-ignore
    const keys = generateKeyPairSync(type, {
      modulusLength,
      namedCurve: "secp256k1",
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: this.passphrase,
      },
    });

    return { ...keys, passphrase: this.passphrase };
  } catch (err) {
    throw new Error(err);
  }
};

AsymmetricEncryption.prototype.generateKeyPair = function generateKeys(
  { type, modulusLength }: KeyPairGenProps = {
    type: KeyPairGenTypes.rsa,
    modulusLength: 4096,
  }
) {
  this.config = { type, modulusLength };
  return new Promise((resolve, reject) => {
    this.passphrase = cryptoRandomString({ length: 96, type: "base64" });
    generateKeyPair(
      // @ts-ignore
      type,
      {
        modulusLength,
        namedCurve: "secp256k1",
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
          cipher: "aes-256-cbc",
          passphrase: this.passphrase,
        },
      },
      (err, privateKey, publicKey) => {
        if (err) reject;

        return resolve({ privateKey, publicKey, passphrase: this.passphrase });
      }
    );
  });
};

AsymmetricEncryption.prototype.encrypt = function encrypt(
  publicKey: string,
  toEncrypt: string
) {
  try {
    if (!publicKey || !toEncrypt) throw new Error("Insufficient parameters");

    if (toEncrypt.length > this.config.modulusLength)
      throw new Error("Encryption text is too big");

    const buffer = Buffer.from(toEncrypt);
    const encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
  } catch (error) {
    throw new Error(error);
  }
};

AsymmetricEncryption.prototype.decrypt = function (
  privateKey: string,
  toDecrypt: string,
  passphrase?: string
) {
  try {
    if (!passphrase && !this.passphrase)
      throw new Error("Passphrase is needed, but cannot find");

    if (!privateKey || !toDecrypt) throw new Error("Insufficient parameters");

    const buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = privateDecrypt(
      {
        key: privateKey.toString(),
        passphrase: this.passphrase,
      },
      buffer
    );
    return decrypted.toString("utf8");
  } catch (error) {
    throw new Error(error);
  }
};

const obj = new AsymmetricEncryption();
console.log(obj);

module.exports = obj;
