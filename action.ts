'use server'

import { getAllFixtureList, getFixtureById, getFixtureListById } from "@/utils/get-data"
import { fixturesInProgress } from "@/utils/fixtures"

export async function updateFixture(id: number) {
    const fixture = await getFixtureById(id)
    return fixture;
}

export async function startFixtureUpdates() {
    const allFixtureList = await getAllFixtureList();
    const liveFixtures = fixturesInProgress(allFixtureList);
    let startUpdateTimes = allFixtureList.map(({ fixture }) => {
        return fixture.timestamp * 1000 - Date.now();
    });

    startUpdateTimes = [...new Set(startUpdateTimes)];
    startUpdateTimes = startUpdateTimes.filter((time) => {
        return time > 0;
    });
    let timer;
    if (
        startUpdateTimes.length > 0 &&
        !(fixturesInProgress(allFixtureList).length > 0)
    ) {
        startUpdateTimes.forEach((time) => {
            timer = setTimeout(async () => {
                await getFixtureListById(liveFixtures.map(({ fixture }) => fixture.id).join("-"));
            }, time);
        });

        if (startUpdateTimes.length === 0) {
            clearTimeout(timer)
        }
    }

}