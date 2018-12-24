import React from 'react'

export const EditFoodRow = ({
  action,
  editAction,
  confirmAction,
  cancelAction,
  deleteItem
}) => (
  <tr className={`food-row editing ${action.payload.canEat}`}>
    <td>
      <input
        type        = 'text'
        placeholder = "Food name"
        value       = {action.payload.label}
        onChange    = {e => editAction('label', e.target.value)}
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
        value       = {action.payload.notes}
        onChange={e => editAction('notes', e.target.value)}
      />
    </td>

    <td className="flex-row justify-center">

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