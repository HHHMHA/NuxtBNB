import { rejectHitBadRequest, hasBadBody, sendJSON } from "../../helpers";
import {v4 as uuidv4} from 'uuid'
import { unWrap } from "@/utils/fetchUtils";

export default (apis) => {
  return async (req, res) => {
    if (req.method === "DELETE") {
      const homeId = req.url.replace(/\//g, '');
      return await deleteHome(req.identity, homeId, res);
    }
    if (req.method === 'GET' && req.url === '/user/') {
      return await getHomesByUser(req.identity.id, res);
    }
    if (req.method === 'POST') {
      if (hasBadBody()) {
        return rejectHitBadRequest(res);
      }
      await createHome(req.identity, req.body, res);
      return;
    }
    rejectHitBadRequest(res);
  }

  async function createHome(identity, body, res) {
    const homeId = uuidv4();
    const payload = {
      ...body,
      reviewCount: 0,
      reviewValue: 0,
      userId: identity.id,
    }
    const response = await apis.home.create(homeId, payload);
    if (!res.ok) {
      res.statusCode = 500;
      res.end();
      return;
    }
    await apis.user.assignHome(identity, homeId);
    sendJSON({ homeId }, res);
  }

  async function deleteHome(identity, homeId, res) {
    await Promise.all([
      apis.homes.delete(homeId),
      apis.user.removeHome(identity, homeId),
    ])
    sendJSON({}, res);
  }

  async function getHomesByUser(userId, res) {
    const payload = (await apis.homes.getByUserId(userId)).json.hits;
    sendJSON(payload, res);
  }
}
