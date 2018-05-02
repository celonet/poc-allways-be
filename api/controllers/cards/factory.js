'use strict';

const getQueryToFilter = (obj) => {
  const { limit, page, sort, ...query } = obj;
  return query;
};

module.exports = ({
  adapters,
  repository,
  formatters,
  logger,
  onError
}) => ({
  createCard: (request, response) => adapters.createCard({
    logger,
    payload: request.body,
    repository: {
      insert: repository.insert
    },
    formatters: {
      formatCard: formatters.formatCard,
    },
    onSuccess: (data = {}) => response.status(201).json({ data, error: null }),
    onError: onError(response)
  }),

  listCards: (request, response, next) => adapters.listCards({
    logger,
    repository: {
      findMany: repository.findMany,
      count: repository.count
    },
    formatters: {
      formatListCards: formatters.formatListCards
    },
    params: {
      limit: parseInt(request.query.limit, 10),
      page: request.query.page,
      query: getQueryToFilter(request.query)
    },
    onSuccess: (data) => {
      response.data = data;
      response.statusCode = 200;
      return next();
    },
    onError: onError(response)
  })
});
