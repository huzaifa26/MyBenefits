import React from 'react';


class CustomerDetailsComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
            loading: props.loading,
            code: props.code,
            request: props.request,
            messages: props.messages,
            fastLane: props.fastLane,
            buttons: props.buttons,
            colors: props.colors,
            barcodeScanner: props.barcodeScanner,
    };

    this.handleChange = this.handleChange.bind(this);

}



handleChange(e) {
  const { name, value } = e.target;
  this.props.onChange(e);


  this.setState({ [name]: value });
}

render() {
  var {loading, request, colors} = this.state;
  return (
<div>
<div className="request ">
            <div className=""
              style={{ backgroundColor: colors.msgBox} }
              tabIndex="-1"
              role="document">

              <div style={{paddingBottom:"20px"}}>
                <h3><strong>פרטי בקשה:</strong></h3>
                </div>
              <div>
                {!loading && request &&
                  <div>
                      <div className="row align-items-top">
                          <div className="col-md-4">
                              <label><strong>שם הלקוח:</strong></label>
                        </div>
                        <div className="col-md-8">
                              <p>{request.customer.firstName + " " + request.customer.lastName}</p>
                        </div>
                      </div>
                      
                      {request.type === "purchase" &&
                      <div>
                        {(request.offerType === "prepaid" || request.offerType === "free") &&
                          <div>
                            <div className="row align-items-top">
                                <div className="col-md-4">
                                 <label><strong>בקשה:</strong></label>
                                </div>
                                <div className="col-md-8">
                                    <p>רכישה</p>
                                </div>
                            </div>
                            <div className="row align-items-top">
                                <div className="col-md-4">
                                 <label><strong>מחיר:</strong></label>
                                </div>
                                <div className="col-md-8">
                                    <p>{request.offerPrice} ש"ח</p>
                                </div>
                            </div>
                            <div className="row align-items-top">
                                <div className="col-md-4">
                                 <label><strong>הלקוח צריך לשלם לך:</strong></label>
                                </div>
                                <div className="col-md-8">
                                    <p>{request.offerPrice} ש"ח</p>
                                </div>
                            </div>
                          </div>
                        }
                        {request.offerType === "punch" &&
                          <div className="row align-items-top">
                            <div className="col-md-4">
                               <label><strong>סוג הבקשה:</strong></label>
                            </div>
                            <div className="col-md-8">
                                <p>לאפשר ניקובים</p>
                            </div>
                          </div>
                        }
                        <div className="row align-items-top">
                            <div className="col-md-4">
                               <label><strong>תיאור הטבה:</strong></label>
                            </div>
                            <div className="col-md-8">
                                <p>{request.offerDescription}</p>
                            </div>
                        </div>
                      </div>
                    }
                    {request.type === "use" &&
                      <div>
                        {request.offerType === "prepaid" &&
                            <div>
                              <div className="row align-items-top">
                                  <div className="col-md-4">
                                   <label><strong>בקשה:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                      <p>שימוש בהטבה</p>
                                  </div>
                              </div>
                              <div className="row align-items-top">
                                  <div className="col-md-4">
                                   <label><strong>תיאור הטבה:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                      <p>{request.offerDescription}</p>
                                  </div>
                              </div>
                              <div className="row align-items-top">
                                  <div className="col-md-4">
                                   <label><strong>מספר הנקודות שנותרו:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                      <p>{request.pointsStatus}</p>
                                  </div>
                              </div>
                              <form>
                               <label><strong>
                                  <input
                                    placeholder="כמות הנקודות לשימוש"
                                    type="number"
                                    name="reducePoints"
                                    onChange={this.props.onChange} />
                                </strong></label>
                              </form>
                            </div>
                        }
                        {request.offerType === "punch" &&
                            <div>
                              <div className="row align-items-top">
                                  <div className="col-md-4">
                                   <label><strong>סוג הבקשה:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                      <p>ניקוב</p>
                                  </div>
                              </div>
                              <div className="row align-items-top">
                                  <div className="col-md-4">
                                   <label><strong>תיאור הטבה:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                      <p>{request.offerDescription}</p>
                                  </div>
                              </div>
                              <div className="row align-items-top">
                                  <div className="col-md-4">
                                   <label><strong>מספר הניקובים שנותרו:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                      <p>{request.pointsStatus}</p>
                                  </div>
                              </div>
                            </div>
                        }
                        {request.offerType === "free" &&
                          <div>
                            <div className="row align-items-top">
                                  <div className="col-md-4">
                                   <label><strong>סוג הבקשה:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                      <p>שימוש בהטבה</p>
                                  </div>
                            </div>
                            <div className="row align-items-top">
                                  <div className="col-md-4">
                                    <label><strong>תיאור הטבה:</strong></label>
                                  </div>
                                  <div className="col-md-8">
                                    <p>{request.offerDescription}</p>
                                  </div>
                            </div>
                          </div>
                        }
                        { request.pointsStatus === 0 &&
                           <div className="alert alert-success">
                              <strong> הלקוח זכאי לקבל הטבה זו בחינם!</strong>
                            
                            </div>
                        }
                        
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>


        </div>





  );
}
}




export { CustomerDetailsComp };