import Response from '../util/apiResponse.js';
import { eliteDefuse } from '../util/eliteDefuse.js';
import { convertTeams } from '../util/convertTeams.js';

export default async (req, res) => {
  try {
    let eliteTeamList = await eliteDefuse();

    if (req.query.version == 2) {
      eliteTeamList = convertTeams(eliteTeamList);
    }

    res.json(eliteTeamList);
  } catch (err) {
    new Response(res, {
      type: 'serverError',
      err,
    });
  }
};
