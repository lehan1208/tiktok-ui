import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import images from '~/assets/images'
import styles from './Image.module.scss'

const Image = forwardRef(( // Syntax: forwardRef((props, ref) => {})
    {
        src,
        className,
        fallback, // fallback truyền từ ngoài vào, nếu không có fallback thì lấy images.noImage
        alt,
        ...props
    }, ref) => {
    const [_fallBack, setFallback] = useState('')

    const handleError = () => {
        setFallback(fallback ? fallback : images.noImage) // fallback truyền từ ngoài vào, nếu không có fallback thì lấy images.noImage
    }

    return (<img
        className={classNames(styles.wrapper, className)} // wrapper => css
        ref={ref}
        src={_fallBack || src}      // Nếu có fallback thì truyền vào _fallback
        alt={alt}
        {...props}
        onError={handleError}   // Nếu lỗi thì thực hiện hàm handleError
    />
    )
})
export default Image 