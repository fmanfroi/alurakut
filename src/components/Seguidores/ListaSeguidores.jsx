import React from "react";
import Seguidor from "./Seguidor";
import { useEffect, useState } from "react";

const Seguidores = (props) => {
  const { filterText} = props;
  const rows = [];  
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const perPage = 10;
    const ENDPOINT = 'https://api.github.com/users/omariosouto/followers';
    const URL = `${ENDPOINT}?per_page=${perPage}&page=${currentPage}&order=DESC`;
    fetch(URL)
      .then((response) => response.json())
      .then((newFollowers) => setFollowers([...followers, ...newFollowers]))
      .then(console.log(followers))
  }, [currentPage]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('Sentinela appears!', currentPage)
        setCurrentPage((currentValue) => currentValue + 1);

      }
    })
    intersectionObserver.observe(document.querySelector('#sentinela'));
    return () => intersectionObserver.disconnect();
  }, []);

 /*  followers.forEach((seguidor) => {
    const { login, id } = seguidor;
    if (login.indexOf(filterText) === -1) {
      return;
    }    
    rows.push(<Seguidor key={id} login={login} />);
  }); */

  return (
    <ul>
      {followers.map(follower => (          
          <Seguidor key={follower.id} login={follower.login} />          
        ))}
      <li id="sentinela"></li>
    </ul>
  );
};

export default Seguidores;
