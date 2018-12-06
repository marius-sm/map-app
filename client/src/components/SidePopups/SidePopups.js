import React from 'react';
import Popup from './Popup'
import {IoIosSettings as SettingsIcon,
		IoIosClose as CloseIcon,
		IoIosPeople as UsersIcon,
		IoIosInformation as InfoIcon,
		IoMdArrowDropleft as ArrowIcon,
		IoIosAdd as AddIcon,
		IoIosSearch as SearchIcon,
	  IoIosLogIn as LoginIcon} from "react-icons/io"; //Pour les icones, voir https://react-icons.netlify.com/#/
import Settings from './Settings'
import Users from './Users'
import styles from './SidePopups.css'
import Login from './Login'
import Register from './Register'

function SidePopups(props) {
	return (
		<div className={styles.SidePopups}>
			<Popup name="Search" title="Search" icon={<SearchIcon/>} />
			<Popup name="Settings" title="Settings" icon={<SettingsIcon />}>
				<Settings settings={props.settings} />
			</Popup>
			<Popup name="Users" title="Users" icon={<UsersIcon />}>
				<Users />
			</Popup>
			<Popup name="Login" title="Login" icon={<LoginIcon/>} >
				<Login/>
				<Register/>
			</Popup>
		</div>
	)
}

export default SidePopups;
