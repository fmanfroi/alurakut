import React from "react";
import Seguidor from "./Seguidor";
import { useEffect, useState } from "react";
import actions from "./actions-fetch";

const Seguidores = (props) => {
  const { filterText } = props;
  const [resultadoBusca, setResultadoBusca] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(3);

  const handleCarregar = () => {
    actions
      .carregar(currentPage)
      .then( function (newFollowers) {
        console.log(" num de seguidores ", followers.length);        
        console.log(" num de novos seguidores ", newFollowers.length);
 /*        if (followers.length > 20) {
          console.log(" removendo seguidores ", followers.length);
          setFollowers(followers.splice(0, 10));
        }  */
        setFollowers([...followers, ...newFollowers])
        console.log(" num de seguidores apos ", followers.length);
      });
      //.then((newFollowers) => setFollowers((prevFollowers) => [...prevFollowers, ...newFollowers])
      //);      
  };

  useEffect(() => handleCarregar(), [currentPage]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        console.log("Sentinela appears!", currentPage);
        setCurrentPage((currentValue) => currentValue + 1);                
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinela"));
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <ul>
      {followers.map((follower) => (
        <Seguidor key={follower.id} login={follower.login} />
      ))}
      <li id="sentinela"></li>
    </ul>
  );
};

export default Seguidores;
