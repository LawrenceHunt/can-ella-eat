import React, {Component} from 'react'

export class EditFoodRow extends Component {

  handleKeyDown = e => {
    if (e.key === 'Enter') this.props.confirmAction()
  }
  
  handleInputChange = (e, key) => {
    this.props.editAction(key, e.target.value)
  }

  toggleColor() {
    const current = this.props.action.payload.canEat
    if (current==='yes') this.props.editAction('canEat', 'maybe')
    if (current === 'maybe') this.props.editAction('canEat', 'no')
    if (current === 'no') this.props.editAction('canEat', 'yes')
  }

  render() {
    const {action,
          editAction,
          confirmAction,
          cancelAction,
          deleteItem} = this.props
  
    return (
      <div className={`flex-row align-center food-row editing ${action.payload.canEat}`}>
        
        <div className="flex-item flex-row justify-start full-w full-h">
          <input
            className   = "food-input"
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
            onClick={() => this.toggleColor()}
            className={`color-btn ${action.payload.canEat}`}
          >
          </button>
        </div>

        <div className="flex-item full-w full-h">
          <input
            className   = "food-input"
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
            Yep
          </button>

          <button
            className="circle-btn"
            onClick={cancelAction}
          >
            Nope
          </button>
          {action.type === 'edit' ? (
            <button
              className="circle-btn"
              onClick={() => deleteItem('foods', action.payload.id)}
            >
              Del
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

    <div className="flex-item flex-row justify-center full-w full-h">
      <span className="margin-left">{food.label}</span>
    </div>

    <div className="flex-item">
      <span className="margin-left align-left">{food.notes}</span>
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
        Edit
      </button>
    </div>

  </div>
)