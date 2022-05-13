import { ERC245Collection } from "components/Explorer/context/datasource";
// import assetImage from "assets/explorer/asset_image.jpeg";
// import assetBack from "assets/explorer/asset_back.jpeg";

import cotton1Image from "assets/explorer/Cotton1.jpg";
import cotton2Image from "assets/explorer/cotton2.jpeg";
import cottonBack from "assets/explorer/cotton-flowers-min.jpg";

import fabricBack from "assets/explorer/fabricbg.jpeg";
import fabric1Image from "assets/explorer/fabric1.jpg";
import fabric2Image from "assets/explorer/fabric2.jpeg";

export const blockchainMocks: ERC245Collection = {
  assets: {
    // cotton 500g
    1: {
      id: 1,
      cert: 1,
      co2: 1000,
      name: "Cotton (500g)",
      metadata: {
        backImage: cottonBack,
        fabricator: "Cotton Corp.",
        heading: "All about the cotton you are consuming",
        image: cotton1Image,
        properties: [],
      },
    },
    // cotton 1kg
    2: {
      id: 2,
      cert: 2,
      co2: 2000,
      name: "Cotton (1kg)",
      metadata: {
        backImage: cottonBack,
        fabricator: "Buttons Org.",
        heading: "All about the cotton you are consuming",
        image: cotton2Image,
        properties: [],
      },
    },
    3: {
      id: 3,
      cert: 3,
      co2: 3000,
      name: "Fabric (1kg)",
      metadata: {
        backImage: fabricBack,
        fabricator: "Fabric Create Corp.",
        heading: "All about the fabric you are using",
        image: fabric1Image,
        properties: [],
      },
    },
    4: {
      id: 4,
      cert: 4,
      co2: 1500,
      name: "Fabric (5kg)",
      metadata: {
        backImage: fabricBack,
        fabricator: "Fabric Create Corp.",
        heading: "All about the fabric you are using",
        image: fabric2Image,
        properties: [],
      },
    },
  },
  certificates: {
    1: {
      issuer: "",
      type: "organic cotton",
    },
    2: {
      issuer: "",
      type: "organic cotton",
    },
    3: {
      issuer: "",
      type: "organic fabric",
    },
    4: {
      issuer: "",
      type: "organic fabric",
    },
  },
  movements: {},
  parents: {
    1: [],
    2: [],
    3: [1, 2],
    4: [2],
  },
  compositions: {
    1: [],
    2: [],
    3: [100, 50],
    4: [50],
  },
  traceabilities: {
    1: [],
    2: [],
    3: [],
  },
};
