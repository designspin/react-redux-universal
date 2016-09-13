import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
		title: { type: String, unique: true, required: true },
		postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
		createdOn: { type: Date, default: Date.now },
		state: { type: String, default: 'published'},
		excerpt: { type: String },
		content: { type: String },
		comments: [{
			comment: String,
			postedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		}]
});

const PostModel = mongoose.model('Post', postSchema);

default export PostModel;


