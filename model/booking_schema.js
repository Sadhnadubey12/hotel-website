var mongoose= require('../database/config');

var mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({

  name:{
      type:String,
      require:true
    },

    price:{
        type:Number,
        require:true
      },

      description:{
        type:String,
        require:true
      },

      // checkoutdate:{
      //   type:String,
      //   require:true
      // },


      // numguests:{
      //   type:Number,
      //   require:true
      // },

      image:{
        type:String,
        require:true
      }

    })
    const userModel = mongoose.model('booking',bookingSchema)
    module.exports = userModel