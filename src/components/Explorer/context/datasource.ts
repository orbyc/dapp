import { Asset, Certificate, Movement } from "orbyc-core/pb/domain_pb";
import { AccountMetadata } from "orbyc-core/pb/metadata_pb";

export interface DataSource {
    erc245: {
        getAsset: (id: number) => Promise<Asset>;
        getAssetComposition: (id: number) => Promise<[number[], number[]]>;
        getAssetCertificates: (id: number) => Promise<number[]>;
        getAssetTraceability: (id: number) => Promise<number[]>;
        getCertificate: (id: number) => Promise<Certificate>;
        getMovement: (id: number) => Promise<Movement>;
    },
    erc423: {
        getAccount: (address: string) => Promise<AccountMetadata>
    }
}

export interface ERC245Collection {
    assets: { [id: number]: Asset }
    assetCertificates: { [id: number]: number[] }
    certificates: { [id: number]: Certificate }
    movements: { [id: number]: Movement }
    parents: { [id: number]: number[] }
    compositions: { [id: number]: number[] }
    traceabilities: { [id: number]: number[] }

}
export interface ERC423Collection {
    accounts: { [address: string]: AccountMetadata }

}

/*
    MOCK DATA SOURCE
*/
export function mockDataSource(erc245: ERC245Collection, erc423: ERC423Collection, timeout: number = 1000): DataSource {
    return {
        erc245: {
            getAsset: (id) => new Promise(resolve => setTimeout(() => resolve(erc245.assets[id]), timeout)),
            getAssetCertificates: (id) => new Promise(resolve => setTimeout(() => resolve(erc245.assetCertificates[id]), timeout)),
            getAssetComposition: (id) => new Promise(resolve => setTimeout(() => resolve([erc245.parents[id], erc245.compositions[id]]), timeout)),
            getAssetTraceability: (id) => new Promise(resolve => setTimeout(() => resolve(erc245.traceabilities[id]), timeout)),
            getCertificate: (id) => new Promise(resolve => setTimeout(() => resolve(erc245.certificates[id]), timeout)),
            getMovement: (id) => new Promise(resolve => setTimeout(() => resolve(erc245.movements[id]), timeout)),
        },
        erc423: {
            getAccount: (address) => Promise.resolve(erc423.accounts[address])
        }
    }
}
