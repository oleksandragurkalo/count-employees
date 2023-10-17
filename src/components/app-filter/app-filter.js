import "./app-filter.css";

const AppFilter = ({prop, onUpdateList}) => {
	const buttonsData = [
		{name: '', label: 'Все сотрудники', colored: true},
		{name: 'like', label: 'На повышение', colored: false},
		{name: 'vip', label: 'З/П больше 1000$', colored: false}
	]

	const buttons = buttonsData.map(({name, label, colored}) => {
		const active = prop === name;
		const className = active ? 'btn btn-light' : 'btn btn-outline-light'
		return (
			<button type="button"
							className={className}
							onClick={() => onUpdateList(name)}
							style={colored ? {color: 'blue'} : null}
			>
				{label}
			</button>
		)
	})
	return (
		<div className="btn-group">
			{buttons}
		</div>
	)
}

export default AppFilter;
