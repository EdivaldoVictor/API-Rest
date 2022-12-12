const { SchemaType, default: mongoose } = require("mongoose");

//Syntax
//property: {type: SchemaType(i.e.String, Date, Number);
                 //other options (i.e. default, required)}
const TeaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    description: String,
    keywords: String,
    origin: String,
    brew_time: Number,
    temperatura: Number,
    comments: [{ text: String, date: { type: String, default: new Date() } }]
});

const Tea = mongoose.model('Tea', TeaSchema); //convert to model named Tea
module.exports = Tea;
