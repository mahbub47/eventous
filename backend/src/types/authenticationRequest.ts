/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
}