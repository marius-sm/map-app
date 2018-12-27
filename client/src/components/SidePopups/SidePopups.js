import React from 'react';
import Popup, { ProtectedPopup, AntiProtectedPopup } from './Popup';
import {IoIosSettings as SettingsIcon,
		IoIosClose as CloseIcon,
		IoIosPeople as UsersIcon,
		IoIosInformation as InfoIcon,
		IoMdArrowDropleft as ArrowIcon,
		IoIosAdd as AddIcon,
		IoIosSearch as SearchIcon,
	  	IoIosLogIn as LoginIcon,
		IoIosPerson as ProfileIcon,
		IoIosUnlock as UnlockedIcon,
		IoIosLock as LockedIcon} from "react-icons/io"; // Pour les icones, voir https://react-icons.netlify.com/#/
import Settings from "./Settings";
import Users from './Users';
import styles from './SidePopups.css';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

function SidePopups(props) {
	return (
		<div className={styles.SidePopups}>
			<Popup name="search" title="Search" icon={<SearchIcon/>}/>
			<Popup name="settings" title="Settings" icon={<SettingsIcon />}>
				<Settings/>
			</Popup>
			<Popup name="users" title="Users" icon={<UsersIcon />}>

			</Popup>
			<AntiProtectedPopup name="login" title="Login" icon={<ProfileIcon/>} >
				<Login />
				<Register/>
			</AntiProtectedPopup>
			<AntiProtectedPopup name="unprotected" title="Anti protected popup" icon={<UnlockedIcon/>} >
				<p>This popup should only render when the user is NOT logged in.</p>
			</AntiProtectedPopup>
			<ProtectedPopup name="profile" title="Profile" icon={<ProfileIcon />}>
				<Profile />
			</ProtectedPopup>
			<ProtectedPopup name="protected" title="Protected popup" icon={<LockedIcon/>}>
				<p>This popup should only render when the user is logged in.</p>
			</ProtectedPopup>
		</div>
	)
}

export default SidePopups;
