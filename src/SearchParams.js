import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import customDropdown from "./customDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = customDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = customDropdown("Breed", "", breeds);

  useEffect(() => {
    setBreed("");
    setBreeds([]);

    pet.breeds(animal).then(
      ({ breeds }) => {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      },
      (err) => {
        console.error(err);
      }
    );
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form>
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
