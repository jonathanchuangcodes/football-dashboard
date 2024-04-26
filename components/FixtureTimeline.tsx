'use client'

import React, { useEffect, useRef } from "react"
import FixtureList from "@/components/FixtureList"
import Fixture from "@/interfaces/Fixture"
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { CgArrowDown, CgArrowUp } from "react-icons/cg"
import { keys } from "lodash"

export default function FixtureTimeline({ fixtureList }: { fixtureList: Fixture[] }) {
    const today = new Date();
    const monthDateToday = today.getMonth() + today.getDate();

    const fixturesToday = fixtureList.filter((fixture) => {
        const fixtureDate = new Date(fixture.fixture?.date || fixture.fixture?.timestamp);
        const monthDateFixture = fixtureDate.getMonth() + fixtureDate.getDate();
        return monthDateToday === monthDateFixture;
    });

    const fixturesUpcoming = fixtureList.filter((fixture) => {
        return fixture.fixture?.timestamp * 1000 - Date.now() > 0;

    });

    const fixturesPast = fixtureList.filter((fixture) => {
        return fixture.fixture?.timestamp * 1000 - Date.now() < 0;
    });


    const parallax = useRef<IParallax>(null)
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const scroll = (to: number) => {
        if (parallax.current) {
            parallax.current.scrollTo(to)
        }
    }

    interface PageProps {
        currentPage: string,
        nextPage: string,
        offset: number,
        previousPage: string,
    }

    const legend: Record<string, Fixture[]> = {
        past: fixturesPast,
        today: fixturesToday,
        upcoming: fixturesUpcoming,
    };

    const Page = ({ currentPage, nextPage, offset, previousPage }: PageProps) => {

        const previousIndex = Object.keys(legend).indexOf(previousPage);
        const nextIndex = Object.keys(legend).indexOf(nextPage);

        return (
            <>
                <ParallaxLayer offset={offset} speed={0.2} factor={1} style={{ width: "90%", overflow: "scroll" }}>
                    <FixtureList fixtures={legend[currentPage]} />
                </ParallaxLayer>
                <ParallaxLayer offset={offset} speed={0.2} factor={1} style={{ width: "calc(10% - 16px)", top: 0, left: "calc(90% + 16px)" }}>
                    <div className={`text-black flex flex-col align-center justify-between h-full`}>
                        <div>
                            <button className={`border-border border-4 text-black rounded-md px-2 py-2 w-full ${previousIndex === -1 && "hidden"}`} type="button" onClick={() => scroll(previousIndex)}>
                                {capitalizeFirstLetter(previousPage)}
                                <CgArrowUp />
                            </button>
                        </div>
                        <div>
                            <h1 className="font-bold text-center text-lg w-full">{capitalizeFirstLetter(currentPage)}</h1>
                        </div>
                        <div>
                            <button className={`border-border border-4 text-black rounded-md px-2 py-2 w-full ${nextIndex === -1 && "hidden"}`} type="button" onClick={() => scroll(nextIndex)}>
                                {capitalizeFirstLetter(nextPage)}
                                <CgArrowDown />
                            </button>
                        </div>
                    </div>
                </ParallaxLayer>
            </>
        )
    }

    const config = {
        tension: 210,
        friction: 20
    }

    useEffect(() => {
        parallax.current?.scrollTo(1)
    }, [])
    const pages = Object.keys(legend).filter((key) => legend[key].length !== 0).length;
    const keys = Object.keys(legend).filter((key) => legend[key].length !== 0);
    return (
        <Parallax config={config} pages={pages} ref={parallax} className="!h-[calc(100vh-10rem)]" style={{ width: "90%" }}>
            {keys.map((key, index) => {
                return (
                    <Page key={index} offset={index} previousPage={keys[keys.indexOf(key) - 1] || "none"} currentPage={key} nextPage={keys[keys.indexOf(key) + 1] || "none"} />
                )
            })}
        </Parallax>
    )
}
