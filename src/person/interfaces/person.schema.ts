import * as mongoose from 'mongoose'

export const PersonSchema = new mongoose.Schema({
     firstName: { type : String},
     lastName:  { type : String}
    }, {timestamps: true, collection: 'Persons'});