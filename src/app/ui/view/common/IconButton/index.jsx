import React        from "react"
import MaterialIcon from "app/ui/view/common/MaterialIcon"

import classNames from "app/ui/view/common/IconButton/classNames"

export default ({
    className,
    ...props
}) =>
    <MaterialIcon
        className={[className, classNames.Host].join(" ")}
        {...props}
    />