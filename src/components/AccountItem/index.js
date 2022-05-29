import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames/bind"
import styles from './AccountItem.module.scss'
import Image from '~/components/Image'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
function AccountItem({ data }) { // Account nhận 1 props data ./Layout/components/Search
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src={data.avatar}
                alt={data.full_name}
            />
            <Link to={`/@${data.nickname}`} className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>

                    {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                    {/* Khi data.tick là true thì thực hiện them icon tick xanh */}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </Link>
        </div>
    )
}
export default AccountItem
