const flagRoot = "https://flagcdn.com/";
import { Avatar, Tooltip } from "@mui/material";
export function FlagPath(countryCode) {
  let flagPath = null;

  if (!!countryCode) {
    let final = countryCode.toLowerCase();
    if (final == "sct") {
      final = "gb";
    } else if (final == "en") {
      final = "gb";
    } else if (final == "wa") {
      final = "gb";
    }

    flagPath = `${flagRoot}${final}.svg`;
  } else {
    flagPath = null;
  }

  return flagPath;
}

export default function FlagComponent(
  countryCode,
  width = 120,
  toolTip = null
) {
  let height = width * 0.6;

  let flag = (
    <Avatar
      className="customShadow"
      variant="rounded"
      sx={{ width: width, height: height }}
      src={FlagPath(countryCode)}
    />
  );

  if (toolTip) {
    return (
      <Tooltip title={countryCode} enterDelay={500} leaveDelay={200}>
        {flag}
      </Tooltip>
    );
  } else {
    return flag;
  }

  return (
    <Avatar
      className="customShadow"
      variant="rounded"
      sx={{ width: width, height: height }}
      src={FlagPath(countryCode)}
    />
  );
  // return <img className="" width={width} src={FlagPath(countryCode)}></img>;
}
