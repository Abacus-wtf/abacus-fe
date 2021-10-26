import React from 'react'
import { theme } from './src/config/theme'
import { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import ReactTooltip from "react-tooltip";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'

export const wrapRootElement = ({ element }) => {
    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                {element}
                <ReactTooltip 
                    place={'right'}
                    type={'dark'}
                    multiline={false}
                />
            </ThemeProvider>
        </Fragment>
    )
}