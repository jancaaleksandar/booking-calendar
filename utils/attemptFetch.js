async function attemptFetch(config, fetch) {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.data,
      agent: config.httpsAgent,
    });
  
    return response;
  }

module.exports = attemptFetch;