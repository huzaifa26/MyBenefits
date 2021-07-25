import React from 'react';
import { userService } from '../_services';
import Moment from 'react-moment';

class HistoryComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
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
        const { history, loading } = this.state;
        return (
            <div>

            {(loading) && 
              <div className="row justify-content-center text-center mt-4">
              <p className="reportheader col-lg-8 justify-content-center">טוען...</p>
              </div>
            }
              
              {(!loading && history && Object.keys(history).length>0) &&
              <div className="row justify-content-center">
              <p className="reportheader col-lg-8 justify-content-center">דוח פעולת יומי:</p>
              </div>
            }

            {(!loading && (!history || Object.keys(history).length===0)) && 
              <div className="row justify-content-center text-center mt-4">
              <p className="reportheader col-lg-8 justify-content-center">לא נעשו עדיין פעולות היום</p>
              </div>
            }

              <div className="content">
                {!loading && history && history.map((benefit, index) =>
                <div className="row justify-content-center" key={index}>
                    <div className="card col-lg-8" key={benefit.id}>
                      <div className="card-body">
                      {benefit.objectType==="canceled" &&
                      <div className="row align-items-top pb-2">
                            <div className="col-md-12 bg-danger text-center">
                                <strong>פעולה בוטלה</strong>
                        </div>
                      </div>
                     }
                        <div className="row align-items-top pb-2">
                            <div className="col-md-2">
                                <strong>תאריך:</strong>
                          </div>
                          <div className="col-md-10">
                               <Moment interval={100} format="HH:mm | DD/MM/YYYY">{new Date(benefit.createDate)}</Moment>
                          </div>
                        </div>
                        {benefit.objectType!=="canceled" &&
                        <div className="row align-items-top  pb-2">
                            <div className="col-md-2">
                                <strong>פעולה:</strong>
                          </div>
                          <div className="col-md-10">
                            {benefit.objectType === "purchased" && <div>רכישה</div>}
                            {benefit.objectType === "usage" && <div>שימוש</div> }
                          </div>
                        </div>
                        }

                        <div className="row align-items-top  pb-2">
                            <div className="col-md-2">
                                <strong>הטבה:</strong>
                          </div>
                          <div className="col-md-10">
                              {benefit.objectType!=="canceled" && benefit.offerDescription}
                              {benefit.objectType==="canceled" && benefit.benefitOffer.description}
                          </div>
                        </div>
                        
                        {benefit.objectType === "purchased" && benefit.type !== "punch" &&
                        <div className="row align-items-top  pb-2">
                            <div className="col-md-2">
                                <strong>מחיר:</strong>
                          </div>
                          <div className="col-md-10">
                                במחיר {benefit.price} שח
                          </div>
                        </div>
                        }

                        <div className="row align-items-top  pb-2">
                            <div className="col-md-2">
                                <strong>שם הלקוח:</strong>
                          </div>
                          <div className="col-md-10">
                              {benefit.customer.firstName + ' ' + benefit.customer.lastName}
                          </div>
                        </div>

                        <div className="row align-items-top  pb-2">
                            <div className="col-md-2">
                                <strong>מס טלפון:</strong>
                          </div>
                          <div className="col-md-10">
                              {benefit.customer.phoneNo}
                          </div>
                        </div>

                        {benefit.objectType === "usage" &&
                        <div className="row align-items-top  pb-2">
                            <div className="col-md-2">
                                <strong>נקודות שירדו:</strong>
                          </div>
                          <div className="col-md-10">
                              {benefit.pointsReduced}
                          </div>
                        </div>
                        }

                        <div className="row align-items-top  pb-2">
                            <div className="col-md-2">
                                <strong>נקודות שנשארו:</strong>
                          </div>
                          <div className="col-md-10">
                              {benefit.pointsStatus}
                          </div>
                        </div>
                        
                        {index >= 0 && index <=0 && (benefit.objectType === "purchased" || benefit.objectType === "usage") &&
                        <div className="row justify-content-center">
                            <button
                              className="code btn btn-danger col-6 my-btn-shape"
                              type="button"
                              onClick={()=> this.undoTransaction(benefit.objectType, benefit.id)} >
                            בטל פעולה
                          </button>
                        </div>
                        }

                        
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        );
    }
}

export { HistoryComp };
