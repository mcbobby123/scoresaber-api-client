# ScoreSaber API Client
https://new.scoresaber.com/api/

### Compile TypeScript
``npx tsc``

### Full Player Info
```typescript
import * as api from "scoresaber-api-client";

api
    .getPlayer('76561198098563481')
    .then((player: api.Player) => {
        const playerInfo: api.PlayerInfo = player.playerInfo;
        const stats: api.ScoreStats = player.scoreStats;

        // do something
    })
    .catch(console.error);
```

### Top/Recent Scores
```typescript
import * as api from "scoresaber-api-client";

api
    .getScores('76561198152188481', api.ScoreOrder.TOP, 1)
    .then((scoreReply: api.ScoreReply) => {
        const scores: api.Score[] = scoreReply.scores;

        // do something
    })
    .catch(console.error);
```