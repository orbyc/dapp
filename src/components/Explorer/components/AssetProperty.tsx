import React from "react";
import { FabIcon, LongButton } from "./Button";
import { Stack, Tooltip, Typography } from "@mui/material";
import * as icons from "@mui/icons-material";
import { IconNames } from "../context/models";
import { AssetMetadata } from "orbyc-core/pb/metadata_pb";

interface AssetElementProps {
  asset_id: number;
  property: AssetMetadata.Property;
}

export const AssetProperty: React.FC<AssetElementProps> = ({ property }) => {
  const Icon = icons[property.getIcon() as IconNames];

  return (
    <Tooltip title={property.getName()}>
      <LongButton>
        <Stack direction="column" spacing={1}>
          <FabIcon size="small" color="secondary" sx={{ boxShadow: "none" }}>
            <Icon />
          </FabIcon>
          <Typography variant="inherit">{property.getValue()}</Typography>
        </Stack>
      </LongButton>
    </Tooltip>
  );
};
