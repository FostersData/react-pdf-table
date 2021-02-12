import * as React from "react"
import { TableHeader } from "./TableHeader"
import { TableBody } from "./TableBody"
import ReactPDF, { View } from "@react-pdf/renderer"

interface TableProps {
  data?: any[]
  globalStyles?: ReactPDF.Style
}

export class Table extends React.PureComponent<TableProps> {
  render() {
    let tableHeader: JSX.Element = null
    let tableBody: JSX.Element = null
    const styles = this.props.globalStyles ?? { borderColor: "black" }

    React.Children.forEach(this.props.children, (c: any) => {
      if (c.type === TableHeader) {
        tableHeader = React.cloneElement(c, {
          style: { ...styles, ...c.props.styles }
        })
      } else if (c.type === TableBody) {
        tableBody = React.cloneElement(c, {
          data: c.props.data ?? this.props.data ?? [],
          rowStyle: { ...styles, ...c.props.styles }
        })
      }
    })

    return (
      <View style={{ width: "100%" }}>
        {tableHeader}
        {tableBody}
      </View>
    )
  }
}
