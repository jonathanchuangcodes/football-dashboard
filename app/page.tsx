import getData from "@/utils/getData"
import { updateCompetitions, updateTeams, updateFixtures } from "./actions"
export default async function Index() {
  let competitions = await updateCompetitions();
  // let teams = await updateTeams();
  // let fixtures = await updateFixtures();
  // console.log("fixtures", fixtures);
  console.log("competitions", competitions);
  // console.log("teams", teams);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1>Soccer Dashboard</h1>
        </main>
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
