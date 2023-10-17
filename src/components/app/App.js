import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import {Component} from "react";
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'John', salary: 800, increase: true, like: true, id: 1},
				{name: 'Alex', salary: 3000, increase: false, like: false, id: 2},
				{name: 'Rude', salary: 5000, increase: false, like: false, id: 3}
			],
			term: '',
			prop: ''
		}
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			//const index = data.findIndex(elem => elem.id === id);
			//const result = [...data.slice(0, index), ...data.slice(index + 1)]
			return {
				data: data.filter(item => item.id !== id),
			}
		})
	}

	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			like: false,
			id: Date.now()
		}
		if (newItem.name !== '' && newItem.name.length > 3) {
			this.setState(({data}) => {
				const result = [...data, newItem]
				return {
					data: result
				}
			})
		}
	}

	onToggle = (id, key) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {...item, [key]: !item[key]}
				}
				return item;
			})
		}))
	}

	searchTerm = (items, term) => {
		if (term.length === 0) {
			return items;
		}
		return items.filter(item => {
			return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
		})
	}

	onUpdateSearch = (term) => {
		this.setState({term});
	}

	getFilteredList = (items, prop) => {
		if (prop === 'like') {
			return items.filter(elem => elem.like);
		} else if (prop === 'vip') {
			return items.filter(elem => elem.salary > 1000);
		}
		return items;
	}

	onUpdateList = (prop) => {
		this.setState({prop});
	}

	render() {
		const {data, term, prop} = this.state;
		const amountOfEmployees = data.length;
		const getAmountOfVipEmployees = (data) => {
			const newData = data.filter(elem => elem.increase);
			return newData.length;
		}
		const visibleData = this.getFilteredList(this.searchTerm(data, term), prop);

		return (
			<div className="App">
				<AppInfo
					amountOfEmployees={amountOfEmployees}
					amountOfVipEmployees={getAmountOfVipEmployees(data)}
				/>

				<div className="search-panel">
					<SearchPanel
						onUpdateSearch={this.onUpdateSearch}
						term={term}
					/>
					<AppFilter
						onUpdateList={this.onUpdateList}
						prop={prop}
					/>
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggle={this.onToggle}
				/>
				<EmployeesAddForm
					onAdd={this.addItem}
				/>
			</div>
		);
	}
}

export default App;
