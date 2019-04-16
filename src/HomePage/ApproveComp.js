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
            showRequest: false,
            isEmpty: true,
            disableActionButtons: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCodeError = this.handleCodeError.bind(this);
        this.reloadRequest = this.reloadRequest.bind(this);
        this.initFields = this.initFields.bind(this);
        this.approveRequest = this.approveRequest.bind(this);
    }

    initFields() {
      this.setState({
        user: JSON.parse(localStorage.getItem('user')),
        request: { },
        notFound: false,
        showRequest: false,
        isEmpty: true,
        disableActionButtons: true,
      });
    }
    componentDidMount() {
      this.reloadRequest();
    }

    reloadRequest() {
      this.setState({
        user: JSON.parse(localStorage.getItem('user')),
        request: { loading: true },
        showRequest: false,
      });
      console.log(this.props.code)
      userService.getRequestByCode(this.props.code)
      .then(request => {
        console.log(request);
        var disableApproveButton = (request.type === "use");
        this.setState({ request, disableApproveButton, showRequest: true });
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
      this.setState({ [name]: value , disableApproveButton: false});
    }

    handleCodeError(e) {
      if (e.status === 404){
        this.setState({ request: { loading: false }, notFound: true })
      }
    }

    render() {
        const { request, showRequest, notFound, isEmpty, disableActionButtons } = this.state;
        return (
            <div>
              {isEmpty &&
                <div>הזן קוד</div>
              }
              {notFound &&
                <div>בקשה לא נמצאה</div>
              }
              {request.loading &&
                  <img src="../assets/loading.gif" alt="loading"/>
              }
              {!request.loading && !notFound && showRequest &&
                  <div>
                    <h3>פרטי הבקשה</h3>
                    <div>{request.customer.firstName}</div>
                    <div>{request.customer.LastName}</div>
                    <div>{request.offerDescription}</div>
                    <div>{request.type}</div>
                    <div>{request.id}</div>
                    <div>{request.code}</div>
                    <div>{request.offerType}</div>
                    <div>{request.offerPrice}</div>
                    <div>{request.customer.email}</div>
                    <div>{request.customer.phoneNo}</div>
                    {request.type === "use" &&
                      <div>
                        <div>מצב נקודות</div>
                        <div>{request.pointsPerchased}</div>
                        <div>{request.pointsStatus}</div>
                        <form>
                          <label>
                            <input placeholder="כמות הנקודות לשימוש" type="number" name="reducePoints" onChange={this.handleChange} />
                          </label>
                        </form>
                      </div>
                    }
                    <div className="btn-group justify-content-between" >
                    <button onClick={this.approveRequest} disable={disableActionButtons} >אישור</button>
                    <button onClick={this.initFields} disable={disableActionButtons} >ביטול</button>
                    </div>
                  </div>
              }
            </div>
        );
    }
}

export { ApproveComp };
