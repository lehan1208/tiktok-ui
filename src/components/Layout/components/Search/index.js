import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem'
import { SearchIcon } from '~/components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import request from '~/ultis/request'
import { useDebounce } from '~/hooks';
import { useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'


const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500) // gán debounced = useDebounce(value = searchVlue, delay = 500ms) => sau 500ms giá trị debounce được update = searchValue mới nhất

    const inputRef = useRef()       // sử dụng useRef để focus vào input

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])     // Nếu không có searchValue thì setSearchResult trả về mảng rỗng
            return;         // Nếu  searchValue=false - không có / (= rỗng) thì thoát hàm useEffect
        }
        setLoading(true);

        request
            .get('users/search', {
                params: {
                    q: debounced,
                    type: 'less',
                }
            }) // Khi nhập tìm kiếm vào ô input sẽ thay đổi từ khóa sau "q="
            // encodeURIComponent() => mã hóa các kí tự đặc biệt tránh bị nhầm lẫn
            .then((res) => {
                setSearchResult(res.data.data);
                setLoading(false); // Sau khi gọi API xong thì sẽ ẩn loading đi => false
            })
            .catch(() => {
                setLoading(false);  // lỗi mạng thì sẽ ẩn đi => false
            })
    }, [debounced]);        //thay searchValue = debounced để khi debounced thay đổi 

    const handleClear = () => {
        setSearchValue('');         // Clear input khi click vào button clear
        setSearchResult([])         // Xóa mảng tìm kiếm
        inputRef.current.focus()    // focus lại vào ô input
    }

    const handleHideResult = () => {
        setShowResult(false)        // Khi blur ra ngoài ô input sẽ setShowResult = false => ẩn showResult
    }

    return (
        <HeadlessTippy
            interactive={true}
            visible={showResult && searchResult.length > 0}
            render={attrs => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (     // searchResult lúc này là 1 mảng chứa các object => result là 1 object
                            <AccountItem
                                key={result.id}     // lấy id của result( result lúc này là 1 object)
                                data={result}
                            />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}   // `blur ra ngoài ô input sẽ thực hiện hàm handleHideResult`
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}    // sử dụng useRef để focus vào input
                    value={searchValue}         // Sử dụng useState để 2waybinding render 
                    onChange={(e) => {
                        if (e.target.value.startsWith(' ')) {       // Nếu input nhập vào bắt đầu = space thì return hàm
                            return;
                        } else {
                            setSearchValue(e.target.value)          // Nếu input nhập vào bắt đầu # space thì return setSearchValue(e.target.value) 
                        }
                    }}
                    placeholder='Search accounts and videos'
                    spellCheck={false}
                    onFocus={() => setShowResult(true)}    // Khi focus vào lại ô input sẽ setShowResult=true
                // kết hợp với searchResult.length > 0 => sẽ hiện ra searchResult
                />

                {/* // Convert searchValue sang Boolean => Khi có searchValue và không có loading( setLoading(false)) => 
                    //  khi nhập giá trị vào thì mới hiển thị button clear */}
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                {/* Nếu có loading thì lấy ra icon - toán tử && là nếu có ... thì ... */}

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} > {/* Bỏ qua hành vi focus vào ô tìm kiếm khi nhấn submit */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy >
    )
}

export default Search