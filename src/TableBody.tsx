import * as React from "react"
import ReactPDF from "@react-pdf/renderer"
import { TableRow, TableRowProps } from "./TableRow"
import { getDefaultBorderIncludes } from "./Utils"

export interface TableBodyProps extends TableRowProps {
  /**
   * The data associated with the table.
   */
  data?: any[]

  rowStyle?: ReactPDF.Style
}

/**
 * This component displays the data as {@see TableRow}s.
 */
export class TableBody extends React.PureComponent<TableBodyProps> {
  render() {
    const rowCells: any[] = React.Children.toArray(this.props.children)
    const includeBorders = getDefaultBorderIncludes(this.props)
    const dataRows = this.props.data ?? []
    const { rowStyle } = this.props ?? {}

    return dataRows.map((data, rowIndex) => (
      <TableRow
        {...this.props}
        key={rowIndex}
        data={data}
        {...includeBorders}
        includeTopBorder={false}
        style={rowStyle}
      >
        {rowCells}
      </TableRow>
    ))
  }
}
