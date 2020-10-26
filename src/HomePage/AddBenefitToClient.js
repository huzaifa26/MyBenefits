import React from 'react';
import { PadComp,CodeComp,PadModalComp } from './index';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import { userService } from '../_services';
import { Button,Modal } from 'react-bootstrap'


const ScannerActivationCode = "~&</>";
class AddBenefitToClient extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            code: "",
            request: null,
            messages: "CHOOSE_BENEFIT",
            fastLane: false,
            buttons: {check: true, ok: false, cancel: false, back: false},
            colors: { msgBox: "#FFFFFF" },
            barcodeScanner: { isScannerVerify: false, isCodeStarted: false, scannerString: "", code: "" },
            benefits:[],
            selectedBenefit:null,
            showHide : false,
            pointsLeft : -1
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
        this.updateCodeFunc = this.updateCodeFunc.bind(this);
    }
    toggleModal() {
      console.log("modal show: " + this.state.showHide + " to " + !this.state.showHide)
      this.setState({ showHide: !this.state.showHide })
    }
    openModal() {
      if (this.state.pointsLeft==-1){
        console.log("ponts: " + this.state.pointsLeft)
        this.setState({ loading: false, messages: "POINTS_NOT_FILLED" });
        return;
      }else{
        this.toggleModal()
      }
  }
  CancelAndHide(){
    this.toggleModal()
    this.setState({messages: "CHOOSE_BENEFIT", code:""});
  }

  SendAndHideOnApproval(){
   //console.log("code: "+ this.state.code + "selectedBenefitId: "+ this.state.selectedBenefit.id + "pointsLeft: "+ this.state.pointsLeft );
    this.setState({
      loading: true,
    });
      userService.postAddBenefitToUser(this.state.selectedBenefit.id,this.state.code,this.state.pointsLeft)
      .then(request => {
        this.setState({
          request,
          loading: false,
          messages: "APPROVED",
          buttons: {ok: false, ok_action: this.approveRequest , cancel: false, back: true},
        });
        this.openModal();
        if (this.state.fastLane){
          this.setState({colors: {...this.state.colors, msgBox: "aqua" }});
        }
      })
      .catch(e => {
        this.handleCodeError(e);
        this.toggleModal();

      });
    
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
      //load benefits
      userService.getBusinessBenefits()
      .then(benefits => this.setState({ benefits }))
      .catch(e => {
        console.log("getBusinessBenefits error");
        return ( <Redirect to={{ pathname: '/', state: { from: this.props.location } }} /> )
      });
    }
    componentWillUnmount() {
       document.removeEventListener("keydown", this._handleEscKey, false);
    }



    initFields() {
      this.setState({
        selectedBenefit : null,
        pointsLeft : -1,
        selectedBenefit:null,
        showHide : false,
        loading: false,
        code: "",
        request: null,
        messages: "CHOOSE_BENEFIT",
        fastLane: false,
        buttons: {check: true, ok: false, ok_action: null , cancel: false},
        colors: { msgBox: "#FFFFFF" },
        barcodeScanner: { isScannerVerify: false, isCodeStarted: false, scannerString: "", code: "" },
      });
      this.clearLetters();
    }

    handleChange(e) {
      this.setState({ pointsLeft: e.target.value });
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
            buttons: {ok: false,  cancel: false, back:true},
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
      this.setState({ messages: "CHOOSE_BENEFIT", buttons: {cancel: false}});
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

    updateCodeFunc(e){
      this.setState({ code: e });
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

    renderBackButtonText(){
      console.log(this.state.messages)
      switch(this.state.messages) {
        case "APPROVED":
          return(<div>אישור</div>)
        default: 
          return(<div>ביטול</div>)
      }
    }

    randerMessage(messages) {
      switch(messages) {
        case "NOT_FOUND":
          return(<div className="alert alert-danger alert-dismissible" role="alert"> הקוד לא נמצא, אנא נסה שנית </div>)
        case "INVALID_CODE":
          return(<div className="alert alert-warning alert-dismissible" role="alert" >קוד לא תקין, יש להשתמש בספרות בלבד</div>)
        case "APPROVED":
          return(<div className="alert alert-success alert-dismissible" role="alert">הבקשה אושרה! הקש אישור להמשך</div>)
        case "POINTS_NOT_FILLED":
          return(<div className="alert alert-warning alert-dismissible" role="alert"> נא לסמן יתרת נקודות רצויה</div>)
        case "CHOOSE_BENEFIT":
          return(<div className="alert alert-info" role="alert">בחר הטבה</div>)
        default: 
          return(<div className="alert alert-info" role="alert">בחר הטבה</div>)
      }
    }


    render() {
      const { request, messages, loading, buttons, colors, benefits, selectedBenefit } = this.state;
      return (
        <div className="row jumbotron">
          <div className="col-md-7 mb-4">
            <div className="modal1 modal-content modal-dialog modal-dialog-top border-0">
            <div className="border-0">
                    <h2>
                    {this.randerMessage(messages)}
                    </h2>
                </div>

              
              {benefits.map((benefit, i) => ( !(benefit.type == 'free') &&
              <button
              key={i}
              className="btn btn-primary btn-lg btn-block "
              type="button"
              onClick={
                () => this.setState({
                  selectedBenefit:benefit,
                  messages:"CHOOSE_BENEFIT",
                  buttons: {ok: true, ok_action: this.approveRequest , cancel: true, back:false},
                })
              }>
              {benefit.description}
            </button>)
               )}
              


            </div>

          </div>

          <div className="request col-md-5">
            <div
              className="modal-content modal-dialog modal-dialog-top"
              style={{ backgroundColor: colors.msgBox} }
              tabIndex="-1"
              role="document">
              <div className="modal-header border-0">
                        <h3 className="modal-title border-0">
                        <strong>פרטי ההטבה</strong>
                        </h3>
                      </div>

              <div className="modal-body border-0">
                {selectedBenefit &&
                  <div>
                    <div>
                      <h3><strong>שם הלקוח :</strong> עמית קדוש</h3>
                    </div>

                   
                          <div className="alert bg-warning">
                            <div className="alert alert-warning"><h3><strong>פעולה:</strong> הוספת הטבה ללקוח </h3></div>
                            {/* <div className="alert alert-warning"><h3><strong>מועדון:</strong> {selectedBenefit.clubName} </h3></div> */}
                            <div className="alert alert-warning"><h3><strong>תיאור הטבה : </strong>{selectedBenefit.description}</h3></div>
                            <div className="alert alert-warning"><h3><strong>מחיר מקורי : </strong>{selectedBenefit.price}</h3></div>
                            <div className="alert alert-warning"><h3><strong>יתרה מקורית : </strong>{selectedBenefit.points}</h3></div>
                            <form>                              
                                <input
                                  className="code form-control input-lg"
                                  placeholder="יתרת נקודות רצויה"
                                  type="number"
                                  name="reducePoints"
                                  min="0"
                                  max={this.state.selectedBenefit.points}
                                  onChange={this.handleChange} />                              
                            </form>
                          </div>
                        
                        
                  </div>
                }
              </div>
              <div className="modal-footer border-0 justify-content-between" >
                <button
                  type="button"
                  className="btn btn-outline-primary mr-auto btn-lg btn-block"
                  onClick={() => this.openModal()}
                  disabled={!buttons.ok}
                  hidden={!buttons.ok}>אישור</button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mr-auto btn-lg btn-block"
                  onClick={this.cancelRequest}
                  disabled={!buttons.cancel}
                  hidden={!buttons.cancel}>ביטול</button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-auto btn-lg btn-block"
                  onClick={this.cancelRequest}
                  disabled={!buttons.back}
                  hidden={!buttons.back}>אישור</button>
                  
              </div>
            </div>
            
                <div >
                <Modal show={this.state.showHide} className="my-modal show" >
                <Modal.Header className="modalTitle">
                    <Modal.Title >סרוק ברקוד או הקש קוד</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <PadModalComp
                className="container"
                updateCodeFunc={this.updateCodeFunc}
                onClear={this.clearLetters}
                onBackspace={this.removeOneLetter}/></Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.SendAndHideOnApproval()}>
                        אישור
                    </Button>
                    <Button variant="primary" onClick={() => this.CancelAndHide()}>
                    ביטול
                    </Button>
                    </Modal.Footer>
                </Modal>
                </div>
          </div>
          
        </div>
        
      );
    }
}

export { AddBenefitToClient };
