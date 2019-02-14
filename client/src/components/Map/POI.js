import React, {Component} from 'react';
import {Marker, Popup, NavigationControl} from 'react-map-gl';
import Pin from './Pin';

class POI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classNames: ["fade-in-hidden"],
        }
    }

    componentDidMount() {
        const _this = this;
        setTimeout(function() {
            let classNames = _this.state.classNames;
            classNames.push("fade-in-visible");
            _this.setState({classNames: classNames, style: {opacity: 1, transition: "all 1s ease"}});
        }, 10);

    }

    componentWillUnmount() {
        let classNames = this.state.classNames;
        Array.prototype.splice.call(classNames, 1, 1);
        this.setState({classNames: classNames});
    }

    render() {
        return (
            <div className={Array.prototype.join.call(this.state.classNames, " ")} >
                <Marker
                    longitude={this.props.longitude}
					latitude={this.props.latitude}
                    >
                    <Pin size={20} />
                </Marker>
            </div>
        )
    }
}

export default POI;
