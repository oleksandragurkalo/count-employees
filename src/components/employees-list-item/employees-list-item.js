import './employees-list-item.css';

const getClassName = (increase, like) => {
  let className = 'list-group-item d-flex justify-content-between';
  if (increase) {
    className = className + ' increase';
  }
  if (like) {
    className = className + ' like';
  }
  return className;
}

const EmployeesListItem = (props) => {
  const {
    name,
    salary,
    increase,
    like,
    onDelete,
    onToggleIncrease,
    onToggleLike
  } = props;

  return (
    <li className={getClassName(increase, like)}>
        <span className="list-group-item-label"
              onClick={onToggleLike}
              style={{fontSize: 40}}
        >{name}
        </span>
      <input type="text" className="list-group-item-input" defaultValue={salary + ' $'}/>
      <div className='d-flex justify-content-center align-items-center'>
        <button type="button"
                className="btn-cookie btn-sm "
                onClick={onToggleIncrease}>
          <i className="fas fa-cookie"></i>
        </button>

        <button type="button"
                className="btn-trash btn-sm "
                onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </div>
    </li>
  )
}
export default EmployeesListItem;
