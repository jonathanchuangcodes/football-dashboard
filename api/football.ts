
export interface Parameter {
    id?: number;
    ids?: string;
    league?: number;
    season?: string;
    current?: boolean;
    live?: string;
    [key: string]: number | string | boolean | undefined;
}

export const get = async (url: string, params: any, revalidation?: number) => {
    let parameters: string = Object.keys(params).map((key: string) => (`${key}=${params[key]}`)).join("&");
    return football(`${url}?${parameters}`, "GET", revalidation);
}

export const football = (url: string, method?: string, revalidation?: number) => fetch(`https://v3.football.api-sports.io${url}`, {
    method,
    next: { revalidate: revalidation || 60 * 60 * 24},
    headers: {
        "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        "x-rapidapi-host": "v3.football.api-sports.io",
    }
})

export default football;