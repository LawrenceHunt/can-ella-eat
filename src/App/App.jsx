import React, {Component} from 'react'
import {base}             from '../firebase'
import FoodTable          from '../FoodTable/FoodTable'
import {generateId}       from '../_util'
import CreateEditModal    from '../CreateEditModal/CreateEditModal'
import SearchBar          from '../SearchBar/SearchBar'
import './App.css'
import './buttons.css'
import './colors.css'
import '../font-awesome/css/all.min.css'

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
        label      : '',
        canEat     : 'yes', // yes, maybe and no are the options
        notes      : ''
      },
      'categories': {
        label     : '',
      }
    }

    return Object.assign({}, types[key], {id})
  }

 
  componentWillMount() {
    this.foodsRef = base.syncState('foods/',
      {
        context: this,
        state: 'foods'
      }
    )
    this.categoriesRef = base.syncState('categories/',
      {
        context: this,
        state: 'categories'
      }
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.foodsRef)
  }


  startAction = actionObj => {
    let newAction

    switch(actionObj.type) {
      case 'create':
        newAction = {
          type     : 'create',
          itemType : actionObj.itemType,
          payload  : App.createNewItem(actionObj.itemType)
        }

        if (actionObj.itemType === 'foods') {
          newAction.payload.categoryId = actionObj.categoryId || 'none'
        }
        break

      case 'edit':
        newAction = {
          type     : 'edit',
          itemType : actionObj.itemType,
          payload  : this.state[actionObj.itemType][actionObj.id]
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
    const newState = { ...this.state }
    newState[key][id] = null // firebase will not sync with a deleted item. must be turned to null.
    if (key === 'categories') {
      // also delete all foods with that category
      for (let food of Object.values(newState.foods)) {
        if (food && food.categoryId === id) {
          newState.foods[food.id] = null
        }
      }
    }
    this.setState(newState)
  }

  getFilteredResults() {
    /*
      return a tree object looking like this:

      {
        categoryId: {
          matchesSearch: Boolean,
          items: {
            itemId: String,
            matchesSearch: Boolean,
            ...otherItemProps
          }
        }
      }
    */

    const matchesSearch = item => {
      const lowerCaseLabel = item.label.toLowerCase()
      const lowerCaseSearch = this.state.searchInput.toLowerCase()
      return lowerCaseLabel.indexOf(lowerCaseSearch) > -1
    }
    
    const matchingCategories =
      Object
        .entries(this.state.categories)
        .reduce((acc, [id, item]) => {
          if (item && item.label && matchesSearch(item)) {
            item.matchesSearch = true
            acc[id] = {...item}
          }
          return acc
        }, {})
    
   
    const withMatchingFoods =
      Object
        .entries(this.state.foods)
        .reduce((acc, [id, item]) => {
          if (item && item.label && matchesSearch(item)) {
            item.matchesSearch = true
            const categoryId = item.categoryId || 'none'
            // add the category to the tree if it isn't already there.
            if (!acc[categoryId]) {
              acc[categoryId] = {...this.state.categories[categoryId]}
            }
            
            if (!acc[categoryId].items) acc[categoryId].items = {}
            if (!acc[categoryId].id) acc[categoryId].id = categoryId
            acc[categoryId].items[id] = item
          }
          
          return acc
        }, {...matchingCategories})
    
    return withMatchingFoods
  }


  render() {
    const contentTree = this.getFilteredResults()

    return (
      <div className="App">

        <SearchBar
          searchInput = {this.state.searchInput}
          onChange    = {e => this.setState({searchInput: e.target.value})}
        />

        <FoodTable
          contentTree   = {contentTree}
          action        = {this.state.action}
          startAction   = {this.startAction}
          editAction    = {this.editAction}
          confirmAction = {this.confirmAction}
          cancelAction  = {this.cancelAction}
          deleteItem    = {this.deleteItem}
          categories    = {this.state.categories}
        />

        <CreateEditModal
          creating = {this.state.creating}
        />

      </div>
    )
  }
}

export default App
