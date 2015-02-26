var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      function noMushrooms(ingredient){
        return ingredient !== 'mushrooms';
      }

      function noNuts(ingredient){
        return ingredient.indexOf('nut') === -1;
      }

      productsICanEat = products.filter(function(pizza){
        return _(pizza.ingredients).all(noMushrooms);
      }).filter(function(pizza){
        return _(pizza.ingredients).all(noNuts);
      });

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(2);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1, 1000);    /* try chaining range() and reduce() */

    function moduloThreeOrFive(number){
      return number % 3 === 0 || number % 5 === 0;
    }

    sum = sum.filter(moduloThreeOrFive).reduce(function(sum, number){
      return sum += number;
    });

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    function ingredients(pizza){
      return pizza.ingredients;
    }

    test = _(products).chain().map(ingredients).flatten().reduce(function(sum, ingredient){
      ingredientCount[ingredient] ? ingredientCount[ingredient] += 1 : ingredientCount[ingredient] = 1;
    });

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {
  
  });*/

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var numbers = _.range(100, 1000)

    var products = []

    numbers.forEach(function(x){
      numbers.forEach(function(y){
        products.push(x * y)
      })
    })

    products = products.filter(function(number){
      var reverse = String(number).split('').reverse().join('')

      return reverse === String(number)
    })

    largest = products.pop()
    
    expect(largest).toBe(580085);
  });
  
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var numbers = _.range(230000000, 240000000)
    
    function divisibleBy(number){
      return number % 20 === 0 && number % 19 === 0 && number % 18 === 0 && number % 17 === 0 && number % 16 === 0 && number % 15 === 0 && number % 14 === 0 && number % 13 === 0 && number % 12 === 0 && number % 11 === 0 && number % 10 === 0 && number % 9 === 0 && number % 8 === 0 && number % 7 === 0 && number % 6 === 0 && number % 5 === 0 && number % 4 === 0 && number % 3 === 0 && number % 2 === 0
    }

    numbers = numbers.filter(divisibleBy)

    expect(numbers[0]).toBe(232792560)
  });
  /*
  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  */
});
