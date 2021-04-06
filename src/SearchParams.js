import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import customDropdown from "./customDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = customDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = customDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext); //this is just another hook but in this case it lives inside the entire app unlike breed or animal dropdown. Hence this is the reason we are not using the custom dropdown for theme dropdown

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreed("");
    setBreeds([]);

    pet.breeds(animal).then(
      (response) => {
        const breedStrings = response.breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      },
      (err) => {
        console.error(err);
      }
    );
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        {/* We cannot use the above custom dropdown for theme because customDropdowm creates its own hooks & 
        here we are actually using a hook which is not searchParams.js own hook  */}
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="pink">Pink</option>
          </select>
        </label>

        {/* color:theme is the inline css with an object containing the style. 
        You can pass an object with styles to inline style in react  */}
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
