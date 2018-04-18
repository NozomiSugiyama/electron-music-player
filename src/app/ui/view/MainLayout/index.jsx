import React           from "react"
import IconButton      from "app/ui/view/common/IconButton"
import MusicController from "app/ui/view/MusicController"

import classNames from "app/ui/view/MainLayout/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            musicControllerIsView: true,
        })
    }

    render() {
        const {
            musicLibraries,
            musicApi,
            currentAudio,
            currentMusic,
            audioApi,
        } = this.props

        return(
            <div
                className={classNames.Host}
            >
                <header
                    className={classNames.Header}
                >
                    <IconButton>{"volume_up"}</IconButton>
                    <IconButton
                        onClick={_ => 
                            this.setState({
                                musicControllerIsView: !this.state.musicControllerIsView
                            })
                        }
                    >
                        {"queue_music"}
                    </IconButton>
                </header>
                <div>
                    <MusicController
                        audio={currentAudio}
                        audioApi={audioApi}
                        className={
                            [
                                classNames.MusicController,
                                this.state.musicControllerIsView ? classNames.View
                              :                                    classNames.Hidden
                            ].join(" ")
                        }
                    />
                </div>
            </div>
        )
    }
}
