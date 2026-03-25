import { Request } from "express";
import { CreateProductDto } from "../products/product";
import multer from "multer";

export interface MulterRequest extends Request<{}, {}, CreateProductDto> {
  file?: Express.Multer.File;
}
