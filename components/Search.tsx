"use client"

import _ from "lodash";
import { CgSearch } from "react-icons/cg";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { get } from "@/api/football";
import { IconContext } from "react-icons";
import Image from "next/image";
import Link from 'next/link';

export default function Search() {

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
        <div className="w-80 flex flex-row justify-center align-middle text-black text-lg bg-white border-solid border-4 rounded-lg border-border">
            <IconContext.Provider value={{ color: "#092771", size: "2rem" }}>

                <div className="m-auto">
                    <CgSearch />
                </div>
            </IconContext.Provider>
            <Combobox>
                <div className="w-80 relative flex-1 flex flex-row justify-center cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm">
                    <Combobox.Input
                        className="w-80 h-10 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus-visible:none focus:outline-none focus:ring-0 focus:border-0"
                        displayValue={(value: any) => value.name}
                        onChange={(event) => handleOnChange(event.target.value)}
                    />
                    <Combobox.Button className="text-black absolute inset-y-0 right-0 flex flex-end items-center pr-2">
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
                    <Combobox.Options className="absolute flex flex-row gap-2 justify-center flex-wrap top-16 w-80 border-solid border-4 rounded-lg border-border z-10 mt-1 max-h-[80vh] overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {competitionResultList.length === 0 && search !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                No competitions found.
                            </div>
                        ) : (
                            <>
                                <h2 className="text-lg w-full">Competitions</h2>
                                {competitionResultList.map((league: any) => (
                                    <Combobox.Option
                                        key={league.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            } w-32 h-32`
                                        }
                                        value={league}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <Link href={`/competitions/${league.id}/matches`}>
                                                    <div className="w-32 h-32 rounded border-solid border-2 border-slate-800 flex flex-col items-center justify-center p-2">
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                } w-32 text-center`}
                                                        >
                                                            {league.name}
                                                        </span>
                                                        <Image src={league.logo} alt={league.name} width={48} height={48} />
                                                    </div>
                                                </Link>
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </>
                        )}
                        {teamResultList.length === 0 && search !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                No teams found.
                            </div>
                        ) : (
                            <>
                                <h2 className="text-lg w-full">Teams</h2>
                                {teamResultList.map((team: any) => (
                                    <Combobox.Option
                                        key={team.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            } w-32 h-32 flex justify-center items-center`
                                        }
                                        value={team}
                                    >
                                        {({ selected, active }) => (
                                            <Link href={`/teams/${team.id}/matches`}>
                                                <div className="w-32 h-32 rounded border-solid border-2 border-slate-800 flex flex-col items-center justify-center p-2">
                                                    <span
                                                        className={`w-32 text-center block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {team.name}
                                                    </span>
                                                    <Image src={team.logo} alt={team.name} width={48} height={48} />
                                                </div>
                                            </Link>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </>
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
        </div>
    );
}