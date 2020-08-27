import { PagesReply, PagifiedPlayer, Player, Score, ScoreReply } from "./representations";
import { RestClient } from "typed-rest-client/RestClient";

const host = 'https://new.scoresaber.com/api/';
const restClient = new RestClient(null, host);

export const getPlayer = async (id: string) => {
    const response = await restClient.get<Player>(`player/${id}/full`);

    if (response.result === null) {
        throw new Error(`Failed to fetch player ${id} (status=${response.statusCode})`);
    }

    return response.result;
}

export const getPlayers = async (page: number) => {
    const response = await restClient.get<PagifiedPlayer[]>(`players/${page}`);

    if (response.result === null) throw new Error(`Failed to fetch pagified players with page=${page} (status=${response.statusCode})`);

    return response.result;
}

export const getScores = async (id: string, order: ScoreOrderInstance, page: number = 1) => {
    const response = await restClient.get<ScoreReply>(`player/${id}/scores/${order}/${page}`);

    if (response.result === null) throw new Error(`Failed to fetch scores for ${id} (status=${response.statusCode})`);

    return response.result;
}

export const getAllScores = async (id: string) => {
    let scores: Score[] = [];
    let page = 1;

    while (true) {
        try {
            const scoreReply = await getScores(id, ScoreOrder.RECENT, page++);
            if (!scoreReply.scores.length) break;
            scores.push(...scoreReply.scores);
        } catch (e) {
            console.error(e);
        }
    }

    return { scores } as ScoreReply;
}

export const getPlayerPages = async () => {
    const response = await restClient.get<PagesReply>(`players/pages`);

    if (response.result === null) throw new Error(`Failed fetch to pages (status=${response.statusCode})`);

    return response.result;
}

export const ScoreOrder = {
    TOP: "top",
    RECENT: "recent",
} as const;
export type ScoreOrderInstance = (typeof ScoreOrder)[keyof typeof ScoreOrder];
