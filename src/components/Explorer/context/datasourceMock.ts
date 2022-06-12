import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { Asset, Certificate, Movement } from "orbyc-core/pb/domain_pb";
import { AssetMetadata, Image, Link, Location, MovementMetadata } from "orbyc-core/pb/metadata_pb";
import { encodeHex } from "orbyc-core/utils/encoding";
import { DataSource, ERC245Collection, ERC423Collection } from "./datasource";
import _ from "lodash"

/*
    MOCK DATA SOURCE
*/
export function mockDataSource(erc245: ERC245Collection, erc423: ERC423Collection, timeout: number = 1000): DataSource {
    return {
        erc245: {
            /* getters */
            getAsset: (id) => {
                return new Promise(resolve => setTimeout(() => resolve(erc245.assets[id]), timeout))
            },
            getAssetCertificates: (id) => {
                return new Promise(resolve => setTimeout(() => resolve(erc245.assetCertificates[id]), timeout))
            },
            getAssetComposition: (id) => {
                return new Promise(resolve => setTimeout(() => resolve([erc245.parents[id], erc245.compositions[id]]), timeout))
            },
            getAssetTraceability: (id) => {
                return new Promise(resolve => setTimeout(() => resolve(erc245.traceabilities[id]), timeout))
            },
            getCertificate: (id) => {
                return new Promise(resolve => setTimeout(() => resolve(erc245.certificates[id]), timeout))
            },
            getMovement: (id) => {
                return new Promise(resolve => setTimeout(() => resolve(erc245.movements[id]), timeout))
            },

            /* lists */
            getAssets: () => {
                var result = _.values(erc245.assets)
                return new Promise(resolve => setTimeout(() => resolve(result), timeout))
            },
            getCertificates: () => {
                var result = _.values(erc245.certificates)
                return new Promise(resolve => setTimeout(() => resolve(result), timeout))
            },
            getMovements: () => {
                var result = _.values(erc245.movements)
                return new Promise(resolve => setTimeout(() => resolve(result), timeout))
            },

            /* setters */
            issueAsset: (asset: Asset) => {
                erc245.assets[asset.getId()] = asset
                return new Promise(resolve => setTimeout(() => resolve(true), timeout))
            },
            issueCertificate: (certificate: Certificate) => {
                erc245.certificates[certificate.getId()] = certificate
                return new Promise(resolve => setTimeout(() => resolve(true), timeout))
            },
            issueMovement: (movement: Movement) => {
                erc245.movements[movement.getId()] = movement
                return new Promise(resolve => setTimeout(() => resolve(true), timeout))
            },
            addCompositionToAsset: (assetId: number, parentId: number, percent: number) => {
                erc245.compositions[assetId].push(percent)
                erc245.parents[assetId].push(parentId)
                return new Promise(resolve => setTimeout(() => resolve(true), timeout))
            },
            addCertificateToAsset: (assetId: number, certId: number) => {
                erc245.assetCertificates[assetId].push(certId)
                return new Promise(resolve => setTimeout(() => resolve(true), timeout))
            },
            addMovementToAsset: (assetId: number, moveId: number) => {
                erc245.traceabilities[assetId].push(moveId)
                return new Promise(resolve => setTimeout(() => resolve(true), timeout))
            },
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
    var assetMetadata = new AssetMetadata()
    assetMetadata.setCreation(getMockLocation("HAVANA", "CU", "Fri Jul 02 2021", "22.7527022", "-81.8880248"))
    assetMetadata.setBackground(getMockImage("TestAssetMetadataBackground Name", "https://picsum.photos/500/200/?blur"))
    assetMetadata.setDescription("Test Asset Metadata Description")
    assetMetadata.setHeader("Test Asset Metadata Header")

    assetMetadata.setImagesList([
        getMockImage("Image1", "https://picsum.photos/500/500"),
        getMockImage("Image2", "https://picsum.photos/500/500"),
        getMockImage("Image3", "https://picsum.photos/500/500"),
        getMockImage("Image4", "https://picsum.photos/500/500"),
    ])

    assetMetadata.setLinksList([
        getMockLink("", "Link1", ""),
        getMockLink("", "Link2", ""),
        getMockLink("", "Link3", ""),
        getMockLink("", "Link4", ""),
    ])
    assetMetadata.setName("Asset Name")
    assetMetadata.setPropertiesList([])

    var asset = new Asset()
    asset.setCertid(1000)
    asset.setCo2e(2500)
    asset.setId(1)
    asset.setIssuer("0x024269E2057b904d1Fa6a7B52056A8580a85180F")
    asset.setOwner("0xdE93B2D1D277e5cD874312F653Ccf0793c363081")
    asset.setMetadata(encodeHex(assetMetadata.serializeBinary()))

    return asset
}

export function getMockMovement(id: number, city: string, country: string, distance: number, start: string, duration: number, co2e: number, lat: string, lng: string) {
    var movementMetadata = new MovementMetadata()
    movementMetadata.setDistance(distance)
    movementMetadata.setType(0)
    movementMetadata.setDuration(getMockDuration(duration))
    movementMetadata.setLocation(getMockLocation(city, country, start, lat, lng))

    var movement = new Movement()
    movement.setCertid(1)
    movement.setCo2e(co2e)
    movement.setId(id)
    movement.setIssuer("0x024269E2057b904d1Fa6a7B52056A8580a85180F")
    movement.setMetadata(encodeHex(movementMetadata.serializeBinary()))

    return movement
}

function getMockImage(name: string, url: string): Image {
    var image = new Image()
    image.setAttachment(url)
    image.setName(name)
    return image
}

function getMockLink(icon: string, name: string, url: string): Link {
    var link = new Link()
    link.setIcon(icon)
    link.setName(name)
    link.setUrl(url)
    return link
}

function getMockDuration(duration: number): Timestamp {
    return new Timestamp()
        .setSeconds(duration)
}

function getMockTimestamp(date: string): Timestamp {
    return new Timestamp()
        .setSeconds(Date.parse(date))
}

function getMockLocation(city: string, country: string, start: string, lat: string, lng: string): Location {
    var location = new Location()
    location.setCountryIso2(country)
    location.setDate(getMockTimestamp(start))
    location.setLat(lat)
    location.setLng(lng)
    location.setLocation(city)
    return location
}
