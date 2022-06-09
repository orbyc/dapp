import { Asset, Movement } from "orbyc-core/pb/domain_pb";
import { AssetMetadata, Image, MovementMetadata } from "orbyc-core/pb/metadata_pb";
import { encodeHex } from "orbyc-core/utils/encoding";
import { DataSource, ERC245Collection, ERC423Collection } from "./datasource";

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

/*
    MOCK DATA GENERATORS
*/
export function getMockAsset() {
    var assetMetadataBackground = new Image()
    assetMetadataBackground.setAttachment("https://picsum.photos/500/200/?blur")
    assetMetadataBackground.setName("TestAssetMetadataBackground Name")

    var assetMetadata = new AssetMetadata()
    assetMetadata.setBackground(assetMetadataBackground)
    assetMetadata.setDescription("Test Asset Metadata Description")
    assetMetadata.setHeader("Test Asset Metadata Header")
    assetMetadata.setImagesList([])
    assetMetadata.setLinksList([])
    assetMetadata.setName("Asset Name")
    assetMetadata.setPropertiesList([])

    var asset = new Asset()
    asset.setCertid(1000)
    asset.setCo2e(2500)
    asset.setId(1)
    asset.setIssuer("0x024269E2057b904d1Fa6a7B52056A8580a85180F")
    asset.setMetadata(encodeHex(assetMetadata.serializeBinary()))
    asset.setOwner("0xdE93B2D1D277e5cD874312F653Ccf0793c363081")

    return asset
}

export function getMockMovement(id = 1, country = "CU", city = "HAVANA", distance = 1000, start = "10.05.2022", end = "24.05.2022", co2e = 1000, lat = "22.7527022", lng = "-81.8880248") {
    var movementMetadata = new MovementMetadata()
    movementMetadata.setCity(city)
    movementMetadata.setCountryIso2(country)
    movementMetadata.setDistance(distance)
    movementMetadata.setEndDate(end)
    movementMetadata.setStartDate(start)
    movementMetadata.setType(0)

    var movement = new Movement()
    movement.setCertid(1)
    movement.setCo2e(co2e)
    movement.setId(id)
    movement.setIssuer("0x024269E2057b904d1Fa6a7B52056A8580a85180F")
    movement.setLat(lat)
    movement.setLng(lng)
    movement.setMetadata(encodeHex(movementMetadata.serializeBinary()))

    return movement
}
