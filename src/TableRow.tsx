import * as React from "react"
import { TableBorder, TableCell } from "./TableCell"
import { DataTableCell } from "./DataTableCell"
import ReactPDF, { View } from "@react-pdf/renderer"
import { getDefaultBorderIncludes } from "./Utils"
import { TableBodyProps } from "./TableBody"

export interface TableRowProps extends TableBorder {
  /**
   * The font size as a valid unit defined in react-pdf.
   */
  fontSize?: number | string

  /**
   * Whether to align the text. Defaults to left.
   */
  textAlign?: "left" | "center" | "right"

  /**
   * Any data associated, relevant if the parent is a {@see DataTableCell}.
   */
  data?: any

  /**
   * Extra styling to apply. These will override existing style with the same key.
   */
  style?: ReactPDF.Style
}

/**
 * This component describes how to display a row.
 */
export class TableRow extends React.PureComponent<Partial<TableBodyProps>> {
  render() {
    const rowCells: any[] = React.Children.toArray(this.props.children)
    const {
      includeLeftBorder,
      includeBottomBorder,
      includeRightBorder,
      includeTopBorder
    } = getDefaultBorderIncludes(this.props)

    let remainingWeighting = 1
    let numberOfWeightingsDefined = 0
    rowCells.forEach((i: TableCell | DataTableCell) => {
      if (i.props.weighting !== undefined) {
        remainingWeighting -= i.props.weighting
        numberOfWeightingsDefined++
      }
    })

    const style = this.props.style || {}

    const weightingsPerNotSpecified = Math.ceil(
      remainingWeighting / (rowCells.length - numberOfWeightingsDefined)
    )

    return (
      <View
        style={[
          {
            borderBottom: includeBottomBorder && "1pt solid black",
            borderRight: includeRightBorder && "1pt solid black",
            borderLeft: includeLeftBorder && "1pt solid black",
            borderTop: includeTopBorder && "1pt solid black",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            // @ts-ignore
            justifyContent: "stretch",
            // top border is there, but we move each row up 1pt so it overlaps with the previous row's bottom border and doesn't visually double up
            // necessary for when a row is the first on a new page
            // note that "-1pt" is broken per https://github.com/diegomura/react-pdf/issues/760
            marginTop: -1
          },
          style
        ]}
        wrap={false}
      >
        {rowCells.map((rc, columnIndex) =>
          React.cloneElement(rc, {
            weighting: rc.props.weighting ?? weightingsPerNotSpecified,
            data: this.props.data,
            key: columnIndex,
            fontSize: this.props.fontSize,
            textAlign: this.props.textAlign,
            includeLeftBorder: columnIndex === 0,
            includeRightBorder: columnIndex !== rowCells.length - 1,
            style: { ...rc.props.style, ...style }
          })
        )}
      </View>
    )
  }
}
