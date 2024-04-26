import Fixture from "@/interfaces/Fixture";

export const fixturesInProgress = (fixtures: Fixture[]) => {
    return fixtures
        .filter((match) => {
            if (match.fixture) {
                return fixtureInProgress(match.fixture.status.short);
            } else {
                return false;
            }
        })
        .sort((fixtureOne, fixtureTwo) => {
            return fixtureOne.fixture.timestamp - fixtureTwo.fixture.timestamp;
        });
};

export const fixtureInProgress = (fixtureStatus: string) => {
    return (
        fixtureStatus === "1H" ||
        fixtureStatus === "HT" ||
        fixtureStatus === "ET" ||
        fixtureStatus === "2H" ||
        fixtureStatus === "P" ||
        fixtureStatus === "BT" ||
        fixtureStatus === "LIVE"
    );
};

//Returns true if a fixture is finished.
export const fixtureFinished = (fixtureStatus: string) => {
    return (
        fixtureStatus === "FT" ||
        fixtureStatus === "AET" ||
        fixtureStatus === "PEN" ||
        fixtureStatus === "ABD" ||
        fixtureStatus === "INT" ||
        fixtureStatus === "SUSP" ||
        fixtureStatus === "AWD" ||
        fixtureStatus === "CANC"
    );
};

//Returns true if a fixture is ending.
export const fixtureEnding = (fixtureElapsed: number, fixtureStatus: string) => {
    return (
        (fixtureElapsed === 90 && fixtureStatus === "2H") ||
        (fixtureElapsed >= 120 && fixtureStatus === "ET") ||
        (fixtureElapsed === null && fixtureStatus === "P")
    );
};

export const fixtureOnBreak = (fixtureElapsed: number, fixtureStatus: string) => {
    return fixtureStatus === "HT" || fixtureStatus === "BT";
};
