import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

// You cannot use hooks inside of a class.
// Hence you cannot use useContext hook here to use a global state
// In order to use context with classes check the below code related to context
class Details extends React.Component {
  //the super(props) line is imperative & it must be written every time
  //you write a constructor & want to initialise the props
  // constructor(props) {
  //   super(props);

  //   // these properties are only accessible inside this particular component/class & nowhere else in the application
  //   // you can tweak the properties of this state to whatever you want inside this class which we are doing on line 24
  //   this.state = {
  //     loading: true,
  //   };
  // }

  state = { loading: true, showModal: false };

  //component did mount is generally used to make AJAX requests
  componentDidMount() {
    // Here this.props is an immutable default props of react which are passed from parent to its child & the property name will always be this.props
    //So just be aware about this one

    pet.animal(this.props.id).then(({ animal }) => {
      //you must use arrow function here otherwise react will start breaking.
      //This is a thumb rule you must follow whenever you try to fetch data.
      //Reason = function declaration will create a new context but inside an arrow function context will not be created newly.
      //Hence this.props will not work if you use function here

      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => {
    navigate(this.state.url); // you can also use reach router's redirect method here
  };

  // This method is a must for a react component.
  // Without this, the component will not work
  render() {
    if (this.state.loading) {
      return <h1>Loading ...</h1>;
    }
    const {
      animal,
      name,
      breed,
      description,
      location,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          {/* This is how you can use context inside classes */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No, I'm a monster</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
