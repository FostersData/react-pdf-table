import React from "react"

import { storiesOf } from "@storybook/react"

import { Welcome } from "@storybook/react/demo"
import { withKnobs } from "@storybook/addon-knobs"
import Introduction from "./components/Introduction"
import { SimpleTable } from "./components/story/SimpleTable"
import { Styled } from "./components/story/Styled"
import { Widths } from "./components/story/Widths"
import { NestedTables } from "./components/story/NestedTables"
import { IsolatedRows } from "./components/story/IsolatedRows"

storiesOf("Welcome", module).add("to react-pdf-table", () => <Introduction />)

const tableStories = storiesOf("Table", module)
tableStories.addDecorator(withKnobs)

tableStories.add("Simple", () => <SimpleTable />)
tableStories.add("Styled", () => <Styled />)
tableStories.add("Widths", () => <Widths />)
tableStories.add("Nested Tables", () => <NestedTables />)
tableStories.add("Isolated rows", () => <IsolatedRows />)
