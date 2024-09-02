import TeamStatistic from "./TeamStatistic";
export default interface Fixture {
    fixture: {

        id: number;
        referee: null | string;
        timezone: string;
        date: string;
        timestamp: number;
        periods: {
            first: null | number;
            second: null | number;
        };

        venue: {
            id: null | number;
            name: null | string;
            city: null | string;
        };

        status: {
            long: string;
            short: string;
            elapsed: number;
        };
    }
    league: {
        id: null | number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
        round: string;
    };

    teams: {
        home: {
            id: number;
            name: string;
            logo: string;
            winner: null | boolean;
        };
        away: {
            id: number;
            name: string;
            logo: string;
            winner: null | boolean;
        };
    };

    goals: {
        home: number;
        away: number;
    };

    score: {
        fulltime: {
            homeTeam: null | number;
            awayTeam: null | number;
        };
        halftime: {
            homeTeam: null | number;
            awayTeam: null | number;
        };
        extratime: {
            homeTeam: null | number;
            awayTeam: null | number;
        };
        penalty: {
            home: null | number;
            away: null | number;
        };
    };

    events: [
        {
            time: {
                elapsed: number;
                extra: null | number;
            };
            team: {
                id: number;
                name: string;
                logo: string;
            };
            player: {
                id: number;
                name: string;
                photo: string;
            };
            assist: {
                id: number;
                name: string;
                photo: string;
            };
            type: string;
            detail: string;
            comments: null | string;
        }
    ];
    lineups: [];
    statistics?: TeamStatistic[];
    players: [];

}

