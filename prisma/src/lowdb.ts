//import * as Promise from "bluebird";
import { unlinkSync, createWriteStream } from "fs";

const lowdb = require("lowdb");
const shortid = require("shortid");
const mkdirp = require("mkdirp");
const FileSync = require("lowdb/adapters/FileSync");
import { toArray } from "lodash";

const uploadDir = "./uploads";
// Ensure upload directory exists
mkdirp.sync(uploadDir);
export const lwdb = lowdb(new FileSync("db.json"));
lwdb.defaults({ uploads: [] }).write();

export const storeFS = ({ stream, filename }):any => {
  const id = shortid.generate();
  const path = `${uploadDir}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // Delete the truncated file
          unlinkSync(path);
        reject(error);
      })
      .pipe(createWriteStream(path))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ id, path }))
  );
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
