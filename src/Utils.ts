import { TableBorder } from "./TableCell"

/**
 * Return whether particular borders need to be included.
 * If the value is undefined then return true for that border.
 *
 * @param border the border item to parse.
 */
export function getDefaultBorderIncludes(border: TableBorder): TableBorder {
  return {
    includeBottomBorder:
      border.includeBottomBorder === undefined
        ? true
        : border.includeBottomBorder,
    includeTopBorder:
      border.includeTopBorder === undefined ? true : border.includeTopBorder,
    includeLeftBorder:
      border.includeLeftBorder === undefined ? true : border.includeLeftBorder,
    includeRightBorder:
      border.includeRightBorder === undefined ? true : border.includeRightBorder
  }
}
