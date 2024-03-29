import fetch from 'node-fetch';
import { getHeaders } from "../../helpers";
import {unWrap, getErrorResponse} from "../../../utils/fetchUtils";

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig);
  return {
    async removeHome(identity, homeId) {
      const payload = (await this.getById(identity)).json;
      const homes = payload.homeId.filter(id => id !== homeId);
      payload.homeId = homes;
      this.create(identity, payload);
    },
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
    async bookHome(identityId, homeId, start, end) {
      try {
        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/bookings/`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            identityId,
            homeId,
            start,
            end,
          })
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
