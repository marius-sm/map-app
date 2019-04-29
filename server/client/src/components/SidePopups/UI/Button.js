import React from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import MUIButton from "@material-ui/core/Button";
import { theme } from "../../customMuiTheme";

const styles = {
	root: {
		color: "white",
		background: "rgba(150, 150, 250, 1)",
		'&$disabled': {
			color: "white",
			background: "rgba(150, 150, 250, 1)",
			opacity: 0.4,
      		boxShadow: 'none',
    	},
	},
	disabled: {}
}

const StyledButton = withStyles(styles)(MUIButton);

export default function Button(props) {
	return (
		<MuiThemeProvider theme={theme}>
			<StyledButton
				className={styles.Button}
				variant="contained"
				color="primary"
				{...props}>
				{props.children}
			</StyledButton>
		</MuiThemeProvider>
	)
}
