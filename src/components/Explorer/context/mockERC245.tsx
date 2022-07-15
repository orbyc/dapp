import {
  ERC245Collection,
  ERC423Collection,
  getMockAccount,
  getMockAsset,
  getMockCertificate,
  getMockMovement,
} from "./datasourceMock"

export const mockERC245: ERC245Collection = {
  assets: { 1: getMockAsset() },
  assetCertificates: { 1: [] },
  compositions: { 1: [] },
  parents: { 1: [] },
  traceabilities: { 1: [1, 2] },

  certificates: { 1: getMockCertificate(1), 2: getMockCertificate(2), 3: getMockCertificate(3) },

  movements: {
    1: getMockMovement(1),
    2: getMockMovement(2),
  },
  movementCertificates: {},
};

export const mockERC423: ERC423Collection = {
  accounts: {
    "0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F": getMockAccount(),
  },
  agents: {
    "0x024269e2057b904d1fa6a7b52056a8580a85180f": "0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F",
    "0x7B997BD00599a87334a4187e51A2320D740d14bb": "0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F",
  },
  roles: {
    0: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    1: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    2: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    4: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
    8: ["0xe375639d0Fa6feC13e6F00A09A3D3BAcf18A354F"],
  },
};
