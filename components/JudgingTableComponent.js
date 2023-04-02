import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeadingComponent from "./utility/HeadingComponent";
import Link from "next/link";

export default function JudgingTableComponent({
  inputData = null,
  title = ""
}) {
  let nameElements = [];
  let finalElements = [];
  if (inputData) {
    finalElements.push(<TableCell>Total</TableCell>);
    nameElements.push(<TableCell>Round</TableCell>);
    Object.keys(inputData).forEach(function(key) {
      let entry = inputData[key];
      nameElements.push(
        <TableCell className="customAccentText link">
          <Link href={"/person/" + key}>
            <a>{entry.surname}</a>
          </Link>
        </TableCell>
      );
      finalElements.push(<TableCell>{entry.final}</TableCell>);
    });
  }

  return (
    <TableContainer className="clickupShadow" component={Paper}>
      <HeadingComponent
        textColor="centerdat w-full pt-5 customAccentText"
        showBar={false}
        size={5}
      >
        {title}
      </HeadingComponent>
      <Table>
        {/* <TableHead className="font-bold w-full">
          <TableRow></TableRow>
        </TableHead> */}
        <TableHead>
          <TableRow>{nameElements}</TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {finalElements}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
