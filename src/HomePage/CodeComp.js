import React from 'react';
import { PadComp } from './index';

import { userService } from '../_services';

const ScannerActivationCode = "~&</>";
class CodeComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            code: "",
            request: null,
            messages: "ENTER_CODE",
            buttons: {check: true, ok: false, cancel: false},
            barcodeScanner: { isScannerVerify: false, isCodeStarted: false, scannerString: "", code: "" },
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.initFields = this.initFields.bind(this);
        this.goToConfirm = this.goToConfirm.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.approveRequest = this.approveRequest.bind(this);
        this.addLetter = this.addLetter.bind(this);
        this.removeOneLetter = this.removeOneLetter.bind(this);
        this.clearLetters = this.clearLetters.bind(this);
        this.barcodeMethod = this.barcodeMethod.bind(this);
    }
    
    barcodeMethod(e){
      if (e.key === "Shift"){
        return;
      }
      const { barcodeScanner } = this.state;
      if (e.key === "~"){
        this.setState({ barcodeScanner: { ...barcodeScanner, isScannerVerify: true, scannerString: "~" }});
      } else if (barcodeScanner.isScannerVerify){
        const scannerString = barcodeScanner.scannerString + e.key;
        if (ScannerActivationCode.startsWith(scannerString)){
          // Check if activation code started
          if (ScannerActivationCode == scannerString){
            this.setState({ barcodeScanner: { ...barcodeScanner, scannerString, isScannerVerify: false, isCodeStarted: true }});
          }else {
            // Increse the activation code
            this.setState({ barcodeScanner: { ...barcodeScanner, scannerString }});
          }
        } else {
          // Reset
          this.setState({ barcodeScanner: { isScannerVerify: false, isCodeStarted: false, scannerString: "", code: "" }});
        }
      } else if (barcodeScanner.isCodeStarted){
        if (e.key === 'Enter') {
          this.setState({ code: barcodeScanner.code});
          // Reset
          this.setState({ barcodeScanner: { isScannerVerify: false, isCodeStarted: false, scannerString: "", code: "" }});
          this.checkCode();
        } else {
          const code = barcodeScanner.code + e.key;
          this.setState({ barcodeScanner: { ...barcodeScanner, code }});
        }
      }
    }

    componentDidMount(){
      document.addEventListener("keydown", this.barcodeMethod, false);
    }
    componentWillUnmount() {
       document.removeEventListener("keydown", this._handleEscKey, false);
    }



    initFields() {
      this.setState({
        loading: false,
        code: null,
        request: null,
        messages: "ENTER_CODE",
        buttons: {check: true, ok: false, ok_action: null , cancel: false},
      });
      this.clearLetters();
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleCodeError(e) {
      if (e.status === 404){
        this.setState({ loading: false, messages: "NOT_FOUND" })
      }
      if (e.status === 400){
        this.setState({ loading: false, messages: "INVALID_CODE" })
      }
    }

    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.checkCode();
      }
    }

    checkCode() {
      this.setState({
        loading: true,
      });
      if (!this.state.code){
        this.setState({ loading: false, messages: "INVALID_CODE" });
      } else {
        userService.getRequestByCode(this.state.code)
        .then(request => {
          this.setState({
            request,
            loading: false,
            messages: "REQUEST_SHOW",
            buttons: {ok: true, ok_action: this.approveRequest , cancel: true},
          });
        })
        .catch(e => {
          this.handleCodeError(e);
        });
      }
    }

    cancelRequest() {
      this.initFields();
      this.setState({ messages: "REQUEST_CANCELD",
      buttons: {ok: true, ok_action: this.initFields, cancel: false}});
      this.clearLetters();
    }

    goToConfirm() {
      this.setState({
        buttons: {ok: true, ok_action: this.approveRequest , cancel: true},
        messages: "ARE_YOU_SURE",
      });
    }

    requestAprove() {
      this.setState({
        buttons: {ok: true, ok_action: this.initFields , cancel: false},
        messages: "CONTINUE",
      });
      this.clearLetters();
    }

    approveRequest() {
      this.setState({
        loading: false,
        disableActionButtons: true,
      });
      let reducePoints = 1
      if (this.state.reducePoints){
        reducePoints = this.state.reducePoints
      }
      userService.approveRequestByID(this.state.request.id, reducePoints)
      .then(() => {
        this.requestAprove();
      })
      .catch(e => {
        console.log("approve error");
        this.handleCodeError(e);
      });
    }

    disableActionButtons() {
      this.setState({ disableApproveButton: true });
    }

    addLetter(e){
      var newcode = this.state.code + e;
      this.setState({ code: newcode });
    }
    removeOneLetter(){
      var newcode = this.state.code.slice(0, -1);
      this.setState({ code: newcode });
    }
    clearLetters(){
      this.setState({ code: "" });
    }

    randerMessage(messages) {
      switch(messages) {
        case "NOT_FOUND":
          return(<div className="alert alert-danger alert-dismissible" role="alert"> בקשה לא נמצאה, נסה שנית </div>)
        case "REQUEST_SHOW":
          return(<div className="alet alert-warning alert-dismissible" role="alert">אנא אשר או בטל את הבקשה הבאה</div>)
        case "ARE_YOU_SURE":
          return(<div className="alert alert-danger alert-dismissible" role="alert">האם אתה בטוח שברצונך לאשר את הבקשה הזו ? &quot;ל?</div>)
        case "INVALID_CODE":
          return(<div class="alert alert-warning alert-dismissible" role="alert" >קוד לא תקין, יש להשתמש בספרות בלבד</div>)
        case "REQUEST_CANCELD":
          return(<div class="alert alert-danger alert-dismissible" role="alert">הבקשה בוטלה. הקש אישור להמשך</div>)
        case "CONTINUE":
          return(<div class="alert alert-success alert-dismissible" role="alert">הבקשה אושרה! הקש אישור להמשך</div>)
        case "NO_ENOUGH_POINTS":
        return(<div className="alert alert-warning alert-dismissible" role="alert"> אין מספיק נקובים למימוש, נסה שנית</div>)
        case "ENTER_CODE":
          return(<div className="alert alert-info" role="alert"> הזן קוד </div>)
      }
    }


    render() {
      const { request, messages, loading, buttons } = this.state;
      return (
        <div className="row jumbotron">

          <div className="col-md-7 mb-4">
            <div className="modal1 modal-content modal-dialog modal-dialog-top border-0">
            <div className="border-0">
                    <h2>
                        {this.randerMessage(messages)}
                    </h2>
                </div> 
            
              <div class="input-group">
                 
                <input
                  id="insertCode"
                  className="code form-control input-lg"
                  name="code"
                  value={this.state.code}
                  onChange={this.handleChange}
                  disabled={!buttons.check}
                  type="number"
                  placeholder ="הקלד קוד"
                   onKeyDown={this._handleKeyDown}
                />
               
              </div>
                
              <PadComp
                className="container"
                onClick={this.addLetter}
                onClear={this.clearLetters}
                onBackspace={this.removeOneLetter}/>


                    <button
                      className="code btn btn-primary btn-lg btn-block"
                      type="button"
                      onClick={this.checkCode}
                      disabled={!buttons.check}>
                      שלח!
                    </button>
               

            </div>

          </div>

          <div className="request col-md-5">
            <div
              className="modal-content modal-dialog modal-dialog-top"
              role="document">
              <div className="modal-header border-0">
                        <h3 className="modal-title border-0">
                        <strong>פרטי בקשת הלקוח</strong>
                        </h3>
                      </div>

              <div className="modal-body border-0">
                {!loading && request &&
                  <div>
                
                    <div>
                      <h3><strong>שם הלקוח :</strong> {request.customer.firstName + " " + request.customer.lastName}</h3>
                    </div>

                    {request.type === "purchase" &&
                      <div>
                        {(request.offerType === "prepaid" || request.offerType === "free") &&
                          <div >
                            <div><h3><strong>בקשה:</strong> רכישה</h3></div>
                            <div class="alert alert-success"><h3> מחיר:  {request.offerPrice} ש"ח </h3></div>
                            <div class="alert alert-succes"><h3>
                              <strong> הלקוח צריך לשלם לך :{request.offerPrice} ש"ח </strong>
                            </h3> 
                            </div>
                          </div>
                        }
                        {request.offerType === "punch" &&
                          <div class="alert alert-warning">
                            <div><h3><strong >סוג הבקשה :</strong> לאפשר ניקובים</h3></div>
                          </div>
                        }
                        <div>
                        <h3><strong >תיאור הטבה :</strong> {request.offerDescription}</h3>
                        </div>
                      </div>
                    }
                    {request.type === "use" &&
                      <div>
                        {request.offerType === "prepaid" &&
                          <div class="alert bg-warning">
                            <div class="alert alert-warning"><h3><strong>בקשה:</strong> שימוש </h3></div>
                            <div class="alert alert-warning"><h3><strong>תיאור הטבה : </strong>{request.offerDescription}</h3></div>
                            <div class="alert alert-warning"><h3><strong>
                              מספר הניקובים שנותרו:
                              </strong><span class="label label-primary" >{request.pointsStatus}</span></h3>
                            </div>
                            <form>
                              <label>
                                <input
                                  placeholder="כמות הנקודות לשימוש"
                                  type="number"
                                  name="reducePoints"
                                  onChange={this.handleChange} />
                              </label>
                            </form>
                          </div>
                        }
                        {request.offerType === "punch" &&
                          <div>
                            <div class="alert alert-Warning"><h3><strong> סוג הבקשה:</strong>ניקוב</h3></div>
                            <div ><h3><strong> תיאור הבקשה:</strong>{request.offerDescription}</h3></div>
                            <div><h3>
                            <strong> מספר הניקובים שנותרו:</strong>
                              {request.pointsStatus}
                              </h3></div>
                          </div>
                        }
                        { request.pointsStatus == "0" &&
                           <div class="alert alert-danger"><h3>
                              <strong> הלקוח זכאי לכוס קפה חינם!</strong>
                            </h3> 
                            </div>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
              <div className="modal-footer border-0 justify-content-between" >
                <button
                  type="button"
                  className="btn btn-outline-primary mr-auto btn-lg btn-block"
                  onClick={buttons.ok_action}
                  disabled={!buttons.ok}
                  hidden={!buttons.ok}>אישור</button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mr-auto btn-lg btn-block"
                  onClick={this.cancelRequest}
                  disabled={!buttons.cancel}
                  hidden={!buttons.cancel}>ביטול</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export { CodeComp };
