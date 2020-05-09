const {
  generateKeyPairSync,
  publicEncrypt,
  privateDecrypt,
  generateKeyPair,
} = require("crypto");
const cryptoRandomString = require("crypto-random-string");

function asymmetricEncryption() {}

enum KeyPairGenTypes {
  rsa = "rsa",
  dsa = "dsa",
  ec = "ec",
  ed25519 = "ed25519",
  ed448 = "ed448",
  x25519 = "x25519",
  x448 = "x448",
  dh = "dh",
}
interface KeyPairGenProps {
  type: KeyPairGenTypes;
  modulusLength: 1024 | 2048 | 4096 | 8192;
}

asymmetricEncryption.prototype.generateKeyPairSync = function generateKeysSync(
  { type, modulusLength }: KeyPairGenProps = {
    type: KeyPairGenTypes.rsa,
    modulusLength: 4096,
  }
) {
  try {
    this.config = { type, modulusLength };
    this.passphrase = cryptoRandomString({ length: 96, type: "base64" });
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

asymmetricEncryption.prototype.generateKeyPair = function generateKeys(
  { type, modulusLength }: KeyPairGenProps = {
    type: KeyPairGenTypes.rsa,
    modulusLength: 4096,
  }
) {
  this.config = { type, modulusLength };
  return new Promise((resolve, reject) => {
    this.passphrase = cryptoRandomString({ length: 96, type: "base64" });
    generateKeyPair(
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

asymmetricEncryption.prototype.encrypt = function encrypt(
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

asymmetricEncryption.prototype.decrypt = function (
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

module.exports = new asymmetricEncryption();
