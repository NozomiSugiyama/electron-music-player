import React           from "react"
import MaterialIcon    from "app/ui/view/common/MaterialIcon"
import AudioController from "app/ui/view/AudioController"
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
                    <MaterialIcon>{"volume_up"}</MaterialIcon>
                    <MaterialIcon
                        onClick={_ => 
                            this.setState({
                                musicControllerIsView: !this.state.musicControllerIsView
                            })
                        }
                    >
                        {"queue_music"}
                    </MaterialIcon>
                </header>
                <div>
                    <MusicController
                        className={
                            [
                                classNames.MusicController,
                                this.state.musicControllerIsView ? classNames.View
                              :                                    classNames.Hidden
                            ].join(" ")
                        }
                    />
                </div>
                <AudioController
                    audio={currentAudio}
                    audioApi={audioApi}
                />
            </div>
        )
    }
}
