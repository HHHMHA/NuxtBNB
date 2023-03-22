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

export function rejectHitBadRequest(res) {
  res.statusCode = 400
  res.end()
}

export function hasBadBody(req) {
  return !req.body || Object.keys(req.body).length === 0;
}
