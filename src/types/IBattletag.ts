import IPlatform from "./IPlatform";

interface IBattletag {
    name: string
    urlName: string
    id: number
    level: number,
    playerLevel: number,
    isPublic: boolean,
    platform: IPlatform
    portrait: string
}

export default IBattletag;
