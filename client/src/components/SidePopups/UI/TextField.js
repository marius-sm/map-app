import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import MUITextField from "@material-ui/core/TextField";
import { theme } from "../../customMuiTheme"

export default function Button(props) {
	return (
		<MuiThemeProvider theme={theme}>
			<MUITextField
				color="primary"
				placeholder={props.placeholder}
				onChange={props.onChange}
				value={props.value}
				disabled={props.disabled}
				{...props}>
			</MUITextField>
		</MuiThemeProvider>
	)
}
