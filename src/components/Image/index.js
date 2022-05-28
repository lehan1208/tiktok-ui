import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import images from '~/assets/images'
import styles from './Image.module.scss'

const Image = forwardRef((
    {
        src,
        className,
        fallback: customFallback = images.noImage, // fallback truyền từ ngoài vào, nếu không có fallback thì lấy images.noImage
        alt,
        ...props
    }, ref) => {
    const [fallBack, setFallback] = useState('')

    const handleError = () => {
        setFallback(customFallback)
    }

    return (<img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={fallBack || src}
        alt={alt}
        {...props}
        onError={handleError}
    />
    )
})
export default Image 