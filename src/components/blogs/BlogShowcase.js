import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import leftArrow from '../../images/leftArrow.svg'


class BlogShowcase extends Component{


    state = {
        index: 0
    };    

      
    handleNext = () => {
        this.setState({ index: (this.state.index + 1) % this.props.blogs.length });
        console.log(this.state.index)
    };
    handlePrevious = () => {
        this.setState({ index: Math.abs(this.state.index - 1 % this.props.blogs.length) });
        console.log(this.state.index)
    };

    render(){
        const { blogs, auth } = this.props;
        return (
            <div className="hero">
                <div className="leftArrow">
                  <img onClick = {this.handlePrevious} src={leftArrow} alt=""/>
                </div>
    
                <Link to='/blogs/:id'><img src={blogs && blogs[this.state.index].url} alt=""/></Link>
                <h1>{blogs && blogs[this.state.index].title}</h1>
            
                <div className="rightArrow">
                    <img onClick = {this.handleNext} src={require("../../images/rightArrow.svg")} alt=""/>
                </div>
            </div>
        )
    }

}

export default BlogShowcase
