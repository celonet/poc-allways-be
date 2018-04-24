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
      formatCreated: formatters.formatCreated
    },
    onSuccess: data => response.status(201).json(data),
    onError: onError(response)
  }),

  listCards: (request, response) => adapters.listCards({
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
    onSuccess: data => response.status(200).json(data),
    onError: onError(response)
  })
});
