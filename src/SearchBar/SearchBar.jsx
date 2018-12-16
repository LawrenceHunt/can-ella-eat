import React, {Component} from 'react'
import './SearchBar.css'

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <input
          className   = "searchbar"
          type        = "text"
          onChange    = {this.props.onChange}
          value       = {this.props.searchInput}
          placeholder = "Plz can I haz..."
        />
      </div>
    )
  }
}
