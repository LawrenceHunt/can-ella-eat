import React from 'react'


const handleKeyDown = (e, confirmAction) => {
  if (e.key === 'Enter') confirmAction()
}

export const EditCategoryRow = ({
  action,
  editAction,
  confirmAction,
  cancelAction,
  deleteItem,
}) => (
  <div className="flex-row align-center category-row editing">
    <div className="flex-item">
      <input
        autoFocus
        placeholder = "Category name"
        type        = "text"
        value       = {action.payload.label}
        onKeyDown   = {e => handleKeyDown(e, confirmAction)}
        onChange    = {e => editAction('label', e.target.value)}
      />
    </div>

    <div className="flex-item flex-row justify-end">
      <button
        className="circle-btn"
        onClick={() => confirmAction()}
      >
        <i className="fas fa-check" />
      </button>

      <button
        className="circle-btn"
        onClick={() => cancelAction()}
      >
        <i className="fas fa-times" />
      </button>

      {action.payload.id !== 'none' && action.type === 'edit' ? (
        <button
          className="circle-btn"
          onClick={() => deleteItem('categories', action.payload.id)}
        >
          <i className="fas fa-trash-alt" />
        </button>
      ) : null}
    </div>
  </div>
)

export const DisplayCategoryRow = ({
  category,
  startAction
}) => (
  <div className="flex-row align-center category-row margin-top">
    <div className="flex-item">
      {category.id !== 'none' ? category.label : 'Ungrouped'}
    </div>

    <div>
      {category.id !== 'none' ? (
        <button
          className="circle-btn"
          onClick={() => startAction({
            type: 'edit',
            itemType: 'categories',
            id: category.id
          })}
        >
          <i className="fas fa-cog" />
        </button>
      ) : null}

      <button
        className="circle-btn"
        onClick={() => startAction({
          type: 'create',
          itemType: 'foods',
          categoryId: category.id
        })}
      >
        <i className="fas fa-apple-alt" />
      </button>

    </div>
  </div>
)