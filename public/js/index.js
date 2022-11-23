/* -------------------------------------------------------------------------- */
/*                           CLIENT SIDE JAVASCRIPT                           */
/* -------------------------------------------------------------------------- */
console.log("CLIENT SIDE JAVASCRIPT");

const todoForm = document.querySelector("form");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputEle = document.getElementById("user-id");
  console.log(inputEle.value);
  fetch(`http://localhost:3003/todo?id=${inputEle.value}`)
    .then((data) => data.json())
    .then((response) => console.log(response));
});
