import React from 'react';


export default class Index extends React.Component{
	render(){
		const { headerLayout, mainLayout,children } = this.props
		return (
				<div >
					<div>main</div>
					 <div className="Header">
          	{headerLayout}
      		 </div>
					 <div className="Main">
          	{mainLayout || children}
      		 </div>
				</div>
			)
	}
}