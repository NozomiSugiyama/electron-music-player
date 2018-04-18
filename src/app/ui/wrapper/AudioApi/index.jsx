import React       from "react"
import { remote }  from 'electron'
import fs          from 'fs' 
import forceUpdate from "app/util/forceUpdate"
import setState from "app/util/setState"


export default class extends React.Component {

    componentWillMount() {
        this.setState({
            audio: new Audio(),
            currentMusic: undefined
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
            currentAudio: this.state.audio,
            currentMusic: this.state.currentMusic,
            audioApi: {
                setMusic: async ({
                    music,
                }) => {
                    this.state.audio.src = music.audio.src
                    await setState(
                        this,
                        {
                            currentMusic: music
                        }
                    )
                    return this.state.audio
                }
            },
            ...props
        })
    }
}
