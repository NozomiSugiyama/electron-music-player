import React      from "react"
import { remote } from 'electron'
import fs         from 'fs'
import setState   from "app/util/setState"

const localStorageKey = "MusicApi-baseDirsPath"
/*
// MusicLibraries
[
    // MusicLibrary
    {
        dirName: "path/to/"
        musicList: [
            [
                // Music
                {
                    filePath: "/path/to/sample.mp3"
                    fileName: "sample.mp3",
                    audio: `Audio`
                },
            ],
        ]
    }
]
*/

const getMusicLibrary = async directoryName => ({
    directoryName: directoryName,
    musicList    : await new Promise((resolve, reject) => 
        fs.readdir(directoryName, (err, fileNames) => {
            if (err) reject(err);
            resolve (
                fileNames
                    .filter(fileName => {
                        try {
                            return fs.statSync(`${directoryName}/${fileName}`).isFile() && /.*\.mp3$/.test(fileName)
                        } catch (e) {
                            console.error(e);
                            return false
                        }
                    })
                    .map(fileName => {
                        const data = fs.readFileSync(`${directoryName}/${fileName}`)
                        return ({
                            filePath: `${directoryName}/${fileName}`,
                            fileName,
                            audio: new Audio('data:audio/ogg;base64,' + new Buffer(data).toString('base64'))
                        })
                    })
            )
        })
    )
})

const getMusicLibraries = () => Promise.all(
    JSON.parse(
        localStorage.getItem(localStorageKey)
    )
        .map(async x => await getMusicLibrary(x))
)

export default class extends React.Component {

    componentWillMount() {
        this.setState({
            musicLibrary: []
        })
    }

    componentDidMount() {
        (async () => {
            if (!localStorage.getItem(localStorageKey)) localStorage.setItem(localStorageKey, "[]") && console.log(1)

            this.setState({
                musicLibrary: await getMusicLibraries(),
                syncBaseDir: async () => {
                    const musicLibrary = await getMusicLibraries()
                    await setState(
                        this,
                        {
                            musicLibrary: musicLibrary
                        }
                    )
                    return musicLibrary
                }
            })
        })()
    }

    componentWillUnmount() {
    }

    render() {

        const {
            render,
            ...props
        } = this.props

        return render({
            musicLibrary: this.state.musicLibrary,
            musicApi: {
                syncBaseDir: this.state.syncBaseDir,
                addBaseDir: async () => {
                    const baseDirPath = remote.dialog.showOpenDialog(null, {
                        properties: ['openDirectory', 'multiSelections'],
                        title: 'Select base directory',
                        defaultPath: '~/',
                    });
                    if (baseDirPath) {
                        const prevBaseDirs = JSON.parse(
                            localStorage.getItem(localStorageKey)
                        )
                        if (!prevBaseDirs.find(baseDirPath)) {
                            localStorage.setItem(
                                localStorageKey,
                                JSON.stringify(
                                    JSON.parse(
                                        localStorage.getItem(localStorageKey)
                                    )
                                        .concat(baseDirPath)
                                )
                            )
                            await this.state.syncBaseDir()
                        }
                    }
                },
                removeBaseDir: async dirPath => {
                    localStorage.setItem(
                        localStorageKey,
                        JSON.stringify(
                            JSON.parse(
                                localStorage.getItem(localStorageKey)
                            )
                                .filter(x => x !== dirPath)
                        )
                    )

                    await this.state.syncBaseDir()
                }
            },
            ...props
        })
    }
}
