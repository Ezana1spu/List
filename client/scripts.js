const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");
const chaButton =  document.querySelector(".cha-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);
chaButton.addEventListener("click", httpChange);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {
  theList = await http.get("http://localhost:5000/api");
  ShowList();
}

async function WriteList() {
  try {
    const response = await http.post("http://localhost:5000/api", theList);
  } catch (error) {  
    console.log(error);
  }
}

//["test 3","test 4","test 5"]

async function httpPost(e) {
  if(((input.value) === "")==false){
    e.preventDefault();
    theList.push(input.value);
    await WriteList();
    ShowList();
  }
}

async function httpDelete(e) {
  let newList = [];
  const inputvalue = input.value;
  
  for(let i = 0; i < theList.length; i++){
    if(theList[i] != inputvalue){
      newList.push(theList[i]);
    }else{
      for(let x = (i+1); x < theList.length; x++){
        newList.push(theList[x]);
      }
      break;
    }
  }
  theList = newList;
  await WriteList();
}

async function httpChange(e) {
  let newList = [];
  const inputvalue = input.value;
  
  for(let i = 0; i < theList.length; i++){
    if(theList[i] != inputvalue){
      newList.push(theList[i]);
    }else{
      let changeElement = prompt("Please Enter New List Item:", inputvalue)
      newList.push(changeElement);
      for(let x = (i+1); x < theList.length; x++){
        newList.push(theList[x]);
      }
      break;
    }
  }
  //alert("Get:" + newList);
  theList = newList;
  await WriteList();
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();