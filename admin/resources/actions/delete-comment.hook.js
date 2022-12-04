const { News, Organization, Blog, Video, Portrait } = require("../../../models");

const before = async (request, context) => {
  const { record: { params } } = context

  if (params.news) {
    await News.findByIdAndUpdate(params.news,
      { $pull: { comments: params._id } }
    )
  } else if (params.video) {
    await Video.findByIdAndUpdate(params.video,
      { $pull: { comments: params._id } }
    )
  } else if (params.organization) {
    await Organization.findByIdAndUpdate(params.organization,
      { $pull: { comments: params._id } }
    )
  } else if (params.portrait) {
    await Portrait.findByIdAndUpdate(params.portrait,
      { $pull: { comments: params._id } }
    )
  } else if (params.blog) {
    await Blog.findByIdAndUpdate(params.blog,
      { $pull: { comments: params._id } }
    )
  }
  return request;
};

module.exports = { before };
