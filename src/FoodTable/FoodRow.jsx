import React, {Component} from 'react'

export class EditFoodRow extends Component {

  handleKeyDown = e => {
    if (e.key === 'Enter') this.props.confirmAction()
  }
  
  handleInputChange = (e, key) => {
    this.props.editAction(key, e.target.value)
  }

  render() {
    const {action,
          editAction,
          confirmAction,
          cancelAction,
          deleteItem} = this.props
  
    return (
      <tr className={`food-row editing ${action.payload.canEat}`}>
        <td>
          <input
            autoFocus
            tabIndex    = {1}
            type        = 'text'
            placeholder = "Food name"
            value       = {action.payload.label}
            onKeyDown   = {e => this.handleKeyDown(e, 'label')}
            onChange    = {e => this.handleInputChange(e, 'label')}
          />

          <span className="pull-right">
            <button
              onClick={() => editAction('canEat', 'yes')}
              className={`color-btn green ${action.payload.canEat === 'yes' ? 'active' : ''}`}
            >
            </button>

            <button
              onClick={() => editAction('canEat', 'maybe')}
              className={`color-btn orange ${action.payload.canEat === 'maybe' ? 'active' : ''}`}
            >
            </button>

            <button
              onClick={() => editAction('canEat', 'no')}
              className={`color-btn red ${action.payload.canEat === 'no' ? 'active' : ''}`}
            >
            </button>
          </span>
        </td>

        <td>
          <input
            type        = 'text'
            placeholder = 'Notes...'
            tabIndex    = {2}
            value       = {action.payload.notes}
            onKeyDown   = {e => this.handleKeyDown(e, 'notes')}
            onChange    = {e => this.handleInputChange(e, 'notes')}
          />
        </td>

        <td>
          <button
            className="circle-btn"
            onClick={confirmAction}
          >
            <i className="fas fa-check" />
          </button>

          <button
            className="circle-btn"
            onClick={cancelAction}
          >
            <i className="fas fa-times" />
          </button>
          {action.type === 'edit' ? (
            <button
              className="circle-btn"
              onClick={() => deleteItem('foods', action.payload.id)}
            >
              <i className="fas fa-trash-alt" />
            </button>
          ) : null}
        </td>
      </tr>
    )
  }
}

export const DisplayFoodRow = ({
  food,
  startAction
}) => (
  <tr className={`food-row ${food.canEat}`}>

    <td>
      {food.label}
    </td>

    <td>
      {food.notes}
    </td>

    <td>
      <button
        className="circle-btn"
        onClick={() => startAction({
          type: 'edit',
          itemType: 'foods',
          id: food.id
        })}
      >
        <i className="fas fa-cog" />
      </button>
    </td>

  </tr>
)