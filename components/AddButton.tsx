'use client'

import React from "react";
import { CgAdd } from "react-icons/cg";
import { useHover } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";

export default function AddButton({ onClick, competitions, teams }: { onClick: (id: number) => void, competitions: number[], teams: number[] }) {
    const [ref, hovering] = useHover();
    const pathname = usePathname();
    const regex = /\/(\d+)\//;
    const match = pathname.match(regex);
    const id = Number(match?.[1]);

    const favoritedFlag = competitions.includes(Number(id)) || teams.includes(Number(id));
    const homeFlag = pathname === "/";

    const handleClick = () => {
        onClick(id);
    }
    return (
        <button ref={ref} title="Add" className={`transition ease-in-out text-center text-black text-lg bg-white border-solid ${hovering && "shadow-xl"} border-4 border-border rounded-full p-4 w-20 h-20 flex justify-center items-center hover:scale-110 duration-150 ${(homeFlag || favoritedFlag) && "hidden"}`} onClick={handleClick}><CgAdd /></button>
    )
}