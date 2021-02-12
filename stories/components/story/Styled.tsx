import * as React from "react"
import { StyleSheet } from "@react-pdf/renderer"
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader
} from "../../../src"
import { PdfContainer } from "../PdfContainer"
import { generateRandomData, HumanRow } from "../../data/Humans"

interface SimpleTableHeaderState {
  data: HumanRow[]
}

const styles = StyleSheet.create({
  tableHeading: { backgroundColor: "#DADADB", fontSize: "12pt" }
})

export class Styled extends React.Component<{}, SimpleTableHeaderState> {
  state = {
    data: generateRandomData(20)
  }

  render() {
    return (
      <PdfContainer>
        <Table data={this.state.data} globalStyles={{ borderColor: "#858488" }}>
          <TableHeader>
            <TableCell style={styles.tableHeading}>First Name</TableCell>
            <TableCell style={styles.tableHeading}>Last Name</TableCell>
            <TableCell style={styles.tableHeading}>DOB</TableCell>
            <TableCell style={styles.tableHeading}>Country</TableCell>
            <TableCell style={styles.tableHeading}>Phone Number</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell getContent={r => r.firstName} />
            <DataTableCell getContent={r => r.lastName} />
            <DataTableCell getContent={r => r.dob.toLocaleString()} />
            <DataTableCell getContent={r => r.country} />
            <DataTableCell getContent={r => r.phoneNumber} />
          </TableBody>
        </Table>
      </PdfContainer>
    )
  }
}
