const mongoose = require('mongoose'),
	{Schema} = mongoose;

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
		required: true
	},

},{timestamps:true});

userSchema.virtual('fullName')
	.get(function(){
		return `${this.name.first} ${this.name.last}`;
	});

module.exports = mongoose.model('User', userSchema);




