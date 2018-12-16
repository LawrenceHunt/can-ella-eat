import React, {Component, Fragment} from 'react'
import './FoodTable.css'

export default class FoodTable extends Component {

  renderNewCategoryForm() {
    return (
      <tr>
        <th>
          <input
            type     = "text"
            value    = {this.props.action.payload.label}
            onChange = {e => this.props.editAction('label', e.target.value)}
          />
        </th>

        <th>
          <button
            onClick={() => this.props.confirmAction()}
          >
            Confirm
          </button>

          <button
            onClick={() => this.props.cancelAction()}
          >
            Cancel
          </button>
        </th>
      </tr>
    )
  }

  render() {
    const { items, action, startAction, editAction,
            confirmAction, cancelAction, deleteItem } = this.props

    return (
      <div className="food-table-container">

        <div className="create-buttons">
          <button
            onClick={() => startAction({
              type: 'create',
              itemType: 'categories'
            })}
          >
            + Create new Category
          </button>
        </div>

        <hr />

        <table className="food-table">
          <tbody>

          {action
            && action.type === 'create'
            && action.itemType === 'categories'
            ? this.renderNewCategoryForm()
            : null}


          {Object.entries(items).map(([category, items], i) => (
            <Fragment key={`category-${i}`}>
              <tr
                className="category-row"
              >
                <th>
                  {category}
                </th>

                <th>
                  <button
                    onClick={() => startAction({
                      type: 'create',
                      itemType: 'foods'
                    })}
                  >
                    Create Food
                  </button>
                </th>
              </tr>

              {items.map((item, i) => (
                <tr
                  key       = {`item-${i}`}
                  className = "food-row"
                >

                  <td>
                    {item.label}
                  </td>

                  <td>
                    <button
                      onClick={() => deleteItem('foods', item.id)}
                      >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
              </Fragment>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
}
