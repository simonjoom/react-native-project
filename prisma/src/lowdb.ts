//import * as Promise from "bluebird";
import { unlinkSync, createWriteStream } from "fs";
const fs = require("fs");
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());
const lowdb = require("lowdb");
const shortid = require("shortid");
const mkdirp = require("mkdirp");
const FileSync = require("lowdb/adapters/FileSync");
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

import { toArray } from "lodash";
 
const uploadDir =
  process.env.NODE_ENV === "development"
    ? resolveApp("./src/src/uploads")
    : resolveApp("./build/static/media/");
// Ensure upload directory exists
mkdirp.sync(uploadDir);
export const lwdb = lowdb(new FileSync("db.json"));
lwdb.defaults({ uploads: [] }).write();

export const storeFS = ({ stream, filename }): any => {
  const id = shortid.generate();
  const file = `${id}-${filename}`;
  const path = `${uploadDir}/${file}`;
  return new Promise((resolve, reject) => {
   return stream
      .on("error", error => {
        if (stream.truncated)
          // Delete the truncated file
          unlinkSync(path);
        reject(error);
      })
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path: file }));
     // .on("error", error => reject(error));
  })
};

export const existInDB = filename => {
  return toArray(lwdb.get("uploads")).filter(function(e) {
    return e.filename === filename;
  });
};

export const storeDB = file =>
  lwdb
    .get("uploads")
    .push(file)
    .last()
    .write();
