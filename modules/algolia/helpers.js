export function getHeaders(config) {
  return {
    'X-Algolia-API-Key': config.key,
    'X-Algolia-Application-Id': config.appId,
  }
}

export function sendJSON(data, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}

