import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faCircleUser, faCircleXmark, faCoins, faEllipsisVertical, faGear, faKeyboard, faLanguage, faMagnifyingGlass, faMessage, faPlus, faSignOut, faSpinner } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


import Button from '~/components/Button'
import styles from './Header.module.scss'
import images from '~/assets/images'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem'
import Menu from '~/components/Popper/Menu'

const cx = classNames.bind(styles)
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
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
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faCircleUser} />,
        title: 'View profile',
        to: '/@hoaa'
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin'
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/setting'
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/loggout',
        separate: true,
    },
]

function Header() {
    const [searchResult, setSeachResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSeachResult([])
        }, 1000)
    }, []);

    // Hanlde logic
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
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>

            {/* ACTION  */}

            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Button text to='/upload' leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                        <Tippy delay={[0, 200]} content='Message' placement='bottom'>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faMessage} />
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
                        <img src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/1d6dee40370c1ed128d8050cb38c6974~c5_100x100.jpeg?x-expires=1653883200&x-signature=gOXEHf15bYEv8nwVv3W9n21XkVg%3D'
                            className={cx('user-avatar')}
                            alt="Nguyen Van A"
                        />
                    ) : (
                        <button className={cx('menu-btn')} >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>
        </div >
    </header >
}

export default Header