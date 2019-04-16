import React from 'react';
import DatePicker from 'react-date-picker';
import { HistoryComp } from './index';

class HistorySelectorComp extends React.Component {
    constructor(props) {
        super(props);

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
        const { fromDate, toDate } = this.state;
        return (
            <div>
              <div className="">
              <DatePicker format="dd-MM-y" locale="he-IL-u-ca-hebrew-tz-jeruslm"
                onChange={this.changeFromDate}
                value={this.state.fromDate}
              />
              { fromDate && toDate &&
                <HistoryComp prevDays="20" />
              }
              </div>
            </div>
        );
    }
}

export { HistorySelectorComp };
