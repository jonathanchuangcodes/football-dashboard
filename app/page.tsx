import { updateCompetitions, updateTeams, getFixtureList, getFixtureListById } from "@/utils/get-data"
import FixtureCard from "@/components/FixtureCard";

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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex-1 flex w-full flex-col gap-6">
        <div className="w-full flex flex-row gap-8 justify-center">
          <div className="w-full flex flex-col justify-between gap-4">
            {allFixtures && allFixtures.slice(0, 2).map((fixture) => {
              return <FixtureCard key={fixture.id} fixture={fixture} />
            })}
          </div>
          <div className="text-black w-10% h-100vh flex flex-col justify-between">
            <p>
              Today
            </p>
            <p>
              Tomorrow
            </p>
          </div>
        </div>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noopener noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )
}
