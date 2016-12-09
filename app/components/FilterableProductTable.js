import React from 'react';

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr><th colSpan="2">{this.props.category}</th></tr>
        );
    }
}
class ProductRow extends React.Component {
    render() {
        let name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{ color: 'red' }}>{this.props.product.name}</span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}
class ProductTable extends React.Component {
    render() {
        let rows = [];
        let lastCategory = null;
        this.props.products.forEach(function (product) {
            if (product.name.indexOf(this.props.filterText) === -1 ||
                (!product.stocked && this.props.inStockOnly)) {
                return;//只退出本次循环
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}
ProductTable.defaultProps = {
    products: []
};
class SearchBar extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.props.onUserInput(
            this.refs.filterTextInput.value,
            this.refs.inStockOnlyInput.checked);
    }
    render() {
        return (
            <form>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    />
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.inStockOnly}
                            ref="inStockOnlyInput"
                            onChange={this.handleChange}
                            />
                        {' '}
                        Only show products in stock
                        </label>
                </div>
            </form>
        );
    }
}
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }
    render() {
        return (
            <div className="container">
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                    />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    />
            </div>
        );
    }
}

export default FilterableProductTable;