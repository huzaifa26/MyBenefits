import React from 'react';

// Import Datepicker
import { DatePicker as BootstrapDatePicker } from "react-bootstrap-date-picker";

// Import Bootstrap components

class DatePicker extends React.Component {
    constructor(props, context) {
        super(props, context);

        // Initial state with date
        this.state = {
            selectedDate: new Date().toISOString()
        };

        // This binding is necessary to make `this` work in the callback
        this.onChange = this.onChange.bind(this);
    }

    onChange(value, formattedValue) {
		this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
	}

    componentDidUpdate() {
        // Access ISO String and formatted values from the DOM.
        var hiddenInputElement = document.getElementById("example-datepicker");
        console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    }

    render() {
        return (
            <div>
            <BootstrapDatePicker id="example-datepicker" value={this.state.selectedDate} onChange={this.onChange} />
            </div>
        );
    }
}

export { DatePicker };
