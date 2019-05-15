import React from 'react';

import { userService } from '../_services';

class RequestComp extends React.Component {
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
        const { requests } = this.state;
        return (
            <div>
                <h3>Requsts Pending:</h3>
                {requests.loading && <em>Loading Requests...</em>}
                {requests.length &&
                    <ul>
                        {requests.map((request, index) =>
                            <li key={request.id}>
                                {request.type + ' ' + request.customerFirstName}
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { RequestComp };
