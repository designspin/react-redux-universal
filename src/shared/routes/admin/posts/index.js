module.exports = function(location, cb) {
	if(__BROWSER__) {
		require.ensure([], (require) => {
			cb(null, require('../../../components/admin/posts'));
		})
	} else {
		cb(null, require('../../../components/admin/posts'));
	}
}