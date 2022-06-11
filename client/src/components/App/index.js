import * as React from 'react';

const App = () => {

  const recipes = [
    {
      title: 'Fruit salad',
      difficulty: '2',
      ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
      calories: "200",
      instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
      recipeID: 1,
    }, {
      title: 'Avocado wrap',
      difficulty: '3',
      ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
      calories: "400",
      instructions: "Wash all fruits and vegetables. Slice avocados and apples. Mix all ingredients and wrap them in a tortilla bread.",
      recipeID: 2
    },
  ];

  const [selectedRecipe, setSelectedRecipe] = React.useState('');

  const handleToggleIngredients = (item) => {
    if (selectedRecipe) {
      setSelectedRecipe('');
    } else {
      setSelectedRecipe(item.recipeID);
    }

  }


  return (
    <div>
      <h1>
        Recipe finder
      </h1>


      <List
        list={recipes}
        selectedRecipe={selectedRecipe}
        onToggleIngredients={handleToggleIngredients}
      />

    </div>
  );
}



const List = ({ list, selectedRecipe, onToggleIngredients }) => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <Item
            item={item}
            selectedRecipe={selectedRecipe}
            onToggleIngredients={onToggleIngredients}
          />
        );
      })}
    </ul>

  )
}

const Item = ({ item, selectedRecipe, onToggleIngredients }) => {


  return (
    <li>
      <p> {"Title: " + item.title}</p>
      <p> {"Difficulty: " + item.difficulty}</p>
      {selectedRecipe == item.recipeID && (
        <>
          <p>Ingredients: </p>
          <ul>
            {item.ingredients.map((ingredient) => (<li>{ingredient}</li>))}
          </ul>

        </>
      )}

      <p>
        <Button
          item={item}
          label={selectedRecipe == item.recipeID ? 'Hide ingredients' : 'Show ingredients'}
          onButtonClick={onToggleIngredients}
        />
      </p>


      <p>{"Instructions: " + item.instructions}</p>
      <p>{"Calories: " + item.calories}</p>
    </li>
  )
}

const Button = ({ item, label, onButtonClick }) => (
  <button type="button" onClick={() => onButtonClick(item)}>
    {label}
  </button>
)


export default App;