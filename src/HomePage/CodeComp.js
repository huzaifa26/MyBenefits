import React from 'react';
import { PadComp, CustomerDetailsComp } from './index';
import { Button,Modal } from 'react-bootstrap'
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
            fastLane: false,
            buttons: {},
            colors: { msgBox: "#FFFFFF" },
            barcodeScanner: { isScannerVerify: false, isCodeStarted: false, scannerString: "", code: "" },
            showModal: false,
            modal:{instructions :this.renderModalMessage("OK"), class: "modalTitleOk"}
        };

        this.renderModalMessage = this.renderModalMessage.bind(this);
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
          if (ScannerActivationCode === scannerString){
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
          this.setState({ code: barcodeScanner.code, fastLane: true});
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
        code: "",
        request: null,
        messages: "ENTER_CODE",
        fastLane: false,
        buttons: { ok_action: null },
        colors: { msgBox: "#FFFFFF" },
        barcodeScanner: { isScannerVerify: false, isCodeStarted: false, scannerString: "", code: "" },
        showModal:false,
        modal:{instructions :this.renderModalMessage("OK"), class: "modalTitleOk"},
      });
      this.clearLetters();
    }

    setReducedPoints = (e) => {
      this.setState({reducePoints: e.target.value})
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
        
      }
      this.clearLetters();
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
            showModal:true,
            buttons: {ok_action: this.approveRequest},
          });
          if (this.state.fastLane){
            this.setState({colors: {...this.state.colors, msgBox: "aqua" }});
          }
        })
        .catch(e => {
          this.handleCodeError(e);
        });
      }
    }

    cancelRequest() {
      this.initFields();
      this.setState({ messages: "REQUEST_CANCELD"});
      this.clearLetters();
    }

    goToConfirm() {
      this.setState({
        buttons: { ok_action: this.approveRequest },
        messages: "ARE_YOU_SURE",
      });
    }

    requestAprove() {
      this.initFields();
      this.setState({
        messages: "CONTINUE",
      });
      
      
    }

    renderModalMessage(messages) {
      switch(messages) {
        case "NUMBER_TOO_BIG":
          return("מס' הנקודות לשימוש גבוה מידי")
        case "OK":
          return("יש לוודא את פרטי הבקשה ולאשרם")
        default:
          return("יש לוודא את פרטי הבקשה ולאשרם")
      }
    }

    approveRequest() {
      this.setState({
        loading: false,
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
      if (reducePoints>this.state.request.pointsStatus){
        console.log ("reducePoints = " + reducePoints +"; pointsStatus = "+this.state.request.pointsStatus)
        this.setState({modal : {class:"bg-danger", instructions: this.renderModalMessage("NUMBER_TOO_BIG")}})
      }
        console.log("approve error");
        this.handleCodeError(e);
      });
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
          return(<div className="alert alert-danger alert-dismissible" role="alert">האם אתה בטוח שברצונך לאשר בקשה זו ? &quot;ל?</div>)
        case "INVALID_CODE":
          return(<div className="alert alert-warning alert-dismissible" role="alert" >קוד לא תקין, יש להשתמש בספרות בלבד</div>)
        case "REQUEST_CANCELD":
          return(<div className="alert alert-info" role="alert"><b>הבקשה בוטלה.</b> הזן או סרוק קוד חדש</div>)
        case "CONTINUE":
          return(<div className="alert alert-success alert-dismissible" role="alert"><b>הבקשה אושרה!</b> הזן או סרוק קוד חדש</div>)
        case "NO_ENOUGH_POINTS":
        return(<div className="alert alert-warning alert-dismissible" role="alert"> אין מספיק נקובים למימוש, נסה שנית</div>)
        case "ENTER_CODE":
          return(<div className="alert alert-info" role="alert">הזן או סרוק קוד</div>)
        default:
          return(<div className="alert alert-info" role="alert">Unknown</div>)
      }
    }


    render() {
      const { request, messages, loading, buttons, colors} = this.state;
      return (
        <div className="row justify-content-center">

          <div className="col-md-7 bla">
            <div className="">
            <div className="">
                    <h2>
                        {this.randerMessage(messages)}
                    </h2>
                </div>
              <div className="row justify-content-center">
                <div className="input-group-lg col-6 ">
              
                <input
                  id="insertCode"
                  className="code form-control input-lg justify-content-md-center input1"
                  name="code"
                  value={this.state.code}
                  onChange={this.handleChange}
                  type="number"
                  onKeyDown={this._handleKeyDown}
                  disabled={true}
                />

              </div>
              </div>

              <PadComp
                className="container"
                onClick={this.addLetter}
                onClear={this.clearLetters}
                onBackspace={this.removeOneLetter}/>

              <div style={{paddingTop:"20px"}}>
                    <button
                      className="code btn btn-warning btn-lg btn-block my-btn-shape my-yellow"
                      type="button"
                      onClick={this.checkCode}>
                      שלח!
                    </button>
             </div>

            </div>

          </div>

          {/* <div className="request col-md-5">
            <div
              className="modal-content modal-dialog modal-dialog-top"
              style={{ backgroundColor: colors.msgBox} }
              tabIndex="-1"
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
                            <div className="alert alert-success"><h3> מחיר:  {request.offerPrice} ש"ח </h3></div>
                            <div className="alert alert-succes"><h3>
                              <strong> הלקוח צריך לשלם לך :{request.offerPrice} ש"ח </strong>
                            </h3>
                            </div>
                          </div>
                        }
                        {request.offerType === "punch" &&
                          <div className="alert alert-warning">
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
                          <div className="alert bg-warning">
                            <div className="alert alert-warning"><h3><strong> סוג הבקשה: </strong>שימוש בהטבה</h3></div>
                            <div className="alert alert-warning"><h3><strong>תיאור הטבה: </strong>{request.offerDescription}</h3></div>
                            <div className="alert alert-warning"><h3><strong>
                              מספר הנקודות שנותרו:
                              </strong><span className="label label-primary" >{request.pointsStatus}</span></h3>
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
                            <div className="alert alert-Warning"><h3><strong> סוג הבקשה: </strong>ניקוב</h3></div>
                            <div ><h3><strong> תיאור הטבה: </strong>{request.offerDescription}</h3></div>
                            <div><h3>
                            <strong> מספר הניקובים שנותרו:</strong>
                              {request.pointsStatus}
                              </h3></div>
                          </div>
                        }
                        {request.offerType === "free" &&
                          <div>
                            <div className="alert alert-Warning"><h3><strong> סוג הבקשה: </strong>שימוש בהטבה</h3></div>
                            <div ><h3><strong> תיאור הטבה: </strong>{request.offerDescription}</h3></div>
                          </div>
                        }
                        { request.pointsStatus === 0 &&
                           <div className="alert alert-danger"><h3>
                              <strong> הלקוח זכאי לקבל הטבה זו בחינם!</strong>
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
          </div> */}

          

          <div>
                <Modal show={this.state.showModal} className="my-modal show" >
                  <Modal.Header className={this.state.modal.class}>
                      <Modal.Title >{this.state.modal.instructions}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <CustomerDetailsComp
                            loading= { loading }
                            code= { this.code }
                            request= { request }
                            messages= { messages }
                            fastLane= { this.fastLane }
                            buttons= { buttons }
                            colors= { colors }
                            barcodeScanner= { this.barcodeScanner }
                           className="container"
                           onChange={this.setReducedPoints}/>
                  </Modal.Body>
                  <Modal.Footer>
                  <div className="modal-footer border-0" >
                <Button
                  type="button"
                  className="btn btn-outline-primary mr-auto btn-lg btn-block"
                  onClick={buttons.ok_action}>אישור</Button>
                <Button
                  type="button"
                  styles="margin-top=0"
                  className="btn btn-outline-secondary mr-auto btn-lg"
                  onClick={this.cancelRequest}>ביטול</Button>
              </div>
                  </Modal.Footer>
                </Modal>
            </div>







        </div>
      );
    }
}

export { CodeComp };
