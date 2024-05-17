'use client'
import React, {
    ReactNode,
    useEffect,
    useRef

} from "react";
import FixtureCard from "@/components/FixtureCard";
import Fixture from "@/interfaces/Fixture";
import { useScroll } from "@react-spring/web";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";

export default function FixtureList({ fixtures }: { fixtures: Fixture[] }) {
    let dayMap = new Map();
    fixtures.forEach((fixture) => {
        let date = new Date(fixture.fixture.date)
        let day = new Intl.DateTimeFormat('en-US').format(date);
        let dayFixtures: [] = dayMap.get(day) || [];
        dayMap.set(day, [...dayFixtures, fixture])
    })
    const pages = dayMap.size;
    console.log(dayMap);
    console.log(pages);
    let layers: ReactNode[] = [];
    let initialOffset = 0;
    dayMap.forEach((fixtures: Fixture[], day: string) => {
        let offset = initialOffset;
        console.log("offset:", offset);
        let factor = fixtures.length > 1 ? fixtures.length / 1.25 : fixtures.length;
        console.log("factor:", factor, day);

        layers.push(
            <>
                <ParallaxLayer key={offset} factor={factor} offset={offset} speed={factor} style={{ width: "calc(100vw - 14rem)" }}>
                    <div className="flex flex-1 flex-col align-middle gap-4">
                        {fixtures.map((fixture: Fixture) => {
                            return <FixtureCard key={fixture.fixture.id} fixture={fixture} />
                        })}
                    </div>
                </ParallaxLayer>
                <ParallaxLayer sticky={{ start: offset, end: offset + 1 }} factor={factor} offset={offset} speed={0.5} style={{ paddingRight: "2rem", left: "85%" }}>
                    <button onClick={() => parallaxRef.current?.scrollTo(offset - 1)} className="z-10 border-border border-2 rounded-md bg-white">
                        <p className="text-black text-right">
                            {day}
                        </p>
                    </button>
                </ParallaxLayer>
            </>
        );
        initialOffset = offset += 1;
    })

    const parallaxRef = useRef<IParallax>(null);
    const { scrollYProgress } = useScroll({
        container: parallaxRef.current?.container, default: {
            immediate: true,
        },
    });

    useEffect(() => {
        console.log(scrollYProgress);
    }, [scrollYProgress])

    return (
        fixtures.length ? <Parallax ref={parallaxRef} pages={pages} style={{ height: "calc(100vh - 12rem)", width: "calc(100vw - 7rem)" }}>
            {layers.map((layer) => {
                return layer
            })}
        </Parallax> : <p className="text-black flex-1 text-center h-8">No fixtures found</p>
    )
}