import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import {getAllPokemon, getPokemon} from "./utils/pokemon.js";

function App() {
  //エンドポイント　これでポケモンの情報を持ってくる
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)
  //_pokemonDataの状態変数を格納
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

//ブラウザをリロードした時に全部のポケモン情報を取ってくる
//1回だけ呼び出したいので第2引数は空にする
//ポケモンデータを取得する関数を作る
//非同期処理を使うのでasyncを使う
useEffect(() => {
  const fetchPokemonData = async () => {
    //全てのポケモンデータを取得
    let res = await getAllPokemon(initialURL);
     //各ポケモンの詳細なデータを取
     loadPokemon(res.results);
     //console.log(res.results);
    console.log(res.next);
    setNextURL(res.next);
    setPrevURL(res.prev);
    setLoading(false);
  };
  fetchPokemonData();
}, []);

//res.resultsをdataとして受け取る
//20種類のポケモンを受け取り終わるまで(fetch)
//最終的に取得してきたものを_pokemonDataに格納　
const loadPokemon = async (data) => {
  let _pokemonData = await Promise.all(
    data.map((pokemon) => {
      //console.log(pokemon);
      //pokemon.urlにはそのポケモンの詳細が入ってる（エンドポイント）
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
    })
  );
  setPokemonData(_pokemonData);
};

  //console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    //console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if(!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
        <div className="App">
          {loading ? (
            <h1>ロード中</h1>
          ) : (
            <>
              <div className="pokemonCardContainer">
                {pokemonData.map((pokemon, i) => {
                //プロップス
                return <Card key={i} pokemon={pokemon} />;
                })}
              </div>
              <div className="btn">
                <button onClick={handlePrevPage}>前へ</button>
                <button onClick={handleNextPage}>次へ</button>
              </div>
            </>
          )}
        </div>
    </> 
  );
}

export default App;
