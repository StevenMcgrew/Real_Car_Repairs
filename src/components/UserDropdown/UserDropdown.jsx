import './UserDropdown.scoped.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../Modal/modalSlice';
import { showToast } from '../Toast/toastSlice';
import { apiBaseUrl } from '../../config.js';
import { setUsername, setViewHistory, setProfilePic, setTheme, setColor } from '../UserDropdown/userDropdownSlice.js';
import { imagesBaseUrl } from '../../config.js';
import { formatAxiosError } from '../../utils/general-utils';

// Components
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon, DotFilledIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import axios from 'axios';

const UserDropdown = () => {
    const username = useSelector(state => state.userDropdown.username);
    const profile_pic = useSelector(state => state.userDropdown.profile_pic);
    const theme = useSelector(state => state.userDropdown.theme);
    const color = useSelector(state => state.userDropdown.color);
    const dispatch = useDispatch();

    const handleDarkModeChange = (value) => {
        if (!username) {
            dispatch(setTheme(value));
            return;
        }

        const newTheme = { theme: value, color: color };
        const url = `${apiBaseUrl}/users/theme`;
        axios.put(url, newTheme, { withCredentials: true })
            .then(response => {
                const theme = JSON.parse(response.data.theme);
                dispatch(setTheme(theme.theme));
                dispatch(setColor(theme.color));
            })
            .catch(error => {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            });
    };

    const handleColorChange = (value) => {
        if (!username) {
            dispatch(setColor(value));
            return;
        }

        const newTheme = { theme: theme, color: value };
        const url = `${apiBaseUrl}/users/theme`;
        axios.put(url, newTheme, { withCredentials: true })
            .then(response => {
                const theme = JSON.parse(response.data.theme);
                dispatch(setTheme(theme.theme));
                dispatch(setColor(theme.color));
            })
            .catch(error => {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            });
    };

    const logOutClicked = () => {
        let url = apiBaseUrl + '/auth/logout';
        axios.delete(url)
            .then(function (response) {
                dispatch(setUsername(''));
                dispatch(setViewHistory([]));
                dispatch(setProfilePic(''));
                dispatch(showToast({ content: 'You have been logged out.' }));
            })
            .catch(function (error) {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            });
    };

    useEffect(() => {
        dispatch(setTheme(theme));
        dispatch(setColor(color));
    }, []);

    return (
        <DropdownMenu.Root>
            <span className='usernameSpan'>{username ? username : null}</span>
            <DropdownMenu.Trigger asChild>
                <Avatar.Root className='AvatarRoot'>
                    <Avatar.Image className='AvatarImage' src={`${imagesBaseUrl}/${profile_pic}`} alt='image of user' />
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
                                <DropdownMenu.RadioGroup value={theme} onValueChange={handleDarkModeChange}>
                                    <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value="light" onSelect={(e) => e.preventDefault()}>
                                        <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='color-dot light-dot'></div>
                                        Light
                                    </DropdownMenu.RadioItem>
                                    <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value="dark" onSelect={(e) => e.preventDefault()}>
                                        <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='color-dot dark-dot'></div>
                                        Dark
                                    </DropdownMenu.RadioItem>
                                </DropdownMenu.RadioGroup>

                                <DropdownMenu.Separator className='DropdownMenuSeparator' />

                                <DropdownMenu.Label className='DropdownMenuLabel'>COLOR</DropdownMenu.Label>
                                <DropdownMenu.RadioGroup value={color} onValueChange={handleColorChange}>
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
