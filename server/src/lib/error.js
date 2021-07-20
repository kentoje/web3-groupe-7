const enhancedPromiseHandler = async (promise) => {
  try {
    const resolve = await promise;

    return [null, resolve];
  } catch (err) {
    return [err, null];
  }
};

module.exports = {
  enhancedPromiseHandler,
};
