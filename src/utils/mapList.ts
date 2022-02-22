import GameType from "../types/GameTypes";

const mapList = [
    { id: 1, name: 'Blizzard World', type: 'Hybrid', gameTypeId: GameType.Hybrid, },
    { id: 2, name: 'Busan', type: 'Control', gameTypeId: GameType.Control, subMap1: "Downtown", subMap2: "Sanctuary", subMap3: "MEKA Base" },
    { id: 3, name: 'Dorado', type: 'Escort', gameTypeId: GameType.Escort, },
    { id: 4, name: 'Eichenwalde', type: 'Hybrid', gameTypeId: GameType.Hybrid, },
    { id: 5, name: 'Hanamura', type: 'Assault', gameTypeId: GameType.Assault },
    { id: 6, name: 'Havana', type: 'Escort', gameTypeId: GameType.Escort },
    { id: 7, name: 'Hollywood', type: 'Hybrid', gameTypeId: GameType.Hybrid, },
    { id: 8, name: 'Ilios', type: 'Control', gameTypeId: GameType.Control, subMap1: "Lighthouse", subMap2: "Ruins", subMap3: "Well" },
    { id: 9, name: 'Junkertown', type: 'Escort', gameTypeId: GameType.Escort },
    { id: 10, name: "King's Row", type: 'Hybrid', gameTypeId: GameType.Hybrid, },
    { id: 11, name: 'Lijiang Tower', type: 'Control', gameTypeId: GameType.Control, subMap1: "Night Market", subMap2: "Garden", subMap3: "Control Center" },
    { id: 12, name: 'Nepal', type: 'Control', gameTypeId: GameType.Control, subMap1: "Village", subMap2: "Shrine", subMap3: "Sanctum" },
    { id: 13, name: 'Numbani', type: 'Hybrid', gameTypeId: GameType.Hybrid, },
    { id: 14, name: 'Oasis', type: 'Control', gameTypeId: GameType.Control, subMap1: "City Center", subMap2: "Gardens", subMap3: "University" },
    { id: 15, name: 'Rialto', type: 'Escort', gameTypeId: GameType.Escort },
    { id: 16, name: 'Route: 66', type: 'Escort', gameTypeId: GameType.Escort },
    { id: 17, name: 'Temple of Anubis', type: 'Assault', gameTypeId: GameType.Assault, },
    { id: 18, name: 'Volskaya Industries', type: 'Assault', gameTypeId: GameType.Assault, },
    { id: 19, name: 'Watchpoint: Gibraltar', type: 'Escort', gameTypeId: GameType.Escort }
];

export default mapList
