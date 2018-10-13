import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
 
class EditableRatingReact extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      rating: 4
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({
        rating: nextValue
    });
    this.props.handleReviewFormChange(this.state.rating)
  }
 
  render() {
    const { rating } = this.state;
    const evaluation = {
        1 : ' terrible experience',
        2 : ' not bad but can be improved',
        3 : ' normal',
        4 : ' good experience',
        5 : ' fantasic journey'
    }
    
    return (                
      <div>
        <h4>Your rating for your accomendation experience is: {evaluation[this.state.rating]}</h4>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
 
export default EditableRatingReact