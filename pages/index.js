import React from 'react'
import Head from 'next/head'
import Nav from '../comps/nav'
import Link from 'next/link'
import pokemonApi, { getId } from '../api/pokemon'

const Home = ({ pokemons = [], count }) => (
  <div>
    <Head>
      <title>Pokemon Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="hero">
      <h1 className="title">Gotta Catch 'Em All</h1>
      <center>
        <ul className="list">
          {pokemons.map(pokemon => {
            const id = getId(pokemon)
            return (
              <li key={id}>
                <span>{pokemon.name} </span>
                <Link href="/[id]" as={`/${id}`}>
                  <a>View More</a>
                </Link>
              </li>
            )
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
)

Home.getInitialProps = async ({ req }) => {
  console.log('💎  Hello, I am new getInitialProps at index.js')
  const { data, count } = await pokemonApi.list()
  return {
    pokemons: data,
    count,
  }
}

export default Home
