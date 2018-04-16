import React         from "react"
import ErrorListener from "app/ui/view/ErrorListener"
import MainLayout    from "app/ui/view/MainLayout"
import AudioApi      from "app/ui/wrapper/AudioApi"
import MusicApi      from "app/ui/wrapper/MusicApi"

export default props =>
    <MusicApi
        render={props =>
            <AudioApi
                render={props =>
                    <MainLayout
                        {...props}
                    />
                }
                {...props}
            />
        }
        {...props}
    />
