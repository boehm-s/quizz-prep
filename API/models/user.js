import mongoose from 'mongoose';

const Schema    = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const UserSchema = new Schema({
    profile: {
		firstName: {
			type: 		String,
			required: 	true
		},
		lastName: {
			type: 		String,
			required: 	true
		},
		username: {
			type: 		String,
			required: 	true
		},
		email: {
			type: 		String,
			required: 	true
		}
    },
    quizz: [{
		name: 			String,
		answerArray: 	Array
    }]
});

const userModel = mongoose.model('User', UserSchema);

export default userModel; 
