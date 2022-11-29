import { Request, Response } from "express";
import { File } from "formidable";
import Formidable from "formidable-serverless";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function pdfUploader(
  Request,
  Response
) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form.on("file", (name, file) => {
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(`public/upload/${file.name}`, data);
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        reject(Response.status(500).send('Aborted'))  
      })
      .on("end", () => {
        resolve(Response.status(200).send('done'));
      });

    await form.parse(Request)
  });
}