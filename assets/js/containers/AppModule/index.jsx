import React from 'react';
const style={
	paddingTop:'70px'
}
export default class Index extends React.Component{
	render(){
		const { headerLayout, mainLayout,children } = this.props
		return (
				<div >
					 <div className="Header" style={headerLayout?style:{}}>
          	{headerLayout}
      		 </div>
					 <div className="Main">
          	{mainLayout || children}
      		 </div>
				</div>
			)
	}
}