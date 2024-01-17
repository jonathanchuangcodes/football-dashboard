"use client"

import football from "@/api/football";
import { CgSearch } from "react-icons/cg";
import { Fragment, useState } from "react";
import { Combobox, Transition } from '@headlessui/react'
export default function Search() {
    let [search, setSearch] = useState("");
    let [leagues, setLeagues] = useState([]);
    let [teams, setTeams] = useState([]);
    let handleOnChange = (value: any) => {
        setSearch(value);
        let leagueData;
        let teamData;
        if (search.length < 3) return;
        football.get("/leagues", {
            params: { search },
        }).then((data) => {
            leagueData = data.data.response?.map(({ league }: any) => {
                return {
                    name: league.name,
                    id: league.id,
                    logo: league.logo,
                };
            });
            console.log(leagueData);
            setLeagues(leagueData);
        });
        football.get("/teams", {
            params: { search },
        }).then((data) => {
            teamData = data.data.response?.map(({ team }: any) => {
                return {
                    name: team.name,
                    id: team.id,
                    logo: team.logo,
                };
            });
            console.log(teamData);
            setTeams(teamData);
        });
    };
    return (
        <div className="flex flex-row justify-center align-middle">
            {/* <label className="flex flex-col justify-center text-md mr-4">
                <CgSearch />
            </label>
            <input placeholder="Team or Competition" className="rounded-md px-4 py-2 bg-inherit border" name="search" onChange={handleOnChange}>
            </input> */}
            <Combobox value={search} onChange={handleOnChange}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(person: any) => person.name}
                            onChange={(event) => handleOnChange(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            X
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setSearch('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {leagues.length === 0 && search !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                leagues.map((league: any) => (
                                    <Combobox.Option
                                        key={league.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={league}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {league.name}
                                                </span>
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                            {teams.length === 0 && search !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    No teams found.
                                </div>
                            ) : (
                                teams.map((team: any) => (
                                    <Combobox.Option
                                        key={team.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={team}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {team.name}
                                                </span>
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}