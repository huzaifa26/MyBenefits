import React from 'react';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import { CodeComp, RequestComp, HistoryComp, HistorySelectorComp } from './index';

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
            <div>
                <nav className="navbar navbar-expand-md bg-primary navbar-light ustify-content-between" role="navigation">
                <ul className="navbar-nav col-md-12">
                <ul className="navbar-nav ">
                    <a className="navbar-brand" href="#">MyBenefitz</a>
                </ul>
                <ul className="navbar-nav mr-auto align-middle" >

                  <li className="nav-item text-success">
                    <h3><NavLink className="nav-link text-success font-weight-bold" to="/code">הזן קוד</NavLink></h3>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link"to="/history/daily"> דוח פעילות יומי</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/history/month">דוח פעילות חודשי</NavLink>
                  </li>
              </ul>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <div>
                     <h5 className="nav-link">שלום {business.name}!</h5>
                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/login">התנתק</Link>
                </li>
              </ul>
              </ul>
            </nav>
            <div className="container">
                  <Route path="/code" component={CodeComp} />
                  <Route path="/requests" component={RequestComp} />
                  <Route path="/history/daily"
                    render={() => <HistoryComp prevDays="1" />}
                  />
                  <Route path="/history/month" component={HistorySelectorComp}/>
            </div>
            </div>
        );
    }
}

export { HomePage };
