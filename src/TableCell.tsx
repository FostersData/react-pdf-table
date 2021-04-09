import * as React from "react"
import ReactPDF, { Text, View } from "@react-pdf/renderer"
import { getDefaultBorderIncludes } from "./Utils"

/**
 * Whether to include borders or not.
 * Depending on the context some toggles will not have any effect.
 */
export interface TableBorder {
  /**
   * Include the top border. Default true.
   */
  includeTopBorder?: boolean

  /**
   * Include the right border. Default true.
   */
  includeRightBorder?: boolean

  /**
   * Include the bottom border. Default true.
   */
  includeBottomBorder?: boolean

  /**
   * Include the left border. Default true.
   */
  includeLeftBorder?: boolean
}

export interface TableCellProps extends TableBorder {
  /**
   * The weighting of a cell based on the flex layout style.
   * This value is between 0..1, if not specified 1 is assumed, this will take up the remaining available space.
   */
  flex?: number

  width?: number

  /**
   * Extra styling to apply. These will override existing style with the same key.
   */
  style?: ReactPDF.Style | ReactPDF.Style[]

  /**
   * How to align the text
   */
  textAlign?: "left" | "center" | "right"

  /**
   * Whether this is a header cell or not. If not defined it will be false.
   */
  isHeader?: boolean

  /**
   * The font-size to apply to the cell.
   */
  fontSize?: number | string
}

/**
 * This component displays the associated content of it's children.
 */
export class TableCell extends React.PureComponent<TableCellProps> {
  render() {
    // center numbers, right-align currency, left-align normal text
    const content =
      this.props.children === undefined ? (
        <Text />
      ) : typeof this.props.children === "number" ? (
        <Text style={{ textAlign: "center" }}>
          {String(this.props.children)}
        </Text>
      ) : (
        <Text style={this.props.children[0] === "$" && { textAlign: "right" }}>
          {this.props.children}
        </Text>
      )

    const { includeRightBorder } = getDefaultBorderIncludes(this.props)
    const defaultStyle: ReactPDF.Style = {
      flex: this.props.width ? 0 : this.props.flex ?? 1,
      width: this.props.width,
      // @ts-ignore
      justifyContent: "stretch",
      textAlign: this.props.textAlign ?? "left",
      fontSize: this.props.fontSize ?? (this.props.isHeader === true ? 14 : 12),
      borderRight: includeRightBorder && "1pt solid black",
      wordWrap: "break-word",
      whiteSpace: "pre-wrap"
    }

    return (
      <View
        style={{
          ...defaultStyle,
          ...this.props.style
        }}
        wrap={true}
      >
        {content}
      </View>
    )
  }
}
