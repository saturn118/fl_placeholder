import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import React from "react";

class DropDownHoverMenuComponent extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  handleHover = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          aria-owns={this.state.open ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={() => {
            useRouter().push("/library");
          }}
          onMouseOver={this.handleHover}
        >
          Grapple Library
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          MenuListProps={{ onMouseLeave: this.handleRequestClose }}
        >
          <MenuItem onClick={this.handleRequestClose}>Directory</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>My Lists</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            Recently Changes
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default DropDownHoverMenuComponent;
