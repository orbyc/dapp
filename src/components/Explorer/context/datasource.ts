
import { Asset, Certificate, Movement } from "./models";

export interface DataSource {
    erc245: {
        getAsset: (id: number) => [Asset, boolean, Error | null];
        getAssetComposition: (id: number) => [[number[], number[]], boolean, Error | null];
        getAssetTraceability: (id: number) => [number[], boolean, Error | null];
        getCertificate: (id: number) => [Certificate, boolean, Error | null];
        getMovement: (id: number) => [Movement, boolean, Error | null];
    }
}

export interface ERC245Collection {
    assets: { [id: number]: Asset }
    certificates: { [id: number]: Certificate }
    movements: { [id: number]: Movement }
    parents: { [id: number]: number[] }
    compositions: { [id: number]: number[] }
    traceabilities: { [id: number]: number[] }

}

export function mockDataSource(erc245: ERC245Collection): DataSource {
    return {
        erc245: {
            getAsset: (id) => [erc245.assets[id], false, null],
            getAssetComposition: (id) => [[erc245.parents[id], erc245.compositions[id]], false, null],
            getAssetTraceability: (id) => [erc245.traceabilities[id], false, null],
            getCertificate: (id) => [erc245.certificates[id], false, null],
            getMovement: (id) => [erc245.movements[id], false, null]
        }
    }
}
