import React from "react";
import Link from "next/link"
import Image from "next/image"

interface NavButtonProps {
    icon?: string;
    title: string;
    value: string;
    children?: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({ icon, title, value }) => {
    return (
        <Link href={value} title={title}>
            <div className="text-center text-black text-lg bg-white border-solid border-4 border-border rounded-full p-4 w-20 h-20 flex justify-center items-center">
                {icon ?
                    <Image src={icon} alt={title} width={50} height={50} />
                    : <p>{title}</p>}
            </div>
        </Link>)
}

export default NavButton;