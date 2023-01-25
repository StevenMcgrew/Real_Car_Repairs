import './UserDropdown.scoped.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../Modal/modalSlice';
import { showToast } from '../Toast/toastSlice';
import { apiBaseUrl } from '../../config.js';
import { setUsername } from '../UserDropdown/userDropdownSlice.js';

// Components
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon, DotFilledIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import axios from 'axios';

const UserDropdown = () => {

    const getInitialDarkMode = () => {
        let darkMode = localStorage.getItem('isDarkMode');
        return darkMode === 'true' ? true : false;
    };

    const getInitialColor = () => {
        return localStorage.getItem('accentColor');
    };

    const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
    const [accentColor, setAccentColor] = useState(getInitialColor);
    const username = useSelector((state) => state.userDropdown.username);
    const dispatch = useDispatch();

    const handleDarkModeChange = (value) => {
        setIsDarkMode(value);
    };

    const handleColorChange = (value) => {
        setAccentColor(value);
    };

    const logOutClicked = () => {
        let url = apiBaseUrl + '/auth/logout';
        axios.delete(url)
            .then(function (response) {
                dispatch(setUsername(''));
                // TODO: reset view_history, profile_pic, and theme
                dispatch(showToast({ content: 'You have been logged out.' }));
            })
            .catch(function (error) {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            });
    };

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : '';
        localStorage.setItem('isDarkMode', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        document.documentElement.className = accentColor === 'blue' ? '' : accentColor;
        localStorage.setItem('accentColor', accentColor);
    }, [accentColor]);

    return (
        <DropdownMenu.Root>
            <span className='usernameSpan'>{username ? username : null}</span>
            <DropdownMenu.Trigger asChild>
                <Avatar.Root className='AvatarRoot'>
                    <Avatar.Image className='AvatarImage' src='' alt='image of user' />
                    <Avatar.Fallback className='AvatarFallback' delayMs={600}>
                        <PersonIcon className='user-icon' />
                    </Avatar.Fallback>
                </Avatar.Root>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5}>
                    <DropdownMenu.Label className='DropdownMenuLabel'>ACCOUNT</DropdownMenu.Label>

                    {username
                        ?
                        <DropdownMenu.Item className='DropdownMenuItem'
                            onSelect={logOutClicked}>
                            Log Out
                        </DropdownMenu.Item>
                        :
                        <>
                            <DropdownMenu.Item className='DropdownMenuItem'
                                onSelect={() => dispatch(showModal({ title: 'Sign In', content: 'SignInForm' }))}>
                                Sign In
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className='DropdownMenuItem'
                                onSelect={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>
                                Sign Up
                            </DropdownMenu.Item>

                        </>
                    }

                    <DropdownMenu.Separator className='DropdownMenuSeparator' />

                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                            Theme
                            <div className="RightSlot">
                                <ChevronRightIcon />
                            </div>
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                <DropdownMenu.Label className='DropdownMenuLabel'>MODE</DropdownMenu.Label>
                                <DropdownMenu.RadioGroup value={isDarkMode} onValueChange={handleDarkModeChange}>
                                    <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value={false} onSelect={(e) => e.preventDefault()}>
                                        <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='color-dot light-dot'></div>
                                        Light
                                    </DropdownMenu.RadioItem>
                                    <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value={true} onSelect={(e) => e.preventDefault()}>
                                        <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='color-dot dark-dot'></div>
                                        Dark
                                    </DropdownMenu.RadioItem>
                                </DropdownMenu.RadioGroup>

                                <DropdownMenu.Separator className='DropdownMenuSeparator' />

                                <DropdownMenu.Label className='DropdownMenuLabel'>COLOR</DropdownMenu.Label>
                                <DropdownMenu.RadioGroup value={accentColor} onValueChange={handleColorChange}>
                                    <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value='blue' onSelect={(e) => e.preventDefault()}>
                                        <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='color-dot blue-dot'></div>
                                        Blue
                                    </DropdownMenu.RadioItem>
                                    <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value='green' onSelect={(e) => e.preventDefault()}>
                                        <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='color-dot green-dot'></div>
                                        Green
                                    </DropdownMenu.RadioItem>
                                    <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value='pink' onSelect={(e) => e.preventDefault()}>
                                        <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='color-dot pink-dot'></div>
                                        Pink
                                    </DropdownMenu.RadioItem>
                                </DropdownMenu.RadioGroup>
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Arrow className='DropdownMenuArrow' />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root >
    );
};

export default UserDropdown;
