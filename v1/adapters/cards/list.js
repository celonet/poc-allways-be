'use strict';

module.exports = async ({
  logger,
  repository,
  formatters,
  params,
  onSuccess,
  onError
}) => {
  logger.info('Get list of Cards', params);

  try {
    const { formatListCards } = formatters;
    const { query, limit, page } = params;

    const [cards, count] = await Promise.all([
      repository.findMany({ query, limit, page }),
      repository.count(query)
    ]);

    return onSuccess({ cards: formatListCards(cards), total: count });
  } catch (error) {
    logger.error('There is an error to get a list of cards', error);
    return onError(error);
  }
};
