// @TODO refactor this file to include only exports
import { buildCommandMessage } from './build-command-message';
import sha1 from './encryption/sha1';
import * as eol from './eol';
import writeFile from './fs-write-file';
import { checksum, checksumFile } from './checksum';
import createSymlinkOrCopy from './fs/create-symlink-or-copy';
import calculateFileInfo from './fs/file-info';
import getWithoutExt from './fs/fs-no-ext';
import getExt from './fs/get-ext';
import isDirEmpty from './fs/is-dir-empty';
import { pathHas, pathHasAll, propogateUntil } from './fs/propogate-until';
import readDirIgnoreDsStore, { readDirSyncIgnoreDsStore } from './fs/read-dir-ignore-ds-store';
import glob from './glob';
import retrieveIgnoreList from './ignore/ignore';
import immutableUnshift from './immutable-unshift';
import isBitUrl from './is-bit-url';
import isDir from './is-dir';
import isDirEmptySync from './is-dir-empty-sync';
import isAutoGeneratedFile from './is-file-auto-generated';
import isRelativeImport from './is-relative-import';
import isValidPath from './is-valid-path';
import mapObject from './map-object';
import mapToObject from './map/to-object';
import isNumeric from './number/is-numeric';
import cleanObject from './object-clean';
import objectToStringifiedTupleArray from './object-to-stringified-tuple-array';
import empty from './object/empty';
import filter from './object/filter';
import forEach from './object/foreach';
import hasOwnProperty from './object/has-own-property';
import sortObject from './object/sort';
import resolveGroupId from './os-resolve-group-id';
import resolveHomePath from './os-resolve-home-path';
import { packCommand } from './pack-command';
import { pathJoinLinux, pathNormalizeToLinux, pathRelativeLinux, pathResolveToLinux } from './path';
// @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
import { pathIsInside } from './path-is-inside';
import prependBang from './prepend-bang';
import getLatestVersionNumber from './resolveLatestVersion';
import identityFile from './ssh/identity-file';
import parseSSHUrl from './ssh/parse-url';
import cleanBang from './string/clean-bang';
import cleanChar from './string/clean-char';
import fromBase64 from './string/from-base64';
import generateRandomStr from './string/generate-random';
import getStringifyArgs from './string/get-stringify-args';
import isString from './string/is-string';
import removeChalkCharacters from './string/remove-chalk-characters';
import stripTrailingChar from './string/strip-trailing-char';
import toBase64 from './string/to-base64';
import toBase64ArrayBuffer from './string/to-base64-array-buffer';
import { unpackCommand } from './unpack-command';
import deflate from './zlib-deflate';
import inflate from './zlib-inflate';

export {
  identityFile,
  parseSSHUrl,
  sha1,
  objectToStringifiedTupleArray,
  resolveGroupId,
  mapToObject,
  filter as filterObject,
  sortObject,
  isString,
  removeChalkCharacters,
  getStringifyArgs,
  isNumeric,
  inflate,
  deflate,
  toBase64,
  toBase64ArrayBuffer,
  fromBase64,
  glob,
  empty,
  filter,
  cleanChar,
  checksum,
  checksumFile,
  writeFile,
  cleanObject,
  readDirIgnoreDsStore,
  readDirSyncIgnoreDsStore,
  createSymlinkOrCopy,
  cleanBang,
  prependBang,
  forEach,
  hasOwnProperty,
  isBitUrl,
  isDir,
  mapObject,
  resolveHomePath,
  propogateUntil,
  pathHas,
  pathHasAll,
  isDirEmpty,
  isDirEmptySync,
  immutableUnshift,
  packCommand,
  unpackCommand,
  buildCommandMessage,
  stripTrailingChar,
  getLatestVersionNumber,
  calculateFileInfo,
  getWithoutExt,
  getExt,
  pathNormalizeToLinux,
  pathJoinLinux,
  pathRelativeLinux,
  pathResolveToLinux,
  retrieveIgnoreList,
  pathIsInside,
  isValidPath,
  isAutoGeneratedFile,
  eol,
  generateRandomStr,
  isRelativeImport,
};
