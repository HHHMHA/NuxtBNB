import fetch from 'node-fetch';
import { getHeaders } from "../helpers";
import {unWrap, getErrorResponse} from "../../../utils/fetchUtils";

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig);
  return {
    async assignHome(identity, homeId) {
      const payload = (await this.getById(identity)).json;
      payload.homeId.push(homeId);
      this.create(identity, payload);
    },
    async create(identity, payload) {
      try {
        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
          headers,
          method: 'PUT',
          body: JSON.stringify(payload)
        });

        return await unWrap(response);
      }
      catch (error) {
        return getErrorResponse(error);
      }
    },
    async getById(identity) {
      try {
        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
          headers,
        });

        return await unWrap(response);
      }
      catch (error) {
        return getErrorResponse(error);
      }
    },
  }
}
