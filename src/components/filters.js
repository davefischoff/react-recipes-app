import React from 'react';

function Filter(props) {
    return (
        <li key={props.index}>
            <button 
            className={"filter-link " + (props.recipeType === props.filter.value ? 'selected' : '')}
            onClick={props.onClick}
            >
                {props.filter.name}
            </button>
        </li>
    )
}

class Filters extends React.Component {

    renderFilter(filter, index) {
        return(
            <Filter 
                filter={filter} 
                key={index}
                onClick={() => this.props.onClick(filter.value)}
                recipeType={this.props.recipeType}
            />
        )
    }

    render(){
        const self = this;
        return (
            <ul className="filters-list">
                <li>
                    <button
                        className={"filter-link " + (this.props.recipeType === 'all' ? 'selected' : '')}
                        onClick={() => this.props.onClick('all')}
                    >All</button>
                </li>
                {this.props.filters.map((filter, index) => (
                    self.renderFilter(filter,index)
                ))}
            </ul>
        )
    }
}

export default Filters;