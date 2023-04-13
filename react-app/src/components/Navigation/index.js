import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Toggle } from 'react-hook-theme';
import 'react-hook-theme/dist/styles/style.css';
import NavSearch from '../Search/navSearch';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='NavStart'>

			<div className='Navbar'>
			    <Toggle />
				<div>
					<NavLink className='home-page' exact to="/">Sam-Mart</NavLink>
				</div>
				<div className="nav-search">
					<NavSearch  />
				</div>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
