import React, {Component, Fragment} from 'react'
import './FoodTable.css'

export default class FoodTable extends Component {

  renderEditCategoryRow() {
    const {action} = this.props

    return (
      <tr className="category-row editing">
        <th>
          <input
            autoFocus
            placeholder = "Category name"
            type        = "text"
            value       = {action.payload.label}
            onChange    = {e => this.props.editAction('label', e.target.value)}
          />
        </th>

        <th></th>

        <th>
          <button
            className="circle-btn"
            onClick={() => this.props.confirmAction()}
          >
            <i className="fas fa-check" />
          </button>

          <button
            className="circle-btn"
            onClick={() => this.props.cancelAction()}
          >
            <i className="fas fa-times" />
          </button>

          {action.payload.id !== 'none' && action.type === 'edit' ? (
            <button
              className="circle-btn"
              onClick={() => this.props.deleteItem('categories', action.payload.id)}
            >
              <i className="fas fa-trash-alt" />
            </button>
          ) : null}
        </th>
      </tr>
    )
  }


    renderDisplayCategoryRow(id, category, index) {
      return (
        <tr
          className="category-row"
        >
          <th>
            {category.id !== 'none' ? category.label : ''}
          </th>

          <th></th>

          <th>
            {category.id !== 'none' ? (
              <button
                className="circle-btn"
                onClick={() => this.props.startAction({
                  type: 'edit',
                  itemType: 'categories',
                  id
                })}
              >
                <i className="fas fa-cog" />
              </button>
            ) : null}

            <button
              className="circle-btn"
              onClick={() => this.props.startAction({
                type: 'create',
                itemType: 'foods',
                categoryId: category.id
              })}
            >
              <i className="fas fa-apple-alt" />
            </button>

          </th>
        </tr>
      )
    }


  renderEditFoodRow(index) {
    return (
      <tr
        className = {`food-row editing ${this.props.action.payload.canEat}`}
        key       = {`food-${index}`}
      >
        <td>
          <input
            type        ='text'
            placeholder = "Food name"
            value       = {this.props.action.payload.label}
            onChange    = {e => this.props.editAction('label', e.target.value)}
          />

        <span className="pull-right">
            <button
              onClick = {() => this.props.editAction('canEat', 'yes')}
              className={`color-btn green ${this.props.action.payload.canEat === 'yes' ? 'active' : ''}`}
            >
            </button>

            <button
              onClick = {() => this.props.editAction('canEat', 'maybe')}
              className={`color-btn orange ${this.props.action.payload.canEat === 'maybe' ? 'active' : ''}`}
            >
            </button>

            <button
              onClick = {() => this.props.editAction('canEat', 'no')}
              className={`color-btn red ${this.props.action.payload.canEat === 'no' ? 'active' : ''}`}
            >
            </button>
          </span>
        </td>

        <td>
          <input
            type        = 'text'
            placeholder = 'Notes...'
            value       = {this.props.action.payload.notes}
            onChange    = {e => this.props.editAction('notes', e.target.value)}
          />
        </td>

        <td className="flex-row">

          <button
            className="circle-btn"
            onClick={this.props.confirmAction}
          >
            <i className="fas fa-check" />
          </button>

          <button
            className="circle-btn"
            onClick={this.props.cancelAction}
          >
            <i className="fas fa-times" />
          </button>
          {this.props.action.type==='edit' ? (
            <button
              className="circle-btn"
              onClick={() => this.props.deleteItem('foods', this.props.action.payload.id)}
            >
              <i className="fas fa-trash-alt" />
            </button>
          ) : null}
        </td>
      </tr>
    )
  }

  renderDisplayFoodRow(id, food, index) {
    return (
      <tr
        key       = {`food-${index}`}
        className = {`food-row ${food.canEat}`}
      >

        <td>
          {food.label}
        </td>

        <td>
          {food.notes}
        </td>

        <td>
          <button
            className="circle-btn"
            onClick={() => this.props.startAction({
              type:'edit',
              itemType: 'foods',
              id
            })}
          >
            <i className="fas fa-cog" />
          </button>
        </td>

      </tr>
    )
  }

  renderCreateCategoryRow() {
    return (
      <tr className="category-row">
        <th></th>
        <th></th>
        <th>
          <button
            className="circle-btn"
            onClick={() => this.props.startAction({
              type: 'create',
              itemType: 'categories'
            })}
            >
            <i className="fas fa-apple-crate" />
          </button>
        </th>
      </tr>
    )
  }

  renderCategory(categoryId, category, i) {
    const {action, contentTree} = this.props
    console.log('action', action)
    return (
      <Fragment key={`category-${i}`}>
        {action
          && action.type === 'edit'
          && action.itemType === 'categories'
          && action.payload.id === categoryId
          ? this.renderEditCategoryRow(categoryId, category, i)
          : this.renderDisplayCategoryRow(categoryId, category, i)}

        {action
          && action.type === 'create'
          && action.itemType === 'foods'
          && action.payload.categoryId === categoryId
          ? this.renderEditFoodRow()
          : null}

        {category.items
          && Object
            .entries(category.items)
            .map(([id, food], i) =>
              action
                && action.type === 'edit'
                && action.itemType === 'foods'
                && action.payload.id === id
                ? this.renderEditFoodRow(i)
                : this.renderDisplayFoodRow(id, food, i))}
      </Fragment>
    )
  }


  render() {
    const { contentTree, action, startAction, editAction,
            confirmAction, cancelAction, deleteItem, getItemById } = this.props

    const uncategorised = contentTree['none']

    const withoutUncategorised = {...contentTree}
    delete withoutUncategorised['none']

    return (
      <div className="food-table-container">

        <table className="food-table">
          <tbody>

            {this.renderCreateCategoryRow()}

          {action
            && action.type === 'create'
            && action.itemType === 'categories'
            ? this.renderEditCategoryRow()
            : null}

          {uncategorised
            && this.renderCategory('none', uncategorised)}

          {Object
            .entries(withoutUncategorised)
            .map(([categoryId, category], i) =>
              this.renderCategory(categoryId, category, i))}
          </tbody>
        </table>
      </div>
    )
  }
}
