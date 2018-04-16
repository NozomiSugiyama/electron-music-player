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
            musicLibraries: []
        })
    }

    componentDidMount() {
        (async () => {
            if (!localStorage.getItem(localStorageKey)) localStorage.setItem(localStorageKey, "[]")

            this.setState({
                musicLibraries: await getMusicLibraries(),
                syncBaseDir: async () => {
                    const musicLibraries = await getMusicLibraries()
                    await setState(
                        this,
                        {
                            musicLibraries
                        }
                    )
                    return musicLibraries
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
            musicLibraries: this.state.musicLibraries,
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
                        if (!prevBaseDirs.find(x => baseDirPath.includes(x))) {
                            localStorage.setItem(
                                localStorageKey,
                                JSON.stringify(
                                    prevBaseDirs.concat(baseDirPath)
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
