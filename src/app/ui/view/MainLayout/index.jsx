import React           from "react"
import IconButton      from "app/ui/view/common/IconButton"
import MusicController from "app/ui/view/MusicController"

import classNames from "app/ui/view/MainLayout/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            musicControllerisTop: false,
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
                                musicControllerisTop: !this.state.musicControllerisTop
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
                        top={this.state.musicControllerisTop}
                    />
                </div>
            </div>
        )
    }
}
