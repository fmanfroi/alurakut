import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import Seguidores from "../src/components/Seguidores";

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);

  React.useEffect(function () {
    const token = "5265ac23a95a9216aa8310a4021ccd";
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
            url 
          } 
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const allCommunities = res.data.allCommunities;
        console.log(allCommunities);
        //const comunidadesAtualizadas = [...comunidades, allCommunities];
        setComunidades(allCommunities);
        console.log(comunidades);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2>O quer você deseja?</h2>
            <form
              onSubmit={function handleCriaComunidade(event) {
                event.preventDefault();
                const dadosDoForm = new FormData(event.target);
                const comunidade = {                 
                  image_url: dadosDoForm.get("image_url"),                    
                  creator_slug: "fmafroi",
                  url: dadosDoForm.get("url"),
                  title: dadosDoForm.get("title"),                  
                };

                fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidade),
                })
                .then(async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.registroCriado;
                  console.log(comunidade);
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                })

              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                ></input>
              </div>
              <div>
                <input
                  placeholder="URL pra usarmos de capa"
                  name="image_url"
                  aria-label="URL pra usarmos de capa"
                ></input>
              </div>
              <div>
                <input
                  placeholder="URL Para a comunidade"
                  name="url"
                  aria-label="URL Para a comunidade"
                ></input>
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a
                      href={`https://github.com/${itemAtual.creatorSlug}`}
                      key={itemAtual.title}
                    >
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            {/* <Seguidores /> */}
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  console.log('Cookies +>', token);
  console.log(decodedToken, githubUser);


  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json()) ;
  
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // const followers = await fetch(`https://api.github.com/users/${githubUser}/followers`)
  //   .then((res) => res.json())
  //   .then(followers => followers.map((follower) => ({
  //     id: follower.id,
  //     name: follower.login,
  //     image: follower.avatar_url,
  //   })));

  return {
    props: {
      githubUser,
    }
  }
}