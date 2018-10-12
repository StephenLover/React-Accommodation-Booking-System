import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
 
class NonEditableRatingReact extends React.Component {
  render() {
    const { rating } = this.props;
    return (                
      <div>
        <StarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <span>★</span>}
          starCount={5}
          value={rating}
        />
      </div>
    );
  }
}
 
export default NonEditableRatingReact