const mongoose = require('mongoose');
const uploadShema = new mongoose.Schema({
    filename:{
        type:String
    },
    img:{
        data:String,
        
    }
});

const  Up = module.exports = mongoose.model('Up',uploadShema);
module.exports = Up

module.exports.addFile = function(newFile,callback){
    newFile.save(callback);
}