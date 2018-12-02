import React from 'react';
import { Switch,Route,NavLink,HashRouter as Router} from "react-router-dom";
import {IoIosSettings as SettingsIcon,
		IoIosClose as CloseIcon,
		IoIosPeople as UsersIcon,
		IoIosInformation as InfoIcon,
		IoMdArrowDropleft as ArrowIcon,
		IoIosAdd as AddIcon,
		IoIosSearch as SearchIcon} from "react-icons/io";
import Settings from './SidePopups/Settings'
import Users from './SidePopups/Users'
import styles from '../css/SidePopups.css'

//Pour les icones, voir https://react-icons.netlify.com/#/

function Icon(props) {
	return (
		<div className={styles.Icon}>{
			props.name ?
			props.name === "Settings" ? <SettingsIcon /> :
			props.name === "Close"    ? <CloseIcon /> :
			props.name === "Users"	  ? <UsersIcon /> :
			props.name === "Info"     ? <InfoIcon /> :
			props.name === "Arrow"    ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 50 100" height="100%" width="100%"><path d="M50 0  L0 50  L50 100z"></path></svg> :
			props.name === "Add"      ? <AddIcon /> :
			props.name === "Search"   ? <SearchIcon /> :
			null : null
		}</div>
	)
}

function ContentTitle(props) {
	const name = props.name ? props.name : 'Title not defined, please set the name prop'
	return (
		<div className={styles.ContentTitle}>
			<h4>{name}</h4>
		</div>
	)
}

function Content(props) {
	const name = props.name ? props.name : 'Error, Content called without name';
	const component = () => <div className={styles.Content}>
								<ContentTitle name={name} />
								{
									name == 'Settings' ? <Settings settings={props.settings} /> :
									name == 'Users'    ? <Users users={props.users} /> :
														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								}
								<Arrow />
							</div>
	return (
		<Route path={"/"+name} component={component} />
	)
}

function Toggle(props) {
	const name = props.name ? props.name : 'Error, Toggle called without name';
	const close = () => <NavLink to="/"   ><Icon name="Close" /></NavLink>
	const open  = () => <NavLink to={name}><Icon name={name}  /></NavLink>
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
		<div className={styles.Arrow}><Icon name="Arrow" /></div>
	)
}

function Popup(props) {
	const name = props.name ? props.name : 'Error, Popup called without name';
	return (
		<div className={styles.Popup}>
			<Toggle name={name} />
			<Content name={name} settings={props.settings} users={props.users}/>
		</div>
	)
}

function SidePopups(props) {
	return (
		<div className={styles.SidePopups}>
			<Popup name="Search" />
			<Popup name="Settings" settings={props.settings}/>
			<Popup name="Users" users={props.users}/>
			<Popup name="Info" />
			<Popup name="Add" />
		</div>
	)
}

export default SidePopups;
