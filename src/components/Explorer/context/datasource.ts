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
        getMovementCertificates: (id: number) => Promise<number[]>;
    },
    erc423: {
        accountOf: (address: string) => Promise<string>,
        accountInfo: (address: string) => Promise<AccountMetadata>
        hasRole: (address: string, role: number) => Promise<boolean>
    }
}
