import { useEffect, useState } from 'react';
import './App.css';
import {getAllPokemon} from "./utils/pokemon.js";

function App() {
  //エンドポイント　これでポケモンの情報を持ってくる
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)

//ブラウザをリロードした時に全部のポケモン情報を取ってくる
//1回だけ呼び出したいので第2引数は空にする
//ポケモンデータを取得する関数を作る
//非同期処理を使うのでasyncを使う
useEffect(() => {
  const fetchPokemonData = async () => {
    //全てのポケモンデータを取得
    let res = await getAllPokemon(initialURL);
    console.log(res);
    setLoading(false);
  };
  fetchPokemonData();
}, []);




  return (
    <div className="App">
    {loading ? (
      <h1>ロード中</h1>
    ) : 
      <h1>ポケモンデータを取得しました！</h1>
  }
  </div>
  );
}

export default App;
