
'use client'

import React from "react";
import TeamStatistic from "@/interfaces/TeamStatistic";
import { Area, AreaChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const parseDataValue = (value: number | string | null) => {
    if (typeof value === 'string') {
        return parseInt(value.replace('%', ''), 10);
    } else if (value === null || (typeof value === 'number' && value === 0)) {
        return 50
    } else {
        return value
    }
}

export default function TeamStatistics({ statistics }: { statistics: TeamStatistic[] }) {
    let data: any = statistics.length > 0 ? statistics[0].statistics.map((statistic) => {
        return { name: statistic.type, home: statistic.value }
    }) : undefined;
    data = statistics.length > 0 ? statistics[1].statistics.map((statistic, index) => {
        let homeData = data && { ...data[index] };
        homeData.home = parseDataValue(homeData.home)
        return { ...homeData, away: parseDataValue(statistic.value) }
    }) : undefined

    console.log(data);


    const toPercent = (decimal: number, fixed: number = 0) => `${(decimal * 100).toFixed(fixed)}%`;

    const getPercent = (value: number, total: number) => {
        const ratio = total > 0 ? value / total : 0;

        return toPercent(ratio, 2);
    };

    const renderTooltipContent = (o: any) => {
        const { payload, label } = o;
        const total = payload.reduce((result: number, entry: { value: number }) => result + entry.value, 0);

        return (
            <div className="customized-tooltip-content">
                <p className="total">{`${label} (Total: ${total})`}</p>
                <ul className="list">
                    {payload.map((entry: { name: string, value: number, color: string }, index: number) => (
                        <li key={`item-${index}`} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <ResponsiveContainer height={1000}>
            <AreaChart width={3000} height={1000} data={data} margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }} stackOffset="expand" layout="vertical">
                <XAxis type="number" tickFormatter={toPercent} hide />
                <YAxis dataKey="name" type="category" mirror width={150} minTickGap={15} interval={0} tickLine={false} hide />
                <Tooltip content={renderTooltipContent} />
                <Area type="monotone" dataKey="home" stackId="1" stroke="#8884d8" fill="#8884d8">
                    <LabelList dataKey="home" position="center" />
                </Area>
                <Area type="monotone" dataKey="away" stackId="1" stroke="#82ca9d" fill="#82ca9d" >
                    <LabelList dataKey="away" position="center" />
                </Area>
            </AreaChart>
        </ResponsiveContainer>
    )
}