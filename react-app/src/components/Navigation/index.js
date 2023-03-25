import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='NavStart'>
			<div className='Navbar'>
				<div>
					<NavLink className='home-page' exact to="/">Sam-Mart</NavLink>
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
