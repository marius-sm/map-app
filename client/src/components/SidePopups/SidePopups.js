import React from 'react';
import Popup from './Popup'
import {IoIosSettings as SettingsIcon,
		IoIosClose as CloseIcon,
		IoIosPeople as UsersIcon,
		IoIosInformation as InfoIcon,
		IoMdArrowDropleft as ArrowIcon,
		IoIosAdd as AddIcon,
		IoIosSearch as SearchIcon} from "react-icons/io"; //Pour les icones, voir https://react-icons.netlify.com/#/
import Settings from './Settings'
import Users from './Users'
import styles from './SidePopups.css'

function SidePopups(props) {
	return (
		<div className={styles.SidePopups}>
			<Popup name="Search" title="Search" />
			<Popup name="Settings" title="Settings" icon={<SettingsIcon />}>
				<Settings settings={props.settings} />
			</Popup>
			<Popup name="Users" title="Users" icon={<UsersIcon />}>
				<Users/>
			</Popup>
			<Popup name="Info" />
			<Popup name="Add" />
		</div>
	)
}

export default SidePopups;
