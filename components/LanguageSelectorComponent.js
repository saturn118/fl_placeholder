import { useRouter } from "next/router";
import React from "react";

const LanguageSelectorComponent = () => {
  let iKey = 0;
  let router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [label, setLabel] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return <></>;

  // const languageNames = new Intl.DisplayNames(router.locales, {
  //   type: "language"
  // });

  // let localeElements = router.locales.map(localeEntry => {
  //   iKey += 1;
  //   return (
  //     <Link key={iKey} href={router.asPath} locale={localeEntry}>
  //       <MenuItem onClick={handleClose}>
  //         {FlagComponent(localeEntry, 20)} {languageNames.of(localeEntry)}
  //       </MenuItem>
  //     </Link>
  //   );
  // });

  // return (
  //   <div>
  //     <Button
  //       // style={{ color: "white", border: "10px", borderColor: "red" }}
  //       id="basic-button"
  //       variant="outlined"
  //       aria-controls={open ? "basic-menu" : undefined}
  //       aria-haspopup="true"
  //       aria-expanded={open ? "true" : undefined}
  //       onClick={handleClick}
  //     >
  //       {FlagComponent(router.locale, 20)}
  //     </Button>
  //     <Menu
  //       id="basic-menu"
  //       anchorEl={anchorEl}
  //       open={open}
  //       onClose={e => {
  //         setAnchorEl(null);
  //       }}
  //       MenuListProps={{
  //         "aria-labelledby": "basic-button"
  //       }}
  //     >
  //       {localeElements}
  //     </Menu>
  //   </div>
  // );
};

export default LanguageSelectorComponent;
