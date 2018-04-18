import React        from "react"
import Image        from "app/ui/view/common/Image"

import classNames from "app/ui/view/MusicController/classNames"

export default ({
    audio,
    audioApi,
    className,
    ...props
}) => 
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    >
        <div className={classNames.Body}>
            <Image
                src={"http://placehold.jp/150x150.png"}
            />
        </div>
        <div className={classNames.Footer}>
            <div>{"artist name 12px"}</div>
            <div>{"Sound Title 24px"}</div>
        </div>
    </div>
