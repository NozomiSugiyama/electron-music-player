import React from "react"

import classNames from "app/ui/view/common/MaterialIcon/classNames"

export default ({
    className,
    component = "span",
    Component = component,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        {...props}
    />