class Filter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: []
		}
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
				console.log(self.state.items);
			})
	}
	render(){
		return(
			<div className="jumbotron">
				<div className="container">
					{this.state.items.map((item, i)=>{
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
												<li className="list-group-item">Гарантия: <span className="font-weight-bold">{item.garant}</span> года</li>
										  </ul>
										</div>
										<div className="paper-footer">
											<p></p>
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
								  	<p>lorem15 lorem15 lorem15 lorem15 lorem15 lorem15 lorem15 lorem15 lorem15 lorem15</p>
								  </div>
								  <div className="tab-pane fade" id={"additional-characteristics-" + i} role="tabpanel">
								  	<p>lorem16  lorem16 lorem16 lorem16lorem16 lorem16 lorem16 lorem16 lorem16</p>
								  </div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
ReactDOM.render(<Filter source="../data.json" />, document.getElementById('filter'));