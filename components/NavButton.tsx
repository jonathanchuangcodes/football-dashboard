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
            <div className="text-center text-black text-lg bg-white border-solid border-4 border-main rounded-full p-4 w-full">
                {icon ?
                    <Image src={icon} alt={title} width={50} height={50} />
                    : title}
            </div>
        </Link>)
}

export default NavButton;