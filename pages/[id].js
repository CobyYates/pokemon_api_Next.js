import React, { Fragment } from "react";
import Head from "next/head";
import Nav from "../comps/nav";
import Link from "next/link";
import pokemonApi from "../api/pokemon";

const Detail = ({ pokemon, type }) => (
  <div>
    <Head>
      <title>Pokemon Detail</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="hero">
      <h1 className="title">{pokemon.name.toUpperCase()}</h1>
      <center>
        {pokemon.sprites ? (
          <Fragment>
            <img src={pokemon.sprites.front_default} alt="front sprite" />
            <img src={pokemon.sprites.back_default} alt="back sprite" />
          </Fragment>
        ) : null}
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Types:</strong> {type}</p>

        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Height:</strong> {pokemon.height}</p>
        
      </center>
      <Link href={`/`}>
        <a>Back to list</a>
      </Link>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
        font-weight: 200;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
);

Detail.getInitialProps = async ({ query }) => {
  const { data } = await pokemonApi.get(query.id);
  console.log(data);
  const types = data.types.map(el => {
    return el.type.name + ' '
  });
  console.log(types);
  return {
    pokemon: data,
    type: types,
  };
};

export default Detail;
