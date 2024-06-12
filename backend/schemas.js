const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ContainerList = new Schema({
    pledgedTime: String,
    unpledgedTime: String,
    containerId: Number,
    owner: String,
    receiver: String,
    price: Number,
    containerStatus: Number,
  });

  const ContainerListModel = mongoose.model('Containerlist', ContainerList);

module.exports = {ContainerListModel}