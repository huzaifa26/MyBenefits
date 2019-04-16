import React from 'react';

import { userService } from '../_services';

class PurchaseComp extends React.Component {
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
        userService.getBenefitPurchased().then(requests => this.setState({ requests }));
    }

    render() {
        const { user, requests } = this.state;
        return (
            <div>
                <h3>Purchase:</h3>
            </div>
        );
    }
}

export { PurchaseComp };
