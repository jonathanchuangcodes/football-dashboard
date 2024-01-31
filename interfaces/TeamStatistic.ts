export default interface TeamStatistic {
    team: {
        id: number;
        name: string;
        logo: string;
    };
    statistics: Statistic[];
}


interface Statistic {
    type: string;
    value: number;
}