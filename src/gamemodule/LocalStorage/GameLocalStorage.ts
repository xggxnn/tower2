import LocalStorage from "./LocalStorage";

export default class GameLocalStorage extends LocalStorage {

    private static _Instance: GameLocalStorage;
    static get Instance(): GameLocalStorage {
        if (!GameLocalStorage._Instance) {
            GameLocalStorage._Instance = new GameLocalStorage();
        }
        return GameLocalStorage._Instance;
    }


}