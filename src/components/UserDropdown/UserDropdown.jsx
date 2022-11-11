import './UserDropdown.scoped.css';
import { useState, useEffect } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { PersonIcon, DotFilledIcon } from '@radix-ui/react-icons';

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

  const handleDarkModeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleColorChange = (value) => {
    setAccentColor(value);
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
          <DropdownMenu.Item className='DropdownMenuItem'>Sign In</DropdownMenu.Item>

          <DropdownMenu.Item className='DropdownMenuItem'>Sign Up</DropdownMenu.Item>

          <DropdownMenu.Separator className='DropdownMenuSeparator' />

          <DropdownMenu.Label className='DropdownMenuLabel'>MODE</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={isDarkMode} onValueChange={handleDarkModeChange}>
            <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value={false}>
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              <div className='color-dot light-dot'></div>
              Light
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value={true}>
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
            <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value='blue'>
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              <div className='color-dot blue-dot'></div>
              Blue
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value='green'>
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              <div className='color-dot green-dot'></div>
              Green
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem className='DropdownMenuRadioItem' value='pink'>
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              <div className='color-dot pink-dot'></div>
              Pink
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow className='DropdownMenuArrow' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
