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

        getAssets: () => Promise<Asset[]>
        getCertificates: () => Promise<Certificate[]>
        getMovements: () => Promise<Movement[]>

        issueAsset: (asset: Asset) => Promise<boolean>
        issueCertificate: (certificate: Certificate) => Promise<boolean>
        issueMovement: (movement: Movement) => Promise<boolean>
        addCompositionToAsset: (assetId: number, parentId: number, percent: number) => Promise<boolean>
        addCertificateToAsset: (assetId: number, certId: number) => Promise<boolean>
        addMovementToAsset: (assetId: number, moveId: number) => Promise<boolean>
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
