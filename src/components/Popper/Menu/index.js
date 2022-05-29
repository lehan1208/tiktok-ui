import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import Header from './Header'
import { useState } from 'react'

const cx = classNames.bind(styles);

const defaultFn = () => { }

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) { // Không ẩn menu khi click vào avatar: hideOnClick default true

    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory(prev => [...prev, item.children]);
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }


    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            placement='bottom-end'
            hideOnClick={hideOnClick}   // Không ẩn menu khi click vào avatar (link to './Layout/components/Header/index.js')
            render={attrs => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title='Language' onBack={() => {
                            setHistory(prev => prev.slice(0, prev.length - 1))
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>)}
            onHide={() => setHistory(prev => prev.slice(0, 1))} // Cắt lấy phần tử đầu tiên khi hover ra ngoài
        >
            {children}
        </Tippy>
    )
}

export default Menu