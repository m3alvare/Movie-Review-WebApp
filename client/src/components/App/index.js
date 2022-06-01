import * as React from 'react';

const App = () => {

  const recipes = [
    {
      title: 'Fruit salad',
      difficulty: '2',
      ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
      calories: "200",
      instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl."
    }, {
      title: 'Avocado wrap',
      difficulty: '3',
      ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
      calories: "400",
      instructions: "Wash all fruits and vegetables. Slice avocadoes and apples. Mix all ingredients and wrap them in a tortilla bread."
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedRecipes = recipes.filter(function (recipe) {

    if (!Number.isNaN(parseInt(searchTerm))){
      return (parseInt(recipe.difficulty)<=parseInt(searchTerm) || searchTerm=='')
    }
    return printIngredients(recipe.ingredients).includes(searchTerm);
    }
  );


  return (
    <div>
      <h1>
        Recipe finder
      </h1>

      <Search onSearch={handleSearch} />

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>

      <hr />

      <List list={searchedRecipes} />     
    </div>
  );
}

const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      onChange={props.onSearch}
    />

  </div>
);

const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => {
        return (
          <Item item={item} />
        );
      })}
    </ul>

  )
}

const Item = (props) => {
  return (
    <li>
      <span>Recipe: {props.item.title} | </span>
      <span>Difficulty: {props.item.difficulty} | </span>
      <span>{printIngredients(props.item.ingredients)} | </span>
      <span>Calories: {props.item.calories} | </span>
      <span>Isnstructions: {props.item.instructions}</span>
    </li>
  )
}

function printIngredients(arr){
  var ingredients = arr[0];
  for (var i = 1; i < arr.length; i++){
      ingredients += ", " + arr[i] ;
  }
  return ingredients;
}

export default App;