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
      <div className={`flex-row align-center food-row editing ${action.payload.canEat}`}>
        
        <div className="flex-item">
          <input
            autoFocus
            tabIndex    = {1}
            type        = 'text'
            placeholder = "Food name"
            value       = {action.payload.label}
            onKeyDown   = {e => this.handleKeyDown(e, 'label')}
            onChange    = {e => this.handleInputChange(e, 'label')}
          />
        </div>

        <div className="flex-item">
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
        </div>

        <div className="flex-item">
          <input
            type        = 'text'
            placeholder = 'Notes...'
            tabIndex    = {2}
            value       = {action.payload.notes}
            onKeyDown   = {e => this.handleKeyDown(e, 'notes')}
            onChange    = {e => this.handleInputChange(e, 'notes')}
          />
        </div>

        <div className="flex-item flex-row justify-end">
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
        </div>
      </div>
    )
  }
}

export const DisplayFoodRow = ({
  food,
  startAction
}) => (
  <div className={`flex-row align-center food-row ${food.canEat}`}>

    <div className="flex-item">
      {food.label}
    </div>

    <div className="flex-item">
      {food.notes}
    </div>

    <div className="flex-item flex-row justify-end">
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
    </div>

  </div>
)