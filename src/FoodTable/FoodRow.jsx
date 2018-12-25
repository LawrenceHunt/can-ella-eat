import React, {Component, Fragment} from 'react'

export class EditFoodRow extends Component {

  handleKeyDown = e => {
    if (e.key === 'Enter') this.props.confirmAction()
  }
  
  handleInputChange = (e, key) => {
    this.props.editAction(key, e.target.value)
  }

  renderFoodLabelInput() {
    const {action} = this.props
    return (
      <input
        className="food-input"
        autoFocus
        tabIndex={1}
        type='text'
        placeholder="Food name"
        value={action.payload.label}
        onKeyDown={e => this.handleKeyDown(e, 'label')}
        onChange={e => this.handleInputChange(e, 'label')}
      />
    )
  }

  toggleColor() {
    const current = this.props.action.payload.canEat
    if (current==='yes') this.props.editAction('canEat', 'maybe')
    if (current === 'maybe') this.props.editAction('canEat', 'no')
    if (current === 'no') this.props.editAction('canEat', 'yes')
  }

  renderColorToggleButton() {
    const {action} = this.props
    return (
      <button
        onClick={() => this.toggleColor()}
        className={`color-btn ${action.payload.canEat}`}
      >
        Tap to change colour
      </button>
    )
  }

  renderUtilButtons() {
    const {confirmAction, 
          cancelAction, 
          deleteItem, 
          action} = this.props 

    return (
      <Fragment>
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
      </Fragment>
    )
  }

  renderNotesInput() {
    const {action} = this.props

    return (
      <input
        className="food-input"
        type='text'
        placeholder='Notes...'
        tabIndex={2}
        value={action.payload.notes}
        onKeyDown={e => this.handleKeyDown(e, 'notes')}
        onChange={e => this.handleInputChange(e, 'notes')}
      />
    )
  }


  render() {
    const {action} = this.props
  
    return (
      <div className={`flex-row align-center food-row editing ${action.payload.canEat}`}>
        
        <div className="flex-item flex-column justify-spaced">
          <div className="full-w flex-item flex-row align-center margin-bottom">
            {this.renderFoodLabelInput()}
          </div>

          <div className="full-w full-h flex-row flex-item align-center justify-start margin-bottom">
            {this.renderColorToggleButton()}
          </div>

          <div className="full-w flex-row flex-item align-center">
            {this.renderNotesInput()}
          </div>
        </div>

        <div className="flex-column align-center">
          {this.renderUtilButtons()}
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