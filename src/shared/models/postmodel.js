import mongoose from 'mongoose';

function slugify(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-') //Replace spaces with -
		.replace(/[^\w\-}]+/g) // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

const Schema = mongoose.Schema;

const postSchema = new Schema({
		title: { type: String, required: true },
		slug: { type: String, unique: true },
		postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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

postSchema.pre('save', function(next) {
	this.slug = slugify(this.name);
	next()
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;


