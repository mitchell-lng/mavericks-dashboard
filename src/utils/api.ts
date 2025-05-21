import type { PlayerBio, ScoutRanking, PlayerMeasurements, GameLog, SeasonLog, FullPlayerData } from './types';

import Data from '../assets/intern_project_data.json'

function getMappedData() {
    return new Promise<FullPlayerData[]>((resolve) => {
        setTimeout(() => {
            let mappedData : FullPlayerData[] = [];

            const bio = Data.bio;
            const scoutRankings = Data.scoutRankings;
            const measurements = Data.measurements;
            const gameLogs = Data.game_logs;
            const seasonLogs = Data.seasonLogs;
            const scoutReports = Data.scoutingReports;

            bio.forEach((player: PlayerBio) => {
                const playerId = player.playerId;
                const playerScoutRanking = scoutRankings.find((ranking: ScoutRanking) => ranking.playerId === playerId);
                const playerMeasurements = measurements.find((measurement: PlayerMeasurements) => measurement.playerId === playerId);
                const playerGameLogs = gameLogs.filter((log: GameLog) => log.playerId === playerId);
                const playerSeasonLog = seasonLogs.find((log: SeasonLog) => log.playerId === playerId);
                const playerScoutReport = scoutReports
                    .filter((report: any) => report.playerId === playerId)
                    .map((report: any) => ({
                        playerId: report.playerId,
                        report: report.report,
                        date: report.date,
                        scoutName: report.scout,
                    }));

                mappedData.push({
                    playerId: playerId,
                    playerBio: player,
                    scoutRanking: playerScoutRanking,
                    measurements: playerMeasurements,
                    gameLogs: playerGameLogs,
                    seasonLog: playerSeasonLog,
                    scoutingReports: playerScoutReport,
                });
            });
            resolve(mappedData);
        }, 1000);
    });
}





export { getMappedData };