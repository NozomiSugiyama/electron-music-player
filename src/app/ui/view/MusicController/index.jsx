import React      from "react"
import IconButton from "app/ui/view/common/IconButton"
import Image      from "app/ui/view/common/Image"
import Slider     from "app/ui/view/common/Slider"

import classNames from "app/ui/view/MusicController/classNames"

export default ({
    top = false,
    audio,
    audioApi,
    className,
    ...props
}) => 
    <div
        className={
            [
                className,
                classNames.Host,
                top && classNames.Top
            ].join(" ")
        }
        {...props}
    >
        <div className={classNames.Header}>
            <div
                className={classNames.Info}
            >
                <div>{"artist name 12px"}</div>
                <div>{"Sound Title 24px"}</div>
            </div>
        </div>
        <div className={classNames.Body}>
            <div>
                <IconButton>
                    {"keyboard_arrow_left"}
                </IconButton>
                <div>
                    <Image
                        src={"./img/jucket.jpg"}
                    />
                    <IconButton
                        onClick={_ => audio.paused ? audio.play() : audio.pause()}
                    >
                        {audio.paused ? "play_arrow" : "pause"}
                    </IconButton>
                </div>
                <IconButton>
                    {"keyboard_arrow_right"}
                </IconButton>
                <div
                    className={classNames.MiniController}
                >
                    <IconButton
                        className={classNames.MiniIconButton}
                    >
                        {"shuffle"}
                    </IconButton>
                    <IconButton
                        className={classNames.MiniIconButton}
                    >
                        {"repeat"}
                    </IconButton>
                </div>
            </div>
            <div>
                <Slider/>
                <div>
                    <span>1:12</span>
                    <span>3:40</span>
                </div>
            </div>
        </div>
    </div>
