import { updateCompetitions, updateTeams, getFixtureList, getFixtureListById } from "@/utils/get-data"
import FixtureCard from "@/components/FixtureCard";
import "../styles/index.css"

export default async function Index() {
  // let competitions = await updateCompetitions();
  // let teams = await updateTeams();
  let ids = await getFixtureList();
  let fixtureIdList = ids.map(({ fixture }) => {
    return fixture.id
  })
  let allFixtures: any[] = [];
  for (let i = 0; i < ids.length; i += 20) {
    let fixtureIdList = ids.map(({ fixture }) => {
      return fixture.id
    }).slice(i, i + 20).join("-")
    let fixtures = await getFixtureListById(fixtureIdList);
    allFixtures = [...allFixtures, ...fixtures]
  };

  // console.log(allFixtures);


  // console.log("competitions", competitions);
  // console.log("teams", teams);

  return (
    <div className="max-h-[90vh] flex flex-row gap-8 justify-center">
      <div className="flex flex-col justify-between gap-4 overflow-y-scroll">
        {allFixtures && allFixtures.slice(0, 4).map((fixture) => {
          return <FixtureCard key={fixture.id} fixture={fixture} />
        })}
      </div>
      <div className="text-black w-10% h-full flex flex-col justify-between">
        <p>
          Today
        </p>
        <p>
          Tomorrow
        </p>
      </div>
    </div>
  )
}
