import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


import Button from '~/components/Button'
import styles from './Header.module.scss'
import images from '~/assets/images'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem'
import Menu from '~/components/Popper/Menu'
import { MessageIcon, SearchIcon, InboxIcon, MenuIcon, ProfileIcon, CoinIcon, SettingIcon, LogoutIcon, LanguageIcon, FeedbackIcon, KeyboardIcon } from '~/components/Icons'
import Image from '~/components/Image'

const cx = classNames.bind(styles)
const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        }
    },
    {
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
    },
];

const userMenu = [
    {
        icon: <ProfileIcon />,
        title: 'View profile',
        to: '/@hoa'
    },
    {
        icon: <CoinIcon />,
        title: 'Get coins',
        to: '/coin'
    },
    {
        icon: <SettingIcon />,
        title: 'Setting',
        to: '/setting'
    },
    ...MENU_ITEMS,
    {
        icon: <LogoutIcon />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
]

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 1000)
    }, []);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };


    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>

            {/* LOGO TIKTOK */}

            <img src={images.logo} alt='TikTok' />

            {/* SEARCH */}

            <HeadlessTippy
                interactive={true}
                visible={searchResult.length > 0}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input placeholder='Search accounts and videos' spellCheck={false} />
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>

            {/* ACTION  */}

            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Button text to='/upload' leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                        <Tippy delay={[0, 100]} content='Message' placement='bottom'>
                            <button className={cx('action-btn')}>
                                <MessageIcon />
                            </button>
                        </Tippy>
                        <Tippy delay={[0, 100]} content='Inbox' placement='bottom'>
                            <button className={cx('action-btn')}>
                                <InboxIcon />
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                        <Button text to='/upload' leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                        <Button primary>Log in</Button>
                    </>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange} >
                    {currentUser ? (
                        <Image
                            src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/1d6dee40370c1ed128d8050cb38c6974~c5_100x100.jpeg?x-expires=1653883200&x-signature=gOXEHf15bYEv8nwVv3W9n21XkVg%3D'
                            className={cx('user-avatar')}
                            alt="Nguyen Van A"
                            fallback="https://img.freepik.com/free-vector/tiktok-banner-with-watercolor-splatter_69286-194.jpg?w=740&t=st=1653728918~exp=1653729518~hmac=a9c7a4a7d6d550d1b41508e71a819c0310454cbf06bfef03cbb9c66d983b3cf2"
                        />
                    ) : (
                        <button className={cx('menu-btn')} >
                            <MenuIcon />
                        </button>
                    )}
                </Menu>
            </div>
        </div >
    </header >
}

export default Header