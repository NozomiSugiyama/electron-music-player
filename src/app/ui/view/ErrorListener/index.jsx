import React    from "react"
import Error    from "app/ui/view/Error"

import classNames from "app/ui/view/ErrorListener/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            errors: []
        })
    }

    render() {
        const {
            component = "div",
            Component = component,
            children,
            ...props
        } = this.props

        return (
            <Component
                className={classNames.Host}
            >
                {React.cloneElement(
                    children,
                    {
                        onError: e => this.setState({
                            errors: this.state.errors.concat({
                                error: e,
                                key  : Date.now()
                            })
                        })
                    }
                )}
                {/* {this.state.errors.map(x => console.log(x))} */}
            </Component>
        )
    }
}