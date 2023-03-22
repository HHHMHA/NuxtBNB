import user from "@/modules/algolia/apis/user";

export default
import fetch from 'node-fetch';
import { getHeaders } from "../../helpers";
import {unWrap, getErrorResponse} from "../../../utils/fetchUtils";

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig);
  return {
    async create(homeId, payload) {
      try {
        const availability = [];
        payload.availabilityRanges.forEach(range => {
          const start = new Date(range.start).getTime() / 1000;
          const end = new Date(range.end) / 1000;
          for (let day = start; day <= end; day += 86400 ) {
            availability.push(day);
          }
        });

        delete payload.availabilityRanges
        payload.availability = availability

        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
          headers,
          method: 'PUT',
          body: JSON.stringify(payload)
        });

        return unWrap(response);
      }
      catch (error) {
        return getErrorResponse(error);
      }
    },
    async getByUserId(userId) {
      try {
        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `userId: ${userId}`,
            attributesToRetrieve: [
              "objectId",
              "title",
            ],
            attributesToHighlight: [],
          })
        });

        return unWrap(response);
      }
      catch (error) {
        return getErrorResponse(error);
      }
    },
    async delete(homeId) {
      try {
        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
          headers,
          method: 'DELETE',
        });

        return unWrap(response);
      }
      catch (error) {
        return getErrorResponse(error);
      }
    },
    async get(homeId) {
      try {
        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
          headers,
        });

        return unWrap(response);
      }
      catch (error) {
        return getErrorResponse(error);
      }
    },
  }
}

