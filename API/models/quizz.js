import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question:       String,
    image:          String,
    propositions:   [String],
    answer: {
        type:       Number,
        required:   true
    }
});

const QuizzSchema = new Schema({
    name: {
	    type:       String,
	    required:   true
    },
    quizz:          [QuestionSchema],
    state:          String
});

const quizzModel = mongoose.model('Quizz', QuizzSchema);

export default quizzModel;
