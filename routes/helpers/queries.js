module.exports = {
  lookupQuery: {
    from: "comments",
    localField: "comments",
    foreignField: "_id",
    as: "comments"
  },
  projectQuery: {
    _id: 1,
    type: 1,
    title: 1,
    category: 1,
    tags: 1,
    views: 1,
    name: 1,
    position: 1,
    description: 1,
    content: 1,
    url: 1,
    date: 1,
    image: 1,
    avatar: 1,
    thumbnail: 1,
    source: 1,
    author: 1,
    isMain: 1,
    createdAt: 1,
    updatedAt: 1,
    comments: {
      $filter: {
        input: "$comments",
        as: "comment",
        cond: {
          $eq: [ "$$comment.isApproved", true ]
        },
      },
    },
  },
}