const mongoose = require('mongoose');
const User = require('./models/user').User;

async function updateUser(id) {
    let user = await User.findOneOrCreate({
        userId: id
    });
    user.userId = id;
    await user.save();
    return user;
}

const dbConnection = () => {
	return mongoose.connect(process.env.MONGO_KEY, {useNewUrlParser: true, useUnifiedTopology: true})
		.then((res) => {console.log('db CONNECTED')})
		.catch((err) => {console.log(err)}); 
	
}

const createUser = async (id) => {
	user = updateUser(id);
    return user;
}
const addReportUser = async (id) => {
	user = await updateUser(id);
	user.countReport += 1;
	await user.save();
	return user;
}
const getUser = async (id) => {
	user = await updateUser(id);
    return user;
}


module.exports = {
	dbConnection,
	createUser,
	addReportUser,
	getUser
}