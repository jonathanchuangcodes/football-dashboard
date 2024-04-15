'use client'

import React from "react";
import Link from 'next/link'
import { useHover } from "@uidotdev/usehooks";
import { usePathname } from 'next/navigation'

export default function CompetitionLayout({
    params,
    children,
}: {
    children: React.ReactNode
    params: { id: string }
}) {
    const [matchListRef, matchHovering] = useHover();
    const [standingListRef, standingHovering] = useHover();
    const pathname = usePathname()
    return (
        <div className="flex flex-col flex-1">
            <section>
                <div className="flex justify-start gap-2 mb-4">
                    <Link ref={matchListRef} href={`/competitions/${params.id}/matches`} className={`transition ease-in-out text-center text-lg border-solid rounded-md border-4 ${pathname.includes("matches") ? "bg-[#EDF0F7]" : "bg-white"}  text-border p-4 w-32 h-16 flex justify-center ${matchHovering && "shadow-xl"} items-center hover:scale-110 duration-150`}>
                        Matches
                    </Link>
                    <Link ref={standingListRef} href={`/competitions/${params.id}/standings`} className={`transition ease-in-out text-center text-lg border-solid border-4 ${pathname.includes("standings") ? "bg-[#EDF0F7]" : "bg-white"} rounded-md text-border p-4 w-32 h-16 flex justify-center ${standingHovering && "shadow-xl"} items-center hover:scale-110 duration-150`}>
                        Standings
                    </Link>
                </div>
            </section>
            <section className="h-[calc(100vh-15rem)] flex flex-row gap-8 justify-center">
                {children}
            </section>
        </div>
    );
}