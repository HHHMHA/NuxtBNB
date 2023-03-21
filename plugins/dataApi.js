import {unWrap, getErrorResponse} from "@/utils/fetchUtils";

export default function({ $config }, inject) {
  // TODO: move to .env
  const headers = {
    'X-Algolia-API-Key': $config.algolia.key,
    'X-Algolia-Application-Id': $config.algolia.appId,
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
    getHomes,
  })

  async function getHome(homeId) {
    try {
      const response = await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
        headers,
      });

      return await unWrap(response);
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      const response = await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/reviews/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
          attributesToHighlight: [],
        })
      });

      return await unWrap(response);
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      const response = await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          attributesToHighlight: [],
        })
      });

      return await unWrap(response);
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lat, lng, start, end, radiusInMeters = 1500 * 15) {
    try {
      const days = [];
      for ( let day = start; day <= end; day += 86400 ) {
        days.push(`availability:${day}`);
      }

      const response = await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: radiusInMeters,
          hitsPerPage: 10,
          filters: days.join(' AND '),
          attributesToHighlight: [],
        })
      });

      return await unWrap(response);
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }

    async function getHomes() {
    try {
      const response = await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          hitsPerPage: 3,
          attributesToHighlight: [],
        })
      });

      return await unWrap(response);
    }
    catch (error) {
      return getErrorResponse(error);
    }
  }
}
