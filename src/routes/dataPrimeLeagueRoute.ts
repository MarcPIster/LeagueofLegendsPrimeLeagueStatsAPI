import * as express from 'express';
import { Response, Request } from 'express';
import {getTeamData} from "../controller/getDataFromPrimeLeague";
import {checkIfUrlExists} from "../middleware/getDataMiddleWare";
import {fillPlayerData, getNormalMatchesByPuuid} from "../controller/getPlayerDataFromRiot";
import {ITeam} from "../models/teamInterface";
const router = express.Router();


router.post('/getTeam', async function (req: Request, res: Response) {
    if (!checkIfUrlExists(req.body)) {
        return res.status(400).send('Coudnt find url ' + req.body.url);
    }
    const answer = await getTeamData(req.body.url)
    const team: ITeam = await fillPlayerData(answer);
    for (let player of team.players) {
        player.games = await getNormalMatchesByPuuid(player.puuId!);
    }
    return res.send(team);
});
export default router;
