import React from "react";
import pet from "@frontendmasters/pet";

class Details extends React.Component {
  //the super(props) line is imperative & it must be written every time
  //you write a constructor & want to initialise the props
  constructor(props) {
    super(props);

    // these properties are only accessible inside this particular component/class & nowhere else in the application
    // you can tweak the properties of this state to whatever you want inside this class which we are doing on line 24
    this.state = {
      loading: true,
    };
  }

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

  // This method is a must for a react component.
  // Without this, the component will not work
  render() {
    if (this.state.loading) {
      return <h1>Loading ...</h1>;
    }
    const { animal, name, breed, description, location } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
