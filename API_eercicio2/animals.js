
//cat api usada: https://api.thecatapi.com/v1/images/search?limit=10

/****************** Contentores gerais ****************/
console.clear();
//div para buttons
let bt_container = document.createElement("div");
document.querySelector("body").appendChild(bt_container);
bt_container.className += "bt-container";

//div para nome pesquisado
let results_ct = document.createElement("div");
document.querySelector("body").appendChild(results_ct);
results_ct.className += "results-ct";

//div para filtro
let food_ct = document.createElement("div");
document.querySelector("body").appendChild(food_ct);
food_ct.className += "food-ct";

//div para conteúdo
let items_container = document.createElement("div");
document.querySelector("body").appendChild(items_container);
items_container.className += "items-container";




fetch("https://huuuurrrdd.github.io/apis/cats.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    document.body.appendChild(displayfact(data));
  });



function displayfact(data) {

    console.log(data.length);
/**************************** Formulário de pesquisa ****************************/
    //search container
    let search_ct = document.createElement("div");
    search_ct.className += "form-ct";
    document.querySelector(".bt-container").appendChild(search_ct);

    //form
    let form = document.createElement("form");
    form.className += "form";
    document.querySelector(".form-ct").appendChild(form);

    //label
    let search_label = document.createElement("label");
    search_label.className += "search-label s-item";
    document.querySelector(".form-ct").appendChild(search_label);
    search_label.for="searchInput";
    search_label.innerHTML = "Find cat:";
    
   //input
    let search_input = document.createElement("input");
    search_input.className += "search-input s-item";
    document.querySelector(".form-ct").appendChild(search_input);
    search_input.type = "text";
    search_input.placeholder = "Search cat by name";

    //button
    let bt_search = document.createElement("button");
    form.className += "bt-search s-item";
    document.querySelector(".form-ct").appendChild(bt_search);
    bt_search.innerText = "Search";

    //button
    let bt_clear = document.createElement("button");
    form.className += "bt-clear s-item";
    document.querySelector(".form-ct").appendChild(bt_clear);
    bt_clear.innerText = "Clear";

//filtrar e apresentar os dados
    search_input.addEventListener("input", (e) =>{

        let value = e.target.value;

        if(value && value.trim().length > 0){
            value = value.trim().toLowerCase();

            const filteredData = data.filter(cat => cat.cat.name.toLowerCase().includes(value));
            setList(filteredData);
        }else{
            clearList(results_ct);
            clearList(items_container);
        }
    })

    function clearList(item){
        while (item.firstChild){
            item.removeChild(item.firstChild)
        }
    }

    bt_search.addEventListener("click", () => {
        clearList(results_ct);
        search_input.value = "";
        
    });
//regressa ao estado inicial
    bt_clear.addEventListener("click", () => {
        clearList(results_ct);
        clearList(items_container);
        search_input.value = "";
        showResults(data);
    })


    function setList(results) { 
        clearList(results_ct);
        clearList(items_container);
      
        if (results.length === 0) {
          noResults();
        } else {
          for (const cat of results) {
            const resultItem = document.createElement("li");
            resultItem.className += "result-item " + cat.cat.name;
            const text = document.createTextNode(cat.cat.name);
            resultItem.appendChild(text);
            results_ct.appendChild(resultItem);
          }
          showResults(results);
        } 
      }


      function noResults(){
        items_container.innerHTML = "<h1> No results!<h1>";
    }
    

    showResults(data);

    
    /************************* Ordenação dos dados ***************************/

    let filter_ct = document.createElement("div");
    filter_ct.className = "filter-ct";
    document.querySelector(".bt-container").appendChild(filter_ct);

    let bt_a_z = document.createElement("button");
    bt_a_z.className += "bt-AZ";
    bt_a_z.innerHTML = "Alphabetic order: AZ";
    document.querySelector(".filter-ct").appendChild(bt_a_z);
    bt_a_z.addEventListener("click", sortAZ);

    let bt_z_a = document.createElement("button");
    bt_z_a.innerHTML = "Alphabetic order: ZA";
    bt_z_a.className += "bt-ZA";
    document.querySelector(".filter-ct").appendChild(bt_z_a);
    bt_z_a.addEventListener("click", sortZA);

    let bt_num = document.createElement("button");
    bt_num.innerHTML = "Order by age: Ascend";
    bt_num.className += "bt-num";
    document.querySelector(".filter-ct").appendChild(bt_num);
    bt_num.addEventListener("click", ordNumber);

    let bt_num_rev = document.createElement("button");
    bt_num_rev.innerHTML = "Order by age Descend";
    bt_num_rev.className += "bt-num-rev";
    document.querySelector(".filter-ct").appendChild(bt_num_rev);
    bt_num_rev.addEventListener("click", ordNumberRev);


  //ordem alfabetica
  function sortAZ() {
    clearAll();
    let name = [];
    name.length = data.length;

    for (let i = 0; i < name.length; i++) {
      name[i] = data[i].cat.name;
    }
    name.sort();
    console.log(sortByReference(name, data, "name"));
    showResults(sortByReference(name, data, "name"));
  }

  //ordem alfabetica reverso
  function sortZA() {
    clearAll();
    let name = [];
    name.length = data.length;
    //copia dados do objeto para o array
    for (let i = 0; i < name.length; i++) {
      name[i] = data[i].cat.name;
    }
    name.sort(); //ordem A-Z

    // reverse name
    let reverseName = [];
    for (let i = name.length - 1; i >= 0; i--) {
      reverseName.push(name[i]);
    }
    console.log(reverseName);

    // convert to object and display
    console.log(sortByReference(reverseName, data, "name"));
    showResults(sortByReference(reverseName, data, "name"));
  }

  //ordenar pela idade ascendente
  function ordNumber() {
    clearAll();
    let object = data;
    //sort by age
    object.sort((a, b) => a.cat.age - b.cat.age);

    console.log(object);
    showResults(object);
  }

  //ordenar pela idade descendente
  function ordNumberRev() {
    clearAll();
    let object = data;

    //sort by age
    object.sort((a, b) => a.cat.age - b.cat.age);

    let name = [];
    name.length = data.length;

    //copy data from the object
    for (let i = 0; i < name.length; i++) {
      name[i] = object[i].cat.name;
    }

    //reverse the name array
    let reverseName = [];
    for (let i = name.length - 1; i >= 0; i--) {
      reverseName.push(name[i]);
    }
    console.log(reverseName);

    //map the name array with an object
    console.log(sortByReference(reverseName, data, "name"));

    //show the results
    showResults(sortByReference(reverseName, data, "name"));
    console.log(object);
  }


  /*********************** Selecao pela comida favorita ****************************/
   let food_form = document.createElement('form');
   document.querySelector(".food-ct").appendChild(food_form);
   food_form.className += "food-form";  

   let food_label = document.createElement('label');
   document.querySelector(".food-form").appendChild(food_label);
   food_label.className += "food-label";
   food_label.for = "food";
   food_label.innerText = "Favorite Food: ";

   let food_select = document.createElement('select');
   document.querySelector(".food-form").appendChild(food_select);
   food_select.className += "food-select";
   food_select.name = "food";
   food_select.id = "food";

   let food_list = ["All", "Beef", "Chicken", "Salmon", "Tuna", "Turkey"];

   for (food of food_list){
    let food_option = document.createElement('option');
    document.querySelector(".food-select").appendChild(food_option);
    food_option.className += "food-option";
    food_option.value = food;
    food_option.text = food;
   }

//detatar a mudanca do seletor
   food_select.addEventListener("change", function(){
    const selectedOption = food_select.options [food_select.selectedIndex];
    const selectedText = selectedOption.text;
    console.log(selectedText);

    if (selectedText == "All") {
        clearList(items_container);
        showResults(data);
    } else {
        clearList(items_container);
      let objFood = data.filter((obj) => {
 
         console.log(selectedText);
        return (obj.cat.favorite_food == selectedText);
      });
      console.log(objFood);
      showResults(objFood);
    }
   });


    //atualiza o objeto com base num array
    const sortByReference = (name, data, type) => {
        let names = [];
        names.length = data.length;
      const sorted = name.map((element) => {
        for (let i = 0; i < data.length; i++) {
          if (type == "name") {
            if (data[i].cat.name === element) {
              return data[i];
            }
          }else if (type == "age") {
            if (data[i].cat.age === element) {
                
                return data[i];
            }
          }
        }
      });
      return sorted;
    };

    //coloca os objetos em elementos html
    function showResults(object){

    object.forEach((cat) => {
    let elem_container = document.createElement("div");
    document.querySelector(".items-container").appendChild(elem_container);
    elem_container.className += "elem-ct elem-ct-" + cat.cat.name;
    elem_container.id = cat.cat.name;

    let title_ct = document.createElement("div");
    document.querySelector(".elem-ct-" + cat.cat.name).appendChild(title_ct);
    title_ct.className += "title-ct-" + cat.cat.name;

    let title = document.createElement("h1");
    document.querySelector(".title-ct-" + cat.cat.name).appendChild(title);
    title.className += "title";

    let picture_ct = document.createElement("div");
    document.querySelector(".elem-ct-" + cat.cat.name).appendChild(picture_ct);
    picture_ct.className += "picture picture-ct-" + cat.cat.name;

    let picture = document.createElement("img");
    document.querySelector(".picture-ct-" + cat.cat.name).appendChild(picture);
    picture.className += "img-pic picture" + cat.cat.name;

    let age = document.createElement("div");
    document.querySelector(".elem-ct-" + cat.cat.name).appendChild(age);
    age.className += "age ele-item";

    let favFood = document.createElement("div");
    document.querySelector(".elem-ct-" + cat.cat.name).appendChild(favFood);
    favFood.className += "fav-food ele-item";

    let fact = document.createElement("div");
    document.querySelector(".elem-ct-" + cat.cat.name).appendChild(fact);
    fact.className += "fact ele-item";

    title.innerText = cat.cat.name;
    picture.src = cat.cat.picture_url;
    age.innerHTML = "<span>Age:</span> " + cat.cat.age + " years";
    fact.innerHTML = cat.cat.facts[0];
    favFood.innerHTML = "<span>Favorite food:</span> " + cat.cat.favorite_food;
    
    });    
    }

    function clearAll(){
        console.clear();
        document.querySelector(".items-container").innerHTML = "";
    
      }
  
}
