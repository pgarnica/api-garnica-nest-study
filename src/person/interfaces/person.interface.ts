import { Document } from "mongoose"; 

export interface Person extends Document {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;
}