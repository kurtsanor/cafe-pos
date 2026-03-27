import { Request } from "express";
import { CreateProductDto, UpdateProductDto } from "../products/product";
import multer from "multer";

export interface MulterRequest extends Request<{}, {}, CreateProductDto> {
  file?: Express.Multer.File;
}

export interface MulterRequestUpdate extends Request<
  { id: string },
  {},
  UpdateProductDto
> {
  file?: Express.Multer.File;
}
