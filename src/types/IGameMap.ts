import GameType from "./GameTypes";

interface IGameMap {
    id: number
    name: string
    type: string
    gameTypeId: GameType
    subMap1?: string
    subMap2?: string
    submap3?: string
}

export default IGameMap