import { Asset } from "orbyc-core/pb/domain_pb";
import { AssetMetadata, Image } from "orbyc-core/pb/metadata_pb";
import { encodeHex } from "orbyc-core/utils/encoding";

export function getTestAsset() {
    var TestAssetMetadataBackground = new Image()
    TestAssetMetadataBackground.setAttachment("https://picsum.photos/500/200/?blur")
    TestAssetMetadataBackground.setName("TestAssetMetadataBackground Name")

    var TestAssetMetadata = new AssetMetadata()
    TestAssetMetadata.setBackground(TestAssetMetadataBackground)
    TestAssetMetadata.setDescription("Test Asset Metadata Description")
    TestAssetMetadata.setHeader("Test Asset Metadata Header")
    TestAssetMetadata.setImagesList([])
    TestAssetMetadata.setLinksList([])
    TestAssetMetadata.setName("Asset Name")
    TestAssetMetadata.setPropertiesList([])

    var TestAsset = new Asset()
    TestAsset.setCertid(1000)
    TestAsset.setCo2e(1000)
    TestAsset.setId(1)
    TestAsset.setIssuer("0x024269E2057b904d1Fa6a7B52056A8580a85180F")
    TestAsset.setMetadata(encodeHex(TestAssetMetadata.serializeBinary()))
    TestAsset.setOwner("0xdE93B2D1D277e5cD874312F653Ccf0793c363081")

    return TestAsset
}
