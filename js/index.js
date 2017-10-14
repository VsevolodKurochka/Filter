function log(log){
	console.log(log);
}

class Filter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: [],
			sortingItems: [],
			value: 'Жесткий'
		}
		this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);

  	this.content = this.content.bind(this);
	}
	componentDidMount(){
		let self = this;
		fetch(self.props.source)
			.then(function(response){
				return response.json();
			})
			.then(function(data){
				self.setState({
					items: data.items
				})
			})
	}

	handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
  	event.preventDefault();
    let collect = [];
    collect = this.state.items.filter(
    	item => item.hardness == this.state.value
    )
    this.setState({
    	sortingItems: collect
    })
  }
  content(item, i){
  	return(
  		<div className="paper" key={i}>
				<div className="row">
					<div className="col-12 col-sm-6">
						<img src={item.image} className="paper-poster" />
					</div>
					<div className="col-12 col-sm-6">
						<div className="paper-header">
							<h1 className="paper-title">{item.name}</h1>
							<h2 className="paper-subtitle">{(item.available == "+") ? <span className="text-success">В наличии</span> : <span className="text-danger">Нету в наличии</span>}</h2>
						</div>
						<div className="paper-body">
							<ul className="paper-list list-group list-group-flush">
								<li className="list-group-item">Тип: <span className="font-weight-bold">{item.type}</span></li>
								<li className="list-group-item">Нагрузка на 1 спальное место: <span className="font-weight-bold">{item.load_for_one_person}</span> кг</li>
								<li className="list-group-item">Вес матраса: <span className="font-weight-bold">{item.weight}</span> кг/м.кв</li>
								<li className="list-group-item">Жесткость: <span className="font-weight-bold">{item.hardness}</span></li>
								<li className="list-group-item">Гарантия: <span className="font-weight-bold">{item.garant}</span> года</li>
							</ul>
						</div>
						<div className="paper-footer">
							<p><span className="paper-price font-weight-bold text-danger text-through">{item.old_price} грн</span><span className="paper-price paper-price_new font-weight-bold text-success">{item.new_price} грн</span></p>
							<p>Вы экономите: {item.old_price - item.new_price} грн</p>
						</div>
					</div>
				</div>
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" data-toggle="tab" href={"#consist-" + i} role="tab">Состав</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-toggle="tab" href={"#additional-characteristics-" + i} role="tab">Дополнительные характеристики</a>
					</li>
				</ul>
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id={"consist-" + i} role="tabpanel">
						<ul className="list-group list-group-flush">
							<li className="list-group-item"><span className="font-weight-bold">Состав:</span> {item.composition.case}</li>
							<li className="list-group-item"><span className="font-weight-bold">Наполнение:</span> {item.composition.filling}</li>
						</ul>
					</div>
					<div className="tab-pane fade" id={"additional-characteristics-" + i} role="tabpanel">
						<p>{item.characteristics}</p>
					</div>
				</div>
			</div>
  	)
  }
	render(){
		let self = this;
		return(
			<div className="jumbotron">
				<div className="container">
					<div className="filter">
						<p className="filter-title">Умный фильтр:</p>
						<form onSubmit={this.handleSubmit}>
							<div className="row">
								<div className="col-12 col-sm-3">
									<select value={this.state.value} onChange={this.handleChange} className="filter-select custom-select" name="select_hardness">
										<option value="Жесткий">Жесткий</option>
										<option value="Упругий">Упругий</option>
										<option value="Мягкий">Мягкий</option>
									</select>
									<p>{this.state.select_hardness}</p>
								</div>
								
								<div className="col-12 col-sm-3">
									<button type="submit" className="btn btn-danger">Применить фильтр</button>
								</div>
							</div>
						</form>
					</div>
					{
						if(this.state.sortingItems.length > 0 ){
							this.state.sortingItems.map((item, i)=>{return this.content(item, i)})
						}else{
							this.state.items.map((item, i)=>{return this.content(item, i)})
						}
					}
				</div>
			</div>
		)
	}
}
ReactDOM.render(<Filter source="../data.json" />, document.getElementById('filter'));
/*
<div className="col-12 col-sm-3">
	<select defaultValue={this.state.select_price} className="filter-select custom-select" name="select_price">
		<option value="5000-9000">5000-9000</option>
		<option value="10000-14000">10000-14000</option>
		<option value="15000-20000">15000-20000</option>
	</select>
</div>
<div className="col-12 col-sm-3">
	<select defaultValue={this.state.select_garant} className="filter-select custom-select" name="select_garant">
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="5">5</option>
	</select>
</div>
*/