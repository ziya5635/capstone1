const mongoose = require('mongoose'),
	{Schema} = mongoose,
	passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	name: {
		first: {
			type: String,
			trim: true,
			required: true
		},

		last: {
			type: String,
			trim: true,
			required: true
		}
	},

	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},

	userName: {
		type: String,
		trim: true,
		required: true,
		uniqe: true
	}

},{timestamps:true});

userSchema.virtual('fullName')
	.get(function(){
		return `${this.name.first} ${this.name.last}`;
	});



userSchema.plugin(passportLocalMongoose, {
	usernameField: 'userName'
});


module.exports = mongoose.model('User', userSchema);




