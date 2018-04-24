'use strict';

module.exports = async ({
  logger,
  payload,
  repository,
  formatters,
  onSuccess,
  onError
}) => {
  logger.info('Payload received', payload);

  try {
    const { formatCard, formatCreated } = formatters;

    await repository.insert(formatCard(payload));

    return onSuccess(formatCreated(
      { message: 'Card created with success', statusCode: 201 }
    ));
  } catch (error) {
    logger.error('There is an error in the creation of cards', error);
    return onError(error);
  }
};
