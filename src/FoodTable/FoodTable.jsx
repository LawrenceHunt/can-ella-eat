import React, {Component} from 'react'
import './FoodTable.css'

export default class FoodTable extends Component {
  render() {
    const { items, deleteFood } = this.props
    return (
      <table className="food-table">
        {items.map((item, i) => {

          return (
            <tr
              key       = {`item-${i}`}
              className = "food-item"
            >

              <td>
                {item.label}
              </td>

              <td>
                <button
                  onClick={() => deleteFood(item.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          )
        })
      }
    </table>
  )
}
}
