const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true,
        minlength: 3
    },
    Num: {
        type: Number,
        require: true,
        min: 1
    },
    Open: {
        type: Boolean,
        default: false
    },
});

const Store = mongoose.model('stores', StoreSchema);

module.exports = Store;