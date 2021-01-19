import React from 'react';
import DatePicker from 'react-date-picker';
import { HistoryComp } from './index';

class HistorySelectorComp extends React.Component {
    constructor(props) {
        super(props);

        var date = new Date();
        var todayFormated = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`

        this.state = {
            fromDate: null,
            toDate: null,
        };
        this.changeFromDate = this.changeFromDate.bind(this);
    }

    componentDidMount() {
    }

    changeFromDate(value) {
      console.log(value);
      this.setState({ "fromDate": value });
    }

    render() {
        const { fromDate, toDate,firstChange } = this.state;
        return (
            <div>
              <div className="row justify-content-center">
              <p className="reportheader col-lg-9 justify-content-center">דוח פעולת לפי תאריך:</p>
              </div>
              
              <div className="row justify-content-center">
              <div className="col-lg-8">
                <div class="row align-items-top pb-2">
                    <div class="col-md-1">
                        <strong>מתאריך:</strong>
                    </div>
                    <div class="col-md-4">
                        <DatePicker format="dd-MM-y" locale="he-IL"
                      onChange={this.changeFromDate}
                      value={this.state.fromDate}
                    />
                    </div>
                    <div class="col-md-2">
                        <strong>עד תאריך:</strong>
                    </div>
                    <div class="col-md-4">
                        <DatePicker format="dd-MM-y" locale="he-IL"
                      onChange={this.changeToDate}
                      value={this.state.toDate}
                    />
                    </div>
                </div>
              </div>
              { fromDate && toDate && firstChange &&
                <HistoryComp prevDays="20" />
              }
              </div>
            </div>
        );
    }
}

export { HistorySelectorComp };
