import React from 'react';
import { Field, reduxForm } from 'redux-form';
class StreamCreate extends React.Component {

    renderError({ error, touched }) {
        if(error && touched) {
            return (
                <div className="ui pointing red basic label">
                    {error}
                </div>
            );
        }
        return null;
    }

    //Nhan doi so la formProps tu Field
    renderInput = ({ input, label, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
        // <input {...formProps.input} />
        // <input value={formProps.input.value} onChange={formProps.input.onChange} />
    }

    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter title" />
                <Field name="description" component={this.renderInput} label="Enter description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }; 
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);