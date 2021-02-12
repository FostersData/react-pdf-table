import * as React from "react"
import { getDefaultBorderIncludes } from "./Utils"
import { TableRow, TableRowProps } from "./TableRow"

interface TableHeaderProps extends TableRowProps {}

/**
 * This component displays the titles for the rows.
 */
export class TableHeader extends React.PureComponent<TableHeaderProps> {
  render() {
    const borderIncludes = getDefaultBorderIncludes(this.props)
    const rowCells: any[] = React.Children.toArray(this.props.children)

    return (
      <TableRow {...this.props} {...borderIncludes} key={"header"}>
        {rowCells.map((rc, columnIndex) =>
          React.cloneElement(rc, {
            key: columnIndex,
            isHeader: true,
            fontSize: this.props.fontSize,
            textAlign: this.props.textAlign,
            includeLeftBorder: columnIndex === 0,
            includeRightBorder: columnIndex !== rowCells.length - 1
          })
        )}
      </TableRow>
    )
  }
}
