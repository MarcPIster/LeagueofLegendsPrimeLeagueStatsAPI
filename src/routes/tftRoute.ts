import * as express from 'express';
import {Response, Request} from 'express';
import {checkIfPlayerNameExists} from '../middleware/getDataMiddleWare';
import { getMatchDataTfTbyPuuid} from '../controller/getPlayerDataFromRiot';
import {checkIfUserExists} from '../middleware/tftRiotMiddleWare';
import {getTfTMatchByMatchId} from "../controller/getTftMatchData";
import {ITftMatch} from "../models/tftMatchInterface";
const router = express.Router();


router.get('/getTft/:name', async function (req: Request, res: Response) {
    if (!checkIfPlayerNameExists(req.params)) {
        return res.status(400).send('Coudnt find playername ' + req.params.name);
    }
    const user= await checkIfUserExists(req.params.name);
    if (!user) {
        return res.status(400).send('Coudnt find playername ' + req.params.name);
    }
    user.games = await getMatchDataTfTbyPuuid(user.puuId!);
    const answer: ITftMatch = await getTfTMatchByMatchId(user.games![0]) as ITftMatch;
    if (!answer) {
        return res.status(400).send('Coudnt find playerstats for: ' + req.params.name);
    }
    
    return res.send(answer);
});

router.get('/lastGames/:name/:howMany', async function (req: Request, res: Response) {
    if (!checkIfPlayerNameExists(req.params)) {
        return res.status(400).send('Coudnt find playername ' + req.params.name);
    }
    const user = await checkIfUserExists(req.params.name);
    if (!user) {
        return res.status(400).send('Coudnt find playername ' + req.params.name);
    }
    const howMany:number = +req.params.howMany;
    if (!howMany || howMany < 1) {
        return res.status(400).send('To less games to looking for ' + req.params.howMany);
    }
    user.games = await getMatchDataTfTbyPuuid(user.puuId!, howMany);
    const answer: ITftMatch[] = [];

    for (let i = 0; i < howMany; i++) {
        answer.push(await getTfTMatchByMatchId(user.games![i]) as ITftMatch);

    }
    console.log(user);
    return res.status(200).send(answer);
});

export default router;
