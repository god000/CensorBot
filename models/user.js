const mongoose = require('mongoose');
const findOneOrCreate = require('mongoose-findoneorcreate');
const findAnyoneOrCreate = require('mongoose-findanyoneorcreate');

const UserSchema = new mongoose.Schema({
    userId: {type: Number},
    countReport: {type: Number, default: 0},
    dateRegistration : {type: Date, default: Date.now()}
});

UserSchema.plugin(findOneOrCreate);
UserSchema.plugin(findAnyoneOrCreate);

const User = mongoose.model('User', UserSchema);
exports.User = User;
