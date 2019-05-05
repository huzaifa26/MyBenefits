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
            messages: null,
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
        messages: null,
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
            buttons: {ok: true, ok_action: this.goToConfirm , cancel: true},
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
          return(<div className="text-danger">בקשה לא נמצאה</div>)
        case "REQUEST_SHOW":
          return(<div className="text-warning">אנא אשר או בטל את הבקשה הבאה</div>)
        case "ARE_YOU_SURE":
          return(<div className="text-danger">האם אתה בטוח שברצונך לאשר את הבקשה הנ&quot;ל?</div>)
        case "INVALID_CODE":
          return(<div className="text-warning">קוד לא תקין, יש להשתמש בספרות בלבד</div>)
        case "REQUEST_CANCELD":
          return(<div className="text-danger">הבקשה בוטלה. הקש אישור להמשך</div>)
        case "CONTINUE":
          return(<div className="text-success">הבקשה אושרה! הקש אישור להמשך</div>)
        case "NO_ENOUGH_POINTS":
        return(<div className="text-warning"> אין מספיק נקובים למימוש, נסה שנית</div>)
        default:
          return(<div> הזן קוד משמאל</div>)
      }
    }


    render() {
      const { request, messages, loading, buttons } = this.state;
      return (
        <div className="row col-md-12">
          <div className="code col-md-4">

            <div
              className="modal1 modal-content modal-dialog modal-dialog-top"
              tabIndex="-1">

              <input
                id="insertCode"
                className="code"
                name="code"
                value={this.state.code}
                onChange={this.handleChange}
                disabled={!buttons.check}
                type="number"
                placeholder ="הקלד קוד"
                onKeyDown={this._handleKeyDown}
              />

              <PadComp
                className="container"
                onClick={this.addLetter}
                onClear={this.clearLetters}
                onBackspace={this.removeOneLetter}/>

              <button
                className="code btn btn-primary"
                type="button"
                onClick={this.checkCode}
                disabled={!buttons.check}>
                שליחת קוד להצגת בקשה
              </button>

            </div>

          </div>

          <div className="request col-8">
            <div
              className="modal-content modal-dialog modal-dialog-top"
              tabIndex="-1"
              role="document">
              <div className="modal-header border-0">
                <h5 className="modal-title border-0">
                  {this.randerMessage(messages)}
                </h5>
              </div>

              <div className="modal-body border-0">
                {!loading && request &&
                  <div>
                    <h3 >
                      : פרטי הבקשה
                    </h3>

                    <div>
                      {request.customer.firstName + " " + request.customer.lastName + "(" + request.customer.phoneNo + ")"}
                    </div>

                    {request.type === "purchase" &&
                      <div>
                        {(request.offerType === "prepaid" || request.offerType === "free") &&
                          <div>
                            <div>מבקש לרכוש</div>
                            <div> ב - {request.offerPrice} שח</div>
                          </div>
                        }
                        {request.offerType === "punch" &&
                          <div>
                            <div>לאפשר מימושים של:</div>
                          </div>
                        }
                        <div>
                          {request.offerDescription}
                        </div>
                      </div>
                    }
                    {request.type === "use" &&
                      <div>
                        {request.offerType === "prepaid" &&
                          <div>
                            <div>מבקש לממש </div>
                            <div>{request.offerDescription}</div>
                            <div>
                              מספר הניקובים שנותרו:
                              {request.pointsStatus}
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
                            <div>לסמן את</div>
                            <div>{request.offerDescription}</div>
                            <div>
                              מספר הניקובים שנותרו:
                              {request.pointsStatus}
                            </div>
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
                  className="btn btn-primary "
                  onClick={buttons.ok_action}
                  disabled={!buttons.ok}>אישור</button>
                <button
                  type="button"
                  className="btn btn-secondary mr-auto"
                  onClick={this.cancelRequest}
                  disabled={!buttons.cancel}>ביטול</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export { CodeComp };
