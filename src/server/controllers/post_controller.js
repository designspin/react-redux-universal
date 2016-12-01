import PostModel from '../../shared/models/postmodel';

export function newPost(req, res, next) {
	console.log(req.user);
	console.log(req.body);
	next();
}