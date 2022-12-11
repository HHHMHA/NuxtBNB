export default
import fetch from 'node-fetch';
import { getHeaders } from "../helpers";
import {unWrap, getErrorResponse} from "../../../utils/fetchUtils";

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig);
  return {
    async create(homeId, payload) {
      try {
        const response = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
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
  }
}

