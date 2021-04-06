import React from "react";

class Carousel extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.handleIndexClick = this.handleIndexClick.bind(this);
  // }

  state = {
    photos: [],
    active: 0,
  };

  // this is again another special method of react which will do a sort of pre-processing on your state
  // & then pass down that particular state to your component
  // this method has to be a static one
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }

  // you should always use an arrow function for event listeners & functions which you want to pass down to the children
  // the arrow function here will not create a new context & hence the this.setState will work correctly in this component
  // here this will be the Carousel component
  // if you still want to use function, then you will have to write a constructor as on line no.5 & then bind this
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />

        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
