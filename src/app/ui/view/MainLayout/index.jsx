import React      from "react"
import { remote } from 'electron'
import fs         from 'fs' 

export default class extends React.Component {
    componentWillMount() {}
    componentDidMount() {}
    render() {
        const {
            musicLibrary,
            musicApi: {
                addBaseDir,
            }
        } = this.props
        console.log(musicLibrary, "test")
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
                    musicLibrary.map((x, xi) =>
                        <div
                            key={xi}
                        >
                            <strong>{x.dirName}</strong>
                            {x.musicList && x.musicList.map((y, yi) => 
                                <div
                                    key={yi}
                                >
                                    {y.filePath}
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
