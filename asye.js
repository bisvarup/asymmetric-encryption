"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var crypto_1 = require("crypto");
var models_1 = require("./Models/models");
var cryptoRandomString = require("crypto-random-string");
function AsymmetricEncryption() { }
AsymmetricEncryption.prototype.generateKeyPairSync = function generateKeysSync(_a) {
    var _b = _a === void 0 ? {
        type: models_1.KeyPairGenTypes.rsa,
        modulusLength: 4096
    } : _a, type = _b.type, modulusLength = _b.modulusLength;
    try {
        this.config = { type: type, modulusLength: modulusLength };
        this.passphrase = cryptoRandomString({ length: 96, type: "base64" });
        // @ts-ignore
        var keys = crypto_1.generateKeyPairSync(type, {
            modulusLength: modulusLength,
            namedCurve: "secp256k1",
            publicKeyEncoding: {
                type: "spki",
                format: "pem"
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
                cipher: "aes-256-cbc",
                passphrase: this.passphrase
            }
        });
        return __assign(__assign({}, keys), { passphrase: this.passphrase });
    }
    catch (err) {
        throw new Error(err);
    }
};
AsymmetricEncryption.prototype.generateKeyPair = function generateKeys(_a) {
    var _this = this;
    var _b = _a === void 0 ? {
        type: models_1.KeyPairGenTypes.rsa,
        modulusLength: 4096
    } : _a, type = _b.type, modulusLength = _b.modulusLength;
    this.config = { type: type, modulusLength: modulusLength };
    return new Promise(function (resolve, reject) {
        _this.passphrase = cryptoRandomString({ length: 96, type: "base64" });
        crypto_1.generateKeyPair(
        // @ts-ignore
        type, {
            modulusLength: modulusLength,
            namedCurve: "secp256k1",
            publicKeyEncoding: {
                type: "spki",
                format: "pem"
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
                cipher: "aes-256-cbc",
                passphrase: _this.passphrase
            }
        }, function (err, privateKey, publicKey) {
            if (err)
                reject;
            return resolve({ privateKey: privateKey, publicKey: publicKey, passphrase: _this.passphrase });
        });
    });
};
AsymmetricEncryption.prototype.encrypt = function encrypt(publicKey, toEncrypt) {
    try {
        if (!publicKey || !toEncrypt)
            throw new Error("Insufficient parameters");
        if (toEncrypt.length > this.config.modulusLength)
            throw new Error("Encryption text is too big");
        var buffer = Buffer.from(toEncrypt);
        var encrypted = crypto_1.publicEncrypt(publicKey, buffer);
        return encrypted.toString("base64");
    }
    catch (error) {
        throw new Error(error);
    }
};
AsymmetricEncryption.prototype.decrypt = function (privateKey, toDecrypt, passphrase) {
    try {
        if (!passphrase && !this.passphrase)
            throw new Error("Passphrase is needed, but cannot find");
        if (!privateKey || !toDecrypt)
            throw new Error("Insufficient parameters");
        var buffer = Buffer.from(toDecrypt, "base64");
        var decrypted = crypto_1.privateDecrypt({
            key: privateKey.toString(),
            passphrase: this.passphrase
        }, buffer);
        return decrypted.toString("utf8");
    }
    catch (error) {
        throw new Error(error);
    }
};
var obj = new AsymmetricEncryption();
console.log(obj);
module.exports = obj;
