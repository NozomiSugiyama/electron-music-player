import React from "react"

import classNames from "app/ui/view/common/Image/classNames"

export default ({
    className,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
    >
        <img
            {...props}
        />
    </div>