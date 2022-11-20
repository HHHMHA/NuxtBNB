import fetch from 'node-fetch';
import {unWrap, getErrorResponse} from "../../utils/fetchUtils";
import {getHeaders, sendJSON} from "./helpers";

export default function() {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia;
  const headers = getHeaders(algoliaConfig);

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api/user', getUserRoute);
  });

  async function getUserRoute(req, res, next) {
    const identity = req.identity;
    const userData = await getUserById(identity);

    if (userData.status === 200) {
      sendJSON(userData.json, res);
      return;
    }

    createUser(identity);
    sendJSON(makeUserPayload(identity), res);
  }

  async function createUser(identity) {
    try {
      const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
        headers,
        method: 'PUT',
        body: JSON.stringify(makeUserPayload(identity))
      });

      return await unWrap(response);
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }


  async function getUserById(identity) {
    try {
      const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
        headers,
      });

      return await unWrap(response);
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }

  function makeUserPayload(identity) {
    return {
      name: identity.name,
      email: identity.email,
      image: identity.image,
      homeId: [],
      reviewCount: 0,
      description: '',
      joined: new Date().toISOString()
    }
  }
}
