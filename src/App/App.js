import React, { Component } from 'react';
import './App.css';
import {base, db} from '../firebase'
import FoodTable from '../FoodTable/FoodTable'
import {generateId} from '../_util'


class App extends Component {

  state = {
    foods       : {},
    categories  : {},
    newFood     : App.emptyNewFood(),
    searchInput : ''
  }

  static emptyNewFood() {
    return {
      label     : '',
      category  : 'none',
      canEat    : true,
      notes     : ''
    }
  }

  componentWillMount() {
    this.foodsRef = base.syncState('foods/', {
      context: this,
      state: 'foods'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.foodsRef)
  }

  changeNewFoodProperty(key, value) {
    const newState = {...this.state}
    newState.newFood[key] = value
    this.setState({newState})
  }

  confirm = () => {
    const newState = {...this.state}
    const newId = generateId()
    this.state.newFood.id = newId
    newState.foods[newId] = this.state.newFood
    newState.newFood = App.emptyNewFood()
    this.setState(newState)
  }

  deleteFood(foodId) {
    const newFoodState = {...this.state.foods}
    newFoodState[foodId] = null // firebase will not sync with a deleted item. must be turned to null.
    this.setState({foods: newFoodState})
  }

  getFilteredResults() {
    const {searchInput} = this.state
    const filterPred = value => value.label.indexOf(searchInput) > -1

    const matchingCategories = Object.values(this.state.categories).filter(filterPred)
    const matchingFoods = Object.values(this.state.foods).filter(filterPred)

    return matchingFoods
  }

  render() {
    const items = this.getFilteredResults()
    console.log('items', items)

    return (
      <div className="App">
        <h1>can Ella eat??</h1>

        <div>
          <input
            className   = "searchbar"
            type        = "text"
            onChange    = {e => this.setState({searchInput: e.target.value})}
            value       = {this.state.searchInput}
            placeholder = "Plz can I has..."
          />
        </div>

        <input
          type     = "text"
          onChange = {e => this.changeNewFoodProperty('label', e.target.value)}
          value    = {this.state.newFood.label}
        />

      <button
        onClick={this.confirm}
      >
        Create {this.state.newFood.label}
      </button>

      <FoodTable
        items      = {items}
        deleteFood = {this.deleteFood.bind(this)}

      />

      </div>
    )
  }
}

export default App
