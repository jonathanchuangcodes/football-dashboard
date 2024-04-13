'use client'

import { IconContext } from "react-icons";
import { useHover } from "@uidotdev/usehooks";
import Image from "next/image"
import Link from "next/link"
import React from "react";
interface NavButtonProps {
    children?: React.ReactNode;
    hoverIcon?: React.ReactNode;
    icon?: React.ReactNode;
    src?: string;
    title: string;
    value: string;
}

export const NavButton: React.FC<NavButtonProps> = ({ icon, hoverIcon, src, title, value }) => {
    const [ref, hovering] = useHover();
    return (

        <Link ref={ref} href={value} title={title}>

            <div className={`transition ease-in-out text-center text-black text-lg bg-white border-solid ${hovering && "shadow-xl"} border-4 border-border rounded-full p-4 w-20 h-20 flex justify-center items-center hover:scale-110 duration-150`}>
                {icon ?
                    <IconContext.Provider value={{ color: "#092771", size: "2rem" }}>
                        {hovering && hoverIcon ? hoverIcon : icon}
                    </IconContext.Provider>

                    : src ? < Image src={src} alt={title} width={50} height={50} />
                        : <p>{title}</p>}
            </div>
        </Link>
    )

}

export default NavButton;