import React      from "react"
import IconButton from "app/ui/view/common/IconButton"
import Image      from "app/ui/view/common/Image"

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
            <IconButton>
                {"keyboard_arrow_left"}
            </IconButton>
            <div>
                <Image
                    src={"http://placehold.jp/150x150.png"}
                />
                <IconButton
                    onClick={_ => audio.paused ? audio.play() : audio.pause()}
                >
                    {audio.paused ? "play_arrow" : "pause"}
                </IconButton>
            </div>
            <IconButton
            >
                {"keyboard_arrow_right"}
            </IconButton>
        </div>
        <div className={classNames.Footer}>
            <IconButton
                className={classNames.IconButton}
            >
                {"repeat"}
            </IconButton>
            <div
                className={classNames.Info}
            >
                <div>{"artist name 12px"}</div>
                <div>{"Sound Title 24px"}</div>
            </div>
            <IconButton
                className={classNames.IconButton}
            >
                {"shuffle"}
            </IconButton>
        </div>
    </div>
