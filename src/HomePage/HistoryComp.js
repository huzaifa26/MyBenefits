import React from 'react';
import { userService } from '../_services';
import Moment from 'react-moment';

class HistoryComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            errorMessage: null,
            history: [],
            timeRange: {
              prevDays: props.prevDays,
              fromDate: props.fromDate,
              toDate: props.toDate,
            }
        };

        this.undoTransaction = this.undoTransaction.bind(this);
        this.loadHistory = this.loadHistory.bind(this);
    }

    componentDidMount() {
      this.loadHistory();
    }

    loadHistory(){
      this.setState({
          loading: true,
      });
      userService.getDailyHistory(this.state.timeRange)
      .then(history => {
        this.setState({ history, loading: false });
      })
      .catch(e => {
        console.log("Load Error: ");
        console.log(e);
        this.setState({
            loading: false,
            errorMessage: "שגיאה בטעינת הנתונים",
        });
      });
    }

    undoTransaction(type, id) {
      this.setState({
          loading: true,
          history: [],
      });
      userService.undoTransaction(type, id)
      .then(() => {
        this.loadHistory();
      })
      .catch(e => {
        console.log("Undo Error: " + e);
        this.setState({
            loading: false,
            errorMessage: "שגיאה במחיקת הפעולה",
        });
      });
    }

    render() {
        const { history, loading, errorMessage } = this.state;
        return (
            <div className="jumbotron">
              {loading &&
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">טוען...</span>
                </div>
              }
              {errorMessage &&
                <div className="text-danger">{errorMessage}</div>
              }
              <div className="content">
                {history && history.map((benefit, index) =>
                    <div className="card" key={benefit.id}>
                      <div className="card-body">
                        <div><Moment format="YYYY-MM-DD HH:mm">{new Date(benefit.createDate)}</Moment></div>
                        {benefit.objectType === "purchased" &&
                          <div>בקשת רכישה</div>
                        }
                        {benefit.objectType === "usage" &&
                          <div>בקשת שימוש</div>
                        }
                        {benefit.objectType === "canceled" &&
                          <div>ביטול פעולה</div>
                        }
                        <div>{benefit.offerDescription}</div>
                        {benefit.objectType === "purchased" && benefit.type !== "punch" &&
                          <div>במחיר {benefit.price} שח</div>
                        }
                        <div>{benefit.customer.firstName + ' ' + benefit.customer.lastName}</div>
                        <div>{benefit.customer.phoneNo}</div>
                        {index === 0 && (benefit.objectType === "purchased" || benefit.objectType === "usage") &&
                          <button
                            className="code btn btn-danger"
                            type="button"
                            onClick={()=> this.undoTransaction(benefit.objectType, benefit.id)} >
                            בטל פעולה
                          </button>
                        }
                      </div>
                    </div>
                )}
              </div>
            </div>
        );
    }
}

export { HistoryComp };
