import React      from "react"
import { remote } from 'electron'
import fs         from 'fs' 

export default class extends React.Component {
    componentWillMount() {}
    componentDidMount() {}
    render() {
        const {
            musicLibraries,
            musicApi: {
                addBaseDir,
            },
            currentAudio,
            audioApi: {
                setMusic,
                getAudio,
            }
        } = this.props
        console.log(musicLibraries, "test")
        return(
            <div>
                <span>test</span>
                <button
                    onClick={async _ => {
                        await addBaseDir()
                    }}
                >
                    select base dir
                </button>
                <div>
                {
                    musicLibraries.map((musicLibrary, i) =>
                        <div
                            key={i}
                        >
                            <strong>{musicLibrary.directoryName}</strong>
                            {musicLibrary.musicList && musicLibrary.musicList.map((music, i2) => 
                                <div
                                    key={i2}
                                    onClick={async _ => {
                                        await setMusic({music})
                                        currentAudio.play()
                                    }}
                                >
                                    {music.filePath}
                                </div>
                            )}
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}
