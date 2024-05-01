var mongoose= require('../database/config');

var mongoose = require('mongoose')


var mongoose = require('mongoose')

const contactSchema =mongoose.Schema({

    name:{
      type:String,
      require:true
    },

    email:{
        type:String,
        require:true
      },

      number:{
        type:Number,
        require:true
      },

      message:{
        type:String,
        require:true
      }

    })
    const userModel = mongoose.model('contact',contactSchema)
    module.exports = userModel