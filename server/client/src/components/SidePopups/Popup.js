import React from "react";
import { Switch,Route,NavLink,HashRouter as Router} from "react-router-dom";
import {IoIosClose as CloseIcon} from "react-icons/io";
import styles from "./SidePopups.css";
import ProtectedRoute, { AntiProtectedRoute } from "../ProtectedRoute";

function Toggle(props) {
	const name = props.name ? props.name : 'noname';
	const close = () => (<div>
                            <NavLink to="/"   ><div className={styles.Icon}><CloseIcon /></div></NavLink>
                            <div className={styles.Arrow}><Arrow/></div>
                        </div>)
	const open  = () => <NavLink to={name}><div className={styles.Icon}>{props.icon}</div></NavLink>
	return (
		<div className={styles.Toggle}>
			<Switch>
				<Route path={"/"+name} component={close} />
				<Route component={open} />
			</Switch>
		</div>
	)
}

function Arrow(props) {
	return (
		<div className={styles.Icon}>
			<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 50 100" height="100%" width="100%"><path d="M50 0  L0 50  L50 100z"></path></svg>
		</div>
	)
}

function Popup(props) { // Expected props : name, title, icon and children (passed as effective children)
	const name = props.name ? props.name : 'noname';
	const children = props.children ? props.children : <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
	const content = () =>
	(
		<div className={styles.Content}>
			{ props.title ?
				<div className={styles.ContentTitle}>
					<h4>{props.title}</h4>
				</div>
				: null
			}
			<div className={styles.ContentContainer}>
				{children}
			</div>

		</div>
	)
	return (
		<div className={styles.Popup}>
			<Toggle name={name} icon={props.icon}/>
			<Route path={"/"+name} component={content} />
		</div>
	)
}

export function ProtectedPopup(props) {
	const popup = () => <Popup {...props} />
	return (
		<ProtectedRoute component={popup} />
	);
}

export function AntiProtectedPopup(props) {
	const popup = () => <Popup {...props} />
	return (
		<AntiProtectedRoute component={popup} />
	);
}

export default Popup;
