import React from 'react';

import { userService } from '../_services';

class UsageComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            requests: [],
        };
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            requests: { loading: true }
        });
        userService.getRequsts().then(requests => this.setState({ requests }));
    }

    render() {
        const { user, requests } = this.state;
        return (
            <div>
                <h3>Usage:</h3>
            </div>
        );
    }
}

export { UsageComp };
