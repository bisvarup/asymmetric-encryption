export enum KeyPairGenTypes {
  rsa = "rsa",
  dsa = "dsa",
  ec = "ec",
  ed25519 = "ed25519",
  ed448 = "ed448",
  x25519 = "x25519",
  x448 = "x448",
  dh = "dh",
}
export interface KeyPairGenProps {
  type: KeyPairGenTypes;
  modulusLength: 1024 | 2048 | 4096 | 8192;
}
