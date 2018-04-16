import React      from "react"
import { remote } from 'electron'
import fs         from 'fs' 
import setState   from "app/util/setState"


export default class extends React.Component {

    componentWillMount() {
        this.setState({
            audio: undefined
        })
    }


    componentDidMount() {
        (async () => {
            
        })()
    }

    render() {

        const {
            render,
            ...props
        } = this.props

        return render({
            plaingAudio: this.state.audio,
            audioApi: {
                setMusic: ({
                    music,
                }) => setState(
                    this,
                    {
                        audio: music.audio.cloneNode()
                    }
                ),
                playMusic: async ({
                    music
                }) => {
                    if (music)
                        await setState(
                            this,
                            {
                                audio: music.audio.cloneNode()
                            }
                        )
                    this.state.music.play()
                },
                pauseMusic: () => this.state.audio.pause()
            },
            ...props
        })
    }
}
