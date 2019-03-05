import React from 'react';
import PropTypes from 'prop-types';

import { userService } from '../_services';

class ApproveComp extends React.Component {
    static propTypes = {
      onCloseApprove: PropTypes.func.isRequired,
      code: PropTypes.number.isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            code: props.code,
            user: {},
            request: {},
            notFound: false,
            closeApprove: props.onCloseApprove,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCodeError = this.handleCodeError.bind(this);
        this.reloadRequest = this.reloadRequest.bind(this);
        this.approveRequest = this.approveRequest.bind(this);
    }

    componentDidMount() {
      this.reloadRequest();
    }

    reloadRequest() {
      this.setState({
        user: JSON.parse(localStorage.getItem('user')),
        request: { loading: true }
      });
      console.log(this.props.code)
      userService.getRequestByCode(this.props.code)
      .then(request => {
        console.log(request);
        this.setState({ request });
      })
      .catch(e => {
        this.handleCodeError(e);
      });
    }

    approveRequest() {
      console.log(this.state.request)
      userService.approveRequestByID(this.state.request.id, this.state.reducePoints)
      .then(request => {
        console.log(request);
        this.props.onCloseApprove();
      })
      .catch(e => {
        console.log("approve error");
        this.props.onCloseApprove();
      });
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleCodeError(e) {
      if (e.status == 404){
        this.setState({ request: { loading: false }, notFound: true })
      }
    }

    render() {
        const { request, notFound } = this.state;
        return (
            <div>
                <button type="button" onClick={this.props.onCloseApprove}>
                Close Approve
                </button>
                {request.loading &&
                    <img src="../assets/loading.gif" />
                }
                {notFound &&
                    <div>Request not found</div>
                }
                {!request.loading && !notFound &&
                    <div>
                      <h3>Request Info:</h3>
                      <div>{request.type}</div>
                      <div>{request.id}</div>
                      <div>{request.code}</div>
                      <div>{request.offerDescription}</div>
                      <div>{request.offerType}</div>
                      <div>{request.offerPrice}</div>
                      <div>{request.customerEmail}</div>
                      <div>{request.customerFirstName}</div>
                      <div>{request.customerLastName}</div>
                      {request.type == "use" &&
                        <div>
                          <div>Usage Points</div>
                          <div>{request.pointsPerchased}</div>
                          <div>{request.pointsStatus}</div>
                          <form>
                            <label>
                              <input placeholder="Number of Points" type="number" name="reducePoints" onChange={this.handleChange} />
                            </label>
                          </form>
                        </div>
                      }
                      <button onClick={this.approveRequest} >Approve</button>
                    </div>
                }
            </div>
        );
    }
}

export { ApproveComp };
