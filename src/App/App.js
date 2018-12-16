import React, {Component} from 'react'
import {base, db}         from '../firebase'
import FoodTable          from '../FoodTable/FoodTable'
import {generateId}       from '../_util'
import CreateEditModal    from '../CreateEditModal/CreateEditModal'
import SearchBar          from '../SearchBar/SearchBar'
import './App.css'

class App extends Component {

  state = {
    foods       : {},
    categories  : {},
    searchInput : '',
    action      : {}
  }

  static createNewItem(key) {
    const id = generateId()
    const types = {
      'foods': {
        label     : '',
        canEat    : true,
        notes     : ''
      },
      'categories': {
        label     : '',
      }
    }

    return Object.assign({}, types[key], {id})
  }

  getItemById = (type, id) =>
    this.state[type].find(item =>
      item.id === id)

  componentWillMount() {
    this.foodsRef = base.syncState('foods/',
      {
        context: this,
        state: 'foods'
      }
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.foodsRef)
  }


  startAction = (actionObj) => {

    console.log('starting an action with...', actionObj)
    let newAction

    switch(actionObj.type) {
      case 'create':
        newAction = {
          type: 'create',
          itemType: actionObj.itemType,
          payload: App.createNewItem(actionObj.itemType)
        }

        if (actionObj.itemType === 'foods') {
          newAction.payload.category = actionObj.category || 'none'
        }
        break

      case 'edit':
        newAction = {
          type: 'edit',
          itemType: actionObj.itemType,
          payload: this.state[actionObj.itemType][actionObj.id]
        }
        break

      default:
        console.warn('startAction called with no action type: ', actionObj)
        return
    }

    this.setState({action: newAction})
  }

  editAction = (key, value) => {
    const newAction = {...this.state.action}
    newAction.payload[key] = value
    this.setState({action: newAction})
  }

  confirmAction = () => {
    const { action } = this.state
    const { itemType, payload } = action
    const { id } = payload

    const newState = {...this.state[itemType]}
    newState[id] = payload
    this.setState({
      [itemType]: newState,
      action: null
    })
  }

  cancelAction = () => {
    this.setState({ action: null })
  }

  deleteItem = (key, id) => {
    const newState = { ...this.state[key] }
    newState[id] = null // firebase will not sync with a deleted item. must be turned to null.
    this.setState({[key]: newState})
  }

  getFilteredResults() {
    const filterPred = value => value.label.indexOf(this.state.searchInput) > -1
    const matchingCategories = Object.values(this.state.categories).filter(filterPred)
    const matchingFoods = Object.values(this.state.foods).filter(filterPred)

    const filteredItems = {}

    // add the matching categories along with their items
    for (let cat of matchingCategories) {
      filteredItems[cat.id] = Object.values(this.state.foods).map(f => {
        if (f.category === cat.id) {
          f.directSearchMatch = false
        }
        return f
      })
    }

    const filteredItemsWithIndividual = matchingFoods.reduce((acc, next) => {
      if (!acc[next.category]) acc[next.category] = [next]
      else acc[next.category].push(next)
      return acc
    }, filteredItems)

    return filteredItemsWithIndividual
  }


  render() {
    const items = this.getFilteredResults()

    return (
      <div className="App">

        <h1>can Ella eat??</h1>

        <SearchBar
          searchInput = {this.state.searchInput}
          onChange    = {e => this.setState({searchInput: e.target.value})}
        />

        <FoodTable
          items         = {items}
          action        = {this.state.action}
          startAction   = {this.startAction}
          editAction    = {this.editAction}
          confirmAction = {this.confirmAction}
          cancelAction  = {this.cancelAction}
          deleteItem    = {this.deleteItem}
          getItemById   = {this.getItemById}
        />

        <CreateEditModal
          creating = {this.state.creating}
        />

      </div>
    )
  }
}

export default App
