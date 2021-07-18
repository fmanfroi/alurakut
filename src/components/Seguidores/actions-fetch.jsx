const jsonHeaders = new Headers({ "Content-Type": "application/json" });
const perPage = 10;
const currentPage = 2;
const ENDPOINT = "https://api.github.com/users/omariosouto/followers";
const URL = `${ENDPOINT}?per_page=${perPage}&page=${currentPage}&order=DESC`;

const carregar = async (currentPage) => {
  console.log("pagina q chegou", currentPage);  
  const response = await fetch(`${ENDPOINT}?per_page=${perPage}&page=${currentPage}&order=DESC`, {
    method: "GET",
    headers: jsonHeaders,
  });
  const tarefas = await response.json();
  return tarefas;
};

export default {carregar};
