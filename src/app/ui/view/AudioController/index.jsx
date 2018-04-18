import React        from "react"
import MaterialIcon from "app/ui/view/common/MaterialIcon"

import classNames from "app/ui/view/AudioController/classNames"

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
        <MaterialIcon>
            {"skip_previous"}
        </MaterialIcon>
        <MaterialIcon
            onClick={_ => audio.paused ? audio.play() : audio.pause()}
        >
            {audio.paused ? "play_arrow" : "pause"}
        </MaterialIcon>
        <MaterialIcon
        >
            {"skip_next"}
        </MaterialIcon>
    </div>
