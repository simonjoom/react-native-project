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

import { toArray, filter } from "lodash";
console.log(process.env.NODE_ENV);
const uploadDir = resolveApp("./build/static/media/");
// process.env.NODE_ENV === "development"
//   ? resolveApp("./src/src/uploads")
//    : resolveApp("./build/static/media/");
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
  });
};
export const getDB = () => {
  return lwdb.get("uploads").value();
};
export const removeInDB = async listfilename => {
  const out = uploadsfromlistfilenameInDB(listfilename);
  await Promise.all(
    out.map(async file => {
      const contents = await lwdb
        .get("uploads")
        .remove(file)
        .write();
      console.log(contents);
    })
  );
};

export const uploadsfromlistfilenameInDB = (
  listfilename: string[]
): Array<Object> => {
  const va=getDB();
  return filter(va, function(e) { 
    return listfilename.includes(e.filename);
  });
};
export const uploadsfromfilenameInDB = filename => {
  const va=getDB();
  return filter(va, function(e) {
    return e.filename === filename;
  });
};

export const storeDB = file =>
  lwdb
    .get("uploads")
    .push(file)
    .last()
    .write();
