import React from "react";
import Head from "next/head";
// import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import pokemonApi, { getId } from "../api/pokemon";

const Home = ({ pokemons = [], count }) => (
  <div className="area">
    <Head>
      <title>Pokemon | NEXT.js | Coby Yates</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="hero">
      <h1 className="title">Catch 'Em All</h1>
      <center>
        <button onClick={rand}>Request Random Pokemon</button>

        <form className="form" onSubmit={test}>
          <h2>Find a Pokemon</h2>
          <div>
            <div>
              <input name="id" label="id" id="name" required />
            </div>
          </div>
          <button>Find</button>
        </form>
        <ul className="list">
          {pokemons.map(pokemon => {
            const id = getId(pokemon);
            return (
              <li key={id}>
                <span>{pokemon.name.toUpperCase()} </span>
                <Link href="/[id]" as={`/${id}`}>
                  <a>View Stats</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </center>
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
      }
      .title,
      .description {
        text-align: center;
      }
      .list {
        list-style: none;
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

Home.getInitialProps = async ({ req }) => {
  const { data, count } = await pokemonApi.list();
  return {
    pokemons: data,
    count
  };
};

const test = () => {
  let path = document.getElementById("name").value;
  Router.push(`/${path}`);
};

const rand = () => {
  let randomNum = Math.floor(Math.random() * 100 + 1);
  Router.push(`/${randomNum}`);
};

export default Home;
