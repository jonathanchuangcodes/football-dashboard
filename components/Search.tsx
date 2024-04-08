"use client"

import { CgSearch } from "react-icons/cg";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import _ from "lodash";
import { get } from "@/api/football";
import { useNav } from "@/contexts/NavigationContext";
import Link from 'next/link';
import Image from "next/image";

export default function Search() {
    let { setTeams } = useNav();

    let [search, setSearch] = useState("");
    let [competitionResultList, setCompetitionResultList] = useState([]);
    let [teamResultList, setTeamResultList] = useState([]);
    let handleOnChange = async (value: string) => {
        setSearch(value);
        console.log(search.length, value);

        if (value.length < 3) return;
        let leaguesResponse = await get("/leagues",
            { search: value }
        )
        let leaguesData = await leaguesResponse.json();

        leaguesData = leaguesData.response?.map(({ league }: any) => {
            return {
                name: league.name,
                id: league.id,
                logo: league.logo,
            };
        });
        console.log(leaguesData);
        setCompetitionResultList(leaguesData);

        let teamsResponse = await get("/teams", { search: value })
        let teamsData = await teamsResponse.json();
        teamsData = teamsData.response?.map(({ team }: any) => {
            return {
                name: team.name,
                id: team.id,
                logo: team.logo,
            };
        });
        console.log(teamsData);
        setTeamResultList(teamsData);
    };
    return (
        <div className="flex flex-row justify-center align-middle text-black text-lg bg-white border-solid border-4 rounded-lg border-border">
            <Combobox>
                <div className="relative">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(value: any) => value.name}
                            onChange={(event) => handleOnChange(event.target.value)}
                        />
                        <Combobox.Button className="text-black absolute inset-y-0 right-0 flex items-center pr-2">
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
                        <Combobox.Options className="border-solid border-4 rounded-lg border-border z-10 absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {competitionResultList.length === 0 && search !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    No competitions found.
                                </div>
                            ) : (
                                competitionResultList.map((league: any) => (
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
                                                <Link href={`/competitions/${league.id}`}>
                                                    <div className="rounded border-solid border-2 border-slate-800 flex flex-col items-center justify-center p-2">
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {league.name}
                                                        </span>
                                                        <Image src={league.logo} alt={league.name} width={50} height={50} />
                                                    </div>
                                                </Link>
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                            {teamResultList.length === 0 && search !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    No teams found.
                                </div>
                            ) : (
                                teamResultList.map((team: any) => (
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
                                                <Link href={`/teams/${team.id}`}>
                                                    <div className="rounded border-solid border-2 border-slate-800 flex flex-col items-center justify-center p-2">
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {team.name}
                                                        </span>
                                                        <Image src={team.logo} alt={team.name} width={50} height={50} />
                                                    </div>
                                                </Link>
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