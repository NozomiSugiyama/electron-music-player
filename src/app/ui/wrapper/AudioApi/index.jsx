import React       from "react"
import { remote }  from 'electron'
import fs          from 'fs' 
import forceUpdate from "app/util/forceUpdate"


export default class extends React.Component {

    componentWillMount() {
        this.setState({
            audio: new Audio()
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
            audioApi: {
                setMusic: async ({
                    music,
                }) => {
                    console.log(music.src)
                    this.state.audio.src = music.audio.src
                    await forceUpdate(this)

                    return this.state.audio
                }
            },
            ...props
        })
    }
}
