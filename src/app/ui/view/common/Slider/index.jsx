import React    from "react"
import ReactDOM from "react-dom"

import classNames from "app/ui/view/common/Slider/classNames"

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            array         : [],
            width         : 0,
            index         : undefined,
            circleIsActive: false,
            onMouseMove   : undefined,
            onMouseUp     : undefined
        })
    }

    componentDidMount() {
        const {
            min          = 0,
            max          = 1000,
            step         = 1,
            onChange,
            defaultValue = min,
        } = this.props;

        let array = [];
        for (let i = min; i <= max; i += step)
            array.push(i)

        const self = ReactDOM.findDOMNode(this);

        this.setState({
            array: array,
            index: array.indexOf(defaultValue),
            width: array.indexOf(defaultValue) / (array.length - 1),
        });

        self.addEventListener(
            "mousedown", e => {
                const updateWidth = (e) => {
                    e.preventDefault();

                    const {
                        min          = 0,
                        max          = 1000,
                        step         = 1,
                        onChange,
                        defaultValue = min,
                        disabled     = false
                    } = this.props;

                    if (!disabled) {
                        this.setState({circleIsActive: true})
                        const border = self.children[0];

                        const p     = (e.pageX - border.getBoundingClientRect().left ) / border.clientWidth;
                        const ratio = p > 0 ? p < 1 ? p : 1 : 0;
                        const index = Math.round(((max - min) / step) * ratio);

                        if (this.state.index != index) {
                            onChange && onChange(array[index]);

                            this.setState({
                                width: index / (array.length - 1),
                                index
                            });
                        }
                    }
                };
                updateWidth(e);
                this.setState({
                        onMouseMove: updateWidth,
                        onMouseUp  : () => {
                            this.setState({circleIsActive: false})
                            document.body.removeEventListener("mousemove", this.state.onMouseMove, false);
                            document.body.removeEventListener("mouseup", this.state.onMouseUp, false);
                            document.body.removeEventListener("mouseleave", this.state.onMouseUp, false);
                        }
                    },
                    () => {
                        document.body.addEventListener("mousemove", this.state.onMouseMove, false);
                        document.body.addEventListener("mouseup", this.state.onMouseUp, false);
                        document.body.addEventListener("mouseleave", this.state.onMouseUp, false);
                    }
                );
            },
            false
        );
    }

    componentWillUnmount() {
        document.body.removeEventListener("mousemove", this.state.onMouseMove, false);
        document.body.removeEventListener("mouseup", this.state.onMouseUp, false);
    }

    render() {

        const {
            min          = 0,
            max          = 1000,
            step         = 1,
            onChange,
            defaultValue = min,
            dotIsView    = false,
            className,
            disabled     = false,
            ...props
        } = this.props;

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.width == 0 && classNames.None,
                        disabled && classNames.Disabled
                    ].join(" ")
                }
                {...props}
            >
                <div
                    className={classNames.Border}
                >
                    {dotIsView && this.state.array.map(() => <div className={classNames.Dot}/>)}
                </div>
                <div
                    className={
                        [
                            classNames.Circle,
                            this.state.circleIsActive && classNames.Active
                        ].join(" ")
                    }
                    style={{
                        left: (this.state.width * 100) + "%"
                    }}
                />
                <div
                    className={classNames.LeftBorder}
                    style={{
                        width: (this.state.width * 100) + "%"
                    }}
                />
                <div
                    className={
                        [
                            classNames.RippleCircle,
                            this.state.circleIsActive && classNames.Active
                        ].join(" ")
                    }
                    style={{
                        left: (this.state.width * 100) + "%"
                    }}
                />
            </div>
        )
    }
};
