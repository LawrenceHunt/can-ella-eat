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
  <tr className="category-row editing">
    <th>
      <input
        autoFocus
        placeholder = "Category name"
        type        = "text"
        value       = {action.payload.label}
        onKeyDown   = {e => handleKeyDown(e, confirmAction)}
        onChange    = {e => editAction('label', e.target.value)}
      />
    </th>

    <th></th>

    <th>
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
    </th>
  </tr>
)

export const DisplayCategoryRow = ({
  category,
  startAction
}) => (
  <tr className="category-row">
    <th>
      {category.id !== 'none' ? category.label : 'Ungrouped'}
    </th>

    <th></th>

    <th>
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

    </th>
  </tr>
)