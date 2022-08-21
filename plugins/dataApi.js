export default function(context, inject) {
  // TODO: move to .env
  const appId = 'ZQ9UF7RP1U';
  const apiKey = '2e3cdcce6886af847e405a224b28f275';
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
  })

  async function getHome(homeId) {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
        headers,
      });

      return await unWrap(response );
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }

  async function unWrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
