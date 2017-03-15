import React, {PropTypes, Component} from 'react';

import {
  form,
  input,
  submit
} from './search-form.css';

class Search extends Component {
  static propTypes = {
    value: PropTypes.string,
    handleSubmit: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      value: props.value ? props.value : ''
    };
  }

  handleSubmit = (event) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this.state.value);
    }
  }

  handleChange = (event) => {
    let value = event.target.value;
    if (this.props.onChange) {
      this.props.onChange(event, this.state.value);
    }

    this.setState({value: value});
  }

  render () {
    const {
      value
    } = this.state;

    return (
      <form className={form} onSubmit={this.handleSubmit}>
        <input className={input} type='text' value={value} onChange={this.handleChange} placeholder='search' />
        <input className={submit} value='Search' type='submit' />
      </form>
    );
  }
}


export default Search;
