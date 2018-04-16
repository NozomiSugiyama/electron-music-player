import React      from "react"
import classNames from "app/ui/view/MainLayout/classNames"

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
            currentMusic,
            audioApi: {
                setMusic,
            }
        } = this.props

        return(
            <div
                className={classNames.Host}
            >
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
