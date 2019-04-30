import React from 'react';

import { userService } from '../_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            header_ext: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if (process.env.REACT_APP_ENV_TYPE === "test"){
          this.state.header_ext = " - TEST";
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(email, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => {
                  console.log(error);
                  this.setState({ error, loading: false })
                }
            )
            .catch(
              error => {
                console.log(error);
              }
            );
    }

    render() {
        const { email, password, submitted, loading, error, header_ext } = this.state;
        return (
          <div className="row">
            <div className="col-md-6">
              <div className="card">
              <div className="card-body">
                <h2>התחברות ל-MyBenefitz{header_ext}</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">כתובת מייל</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">יש להזין כתובת מייל</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">סיסמא</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">יש להזין סיסמא</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>התחברות</button>
                        {loading &&
                          <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">טוען...</span>
                          </div>
                        }
                    </div>
                    {error &&
                      <div className="alert alert-danger">בעיה בהתחברות</div>
                    }
                </form>
              </div>
              </div>
            </div>
          </div>
        );
    }
}

export { LoginPage };
