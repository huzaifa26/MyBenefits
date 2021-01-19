import React from 'react';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import { CodeComp, RequestComp, HistoryComp, HistorySelectorComp,AddBenefitToClient } from './index';

import { userService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            business: {},
            code: {},
            showRequest: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.closeApprove = this.closeApprove.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            business: { loading: true }
        });
        userService.getInfo()
        .then(business => this.setState({ business }))
        .catch(e => {
          console.log("getInfo error");
          return ( <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} /> )
        });
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    checkCode() {
      //event.preventDefault();
      this.setState({ showRequest: true })
    }

    closeApprove() {
      //event.preventDefault();
      this.setState({ showRequest: false })
    }

    render() {
        const { business } = this.state;
        return (
            <div className="page">
              <div>
              { this.props.location.pathname === '/' ?
                <Redirect to='/code' />
                : null
              }
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbarCollapse">
                <a className="navbar-brand" href="#">שלום {business.name}!</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="nav navbar-nav mr-auto">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <NavLink className="nav-link nav-item" to="/code" role="presentation">
                    <h5 >הזן קוד</h5>
                  </NavLink>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <NavLink className="nav-link nav-item" to="/history/daily" role="presentation">
                    <h5>דוח יומי</h5>
                  </NavLink>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                      <NavLink className="nav-link nav-item" to="/Add_Benefit_To_Client" role="presentation">
                    <h5>הוסף הטבה ללקוח</h5>
                  </NavLink>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-left">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className="nav-link" to="/login">
                      <h5>התנתק</h5>
                    </Link>
                      </li>
                  </ul>
                </div>
              </nav>

              </div>
            <div className="container">
                  <Route path="/code" component={CodeComp} />
                  <Route path="/requests" component={RequestComp} />
                  <Route path="/history/daily"
                    render={() => <HistoryComp prevDays="1" />}
                  />
                  <Route path="/history/month" component={HistorySelectorComp}/>
                  <Route path="/Add_Benefit_To_Client" component={AddBenefitToClient}/>
            </div>
            </div>
        );
    }
}

export { HomePage };
