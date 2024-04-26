

import "../styles/index.css"
import { getAllFixtureList } from "@/utils/get-data"
import FixtureTimeline from "@/components/FixtureTimeline"
import { getFixtureStatistics } from "@/utils/get-data"
import Fixture from "@/interfaces/Fixture"

export const preload = ({ fixture }: { fixture: Fixture }) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  if (fixture.fixture.status.short !== "NS") {

    void getFixtureStatistics(fixture.fixture.id)
  }
}
export default async function Index() {

  let allFixtureList = await getAllFixtureList();

  return (
    <FixtureTimeline fixtureList={allFixtureList} />
  )
}
