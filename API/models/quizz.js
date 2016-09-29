import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    question: {
	type: String
    },
    image: {
	type: String
    },
    propositions: [{
	type: String
    }],
    answer: {
	type: Number,
	required: true
    }
});

var QuizzSchema = new Schema({
    name: {
	type: String,
	required: true
    },
    quizz: [QuestionSchema],
    state: String
});

var quizzModel = mongoose.model('Quizz', QuizzSchema);

export default quizzModel;
