import React      from "react"
import { remote } from 'electron'
import fs         from 'fs' 

export default class extends React.Component {
    componentWillMount() {}
    componentDidMount() {}
    render() {
        return(
            <div>
                <span>test</span>
                <button
                    onClick={() => {
                        const filenames = remote.dialog.showOpenDialog(null, {
                            properties: ['openFile'],
                            title: 'Select music',
                            defaultPath: '.',
                            filters: [
                                {name: 'text file', extensions: ['mp3', 'mp4', 'aac']}
                            ]
                        });

                        console.log(filenames)
                        const data = fs.readFileSync(
                            filenames[0]
                        )

                        const base64 = new Buffer(data).toString('base64');
                        const audio = new Audio('data:audio/ogg;base64,' + base64);
                        audio.play();

                    }}
                >
                    select file
                </button>
            </div>
        )
    }
}
