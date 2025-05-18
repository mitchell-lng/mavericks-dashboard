import type { PlayerBio, ScoutRanking, PlayerMeasurements, GameLog, SeasonLog, FullPlayerData } from './types';

import Data from '../assets/intern_project_data.json'

function getMappedData() {
    return new Promise<FullPlayerData[]>((resolve, reject) => {
        setTimeout(() => {
            let mappedData : FullPlayerData[] = [];

            const bio = Data.bio;
            const scoutRankings = Data.scoutRankings;
            const measurements = Data.measurements;
            const gameLogs = Data.game_logs;
            const seasonLogs = Data.seasonLogs;

            bio.forEach((player: PlayerBio) => {
                const playerId = player.playerId;
                const playerScoutRanking = scoutRankings.find((ranking: ScoutRanking) => ranking.playerId === playerId);
                const playerMeasurements = measurements.find((measurement: PlayerMeasurements) => measurement.playerId === playerId);
                const playerGameLogs = gameLogs.filter((log: GameLog) => log.playerId === playerId);
                const playerSeasonLog = seasonLogs.find((log: SeasonLog) => log.playerId === playerId);

                mappedData.push({
                    playerId: playerId,
                    playerBio: player,
                    scoutRanking: playerScoutRanking,
                    measurements: playerMeasurements,
                    gameLogs: playerGameLogs,
                    seasonLog: playerSeasonLog
                });
            });
            resolve(mappedData);
        }, 1000);
    });
}





export { getMappedData };