import React, { PureComponent } from 'react';
import {PieChart,Pie,Cell} from 'recharts'

import axios from '../../axios-orders';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;



class AuthVsPost extends PureComponent {

	state={
		allUser:[],
		allPost:[],
		data:[]
	}



 getAllChartData = async () => {
		let users;
		let posts;
		let manupulatedData=[];
		try {
			users = await axios.get('/users.json');
			posts = await axios.get('/posts.json').then(res=>{
			
                for ( let key in res.data ) {
                    posts.push( {
                        ...res.data[key],
                        id: key
                    } );
				}
				Object.keys(users).forEach(id => {
					const tempArr = posts.filter(post => post.tokenId === id);
					if (tempArr.length) {
					manupulatedData.push({name: users[id].fullName, value: tempArr.length });
					}
				  })

				  this.setState({data:manupulatedData});
				
			}
			


			)
			//this.setState({allUser:users.data})
			//this.setState({allPost:posts.data})
			//console.log("chart data",this.state);
			


		} catch (error) {
			console.log(error);
		}


	//return { users, posts }

	}
	
	componentDidMount(){

		this.getAllChartData();
	
	}


	renderCustomizedLabel = ({
		cx, cy, midAngle, innerRadius, outerRadius, percent, index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
	
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};
	
	render() {


		return (
			<PieChart width={400} height={400}>
				<Pie
					data={this.state.data}
					cx={200}
					cy={200}
					labelLine={false}
					label={this.renderCustomizedLabel}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
			</PieChart>
		);
	}
}

export default AuthVsPost;