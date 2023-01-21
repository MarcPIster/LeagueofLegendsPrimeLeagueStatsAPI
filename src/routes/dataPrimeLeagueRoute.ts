import * as express from 'express';
import { Response, Request } from 'express';
import {getTeamData} from "../controller/getDataFromPrimeLeague";
import {checkIfUrlExists} from "../middleware/getDataMiddleWare";
const router = express.Router();


router.post('/getTeam', async function (req: Request, res: Response) {
    if (!checkIfUrlExists(req.body)) {
        return res.status(400).send('Coudnt find url ' + req.body.url);
    }
    const answer = await getTeamData(req.body.url)
    return res.send(answer);
});
export default router;
