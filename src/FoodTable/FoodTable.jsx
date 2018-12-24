import React, {Component, Fragment} from 'react'
import {EditCategoryRow, DisplayCategoryRow} from './CategoryRow.jsx'
import {EditFoodRow, DisplayFoodRow} from './FoodRow.jsx'

import './FoodTable.css'

export default class FoodTable extends Component {
  renderCreateCategoryRow() {
    return (
      <div className="flex-row align-center justify-end create-category-row">
        <button
          className="circle-btn"
          onClick={() => this.props.startAction({
            type: 'create',
            itemType: 'categories'
          })}
        >
          <i className="fas fa-apple-crate" />
        </button>
      </div>
    )
  }

  renderCategory(categoryId, category, index) {
    const {action} = this.props
    return (
      <Fragment key={`category-${index}`}>
        {action
          && action.type === 'edit'
          && action.itemType === 'categories'
          && action.payload.id === categoryId
          ? <EditCategoryRow
              action        = {action}
              editAction    = {this.props.editAction}
              confirmAction = {this.props.confirmAction}
              cancelAction  = {this.props.cancelAction}
              deleteItem    = {this.props.deleteItem}
            />
          : <DisplayCategoryRow
            startAction = {this.props.startAction}
            category    = {category}
            />}

        {action
          && action.type === 'create'
          && action.itemType === 'foods'
          && action.payload.categoryId === categoryId
          ? <EditFoodRow
              action        = {action}
              editAction    = {this.props.editAction}
              confirmAction = {this.props.confirmAction}
              cancelAction  = {this.props.cancelAction}
              deleteItem    = {this.props.deleteItem} 
            />
          : null}

        {category.items
          && Object
            .entries({...category.items})
            .sort((a, b) => a.label - b.label)
            .map(([id, food], index) =>
              action
                && action.type === 'edit'
                && action.itemType === 'foods'
                && action.payload
                && action.payload.id
                && action.payload.id === id
                ? <EditFoodRow
                    key           = {`food-${index}`}
                    action        = {action}
                    editAction    = {this.props.editAction}
                    confirmAction = {this.props.confirmAction}
                    cancelAction  = {this.props.cancelAction}
                    deleteItem    = {this.props.deleteItem}
                  />
                : <DisplayFoodRow 
                    key         = {`food-${index}`}
                    food        = {food}
                    startAction = {this.props.startAction}
                  /> 
            )
        }
      </Fragment>
    )
  }


  render() {
    const { contentTree, action } = this.props

    const uncategorised = contentTree['none']

    const withoutUncategorised = {...contentTree}
    delete withoutUncategorised['none']

    return (
      <div className="food-table-container">

        <div className="food-table">
          {this.renderCreateCategoryRow()}

          {action
            && action.type === 'create'
            && action.itemType === 'categories'
            ? <EditCategoryRow {...this.props} />
            : null}

          {uncategorised
            && this.renderCategory('none', uncategorised)}

          {Object
            .entries({...withoutUncategorised})
            .sort((a, b) => a.label - b.label)
            .map(([categoryId, category], i) =>
              this.renderCategory(categoryId, category, i))}
        </div>
      </div>
    )
  }
}
